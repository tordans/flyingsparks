---
title: "Warum verstecken wir alle den Datepicker?"
pubDate: "2007-06-12T16:21:47.000Z"
updatedDate: "2021-12-27T18:50:34.000Z"
slug: "warum-verstecken-wir-alle-den-datepicker"
wpPostId: "465"
permalink: "/2007-06-12/warum-verstecken-wir-alle-den-datepicker/"
visibility: "public"
draft: false
tags: ["37signals", "benutzereingabe", "datum", "gui", "interaktion", "interfacedesign", "javascript", "optimierung"]
---
<p>Ich fühle mich schon ein bisschen vorgeführt, wenn ich im <a href="http://37signals.blogs.com/products/2007/06/improved_date_p.html">37signals-Produktblog</a> eine so einfache und bisher unerreicht schnelle Lösung für das schnelle Eingeben von Datumwerten sehe:</p>
<p>Den Datepicker-Kalender einfach nicht verstecken sondern immer anzeigen... -- genial einfach :-). </p>
<p align="center"><a href="http://37signals.blogs.com/products/2007/06/improved_date_p.html"><img height="260" alt="datumsauswahl in basecamp" hspace="2" src="/wp-content/uploads/datumsauswahlinbasecamp.png" width="550" vspace="2" /></a></p>
<p>Warum sieht man das eigentlich zum ersten Mal? Sicher auch, weil kaum ein Interface so reduziert konzipiert wird, wie bei 37signals. Dann kann man es sich auch mal leisten, für eines der wichtigen Formularelemente etwas mehr Platz zu nutzen.</p>
<p>Nebenbei: Meine eigenen Ideen mit JavaScript-Spielchen <a href="http://fly.ingsparks.de/2006-05-31/ajax-datumsauswahl/">die textbasierte Eingabe zu beschleunigen</a>, habe ich leider immernoch nirgends umgesetzt zu sehen. Das wäre im Übrigen auch der <strong>wichtige Verbesserungsschritt</strong>, den ich jetzt im Basecamp-Interface sehe: Den "Due: June 12, 2007"-Text durch ein <strong>Inputfeld</strong> zu ersetzen, in dass man auch per Hand Daten reinschreiben/-pasten kann.</p>
<p><strong>Und wenn man dafür keinen Platz hat?</strong></p>
<p>Auch dann kann man die Klick-Arbeit und -Zeit noch reduzieren. Yahoo hat nämlich ebenfalls mit einer Quasi-Konvention gebrochen und zeigt die Datumsauswahl nicht "OnClick auf Button" <a href="http://developer.yahoo.com/ypatterns/pattern.php?pattern=calendar">sondern "OnFocus in Textfeld"</a> an. Wieder einen Klick und damit 10.000 $ pro Jahr gespart, wie Jacob Nielsen sagen würde ;-).</p>
<p align="center"><a href="http://developer.yahoo.com/ypatterns/pattern.php?pattern=calendar"><img height="210" alt="datepicker bei yahoo yui" hspace="2" src="/wp-content/uploads/datepickeryahoo.png" width="341" vspace="2" /></a></p>
<p>Im Übrigen ist der <a href="http://developer.yahoo.com/yui/calendar/">Yahoo-Kalender</a> auch sonst sehr gut optimiert und damit sogar dem <a href="http://www.dynarch.com/projects/calendar/">OpenSource-Quasi-Standard</a> vorzuziehen.</p>
<p>PS: Zum Schluss noch etwas <a href="http://www.smileycat.com/miaow/archives/calendar-date-picker-showcase.php">Visuelles</a> und <a href="http://www.frequency-decoder.com/2006/10/02/unobtrusive-date-picker-widgit-update/">Technisches</a> für Interessierte.</p>
<p>[tags]javascript, gui, benutzereingabe, datum, interaktion, interfacedesign, optimierung, 37signals[/tags]</p>
