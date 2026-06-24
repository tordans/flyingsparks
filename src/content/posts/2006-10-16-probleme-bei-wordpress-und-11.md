---
title: "Probleme bei WordPress und 1&1"
pubDate: "2006-10-16T08:16:17.000Z"
updatedDate: "2021-12-27T18:50:36.000Z"
slug: "probleme-bei-wordpress-und-11"
wpPostId: "400"
permalink: "/2006-10-16/probleme-bei-wordpress-und-11/"
visibility: "public"
draft: false
tags: ["datenbank", "hosting", "php", "problem", "Programmierung", "scoutpress", "server", "sql"]
---
<p>Zuletzt habe ich eine WordPress- bzw. <a href="http://www.scoutpress.de/">ScoutPress</a>-Instanz auf einem 1-und-1-Server aufgesetzt und war sehr verwundert über die Probleme, die ich dabei hatte:</p>
<ol>
<li>Die PHP-Funktion <strong>header("Location:</strong> ...domain...") funktioniert nicht. Dies kann man -- wie <a href="http://blog.scoutpress.de/2006/installation-bei-11/">im ScoutPress-Blog schon beschrieben</a> -- umgehen.</li>
<li><strong>mod_rewrite</strong> macht Probleme. Eventuell ein Folgefehler des 1. Header-Problems. Ich musste mod_rewrite ausschalten...</li>
<li><strong>Die Datenbankzugriffe sind zum Teil unglaublich langsam.</strong><br />
Zum Vergleich: 
<ol>
<li>localhost &lt;!-- 45 queries. 0.617 seconds. --&gt;</li>
<li>1 und 1 gestern &lt;!-- 43 queries. 8.962 seconds. --&gt;</li>
<li>1 und 1 gestern &lt;!-- 44 queries. 22.323 seconds. --&gt;</li>
<li>1 und 1 heute &lt;!-- 43 queries. 0.419 seconds. --&gt;</li>
<li>1 und 1 heute &lt;!-- 43 queries. 25.865 seconds. --&gt;<br />
und direkt danach wieder &lt;!-- 43 queries. 2.138 seconds. --&gt;</li>
<li>dpsg-langerwehe.de &lt;!-- 148 queries. 3.218 seconds. --&gt; (*)</li>
<li>pfadiblog.de &lt;!-- 37 queries. 8.500 seconds. --&gt;</li>
<li>fly.ingsparks.de &lt;!-- 375 queries. 1.637 seconds. --&gt; (*)</li></ol></li></ol>
<p>Zur Zeit kann ich 1&amp;1 daher leider nicht mehr empfehlen. Ich hoffe, die Performance verbessert sich wieder!</p>
<p>*) Die Hohe Anzahl DB-Zugriffe kommen durch das Timeline-Plugin zustande das dringend überarbeitet werden muss damit es seine Ausgabe cacht&lt;<a href="http://www.google.de/search?hs=rGN&amp;hl=de&amp;client=firefox-a&amp;rls=org.mozilla%3Ade%3Aofficial&amp;q=%22%3Csp%3F%3E%22+emoticon+spelling&amp;btnG=Suche&amp;meta=">sp?</a>&gt;.</p>
<p>[tag]server,programmierung,scoutpress,hosting,problem,datenbank,php,sql[/tag]</p>
