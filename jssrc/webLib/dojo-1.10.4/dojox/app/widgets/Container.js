//>>built
define("dojox/app/widgets/Container","dojo/_base/declare dojo/_base/lang dijit/registry dojo/dom-attr dojo/dom-geometry dojo/dom-style dijit/_WidgetBase dijit/_Container dijit/_Contained dojo/_base/array dojo/query ../utils/layout ./_ScrollableMixin".split(" "),function(m,l,n,e,d,f,p,q,r,s,t,u,v){return m("dojox.app.widgets.Container",[p,q,r,v],{scrollable:!1,fixedFooter:"",fixedHeader:"",buildRendering:function(){this._constraint||(this._constraint="center",e.set(this.srcNodeRef,"data-app-constraint",
"center"));this.inherited(arguments);f.set(this.domNode,"overflow-x","hidden");f.set(this.domNode,"overflow-y","auto");this.scrollable&&(this.inherited(arguments),this.domNode.style.position="absolute",this.domNode.style.width="100%",this.domNode.style.height="100%")},startup:function(){this._started||(this.scrollable&&this.inherited(arguments),this._started=!0)},resize:function(k,b){var a=this.domNode;if(this.scrollable)this.inherited(arguments);else{k&&d.setMarginBox(a,k);var c=b||{};l.mixin(c,
k||{});if(!("h"in c)||!("w"in c))c=l.mixin(d.getMarginBox(a),c);var g=f.getComputedStyle(a),h=d.getMarginExtents(a,g),e=d.getBorderExtents(a,g),c=this._borderBox={w:c.w-(h.w+e.w),h:c.h-(h.h+e.h)},h=d.getPadExtents(a,g);this._contentBox={l:f.toPixelValue(a,g.paddingLeft),t:f.toPixelValue(a,g.paddingTop),w:c.w-h.w,h:c.h-h.h}}this.layout()},layout:function(){var d=t("\x3e [data-app-constraint]",this.domNode).map(function(b){var a=n.getEnclosingWidget(b);return a?(a._constraint=e.get(b,"data-app-constraint"),
a):{domNode:b,_constraint:e.get(b,"data-app-constraint")}});this._contentBox&&u.layoutChildren(this.domNode,this._contentBox,d);s.forEach(this.getChildren(),function(b){!b._started&&b.startup&&b.startup()})}})});
/// Container.js.map