---
title: "Google Wave wird Dateien abschaffen (Notizen vom Wave Hackathon)"
pubDate: "2009-08-02T21:33:48.000Z"
updatedDate: "2021-12-27T18:50:32.000Z"
slug: "google-wave-hackathon"
wpPostId: "674"
permalink: "/2009-08-02/google-wave-hackathon/"
visibility: "public"
draft: false
tags: []
---
An diesem Wochenende haben Alex, Tim, Siggi und Jay zum Google Wave Hackathon in Düsseldorf <a href="http://www.werbeblogger.de/2009/07/31/in-eigener-sache-einladung-zum-google-wave-hackathon-in-duesseldorf/">eingeladen</a>. Herausgekommen ist dabei nicht nur ein Google Wave-Testaccount für alle Teilnehmer sondern auch zwei Tage voller spannender Diskussionen rund eine neue Technologie voller Potential: Google Wave (<a href="http://wave.google.com/help/wave/about.html">Screenshots</a>, <a href="http://www.youtube.com/watch?v=v_UyVmITiYQ">Einführungs-Video</a>).

<img class="aligncenter size-full wp-image-684" title="google-wave-logo" src="/wp-content/uploads/google-wave-logo.png" alt="google-wave-logo" width="256" height="256" />

In diesem Blogpost findet ihr eine lange Liste an <strong>Notizen</strong>, die ich im Nachgang zu unseren Diskussionen eben erstellt habe -- darunter auch die Erklärung zum Blog-Titel :-).
Sie stammen allesamt <strong>aus dem Austausch mit Tim, Siggi, Jay und Lydia</strong>.

Wir hatten uns in dieser kleinen Gruppe zurückgezogen, wärend die anderen Teilnehmer sich am Wave-Code versuchten und in den zwei Tagen einen Prototypen programmiert haben, der Daten aus einer Wave ausließt, an einen Webservice übergibt, zurück in die Wave schreibt und dort über einen Robot in einem Gadget wieder darstellt. Die Wave-API scheint wirklich einiges herzugeben und einfach zu verwenden zu sein.

Rainald <a href="http://www.schueckens.net/index.php/archives/wave-hackathon-in-duesseldorf/2009/08/02/">hat uns übrigens porträtiert</a> während dieser Zeit -- ihr seht, wir haben intensiv diskutiert und nachgedacht, nicht nur gegrillt ;-).

<div class="legacy-embed" role="note"><p><strong>Eingebetteter Flash-Inhalt</strong> (picasaweb.google.de) — dieser Player existiert nicht mehr.</p><p>Original: <a href="http://picasaweb.google.de/s/c/bin/slideshow.swf" rel="nofollow noopener">http://picasaweb.google.de/s/c/bin/slideshow.swf</a> · <a href="https://web.archive.org/web/2010/http://picasaweb.google.de/s/c/bin/slideshow.swf" rel="nofollow noopener">archive.org</a></p></div>
<h2>Google Wave ist an erster Stelle ein Kollaborations-Tool (Was ist Google Wave?)</h2>
<ul>
	<li>Kollaboration ist nichts      Neues. Viele Programme behaupten, dass sie dieses Alltagsproblem lösen und      Google hat mit Google Docs eines der wichtigsten beigetragen.</li>
	<li>In Wave hat Google aber eine      bisher noch ungesehene und technisch beeindruckende Sammlung von Tools      zusammengestellt, die Kollaboration begünstigen: Instant Feedback durch      das Live-Typing mit sehr gutem visuellen Feedback welcher Autor gerade wo      arbeitet, automatische Versionierung der Inhalte, Playback-Funktion zum      Änderungen nachvollziehen zu können, Kommentare und Inline-Kommentare sind      glaube ich die wichtigsten.</li>
	<li>Google Wave ist dabei anders      als eMail: Man etwas nichts ab ("kopiert" es auf einen anderen      (Mail)server), sondern lädt jemand ein bzw. fügt ihn hinzu, damit er an      etwas mitarbeiten kann.</li>
	<li>Google Wave ist auch kein      Chat-Tool -- auch wenn die Übertragung jedes Tastendrucks das vermuten      lässt und es gerne erzählt wird. Chatten funktioniert in Wave aber zur      Zeit garnicht weil das nötige Pattern (ein Eingabefeld das Nachrichten zu      einer zeitlich sortierten Liste hinzufügt) im Interface überhaupt nicht      abgebildet wird. (Es könnte allerdings zukünftig problemlos Chatmodus für      Blibs (Wave-Elemente) entwickelt werden.)</li>
</ul>
<h2>Was macht Google Wave so interessant?</h2>
<ul>
	<li>Google Wave hat das Potential      die Alltagskommunikation wie wir sie zur Zeit kennen, völlig zu verändern.</li>
	<li>Wave kann Dateien überflüssig      machen
<ul>
	<li>Der aktuelle Workflow im       Berufsalltag sieht so aus, dass wir in Worddokumente Texte schreiben,       Zahlen in Excel packen, Wireframes in Visio/Axure/… und Bilder in       Photoshop bearbeiten.</li>
	<li>Diese Dateien speichern wir       auf einem Fileserver, versionieren sie durch Dateinamen und schicken sie       zwischendurch wild in der Gegend herum, erzeugen Kopien, verändern sie       und mergen sie anschließend mehr oder minder aufwändig zu einem Dokument       das dann ausgedruckt und bspw. unterschrieben wird.</li>
	<li>Wave gibt uns die       Möglichkeiten, völlig anders zu arbeiten: Für all die Dokumententypen       legen wir immer eine Wave an. Alle die mitarbeiten, werden eingeladen. In       der Wave entsteht der Text. Für spezielle Inhaltsbereiche wie Wireframes,       Datenbanken/Tabellen, Bilder werden Wave-Gadgets eingebunden die wie eine       eingebettete GoogleMap zwischen dem Text stehen. Die Gadgets bieten einem       zusätzliche Tools für die Arbeit an den Spezialproblemen (Wireframe,       Tabellenauswertung, Bildbearbeitung, …).</li>
	<li>Während des gesamten       Prozesses wird jede Version automatisch gespeichert. Diskussionen können       mit allen Teilnehmern oder "privat" in Kleingruppen geführt       werden.</li>
	<li>Am Ende wird ein Snapshot       der Wave erstellt und das Dokument ist abgenommen.</li>
	<li>Voraussetzung dafür ist       natürlich neben einigen anderen Verhaltensänderungen, dass wir technisch       und gesellschaftlich bereit sind, Verträge, Abnahmen, ... nur noch       digital zu unterzeichnen.</li>
</ul>
</li>
</ul>
<ul>
	<li><strong>Wave kann Office-Programme an      sich überflüssig machen </strong>
<ul>
	<li>Betrachtet man den oben       skizzierten Workflow, kommen darin Programme, wie wir sie jetzt<span> kennen, nicht mehr vor. Aus       informationsarchitektonischer Sicht wird der Knotenpunkt gewechselt:
<ul>
	<li>Excel --&gt; test.xls --&gt;        Serverversionierung
wird zu</li>
	<li>Waveversionierung --&gt;        Test-Wave --&gt; Excel-Modul/-Gadget
Das bekannte Feature-System        wird also einmal umgedreht.</li>
</ul>
</span></li>
</ul>
<ul>
	<li>Wem bei diesem Beispiel       "Archy" (alias THE <a href="http://en.wikipedia.org/wiki/Archy">http://en.wikipedia.org/wiki/Archy</a>) einfällt, der ist an       dieser Stelle wahrscheinlich genauso gespannt wie ich: Könnte das etwa       der Weg zum Betriebssystemlosen Computer sein? -- Vielleicht. Aber auch       wenn Wave Fileserver und Office-Dateien wahrscheinlich überflüssig macht,       funktioniert das Gedankenspiel bei Computerspiel-Programmen schon wieder       nicht mehr. Es sei den, man geht davon aus das auch diese bald nur noch       im Browser online stattfinden. Dann bräuchte es nur Wave und Websites,       also nur einen Browser. Hier wären wir dann bei Google Chrome OS       angelangt und der Kreis schließt sich wieder.</li>
	<li>Aber zurück zu Wave und       einem anderen Beispiel:</li>
</ul>
</li>
</ul>
<ul>
	<li><strong>Ich wünsche mir Wave zum      konzipieren…</strong>
<ul>
	<li>Schon seit der       Wave-Einführung auf der Google I/O wünsche ich mir Wave als       Konzeptionstool. Denn auch wenn schon seit vielen Jahren Websitekonzepte       gemacht werden, ist gerade das Problem der Kollaboration (in der       einfachsten Form Feedback-Schleifen mit dem Kunden) für mich nicht sauber       gelöst.</li>
	<li>Hier sei als Beispiel einer       von vielen möglichen Konzeptionsprozessen skizziert und dann mit einem       möglichen Wave-Prozess verglichen:</li>
	<li>Aktueller       Konzeptionsprozess:
<ul>
	<li>Wir schreiben        Grundsatzkapitel zum Konzept in Word</li>
	<li>Dann werden Skizzen per        Hand gemacht, vielleicht besprochen</li>
	<li>und in einem        Wireframing-Tool umgesetzt</li>
	<li>Entweder man kopiert dann        die Skizzen in Word um sie mit guten Text-Tools zu annotieren… oder man        kopiert den Text ins Wireframing-Tool. Beide Methoden sind suboptimal.</li>
	<li>Die einzelnen Kapitel,        meist aber das ganze Dokument werden dann intern und vor allem mit dem        Kunden gereviewed. Bei der Word-Variante kann man dabei die        Word-Überarbeiten-Tools nutzen. Für einen richtigen Diskurs übers        Konzept ist das aber auch nur eine Krücke.</li>
	<li>Mit der Abnahme wird das        Konzept dann eingefroren und an die Entwicklung übergeben.</li>
	<li>Die wiederum erstellt unter        Umständen ihr eigenes, technisches Konzept und macht das gleiche Spiel        wieder durch.</li>
</ul>
</li>
</ul>
<ul>
	<li>Wave-Konzeptionsprozess:
<ul>
	<li>Mit Wave könnte das alles        besser sein :-). Wir erstellen eine Master-Wave die auf viele andere        Waves (Kapitel) verlinkt.</li>
	<li>Die einzelnen Waves können        Text und Wireframes enthalten. Die Wireframes werden aber direkt in der        Wave editiert. Zum Beispiel mit Tool wie Balsamic (<a href="http://www.balsamiq.com/">http://www.balsamiq.com/</a>) bzw. ihren hoffentlich        besseren Nachfolgern.</li>
	<li>Kollegen können dabei        problemlos in der Wave gemeinsam arbeiten und sich gegenseitig        verbessern.</li>
	<li>Einzelne Kapitel können        asynchron zur Freigabe und Diskussion an andere Gewerke oder den Kunden        gegeben werden. Der Status kann durch Status-Gadgets in der Wave        festgehalten werden. Und man bräuchte eine neue Wave-Funktion für        Snapshots "diese Version wurde so abgenommen".</li>
	<li>Die Inline-Kommentare und        das gemeinsame Editieren am Haupttext sind dabei zwei hervorragende        Funktionen um schnell ein gutes und für alle verständliches Ergebnis zu        erzielen.</li>
	<li>Darüberhinaus kann man        jetzt endlich die Trennung zwischen Konzept, Design, Technikkonzept und        Dokumentation auflösen: Zu einem Kapitel "Startseite" bspw.        können drei Wave-Bereiche existieren. Einer fürs Wireframe, einer fürs        Design und einer für die technische Konzeption.</li>
	<li>Für die wirksame Arbeit        bräuchte man dann wahrscheinlich Filter-Methoden um Waves die mit        "Technikkonzept" getaggt sind je nach Bedarf auszublenden.</li>
	<li>Am Ende hat sich das        Konzept in eine Dokumentation verwandelt. Wissensmanagement ist also        inbegriffen :).</li>
</ul>
</li>
</ul>
<ul>
	<li>Diese Beschreibung hat       bestimmt viele Lücken und Probleme und Wave muss noch ein paar Funktionen       hinzubekommen, um so einen Prozess wirklich abdecken zu können. Auch       müssen wir unser Verständnis von Konzepten ändern, damit wir wirklich       akzeptieren, dass das Konzept nur ein Prozess hin zum fertigen Produkt       ist und als eigenes Objekt nicht wirklich aufbewahrt werden muss (über       die Playback-Funktion kann man es immer wieder "herausholen").       Insgesamt sehe ich aber ein sehr großes Potential in Wave.</li>
	<li><strong>Exkurs zu Useraccounts:</strong> Wer       übrigens bei diesen Beschreibungen denkt, dass wir ähnliches auch in       Sharepoint und anderen DMS haben… -- Uns ist beim Wave-Hackathon ein       interessanter Unterschied aufgefallen: Um gemeinsam mit bspw. einem       Kunden an einem Dokument zu arbeiten, dass in Sharepoint abgelegt ist,       gibt man heute dem Kunden einen Zugang zum Sharepoint. Wave müsste hier       anders vorgehen: Sowohl Kunde als auch Agentur müssten Waveserver laufen       haben, um eine Zusammenarbeit zu ermöglichen. Oder aber, man würde       externe Wave-Accounts auf dem Agentur-Waveserver erstellen… -- Ein       Szenario, dass ich so bei Wave noch nicht gehört habe.</li>
</ul>
</li>
</ul>
<h2>Das Interface von Wave muss sich weiterentwickeln!</h2>
<ul>
	<li>Das Interface von Wave, das      Google zur Zeit allen als <strong>Demoanwendung</strong> zeigt, ist sehr klug gemacht: Man      hat bewusst die Anordnung von Office kopiert um den Einstieg in ein System      zu erleichtern das fast wie eMail ist aber doch ganz anders.</li>
	<li>Betrachtet man aber die      Wave-Anwendungsfälle die ich oben mit Blick auf die Dokumentenformate      beschreibe, <strong>muss sich das UI noch stark weiterentwickeln. </strong>Hauptsächlich      geht es dabei um Platz und schnelle Interaktion, vor allem für den Wechsel      zwischen Waves (aka Programmen).
<ul>
	<li>Zur Zeit kann ich mit       Alt-Tab oder über die Taskleiste sehr schnell zwischen Programmen       wechseln -- eine der wichtigsten Funktionen des Betriebssytems.</li>
	<li>Wave dagegen existiert zur       Zeit hauptsächlich in einem Tab und versucht dort möglichst sinnvoll       Platz zu schaffen.</li>
</ul>
</li>
</ul>
<ul>
	<li>Kurzfristig kann die Lösung      sein, Waves einfach in neuen Festern und neuen Tabs zu öffnen um darüber      schnell zwischen ihnen wechseln zu können.</li>
	<li>Visionärer gesehen könnte      Wave aber eines der ersten Interfaces sein, bei dem <strong>ZUI-Metaphern</strong> (<a href="http://de.wikipedia.org/wiki/ZUI">http://de.wikipedia.org/wiki/ZUI</a>) und Interfaces und die die      Räumliche Anordnung von Elementen sinnvoll angewendet werden.
<ul>
	<li>ZUI für Wave: Das beste       Beispiel ist der Wechsel von einer Wave die text mit Gadgets (wie einem       Excel-Gadget) enthält hin zur Editieransicht des Excel-Gadgets. Hier       macht ein ZUI sehr viel Sinn um schnell und verständlich zu einem neuen       Screenzustand zu gelangen, der einem neue Tools auf voller Fläche bietet       (und wieder zurück).</li>
	<li>Räumliche Anordnung von       Elementen: Das Thema beschreibe ich unten ausführlicher aber vereinfacht       gesagt: Ich habe meine RSS-Reader-Waves, meine Office-Intern-Waves, meine       Kunden-Waves in denen (ZUI) auch meine Kundenprojekt A-Waves liegen und       kann all diese Gruppen auf einer räumlichen Fläche anordnen, so dass ich       sie leicht wiederfinde. Oben Rechts sind die Kunden-, Links unten die       RSS-Reader-Waves etc.</li>
</ul>
</li>
</ul>
Danke an dieser Stelle <a href="http://blog.bruysten.com/2009/07/31/wave-hackathon-in-dusseldorf/">insbesondere an Tim</a> für den Austausch und die Anregung zu diesen Gedanken.
<h2>War das schon alles?</h2>
<ul>
	<li>Nein ;).</li>
	<li>Neben all diesen Themen haben      wir auch noch darüber nachgedacht, dass <strong>Waves in Unternehmen feste      Hierarchien</strong> brauchen um wiedergefunden werden zu können. Man braucht ein      Pendant zum Intranetstrukturbaum Projektmanagementtipps oder      Konzeptrichtlinien… Diese Waves müssen für alle Mitarbeiter auf die      gleiche Weise auffindbar sein, damit auch analog darauf verweisen kann      (Telefon: "Schau in der Sammlung X nach die unter Y liegt").</li>
	<li>Gleichzeitig braucht es <strong> persönliche Navigationsmechanismen</strong> wie <strong>favorisierte Waves</strong> (Stern-Funktion)      und eigene Hierarchien (wie hierarchische Browser-Favoriten).</li>
	<li>Das ganze <strong>Playback</strong>-Thema hat      noch viel Potential um bspw. Szenarien wie das Nachbereiten der letzten      Wochen nach dem Urlaub abzudecken.</li>
	<li>Außerdem gibt es eine Reihe      an Funktionen, die meiner Ansicht nach nicht über Robots oder Gadgets in      Waves eingebunden werden können, sondern nativ unterstützt werden sollten.      Eines hat Google schon eingebaut: Ein Adressbuch das Kontaktverwaltung      erlaubt. Weitere ist ein Kalender-Tool mit Zusage-Absage-Funktion, eine      Apple-Mail-Artige Verknüpfung von Waves mit einem ToDo-System und ein      Note-System mit dem man sich Textpassagen zur späteren Bearbeitung merken      kann.</li>
</ul>
Jetzt wäre es natürlich toll, wenn ihr im Wave-Stil eure Kommentare und Korrekturen direkt in den Artikel schreiben könntet. Da das aber nicht geht, freue ich mich über Gedanken in den Kommentaren.
