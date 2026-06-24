---
title: "render nix"
pubDate: "2005-09-28T14:53:53.000Z"
updatedDate: "2021-12-27T18:50:42.000Z"
slug: "render-nix"
wpPostId: "183"
permalink: "/2005-09-28/render-nix/"
visibility: "public"
draft: false
tags: ["Negativbewertung", "rubyonrails"]
---
Das hat mir gerade wahrscheinlich mehr als eine Stunde rumprobieren beschert:
Mein Controller-Code:
<code>
  def live_img
    render(:layout=>false)
    @asdf = request.raw_post
  end
</code>
Ergebnis im <i>live_img.rhtml</i>-Template:
@asdf ist nil

Und was ist die Lösung?
Na?
Richtig, ganz logisch:
Man darf das Templaterendering erst _nach_ der Variablendefinition ausschalten.
<code>
  def live_img
    @asdf = request.raw_post
    render(:layout=>false)
  end
</code>
Ergebnis im <i>live_img.rhtml</i>-Template:
@asdf existiert und wird richtig übergeben.

Bitte, Rails, mach das nicht noch mal mit mir ... sonst macht es irgendwann keinen Spaß mehr!
