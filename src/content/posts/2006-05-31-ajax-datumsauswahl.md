---
title: "JavaScript-Datumsauswahl"
pubDate: "2006-05-31T06:57:04.000Z"
updatedDate: "2021-12-27T18:50:38.000Z"
slug: "ajax-datumsauswahl"
wpPostId: "338"
permalink: "/2006-05-31/ajax-datumsauswahl/"
visibility: "public"
draft: false
tags: ["ajax", "benutzereingabe", "datum", "gui-blooper", "interaktion", "interfacedesign", "javascript", "optimierung"]
---
Ich glaube, ich habe jetzt eine Antwort auf meine zwei Monate alte Frage "<a href="http://flyingsparks.wwwfiles.de/2006-03-26/date-time-picker/">Wie sähe ein optimales Datums- oder Zeit-Eingabefeld aus?</a>":

JavaScript-Autocomplete...

Mein ursprünglicher Gedanke war ein einfaches Inputfeld das zu Beginn so aussieht [_00.05.2006_]. Klickt man rein, wird alle markiert. Fängt man an zu tippen, werden die Zeichen von vorn beginnen ersetzt (die Punkte bleiben aber immer stehen), so dass man immer im richtigen Format ist, jedoch Komfort und Geschwindigkeit eines einzelnen Feldes und des Monats- und Jahres-Vorschlages erlebt.

Unglücklicherweise scheint noch niemand auf diese Idee gekommen zu sein, was zu zwei Problemen führt: 1. Finden man kein Script im Netz, 2. könnte das Verfahren für den Benutzer zu ungewohnt sein...

AndyBudds Post über "<a href="http://www.andybudd.com/archives/2006/05/select_box_usability_madness/index.php">Select Box Usability Madness</a>" hat mich jetzt auf eine andere Fährte gebracht: Autocomplete. Für ein Problem wie Andys ist Autocomplete ideal: Ein einfaches Feld und sobald ich "England" eintippe kann das System mit "United Kingdom" reagieren (wenn England unerwünscht ist). Man kann durch das AutoComplete viel mehr Fehlerkorrekturen einbauen und sie vor allem vor dem User verstecken.

Das Gleiche geht auch für Datumsangabe: Zu Beginn steht Grau 00.05.2006 im Feld. Klickt man hinein wird der Text selektiert. Beginnt man zu Tippen, zeigt einem das JavaScript-Autocomplete, wie das Datum in der Form, die man zur Eingabe gewählt hat, aussehen würde. Im besten Fall muss ich so nur 1 Zeichen eingeben (Tag) und kann den Rest aus dem Autocomplete wählen. Für Tag und Monat wären es dann maximal 4 Zeichen (wenn Punkte automatisch gesetzt werden).

In der <a href="http://developer.yahoo.com/yui/autocomplete/">Yahoo-Interface-Library</a> gibt es <a href="http://developer.yahoo.com/yui/examples/autocomplete/ysearch_json.html">ähnliche (textbasierte) Picker zum Test</a> und Download. Genauso <a href="http://demo.script.aculo.us/ajax/autocompleter_customized">bei Script.aculo.us (Beispiel)</a>.

Kombiniert man dieses schnelle tastaturbasierte Verfahren mit einer <a href="http://developer.yahoo.com/yui/calendar/">visuellen Datumsauswahl</a>, kommt jeder Benutzertyp schnell zum Ziel.

<p class="update">Update 06-05-31: Ajax in JavaScript umbenannt. Siehe Kommentare.</p>
