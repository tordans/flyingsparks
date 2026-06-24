---
title: "Bestellformulare"
pubDate: "2005-09-29T13:49:55.000Z"
updatedDate: "2021-12-27T18:50:42.000Z"
slug: "bestellformulare"
wpPostId: "184"
permalink: "/2005-09-29/bestellformulare/"
visibility: "public"
draft: false
tags: ["Programmierung", "usability"]
---
Derek Sivers stellt in Frage, was sich bei vielen Bestellformularen als (schlechter) Quasistandard etabliert hat: <a href="http://www.oreillynet.com/pub/wlg/7725">Questioning what's REALLY needed in a system</a>
Er sagt:
<ol>
	<li>Die Rechnungsadresse ist nur nötig, wenn man mit Kreditkarte bezahlt. Nicht aber beispielsweise bei einem Geschenkgutschein o.ä. Folglich erst die Zahlungsart abfragen.</li>
	<li>Postleitzahlen, Bundesstaaten u.ä. gibt es nicht in jedem Land. Folglich erst das Land abfragen und entsprechend darauf reagieren.</li>
	<li>Registrierung (Passwortabfrage) ist nur dann interessant, wenn Kunden mehrmals in einem Shop einkaufen gehen. Statistisch sind aber nur 15% der Käufer "Wiederholungstäter". Und ich behaupte, dass und diesen noch einige sind, die sich anschl. nicht mehr an ihr Passwort erinnern können. Folglich erst einmal das Produkt verschicken und im letzten Schritt erst fragen, ob man einen Account anlegen möchte.</li>
	<li>Die erste Zahl einer Kreditkartennummer verrät, welchem Anbieter sie gehört. Das wusste ich auch noch nicht. Folglich ist es klar, dass man sie die gesonderte Eingabe des Anbieters überspringen kann.</li>
	<li>Und aus den Kommentaren:<br />Geheimfragen wie der Geburtsname der Mutter sind quatsch. Passwörter sollten einfach auf Anfrage per eMail verschickt werden.</li>
</ol>

Heute habe ich wieder einen ganzen Tag damit verbracht in meiner Ruby On Rails-Demoapplication ähnliche Dinge abzufangen -- es geht ohne Probleme. Ich frage mich, warum so viele Unternehmen einer so zentralen Sache wie dem Bestellvorgang so wenig Beachtung schenken.
