//>>built
define("dojox/image/LightboxNano","dojo/_base/lang dojo/_base/declare dojo/_base/array dojo/_base/fx dojo/dom dojo/dom-construct dojo/dom-geometry dojo/dom-style dojo/dom-class dojo/on dojo/query dojo/fx".split(" "),function(g,r,n,s,m,d,h,k,t,l,u,p){getViewport=function(){var b="BackCompat"==document.compatMode?document.body:document.documentElement,a=h.docScroll();return{w:b.clientWidth,h:b.clientHeight,l:a.x,t:a.y}};return r("dojox.image.LightboxNano",null,{href:"",duration:500,preloadDelay:5E3,
constructor:function(b,a){var c=this,e;g.mixin(c,b);if(a=c._node=m.byId(a))/a/i.test(a.tagName)||(e=d.create("a",{href:c.href,"class":a.className},a,"after"),a.className="",e.appendChild(a),a=e),k.set(a,"position","relative"),d.create("div",{"class":"nano-enlarge",style:{position:"absolute",display:"none"}},a),m.setSelectable(a,!1),c._onClickEvt=l(a,"click",g.hitch(c,"_load"));c.href&&setTimeout(function(){(new Image).src=c.href;c._hideLoading()},c.preloadDelay)},destroy:function(){var b=this._connects||
[];b.push(this._onClickEvt);n.forEach(b,function(a){a.remove()});d.destroy(this._node)},_load:function(b){b&&b.preventDefault();if(!this._loading){this._loading=!0;this._reset();b=this._img=d.create("img",{"class":"nano-image nano-image-hidden"},document.body);var a,c=this._loadingNode;a=u("img",this._node)[0]||this._node;var e=h.position(a,!0),f=h.getContentBox(a),q=h.getBorderExtents(a);null==c&&(this._loadingNode=c=d.create("div",{"class":"nano-loading",style:{position:"absolute",display:""}},
this._node,"after"),a=h.getMarginBox(c),k.set(c,{left:parseInt((f.w-a.w)/2)+"px",top:parseInt((f.h-a.h)/2)+"px"}));f.x=e.x-10+q.l;f.y=e.y-10+q.t;this._start=f;this._connects=[l(b,"load",g.hitch(this,"_show"))];b.src=this.href}},_hideLoading:function(){this._loadingNode&&k.set(this._loadingNode,"display","none");this._loadingNode=!1},_show:function(){var b=getViewport(),a=this._img.width,c=this._img.height,e=parseInt(0.9*(b.w-20)),f=parseInt(0.9*(b.h-20)),h=this._bg=d.create("div",{"class":"nano-background",
style:{opacity:0}},document.body);this._loadingNode&&this._hideLoading();t.remove(this._img,"nano-image-hidden");k.set(this._node,"visibility","hidden");this._loading=!1;this._connects=this._connects.concat([l(document,"mousedown",g.hitch(this,"_hide")),l(document,"keypress",g.hitch(this,"_key")),l(window,"resize",g.hitch(this,"_sizeBg"))]);a>e&&(c=c*e/a,a=e);c>f&&(a=a*f/c,c=f);this._end={x:(b.w-20-a)/2+b.l,y:(b.h-20-c)/2+b.t,w:a,h:c};this._sizeBg();p.combine([this._anim(this._img,this._coords(this._start,
this._end)),this._anim(h,{opacity:0.5})]).play()},_sizeBg:function(){var b=document.documentElement;k.set(this._bg,{top:0,left:0,width:b.scrollWidth+"px",height:b.scrollHeight+"px"})},_key:function(b){b.preventDefault();this._hide()},_coords:function(b,a){return{left:{start:b.x,end:a.x},top:{start:b.y,end:a.y},width:{start:b.w,end:a.w},height:{start:b.h,end:a.h}}},_hide:function(){n.forEach(this._connects,function(b){b.remove()});this._connects=[];p.combine([this._anim(this._img,this._coords(this._end,
this._start),"_reset"),this._anim(this._bg,{opacity:0})]).play()},_reset:function(){k.set(this._node,"visibility","visible");d.destroy(this._img);d.destroy(this._bg);this._img=this._bg=null;this._node.focus()},_anim:function(b,a,c){return s.animateProperty({node:b,duration:this.duration,properties:a,onEnd:c?g.hitch(this,c):null})},show:function(b){b=b||{};this.href=b.href||this.href;b=m.byId(b.origin);var a=getViewport();this._node=b||d.create("div",{style:{position:"absolute",width:0,hieght:0,left:a.l+
a.w/2+"px",top:a.t+a.h/2+"px"}},document.body);this._load();b||d.destroy(this._node)}})});
/// LightboxNano.js.map