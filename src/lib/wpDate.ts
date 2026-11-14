// Date formats of the original theme, rendered in the blog's time zone.
const TZ = 'Europe/Berlin'

function parts(date: Date) {
  const get = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('de-DE', { timeZone: TZ, ...opts }).formatToParts(date)
  const p = Object.fromEntries(
    get({
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).map((x) => [x.type, x.value]),
  )
  return p as Record<'weekday' | 'day' | 'month' | 'year' | 'hour' | 'minute', string>
}

/** the_time('D d.m.Y') → "Mi. 07.06.2006" */
export function wpDay(date: Date): string {
  const p = parts(date)
  const weekday = p.weekday.endsWith('.') ? p.weekday : `${p.weekday}.`
  return `${weekday} ${p.day}.${p.month}.${p.year}`
}

/** the_time() → "8:37" (G:i); pad: true → "08:37" (H:i) */
export function wpTime(date: Date, pad = false): string {
  const p = parts(date)
  return `${pad ? p.hour : String(Number(p.hour))}:${p.minute}`
}

/** comment_date d.m.y → "07.06.06" */
export function wpShortDate(date: Date): string {
  const p = parts(date)
  return `${p.day}.${p.month}.${p.year.slice(-2)}`
}

const UNITS: [number, string, string][] = [
  [60 * 60 * 24 * 365, 'Jahr', 'Jahre'],
  [60 * 60 * 24 * 30, 'Monat', 'Monate'],
  [60 * 60 * 24 * 7, 'Woche', 'Wochen'],
  [60 * 60 * 24, 'Tag', 'Tage'],
  [60 * 60, 'Stunde', 'Stunden'],
  [60, 'Minute', 'Minuten'],
]

/** time_since plugin: the two largest units, e.g. "20 Jahre, 5 Monate" */
export function timeSince(from: Date, to: Date = new Date()): string {
  let secs = Math.max(0, Math.floor((to.getTime() - from.getTime()) / 1000))
  const label = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
  for (let i = 0; i < UNITS.length; i++) {
    const [size, one, many] = UNITS[i]!
    const n = Math.floor(secs / size)
    if (n === 0) continue
    secs -= n * size
    const next = UNITS[i + 1]
    const m = next ? Math.floor(secs / next[0]) : 0
    return next && m > 0
      ? `${label(n, one, many)}, ${label(m, next[1], next[2])}`
      : label(n, one, many)
  }
  return '0 Minuten'
}
