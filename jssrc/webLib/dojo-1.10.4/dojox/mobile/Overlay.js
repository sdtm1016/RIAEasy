//>>built
define("dojox/mobile/Overlay","dojo/_base/declare dojo/_base/lang dojo/sniff dojo/_base/window dojo/dom-class dojo/dom-geometry dojo/dom-style dojo/window dijit/_WidgetBase dojo/_base/array dijit/registry dojo/touch ./viewRegistry ./_css3".split(" "),function(m,n,f,g,c,h,k,p,q,r,s,t,u,l){return m("dojox.mobile.Overlay",q,{baseClass:"mblOverlay mblOverlayHidden",buildRendering:function(){this.inherited(arguments);this.containerNode||(this.containerNode=this.domNode)},_reposition:function(){var a=h.position(this.domNode),
b=p.getBox(),c=u.getEnclosingScrollable(this.domNode);c&&(b.t-=c.getPos().y);if(a.y+a.h!=b.h||"absolute"!=k.get(this.domNode,"position")&&3>f("android"))a.y=b.t+b.h-a.h,k.set(this.domNode,{position:"absolute",top:a.y+"px",bottom:"auto"});return a},show:function(a){r.forEach(s.findWidgets(this.domNode),function(a){a&&("auto"==a.height&&"function"==typeof a.resize)&&a.resize()});var b=this._reposition();a&&(a=h.position(a),b.y<a.y&&(g.global.scrollBy(0,a.y+a.h-b.y),this._reposition()));var d=this.domNode;
c.replace(d,["mblCoverv","mblIn"],["mblOverlayHidden","mblRevealv","mblOut","mblReverse","mblTransition"]);this.defer(function(){var a=this.connect(d,l.name("transitionEnd"),function(){this.disconnect(a);c.remove(d,["mblCoverv","mblIn","mblTransition"]);this._reposition()});c.add(d,"mblTransition")},100);var e=!1;this._moveHandle=this.connect(g.doc.documentElement,t.move,function(){e=!0});this._repositionTimer=setInterval(n.hitch(this,function(){e?e=!1:this._reposition()}),50);return b},hide:function(){var a=
this.domNode;this._moveHandle&&(this.disconnect(this._moveHandle),this._moveHandle=null,clearInterval(this._repositionTimer),this._repositionTimer=null);f("css3-animations")?(c.replace(a,["mblRevealv","mblOut","mblReverse"],["mblCoverv","mblIn","mblOverlayHidden","mblTransition"]),this.defer(function(){var b=this.connect(a,l.name("transitionEnd"),function(){this.disconnect(b);c.replace(a,["mblOverlayHidden"],["mblRevealv","mblOut","mblReverse","mblTransition"])});c.add(a,"mblTransition")},100)):c.replace(a,
["mblOverlayHidden"],["mblCoverv","mblIn","mblRevealv","mblOut","mblReverse"])},onBlur:function(a){return!1}})});
/// Overlay.js.map