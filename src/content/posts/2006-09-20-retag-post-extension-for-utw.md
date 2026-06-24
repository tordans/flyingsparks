---
title: "ReTag Post-Extension 0.11 for UTW (dont use anymore!)"
pubDate: "2006-09-20T15:50:19.000Z"
updatedDate: "2021-12-27T18:50:37.000Z"
slug: "retag-post-extension-for-utw"
wpPostId: "353"
permalink: "/2006-09-20/retag-post-extension-for-utw/"
visibility: "public"
draft: false
tags: ["code", "php", "plugin", "Programmierung", "wordpress"]
---
<div class="update">
<br /><br />
This Plugin is no longer being updated. Please update your Weblog zu WP 2.3 and use the <a href="http://wordpress.org/extend/plugins/simple-tags/">great SimpleTags-Plugin</a>. There is a Page for Massediting which does exactly what I did and better!
<br /><br />
</div>

<p><em>Note for german readers: Zielgruppengerecht ist dieses Post ausnahmsweise in englisch.</em></p>
<p class="update">New Version 0.11 -- see below.</p>
<p>I use the <a href="http://www.neato.co.nz/ultimate-tag-warrior/">Ultimate Tag Warrior-Plugin</a> for WordPress here at flyingsparks and at <a href="http://www.pfadiblog.de">pfadiblog.de</a> and its a great tool!</p>
<p>But there was one thing I really needed: <strong>An easy and fast way to review and change the tags of my posts.</strong></p>
<p>And since I needed to spend some time with different things than <a href="http://www.scoutpress.de">scoutpress</a> here it is:</p><!--more-->
<h3>Downlaod</h3>
<ul>
	<li><small><a href="/wp-content/uploads/ultimate-tag-warrior-retag-posts_0.1.rar">Download the ReTag Post-Extension 0.1 for UTW (ZIP)</a></small></li>
	<li><a href="/wp-content/uploads/ultimate-tag-warrior-retag-posts_0.11.rar">Download the ReTag Post-Extension 0.11 for UTW (ZIP)</a></li>
</ul>
<h3>Installation:</h3> 
<p>Put the PHP-File in your UTW-Plugin-Directory and activate it. Go to the Manage-Menu and find "ReTag" next to the UTW-Tag-Menu.</p>
<p>Note: This Extension needs UTW to run of course.</p>
<h3>Featurlist</h3>
<ul>
<li>list the last 15 posts with title, id, date, author, permalink and body together with your tagcloud and your current tags</li>
<li>prev-next-navigation</li>
<li>you can change the tags of all 15 post in one step and save all the change with one click</li></ul>
<h3>Wishlist</h3>
<p>Thats what I would like to see in this extension some day. Unfortunatelly I dont know how to implement it. Hopefully someone of you will work on this...</p>
<ul>
<li>The search- and date-filter (known from the manage-page) are commented out since they dont work right now. Would be nice to filter the list for tags and dates...</li>
<li>Tag-Filter (see release-notes below)</li>
<li>I worked on an alternative tag-cloud which uses checkboxes to combine checked and unchecked tags in one view. But there is a problem with adding new tags. The default UTW-Add-Tags-Ajax-Thing will probably cause errors in combination with the checkbox-cloud. See uncommented code as well.</li>
<li>If you have a huge tagcloud (like I have) the lists gets some kind of ugly. It would be much nicer to have just one tagcloud but multiple textareas/input-fields which are active for the cloud as long as you klick on them...<br />
I tried this but my JS-Skills are to old and I am to slow ;)</li>
<li>People that write long posts probably would like a feature that crops their fulltext after 400 px and reveals the full post only on click. Some JS should do the job...</li></ul>
<p><strong>To Be Checked</strong></p>
<p>This is the 0.11-Release so please have a close look if you find any error. There are quite some things that should be optimized. Please help to improve this extension and send your code <a href="mailto:tobias@jordans-online.de">via eMail</a>.</p>
<p>Here is some stuff that has to be checked</p>
<ul>
<li><del datetime="2006-09-20T16:42:52+00:00">Are the posts in the right order (newest first). How to change the DB-Call?</del></li>
<li><del datetime="2006-09-20T16:42:52+00:00">Does the "related tags"-Line work for you?</del></li>
<li>The english spelling :-).</li></ul>
<p><strong>Screenshot</strong></p>
<p align="center"><img height="539" alt="ReTag Posts-Extension" src="/wp-content/uploads/retagposts.jpg" width="550" /></p>
<div class="update">
This is the new version. Here is what the PHP-File tells you about it:
<pre>
/**
 * Plugin Name: Ultimate Tag Warrior: ReTag Post-Extention
 * Plugin URI: 	http://www.fly.ingsparks.de/retag-posts-with-ultimate-tag-warrior/
 * Description: Extention for UTW2 that allows you to edit the tags of multiple post at the same time. Based on Christine Davis UTW. 
 * Version: 	0.11
 * Author: 		Tobias Jordans
 * Author URI: 	http://www.fly.ingsparks.de/
 * Changelog
 * - Version 0.11
 * 		- compatible to UTW3-1415WP2
 * 		- solved problem that changes are not saved the first time you edit your tags
 *  	- some wording changed
 *  	- uncommented the 'tags of related posts' since it didnt work < -- if someone knows why, please help
 * Wishlist
 * - A way to filter posts by tag. Look at line 279 -- doent work yet :-(
 */
</pre>
</pre></div>
<p>/end</p>
<p>[tag]plugin, wordpress, php, programmierung, code[/tag]</p>
