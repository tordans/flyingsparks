---
title: "fly.ingsparks lebt wieder..."
pubDate: "2009-03-09T18:18:11.000Z"
updatedDate: "2021-12-27T18:50:32.000Z"
slug: "flyingsparks-lebt-wieder"
wpPostId: "626"
permalink: "/2009-03-09/flyingsparks-lebt-wieder/"
visibility: "public"
draft: false
tags: ["flyingsparks", "intern"]
---
<p><strong>Ein Lebenszeichen: flyingsparks</strong> <a href="http://twitter.com/tordans/status/1301422651"><strong>läuft endlich wieder</strong></a><strong>!</strong></p>
<p><strong>Bitte entschuldigt die lange Downtime.</strong> Mein Hoster und ich haben viel ausprobiert aber es erst heute geschafft, die Datenbank wieder zum stabilen Laufen zu bewegen -- zumindest hoffen wir das.</p>
<p>Für die technisch Interessierten: Es bestand irgend ein Bug in SQL im Zusammenhang mit Suse-Installationen und dem Index auf der Datums-Spalte für wp_post.</p>
<p>Wir brauchten beispielsweise nur das folgende SQL-Statement auszuführen um die Datenbank zuverlässig zu crashen =(.</p>
<pre>
<code>SELECT DISTINCT MONTH(post_date) AS month, YEAR(post_date) AS year
FROM wp_posts
WHERE post_date &lt; '2009-03-01'
AND post_type = 'post' AND post_status = 'publish'
<font color="red">ORDER BY post_date DESC</font>
LIMIT 1</code>
</pre>
<br />
<p>Die rote ORDER-Zeile war dabei das Problem. Löschte man sie raus oder änderte die Reihenfolge in ASC, hat es funktioniert. -- Jetzt, ohne Index auf der Datumsspalte läuft es auch. Ich hoffe, nicht spürbar langsamer...</p>
<p>[tags]intern, flyingsparks[/tags]</p>
