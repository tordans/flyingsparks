---
title: "Das Feuer brennt höher"
pubDate: "2005-06-25T07:49:32.000Z"
updatedDate: "2021-12-27T18:50:43.000Z"
slug: "das-feuer-brennt-hoher"
wpPostId: "120"
permalink: "/2005-06-25/das-feuer-brennt-hoher/"
visibility: "public"
draft: false
tags: ["informationsdesign", "interfacedesign", "weblog"]
---
Vor sechs Monaten habe ich das Feuer dieser Seite entfacht. Seit dem sind schon 120 Funken in die Netzwelt hinausgeflogen.
Und doch gibt es noch einige große Baustellen. Einige wichtige Grundsatzfunktionen und -artikel sind noch nicht eingebaut bzw. geschrieben.
Jetzt ist ein nächster großer Schritt getan: flyingsparks bewegt sich langsam <a href="http://www.37signals.com/svn/archives/000972.php">aus der Gemeinde der Beta-Sites</a> heraus:
Heute geht eine Beta-Version :-) der interaktiven Kopfgrafik online.
Es folgt eine Beschreibung der realisierten und geplanten Funktionen.
<!--more-->
<h3>Die Grundidee von Flyingsparks</h3>
<strong>Assoziationen:</strong> Funkenflug, Feuer-Funken, das Weiterreichen von etwas, Entzüden, der Funke springt über, verlöschen, temporär, aufflammen & verbrennen, ausbrennen, Wunderkerze, Asche, ...

<strong>Systematik:</strong> <em>Weblog-Beiträge (Postings) sind Funken, jeder Kommentar auch.</em>
Funken verglühen mit der Zeit (werden dunkler, fallen zu Boden). Ähnlich ist es auch mit Weblogbeiträgen: Nur die aktuellen Beiträge werden beachtet, alte fallen ins virtuelle Archiv.
<blockquote>Oliver Wrede frei zitiert zu Weblogs: Weblogs definieren sich durch ihre aktuellen Beiträge. Werden keine Beiträge mehr geschrieben, verwandelt (reduziert) sich ein Weblog in ein digitales Archiv.</blockquote>

<h3>Grundkonzept der Kopfgrafik</h3>
<h4 class="nachh3">bereits realisiert:</h4>
<ol>
	<li>Postings = Funken -- je mehr Postings, desto mehr Funken</li>
	<li>Funken haben eine Lebensdauer. Die Kopfgrafik zeigt derzeit die letzten 50 Postings an.</li>
	<li>Frische Funken (neue Beiträge) sind nah am Feuer, alte Beiträge entfernen sich (derzeit werden die letzten 50 Beiträge angezeigt). Die Höhe der Funken wird derzeit per Zufallszahl ermittelt.</li>
	<li>Jeder Funken im Bild enthält Informationen (u.a. einen Link) zum Weblogbeitrag (Funktion ist noch nicht richtig ausgearbeitet)</li>
</ol>
<h4>noch nicht realisiert / Planung & Ideen</h4>
<ol>
	<li><del datetime="2006-02-15T10:07:10+00:00">Fotografierte Funken haben eine Flugbahn. Die Headergrafik soll eine simulierte Fotografie sein.</del></li>
	<li>Funken verglühen = werden dunkler je älter sie sind.</li>
	<li>Funken können gefilter werden. <del datetime="2006-02-15T10:07:10+00:00">Die</del> Checkboxen <del datetime="2006-02-15T10:07:10+00:00">unter dem Beta-Banner (rechts)</del> sollen die Funken automatisch filtern können. Aus Platzgründen werden hier nur die Kategorien mit den meisten Beiträgen dargestellt.</li>
	<li>Kommentare + Trackback (Möglichkeit 1): Beide zusammen beeinflussen die Flughöhe der Funken. Je mehr, desto höher.</li>
	<li>Kommentare (Möglichkeit 2):  Beieinflussen die Leuchtkraft und Größe eines Funken</li>
	<li>Idee: Feuer wird von Wetter beeinflusst. Man könnte die Flugbahnen entsprechend verändern.<a href="http://www.weatherunderground.com/global/stations/10501.html"> XML-Daten dafür gibt es</a> (ungetestet).</li>
	<li>Idee: Feuer wird durch Brennstoff (Holz) genehrt: Es könnte zwei Stapel Holz geben, einen Vorratsstapel und das Feuer selbst. Lege ich Holz aus dem Vorrat in das Feuer wird dieses größer. Es werden entsprechend mehr Funken produziert (= der angezeigte Zeitinterfall wird größer). Und andersrum.</li>
</ol>

<h3>bekannte Fehler</h3>
<ol>
	<li>Hin und wieder werden alle Funken links im Bild positioniert. Dann wurde die Konfigurations-XML-Datei nicht geladen -- ich arbeite daran.</li>
	<li><del datetime="2006-02-15T10:07:10+00:00">Der "mehr"-Link funktioniert noch nicht und auch einen "Homepage"-Link gibt es noch nicht. Bitte nutzt in der Zwischenzeit den Link "Startseite" in der rechten Spalte.</del></li>
	<li><em>Fällt euch noch etwas auf?</em></li>
</ol>



<h3>Technik & Dank</h3>
Schon jetzt mein Dank an <a href="http://banglashi.com/">Daniel</a> und <a href="http://blog.bruysten.com/2005/">Tim</a> für die Hilfe bei der Flashrealisierung. Und <a href="http://www.aundm.com/">Matthias</a>, <a href="http://www.andreas-steffens.de/">Andreas</a> und Tim für die mit PHP.
Eine unersetzliche Hilfe waren auch <a href="http://www.gotoandlearn.com/">die Flashtutorials von gotoandlearn</a> und die <a href="http://www.php.net/manual/de/">PHP.net-Hilfe</a>.

Ideen & Kommentare zu allem erwünscht! :-)

To be continued!
