//>>built
define("dijit/layout/_LayoutWidget","dojo/_base/lang ../_Widget ../_Container ../_Contained ../Viewport dojo/_base/declare dojo/dom-class dojo/dom-geometry dojo/dom-style".split(" "),function(h,m,n,p,q,r,d,e,k){return r("dijit.layout._LayoutWidget",[m,n,p],{baseClass:"dijitLayoutContainer",isLayoutContainer:!0,_setTitleAttr:null,buildRendering:function(){this.inherited(arguments);d.add(this.domNode,"dijitContainer")},startup:function(){if(!this._started){this.inherited(arguments);var a=this.getParent&&
this.getParent();if(!a||!a.isLayoutContainer)this.resize(),this.own(q.on("resize",h.hitch(this,"resize")))}},resize:function(a,d){var c=this.domNode;a&&e.setMarginBox(c,a);var b=d||{};h.mixin(b,a||{});if(!("h"in b)||!("w"in b))b=h.mixin(e.getMarginBox(c),b);var f=k.getComputedStyle(c),g=e.getMarginExtents(c,f),l=e.getBorderExtents(c,f),b=this._borderBox={w:b.w-(g.w+l.w),h:b.h-(g.h+l.h)},g=e.getPadExtents(c,f);this._contentBox={l:k.toPixelValue(c,f.paddingLeft),t:k.toPixelValue(c,f.paddingTop),w:b.w-
g.w,h:b.h-g.h};this.layout()},layout:function(){},_setupChild:function(a){d.add(a.domNode,this.baseClass+"-child "+(a.baseClass?this.baseClass+"-"+a.baseClass:""))},addChild:function(a,d){this.inherited(arguments);this._started&&this._setupChild(a)},removeChild:function(a){d.remove(a.domNode,this.baseClass+"-child"+(a.baseClass?" "+this.baseClass+"-"+a.baseClass:""));this.inherited(arguments)}})});
/// _LayoutWidget.js.map