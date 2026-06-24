---
title: "Date-/Time-Picker"
pubDate: "2006-03-26T11:04:39.000Z"
updatedDate: "2021-12-27T18:50:39.000Z"
slug: "date-time-picker"
wpPostId: "291"
permalink: "/2006-03-26/date-time-picker/"
visibility: "public"
draft: false
tags: ["benutzereingabe", "dateneingabe", "formular", "interfacedesign", "nielsen", "raskin", "xhtml"]
---
<strong>Wie sähe ein optimales Datums- oder Zeit-Eingabefeld aus?</strong>
<p class="update">Update 06-05-31: Eine Lösung könnte <a href="/2006-05-31/ajax-datumsauswahl/">eine Datums-Autocomplete-Funktion sein...</a></p>
Ich glaube Jacob Nielsen ist es, der schreibt, dass es das Formular ist, das die Validierung der Daten vornehmen muss, nicht der Benutzer.

Das erfordert natürlich mehr Arbeit auf der Serverseite, hebt aber das Benutzerempfinden erheblich. Gerade aufgrund dieser Mehrarbeit kann ich gut nachvollziehen, dass viele Websites auf Lösungen zurückgreifen, die für den Benutzer unbeqeuemer, für den Entwickler aber bequemer sind.
Anders ist das jedoch bei <em>Formular-Generatoren</em> wie sie Ruby On Rails beispielsweise mitbringt ... oder aber die beiden Websites in diesem Post. Hier würde es sich lohnen einmal genau zu überlegen, wie man die Formulareingabe so einfach wie möglich machen kann.

Dabei läuft es in erster Linie auf zwei Dinge hinaus:

<strong>1. den Wechsel zwischen Tastatur und Maus minimieren</strong> -- Raskin (The Human Interface) beschreibt in seinem Kapitel "Quantitative Analyse von Interfaces" anschaulich einen Ansatz, bei dem alle Mehrfeld-Lösungen durchfallen würden. Der Wechsel der Hand von der Tastatur zur Maus kostet in dieser GOMS(-ähnlichen) Analyse die meiste Zeit (und kognitive Arbeit) und ist zudem meist unnötig.

<strong>2. Gewohnheiten des Benutzers übernehmen </strong>-- Lästig und zeitraubend bei der Eingabe ist, sich auf die Art und Weise einzustellen, wie der Entwickler meine Daten gerne geliefert hätte. Ich passe mich an die Software an -- spätestens hier wird deutlich, dass das besser gehen muss.

<strong>Die Lösung?</strong> Sorry, die muss ich auf später verschieben, dafür ist heute keine Zeit.
Aber bei all den Artikel, die es über Formulardesign mit CSS und XHTML gibt, wundert es mich, dass ich noch nichts über wirklich durchdachte Lösungen gelesen habe und wollte zumindest meinen Unmut schon einmal ausdrücken :-).
<strong>Zum Abschluss </strong><strong>drei Beispiele</strong>, deren Lösung ich nicht gut finde:
<ul>
	<li>Rails-Scaffolding generiert eine Reihe von DropDown-Feldern. Zu sehen <a href="http://media.rubyonrails.org/video/rails_take2_with_sound.mov">im ersten Drittel des Rails15-Min-Videos</a>. DropDown-Felder finde ich in diesem Zusammenhang den GAU und das Gegenteil von schneller Dateneingabe...</li>
	<li><a href="http://www.jotform.com/">jotForm - ein Formular-Generator</a> bietet ein einfaches Textfeld mit Date-Picker. Unklar ist, welche Daten direkt eingegeben werden können. Der Date-Picker ist gut, sollte aber nicht die einzige Eingabelösung sein.</li>
	<li><a href="http://www.wufoo.com/demo/">Wufoo - auch ein Formular-Generator</a> löst es mit drei einzelnen aufeinanderfolgenden Inputfeldern. Auch besser, auch nicht ideal.</li>
</ul>
To be continued...
