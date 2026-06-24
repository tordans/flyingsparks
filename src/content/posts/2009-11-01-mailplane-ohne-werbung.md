---
title: "Mailplane ohne Werbung"
pubDate: "2009-11-01T11:42:54.000Z"
updatedDate: "2021-12-27T18:50:31.000Z"
slug: "mailplane-ohne-werbung"
wpPostId: "724"
permalink: "/2009-11-01/mailplane-ohne-werbung/"
visibility: "public"
draft: false
tags: ["email", "firefox", "tutorial"]
---
In Firefox kann man die Werbung in Google Mail mit Adblock Plus oder einen Greasemonkey Script ausblenden.

In Mailplane dagegen gibt es diese Möglichkeit (noch) nicht.

Aber es gibt einen Workaround: Einfach ein Custom Stylesheed hinzufügen, das die Ads ausschaltet.

<strong>Das Stylesheet:</strong>

Ihr könnt es natürlich selbst basteln... aber warum sich die Arbeit machen, wenn die Jungs von <a href="http://userscripts.org/scripts/show/37693">"GMail Without Ads!" auf userscripts.org</a> schon super CSS-Code gebaut haben?

Meine Datei heißt "Mailplane no Ads.css" und liegt im Programme Ordner am Mac direkt unter der Mailplane.app.<code>
/*
Quelle:
http://userscripts.org/scripts/show/37693
bzw. http://userscripts.org/scripts/source/37693.user.js
*/
table.iY &gt; tr &gt; td:first-child + td &gt; div { width: auto !important } table.iY &gt; tr &gt; td:first-child + td + td &gt; div { width: 0 !important; position: relative !important; font-size: 85% !important; } table.iY &gt; tr &gt; td:first-child + td + td &gt; div &gt; div { position: absolute !important; right: 10px !important; top: -2px !important} table.iY div.hj { width: auto !important;} table.iY div.hj div.hk { display: inline !important; padding-right: 3px !important;} /* NO ADS! */ .u5, .u8 { display: none !important;} table[class=\"T1HY1 nH iY\"] { width: 100% !important;} div[class=\"ip iq\"] { margin-right: 13px !important;} textarea.ir { width: 100% !important;}
</code>

<strong>Installation:</strong>
Um das Custom CSS in Mailplane zu aktivieren, müsst ihr in den Einstellungen unter Erscheinungsbild das "Eigene Stylesheet" aktivieren und auswählen.

<img class="aligncenter size-full wp-image-725" title="Bild 20" src="/wp-content/uploads/Bild-20.png" alt="Bild 20" width="428" height="641" />

Ergebnis: Keine Werbung mehr in der Detailansicht von Mails. Man hat den vollen Platz für seine E-Mail. Toll.

Danke an den Autor des Greasemonkey-Scripts für den CSS-Schnipsel!

PS: Ich musste anschließend Mailplane neu starten weil Googlemail nicht mehr im neuen Interface laden wollte... aber das kann auch andere Gründe haben.
