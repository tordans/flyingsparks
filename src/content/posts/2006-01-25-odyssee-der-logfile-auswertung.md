---
title: "Odyssee der Logfile-Auswertung"
pubDate: "2006-01-25T16:17:45.000Z"
updatedDate: "2021-12-27T18:50:40.000Z"
slug: "odyssee-der-logfile-auswertung"
wpPostId: "254"
permalink: "/2006-01-25/odyssee-der-logfile-auswertung/"
visibility: "public"
draft: false
tags: ["Programmierung", "webdesign"]
---
Problemstellung: Ich möchte die Logfiles (m)eines Hosters auswerten, da mir seine Anzeige visuell nicht genügt.

<h3>1. Frage: Welche Software nehmen?</h3>
<ul>
	<li><a href="http://www.analog.cx/">Analog</a> und <a href="http://www.mrunix.net/webalizer/">Webalizer</a> sind OpenSource, die Auswertung reicht mir aber nicht aus.</li>
	<li><a href="http://www.freeware.de/software/Programm_web_6632.html">WebStat</a> ist zwar Freeware und erhält schnell ein Ergebnis aber auch hier ist die Auswertung mäßig.</li>
	<li><a href="http://www.boutell.com/wusage/">Wusage</a> (25 $) scheint recht neu, leider keine Trial. Auch wenn das Demovideo gut aussieht, es gibt OpenSource-Alternativen...</li>
	<li><a href="http://www.rendle.de/software/mescalero_download.html">Mescalero</a> wäre optimal: Man bekommt die Daten schnell rein und hat viele Ausgabemöglichkeiten. Leider mit 99  zu teuer...</li>
	<li><strong>Bleibt <a href="http://awstats.sourceforge.net/">AWStats</a>, das wie die beiden ersten ein Server-Script ist. Es hat eine gute Auswertung und wird häufig empfohlen/verwendet...</strong></li>
</ul>

<h3>2. Frage: Wie AWStats 6.5 installieren?</h3>
Wer sich -- wie ich -- selten mit der Installation solch servernaher Software befasst, mag seine Probleme haben.
Wer lange genug sucht, findet aber zum Glück auch ein passendes Tutorial. Folgendes habe ich gemacht:
<ol>
	<li>Mein altes Xampp deinstalliert, das neue <a href="http://www.apachefriends.org/de/xampp-windows.html#628">Xampp Basis / Win</a> in der Version 1.5.1 installiert. (Über-Installation hat nicht geklappt/ausgereicht)</li>
	<li>Das <a href="http://www.apachefriends.org/de/xampp-windows.html#629">Perl-Add-On für Xampp</a> installiert, denn das Standard-Perl ist nur eine Lite-Version (<a href="http://www.apachefriends.org/f/viewtopic.php?p=39749#39749">Quelle</a>)...</li>
	<li><a href="http://www.apachefriends.org/f/viewtopic.php?p=39563#39563">Aus diesem sehr guten Tutorial</a> die Schritte ab "AWStats Installation" durchgeführt. Wobei ich: <br />1) die Ordner <q>classes, css, icon und js</q> in einen gemeinsamen Ordner "/htdocs/awstats" kopiert habe (in der AWStats-Config muss man entsprechend die Pfade anpassen <br />2) einen gesonderten Ordner "/xampp/logs/MYSITE/" für meine *.log-Dateien angelegt habe (auch hier Config nachziehen) und <br />3) meine Config-Datei im Format <code>awstats.MYSITE.conf</code> gehalten habe. Das hat den Vorteil, dass ihr mehrere configs anlegen könnt...</li>
	<li>Nach dem Tutorial noch <a href="http://www.apachefriends.org/f/viewtopic.php?p=39649#39649">wie im Comment unter 2.) beschrieben</a> den Pfad in <code>awstats.pl</code> korrigiert.</li>
	<li>Per Dos-Commendline getestet, ob alles stimmt: <code>C:\>C:\xampp\xampp\perl\bin\perl.exe C:\xampp\xampp\cgi-bin\awstats\awstats.pl -
config=MYSITE -update</code> <br />Hier gebt ihr jetzt die verschiedenen Config-Umgebungen von oben an.</li>
	<li>Zum Schluss kann man über http://YOURSERVER/cgi-bin/awstats/awstats.pl?config=MYSITE (<a href="http://www.apachefriends.org/f/viewtopic.php?p=41938#41938">siehe auch</a>) die Statistik sehen.</li>
</ol>

/Ende

Jetzt wünschte ich nur noch, AWstats könnte automatisch alle Files aus einem Ordner zur Statistik hinzufügen...
