---
title: "10 Punkte die Flickr erfolgreich machen (+ Clean URLs)"
pubDate: "2007-03-29T08:24:00.000Z"
updatedDate: "2021-12-27T18:50:35.000Z"
slug: "10-punkte-die-flickr-erfolgreich-machen-clean-urls"
wpPostId: "515"
permalink: "/2007-03-29/10-punkte-die-flickr-erfolgreich-machen-clean-urls/"
visibility: "public"
draft: false
tags: ["ajax", "api", "flickr", "foto", "startup", "url-design", "vortrag", "web2.0"]
---
<p class="update">Vorab: Dieses Posting habe ich schon im März in einem internen Blog geschrieben und füge es jetzt der Vollständigkeit und einfachen Verlinkung wegen zu den flyingsparks hinzu.</p>

Auf der <strong>Future Of Webdesign-Konferenz</strong> letztes Jahr sprach Cal Henderson (Flickr) über die 10 Punkte, die Flickr erfolgreich macht.

Sein <a href="http://www.webuser.co.uk/carsonworkshops/CalHenderson.mp3"><strong>40-Minuten-Vortrag</strong> (MP3)</a> gibt einen sehr interessanten Einblick in die Hintergründe, die Flickr zu einem der erfolgreichsten Fotodienste im Web gemacht hat.

Es gibt eine Reihe an Posts im Web, die Teile de Vortrags zusammenfassen. <a href="http://simon.incutio.com/notes/2006/summit/henderson.txt">Eine besonders gute Zusammenfassung wurde von Simon Willison erstellt.</a>

—-

Hervorheben möchte ich ein immer noch und immer wieder wichtiges Thema: URL-Design. <strong><a href="/wp-content/uploads/Cal Henderson - The Future of Web App.mp3">Ab Minute 14:30 geht es los (MP3)</a>.</strong>

Hier, was Willison aus Hendersons Vortrag zum <strong>Thema Clean URLs</strong> notiert hat:
<blockquote>Core principle: there’s no reason to expose the guts of our application any more. Expose the logical structure instead. The core to this on Unix is to use mod_rewrite and Apache. URLs are not filenames - they don’t have to point to something on the filesystem. mod_rewrite lets you translate incoming URLs to whatever you need for the thing to work.

Power geeks navigate by hacking the URL. Guessability matters. Downside: you might forget to link to things as the application designer!

When Flickr started, made some bad URL decisions (e.g. link to the actual photo file). Originally was flickr.com/photos/12.jpg - really hard to scale.

You have to support the old style URLs for ever. Lesson learnt the difficult way.</blockquote>
Und außerdem sei das Thema API noch hervorgehoben:
Meine Stichworte aus dem Vortrag (ca 11. Minute)
<ul>
	<li>Ursprünglich gebaut, weil man für AJAX-Interfaces ohnehin bestimmte Anfragen ständig brauchte.</li>
	<li>Einer der ersten die eine API veröffentlicht haben</li>
	<li>Read-Only — schon ein sehr wertvoller Dienst (maschinenlesbare Ausgabe)</li>
	<li>Flickr entwickelt sich zu einem Datenspeicher für Fotos; andere bauen die Ausgabekanäle und Interfaces drumherum (TJ: vgl. auch Facebook etc)</li>
	<li>Beispiel: Das Spiel namens Faster (oder so), das auf der API aufbaut, wäre von Flickr nie gebaut worden, weil es nicht dem Kern der Netzapplikation entspricht, nicht skalieren würde und zu teuer im Support ist. Bei dem Spiel werden Fotos gezeigt und man muss den zugehörigen Tag erraten. Aber da Flickr die API zur Verfügung stellt, haben sich Leute gefunden, die es gebaut haben “but its really cool” und Flickr profitiert von der generierten Aufmerksamkeit und den gesteigerten Sign-Ups</li>
	<li>Denkfehler: Keine API zur Verfügung zu stellen bedeutet nicht, dass Leute nicht probieren werden, an die Daten zu kommen. Sie werden jedoch wesentlich unangenehmere Wege wählen und beispielsweise die Website grabben…
Mit einer API hat man selbst Kontroll über die Anfrage und bestärkt Leute, selbst etwas auszuprobieren…</li>
</ul>
<p class="update">Die ursprüngliche URL http://www.webuser.co.uk/carsonworkshops/CalHenderson.mp3 ist leider nicht mehr verfügbar. Ich habe mein Backup bei mir bereit gestellt.</p>
