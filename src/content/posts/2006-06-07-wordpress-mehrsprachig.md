---
title: "WordPress mehrsprachig"
pubDate: "2006-06-07T09:52:48.000Z"
updatedDate: "2021-12-27T18:50:38.000Z"
slug: "wordpress-mehrsprachig"
wpPostId: "346"
permalink: "/2006-06-07/wordpress-mehrsprachig/"
visibility: "public"
draft: false
tags: ["plugin", "wordpress"]
---
<p>Ich suche eine Lösung, um WordPress 2 als mehrsprachiges CMS zu nutzen.</p>
<p>Das haben meine Recherche bisher ergeben:</p>
<h3>Gespiegelte WP-Instanzen aufsetzen</h3>
<p>Das könnte sich als die unkomplizierteste Lösung herausstellen. Man setzt mehrere WP-Instanzen auf und steuert sie über Subdomains an. "www.de.meinedomain.de" und "www.en.meinedomain.de".</p>
<p>Vorteil: Keine Einschränkungen durch Plugins. Software wie Blogdesk kommt problemlos damit klar. Lang-Switch braucht keine zusätzliche Technik da man die Domain wechselt. Pages, Kategorien, Posts, RSS, Template -- alles kann man unabhängig voneinander übersetzen.</p>
<p>Nachteil: Man muss die Verlinkung zwischen den beiden Instanzen irgendwie manuell herstellen. Ein eigenes Plugin hierfür wäre aber nicht zu aufwendig. <ins datetime="2006-06-08T07:29:11+00:00">Ich stelle mir das zur Zeit so vor: Unterhalb jedes Textes (Page, Post) kann man aus einem Dropdown die korrespondierende Sprachversion wählen. Das Dropdown wird automatisch aus der DB der anderen WP-Instanz gefüttert. Das müsste man einmalig in einem Configbereich einstellen.</ins></p>
<h3>Polyglot-Plugin</h3>
<p><a href="http://webdesignblog.de/blogger/wordpress-multilingual-tutorial-fur-einen-mehrsprachigen-blog/">Christian Strang beschreibt seine Erfahrungen</a> mit dem <a href="http://fredfred.net/skriker/index.php?p=198&amp;lp_lang_view=en">Plugin Polyglot</a>.</p>
<p>Die Idee ist gut:<br />
- Lang-Switch in Sidebar<br />
- Lang-Tags im Artikel = alle Sprachen untereinander im Artikel durch [lang_de][/lang_de] getrennt.<br />
Eine geschickte Lösung, die die Komplexität stark reduziert.<br />
- Übersetzung funktioniert für RSS, Template (gettext), Time&amp;Date und ggf. Permalinks und Comments</p>
<p>Problem:<br />
Umsetzung scheint nicht ganz trivial. Grundsätzlich sehe ich aber nicht, warum man das nicht ans Laufen bekommen sollte...</p>
<h3>Bunny's Basic Bilingual Plugin</h3>
<p>Rein zweisprachiger Ansatz...<br />
<a href="http://dev.wp-plugins.org/wiki/BasicBilingual">http://dev.wp-plugins.org/wiki/BasicBilingual</a></p>
<h3>WP Translate</h3>
<p>Spart gleich den Übersetzer mit ;)<br />
<a href="http://www.scotthough.com/wordpress-translate/">http://www.scotthough.com/wordpress-translate/</a></p>
<h3>ML Multilingual</h3>
<p><a href="http://ml_multilingual.code-in-design.de/">ml_multilingual (Demo-Site mit Demozugang)</a> scheint noch nicht so weit getestet wie Polyglot und ist aufgrund des anderen Ansatzes auch etwas komplizierter:</p>
<p>Die Sprachtrennung erfolgt durch mehrere Kategorien-Bäume. Man weißt darüber dann einem Post die Sprache + Kategorie (Menüpunkt) zu.</p>
<p>Probleme / Nachteile:<br />
- Es scheint keine Lösung für <a href="http://ml_multilingual.code-in-design.de/de/feedback/2006-05-27/wie-versieht-man-pages-damit-ml-diese-zurdnen-kann.html">Pages</a> <del datetime="2006-06-08T07:29:11+00:00">/ Kategorien-Einleitungen</del> zu geben.<br />
- RSS-Übersetzung müsste man sich selbst basteln (geht aber leicht durch Kategorien)<br />
- <del datetime="2006-06-08T07:29:11+00:00">Template-Übersetzung scheint irgendwie angedacht (laut einem Kommentar)</del><ins datetime="2006-06-08T07:29:11+00:00"><a href="http://ml_multilingual.code-in-design.de/download/?ml_pref_lang=de">Siehe Dokumentation</a></ins><br />
- Plugin <del datetime="2006-06-08T07:29:11+00:00">anscheinend</del> noch nicht in WP2.x angekommen.<br />
<del datetime="2006-06-08T07:29:11+00:00">- keine Doku zu finden</del></p>
<h3>Gengo</h3>
<blockquote>
<p><a href="http://jamietalbot.com/wp-hacks/gengo/">Gengo is a full featured plugin that provides multi-language blogging for WordPress.</a> It allows for an unlimited number of translations and summaries for any post and provides template tags to display language information. It automatically generates semantic information for links and content blocks and is configurable via an options page.</p></blockquote>
<p>Letztes Update im Juni 06. Das ist schonmal ein Pluspunkt.<br />
<a href="http://jamietalbot.com/gengodemo/en/">Beispiel für Englisch und Japanisch</a>.</p>
<p>Gengo arbeitet mit einem eigenen Admininterface in dem man Sprachen und die Standardsprache festlegt. Leider gibt es nirgends Screenshots oder eine Demoaccount.</p>
<h3>Multilingual</h3>
<p>Das <a href="http://doocy.net/archives/2005/01/20/the-multilingual-acknowledgement/">Posting bei Morganically Grown über Multilingual</a> hört sich gut an. Leider ist es -- genauso wie <a href="http://dev.wp-plugins.org/browser/multilingual/trunk/">die Files im Trunk</a> -- ein Jahr alt.<br />
Das Projekt scheint also inaktiv zu sein. Ob der Code läuft, muss man testen...</p>
<p>PS: <a href="http://wp-plugins.net/index.php?filter=language&amp;filter_search=Go...">wp-plugin.net mit Filter 'language'</a></p>
<ins class="block">Update 06-06-08: Danke für die Kommentare! Ich habe den Beitrag aktualisiert und einige (Tipp)Fehler beseitigt.</ins>
<ins class="block">Update 09-05-02: Das <a href="http://blog.wordpress-deutschland.org/2009/05/01/mehrsprachigkeit-mit-wpml.html">deutsche WordPress-Blog</a> verweißt auf einen Artikel von PHP Magazin <a href="http://it-republik.de/php/news/WordPress-lernt-Fremdsprachen-048624.html">"WordPress lernt Fremdsprachen"</a>. Dort wird erklärt, wie man ein mehrsprachiges WordPress-Blog mit wpml aufsetzt.</ins>
