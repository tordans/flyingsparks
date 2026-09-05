// Copies every locally-referenced media file (from media-manifest.json) into
// public/wp-content/... so the original URLs resolve 1:1 after the build.
// Only referenced files are copied (keeps the repo lean vs. the full uploads tree).
import { readFileSync, mkdirSync, copyFileSync, existsSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = join(__dirname, '..', '..')
const WORKSPACE = join(REPO, '..')
const FTP_ROOT = join(WORKSPACE, 'full-backup-ftp-2026-06-24', 'fly.ingsparks.de')
const PUBLIC = join(REPO, 'public')

const manifest = JSON.parse(readFileSync(join(REPO, '_migration', 'media-manifest.json'), 'utf-8'))
const local = manifest.filter((m) => !m.external && m.exists && m.localPath)

let copied = 0,
  bytes = 0,
  missing = 0
for (const m of local) {
  if (!existsSync(m.localPath)) {
    missing++
    continue
  }
  const rel = m.localPath.slice(FTP_ROOT.length) // /wp-content/...
  const dest = join(PUBLIC, rel)
  mkdirSync(dirname(dest), { recursive: true })
  copyFileSync(m.localPath, dest)
  copied++
  bytes += statSync(dest).size
}
console.log(
  `Copied ${copied} files (${(bytes / 1e6).toFixed(1)} MB) into public/wp-content/. Missing: ${missing}.`,
)
