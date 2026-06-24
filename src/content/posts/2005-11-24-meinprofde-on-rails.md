---
title: "MeinProf.de on Rails"
pubDate: "2005-11-24T09:20:14.000Z"
updatedDate: "2021-12-27T18:50:40.000Z"
slug: "meinprofde-on-rails"
wpPostId: "233"
permalink: "/2005-11-24/meinprofde-on-rails/"
visibility: "public"
draft: false
tags: ["marketing", "rubyonrails"]
---
<a href="http://www.meinprof.de/"><img src="http://blog.innerewut.de/files/images/meinProf_Banner_half.png" alt="MyProf.de-Logo" /></a>

<blockquote>MeinProf.de is a German site ... where students can evaluate their university courses and thereby their professors. The professor's rating is the calculated average rating of his courses. 
    * Want to know who is the funniest professor in Berlin?
    * Which course is the toughest in Germany?
    * Which professor gives the best grades in Bavaria?</blockquote>

<a href="http://www.meinprof.de/unis/nordrhein-westfalen/rwth-aachen">RWTH Aachen</a> | <a href="http://www.meinprof.de/unis/nordrhein-westfalen/fh-aachen">FH Aachen</a>

Ich bin gespannt, wie sich die Profile unserer Unis entwickeln. Letztes Semester wurden wir mit Evaulationsbögen nur so überschüttet. Qualitätsmanagement scheint also zumindest statistisch gesehen endlich in die FH Einzug gehalten zu haben.
Bis sich das auch in der verbesserten Lehre (Didaktik, ...) auswirkt, wird es aber sicher noch lange dauern. Dafür bräuchte man schließlich ein Umfeld, in dem auch Professoren angehalten werden, ihre Kurse und ihre Lehrart ständig zu optimieren. Ich kenne ein paar gute Beispiele hierzu aber leider noch mehr problematische...

Übrigens: MyProf ist <a href="http://blog.innerewut.de/articles/2005/11/21/meinprof-de-new-site-on-rails">ein Ruby On Rails-Projekt</a>: <q>Thanks to Ruby on Rails we could implement the whole site in our free time in less than a month. ... We want to thank the Rails community for this wonderful framework and hope to contribute to Rails' popularity with our site.</q>

Interessant sind die Zusammenhänge bei den Betreibern: An der TU Berling gibt es "das <a href="http://www.cct-ev.de/basics/frames_d.html">Company Consulting Team</a> (, eine) studentische Unternehmensberatung". Diesem e.V. wiederum ist <a href="http://www.juniter.de/">Juniter </a>angegliedert, ein studentischer IT-Dienstleister. Dort arbeitet <a href="http://www.rubyonrails-ug.de/wiki/jonathanweiss">Jonathan</a> als Projektmanager und Lead-Developer für MyProf.de.

<h3>Ideen zur weiteren Vernetzung und Visualisierung</h3>
<!--more-->
<strong>MeinProf.de und die offenen Schnittstellen des Web2.0? oder wie man externe Informationen vernetzt:</strong>
Google Maps, Filckr, etc. bieten alle offene Schnittstellen die es ohne größeren Aufwand ermögilchen, in eine Applikation wie meinProf externe Zusatzinformationen einzubinden.
Zum Beispiel:
<ul>
	<li>"Wo ist Aachen?" bzw. "Wo lehrt dieser Prof./Institut/FB?" --> <a href="http://maps.google.com/maps?q=50.7686496095059++6.07919&spn=2.372907,5.218506&iwloc=A&hl=en">Link auf GoogleMaps</a> --> <a href="http://www.multimap.com/map/browse.cgi?lat=50.7686496095059&lon=6.07919&scale=5000&icon=x">Link auf Multimap</a> --> <a href="http://beta.plazes.com/info/faq/">Plazes-Netzwerkdaten</a>
</li>
	<li>"Wie sieht Aachen/diese Hochschule/dieser Prof aus?" --> Flickr <a href="http://www.flickr.com/photos/tags/rwth/">Tag RWTH</a>, <a href="http://www.flickr.com/photos/tags/aachen/">Group Aachen</a>, <a href="http://www.flickr.com/photos/tags/aachen/clusters/">Cluster Aachen</a>, Wo sieht man <a href="http://www.flickr.com/photos/owrede/66266613/">der Professoren</a>? --> 43Places.com über <a href="http://www.43places.com/places/view/105318 ">Aachen </a>und die <a href="http://www.43places.com/places/view/308701">RWTH </a>
</li>
	<li>Was wird in der RWTH gelesen? --> <a href="http://del.icio.us/tag/rwth">Delicous-Tags RWTH</a> oder <a href="http://del.icio.us/tag/fb4">FH-FB4</a>
</li>
</ul>

<strong>MeinProf.de und Datenvisualisierung oder: Wie kann man Tabellen schneller verstehen?</strong>
Eine spontane Liste
<ul>
	<li>Wichtige Werte (höchste, tiefste) farbig hervorheben.
</li>
	<li>Mit <a href="http://nubyonrails.com/pages/gruff">Diagrammen</a> vielleicht auch mit <a href="http://nubyonrails.com/pages/sparklines">Sparklines</a> arbeiten.
</li>
	<li>Insbesondere ist dabei interessant, die Entwicklung der Bewertungen / Eintragungen über die Zeit zu sehen. Wird ein Prof nächstes Jahr besser bewertet? In welcher Uni gibt es mehr Bewertungen?, ... --> grafisch aufbereitet, kann so etwas sehr gut wirken.
</li>
	<li>Größen-Cluster anbieten: Je größer ein Wort desto mehr Bewertungen. Das gibt einem ein direktes visuelles Feedback und ist besser als die kl. 2 oder 1 in der Tabelle.
</li>
</ul>

<em class="update">Update 05-12-18: Nachdem ich den Trackback aus dem Spam gefischt habe, bin ich auf das Weblog von MeinProf aufmerksam geworden. Es freut mich, dass <a href="http://blog.meinprof.de/articles/2005/11/30/2500-bewertungen-mit-viel-feedback">meine Anregungen aufgenommen wurden</a>! Und ich bin gespannt, wie es weiter geht :-).</em>
