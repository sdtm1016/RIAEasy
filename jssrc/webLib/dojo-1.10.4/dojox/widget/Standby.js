//>>built
define("dojox/widget/Standby","dojo/_base/kernel dojo/_base/declare dojo/_base/array dojo/_base/event dojo/_base/sniff dojo/dom dojo/dom-attr dojo/dom-construct dojo/dom-geometry dojo/dom-style dojo/window dojo/_base/window dojo/_base/fx dojo/fx dijit/_Widget dijit/_TemplatedMixin dijit/registry".split(" "),function(y,z,A,B,m,C,r,p,s,e,D,g,q,u,E,F,G){y.experimental("dojox.widget.Standby");return z("dojox.widget.Standby",[E,F],{image:require.toUrl("dojox/widget/Standby/images/loading.gif").toString(),
imageText:"Please Wait...",text:"Please wait...",centerIndicator:"image",target:"",color:"#C0C0C0",duration:500,zIndex:"auto",opacity:0.75,templateString:'\x3cdiv\x3e\x3cdiv style\x3d"display: none; opacity: 0; z-index: 9999; position: absolute; cursor:wait;" dojoAttachPoint\x3d"_underlayNode"\x3e\x3c/div\x3e\x3cimg src\x3d"${image}" style\x3d"opacity: 0; display: none; z-index: -10000; position: absolute; top: 0px; left: 0px; cursor:wait;" dojoAttachPoint\x3d"_imageNode"\x3e\x3cdiv style\x3d"opacity: 0; display: none; z-index: -10000; position: absolute; top: 0px;" dojoAttachPoint\x3d"_textNode"\x3e\x3c/div\x3e\x3c/div\x3e',
_underlayNode:null,_imageNode:null,_textNode:null,_centerNode:null,_displayed:!1,_resizeCheck:null,_started:!1,_parent:null,startup:function(a){if(!this._started){if("string"===typeof this.target){var d=G.byId(this.target);this.target=d?d.domNode:C.byId(this.target)}this.text&&(this._textNode.innerHTML=this.text);"image"===this.centerIndicator?(this._centerNode=this._imageNode,r.set(this._imageNode,"src",this.image),r.set(this._imageNode,"alt",this.imageText)):this._centerNode=this._textNode;e.set(this._underlayNode,
{display:"none",backgroundColor:this.color});e.set(this._centerNode,"display","none");this.connect(this._underlayNode,"onclick","_ignore");this.domNode.parentNode&&this.domNode.parentNode!=g.body()&&g.body().appendChild(this.domNode);7==m("ie")&&(this._ieFixNode=p.create("div"),e.set(this._ieFixNode,{opacity:"0",zIndex:"-1000",position:"absolute",top:"-1000px"}),g.body().appendChild(this._ieFixNode));this.inherited(arguments)}},show:function(){this._displayed||(this._anim&&(this._anim.stop(),delete this._anim),
this._displayed=!0,this._size(),this._disableOverflow(),this._fadeIn())},hide:function(){this._displayed&&(this._anim&&(this._anim.stop(),delete this._anim),this._size(),this._fadeOut(),this._displayed=!1,null!==this._resizeCheck&&(clearInterval(this._resizeCheck),this._resizeCheck=null))},isVisible:function(){return this._displayed},onShow:function(){},onHide:function(){},uninitialize:function(){this._displayed=!1;this._resizeCheck&&clearInterval(this._resizeCheck);e.set(this._centerNode,"display",
"none");e.set(this._underlayNode,"display","none");7==m("ie")&&this._ieFixNode&&(g.body().removeChild(this._ieFixNode),delete this._ieFixNode);this._anim&&(this._anim.stop(),delete this._anim);this._centerNode=this._textNode=this._imageNode=this.target=null;this.inherited(arguments)},_size:function(){if(this._displayed){var a=r.get(g.body(),"dir");a&&(a=a.toLowerCase());var d,h=this._scrollerWidths(),c=this.target,f=e.get(this._centerNode,"display");e.set(this._centerNode,"display","block");var b=
s.position(c,!0);if(c===g.body()||c===g.doc)b=D.getBox(),b.x=b.l,b.y=b.t;var p=s.getMarginBox(this._centerNode);e.set(this._centerNode,"display",f);this._ieFixNode&&(d=-this._ieFixNode.offsetTop/1E3,b.x=Math.floor((b.x+0.9)/d),b.y=Math.floor((b.y+0.9)/d),b.w=Math.floor((b.w+0.9)/d),b.h=Math.floor((b.h+0.9)/d));var k=e.get(c,"zIndex"),n=f=k;if("auto"===this.zIndex)if("auto"!=k)f=parseInt(f,10)+1,n=parseInt(n,10)+2;else{var l=c;if(l&&l!==g.body()&&l!==g.doc){l=c.parentNode;for(d=-1E5;l&&l!==g.body();){if((k=
e.get(l,"zIndex"))&&"auto"!==k)k=parseInt(k,10),d<k&&(d=k,f=k+1,n=k+2);l=l.parentNode}}}else f=parseInt(this.zIndex,10)+1,n=parseInt(this.zIndex,10)+2;e.set(this._centerNode,"zIndex",n);e.set(this._underlayNode,"zIndex",f);if((f=c.parentNode)&&f!==g.body()&&c!==g.body()&&c!==g.doc){l=b.h;n=b.w;c=s.position(f,!0);this._ieFixNode&&(d=-this._ieFixNode.offsetTop/1E3,c.x=Math.floor((c.x+0.9)/d),c.y=Math.floor((c.y+0.9)/d),c.w=Math.floor((c.w+0.9)/d),c.h=Math.floor((c.h+0.9)/d));c.w-=f.scrollHeight>f.clientHeight&&
0<f.clientHeight?h.v:0;c.h-=f.scrollWidth>f.clientWidth&&0<f.clientWidth?h.h:0;"rtl"===a&&(m("opera")?(b.x+=f.scrollHeight>f.clientHeight&&0<f.clientHeight?h.v:0,c.x+=f.scrollHeight>f.clientHeight&&0<f.clientHeight?h.v:0):m("ie")?c.x+=f.scrollHeight>f.clientHeight&&0<f.clientHeight?h.v:0:m("webkit"));c.w<b.w&&(b.w-=c.w);c.h<b.h&&(b.h-=c.h);var q=c.y,v=c.y+c.h,t=b.y,w=b.y+l,a=c.x;d=c.x+c.w;var k=b.x,x=b.x+n;if(w>q&&t<q)b.y=c.y,l-=q-t,b.h=l<c.h?l:b.h-2*(f.scrollWidth>f.clientWidth&&0<f.clientWidth?
h.h:0);else if(t<v&&w>v)b.h=v-t;else if(w<=q||t>=v)b.h=0;if(x>a&&k<a)b.x=c.x,n-=a-k,b.w=n<c.w?n:b.w-2*(f.scrollHeight>f.clientHeight&&0<f.clientHeight?h.w:0);else if(k<d&&x>d)b.w=d-k;else if(x<=a||k>=d)b.w=0}0<b.h&&0<b.w?(e.set(this._underlayNode,{display:"block",width:b.w+"px",height:b.h+"px",top:b.y+"px",left:b.x+"px"}),h=["borderRadius","borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"],this._cloneStyles(h),m("ie")||(h="MozBorderRadius MozBorderRadiusTopleft MozBorderRadiusTopright MozBorderRadiusBottomleft MozBorderRadiusBottomright WebkitBorderRadius WebkitBorderTopLeftRadius WebkitBorderTopRightRadius WebkitBorderBottomLeftRadius WebkitBorderBottomRightRadius".split(" "),
this._cloneStyles(h,this)),h=b.h/2-p.h/2,f=b.w/2-p.w/2,b.h>=p.h&&b.w>=p.w?e.set(this._centerNode,{top:h+b.y+"px",left:f+b.x+"px",display:"block"}):e.set(this._centerNode,"display","none")):(e.set(this._underlayNode,"display","none"),e.set(this._centerNode,"display","none"));if(null===this._resizeCheck){var u=this;this._resizeCheck=setInterval(function(){u._size()},100)}}},_cloneStyles:function(a){A.forEach(a,function(a){e.set(this._underlayNode,a,e.get(this.target,a))},this)},_fadeIn:function(){var a=
this,d=q.animateProperty({duration:a.duration,node:a._underlayNode,properties:{opacity:{start:0,end:a.opacity}}}),e=q.animateProperty({duration:a.duration,node:a._centerNode,properties:{opacity:{start:0,end:1}},onEnd:function(){a.onShow();delete a._anim}});this._anim=u.combine([d,e]);this._anim.play()},_fadeOut:function(){var a=this,d=q.animateProperty({duration:a.duration,node:a._underlayNode,properties:{opacity:{start:a.opacity,end:0}},onEnd:function(){e.set(this.node,{display:"none",zIndex:"-1000"})}}),
g=q.animateProperty({duration:a.duration,node:a._centerNode,properties:{opacity:{start:1,end:0}},onEnd:function(){e.set(this.node,{display:"none",zIndex:"-1000"});a.onHide();a._enableOverflow();delete a._anim}});this._anim=u.combine([d,g]);this._anim.play()},_ignore:function(a){a&&B.stop(a)},_scrollerWidths:function(){var a=p.create("div");e.set(a,{position:"absolute",opacity:0,overflow:"hidden",width:"50px",height:"50px",zIndex:"-100",top:"-200px",padding:"0px",margin:"0px"});var d=p.create("div");
e.set(d,{width:"200px",height:"10px"});a.appendChild(d);g.body().appendChild(a);d=s.getContentBox(a);e.set(a,"overflow","scroll");var h=s.getContentBox(a);g.body().removeChild(a);return{v:d.w-h.w,h:d.h-h.h}},_setTextAttr:function(a){this.text=this._textNode.innerHTML=a},_setColorAttr:function(a){e.set(this._underlayNode,"backgroundColor",a);this.color=a},_setImageTextAttr:function(a){r.set(this._imageNode,"alt",a);this.imageText=a},_setImageAttr:function(a){r.set(this._imageNode,"src",a);this.image=
a},_setCenterIndicatorAttr:function(a){this.centerIndicator=a;"image"===a?(this._centerNode=this._imageNode,e.set(this._textNode,"display","none")):(this._centerNode=this._textNode,e.set(this._imageNode,"display","none"))},_disableOverflow:function(){if(this.target===g.body()||this.target===g.doc){this._overflowDisabled=!0;var a=g.body();this._oldOverflow=a.style&&a.style.overflow?e.get(a,"overflow"):"";if(m("ie")&&!m("quirks")){if(a.parentNode&&a.parentNode.style&&a.parentNode.style.overflow)this._oldBodyParentOverflow=
a.parentNode.style.overflow;else try{this._oldBodyParentOverflow=e.get(a.parentNode,"overflow")}catch(d){this._oldBodyParentOverflow="scroll"}e.set(a.parentNode,"overflow","hidden")}e.set(a,"overflow","hidden")}},_enableOverflow:function(){if(this._overflowDisabled){delete this._overflowDisabled;var a=g.body();m("ie")&&!m("quirks")&&(a.parentNode.style.overflow=this._oldBodyParentOverflow,delete this._oldBodyParentOverflow);e.set(a,"overflow",this._oldOverflow);if(m("webkit")){var d=p.create("div",
{style:{height:"2px"}});a.appendChild(d);setTimeout(function(){a.removeChild(d)},0)}delete this._oldOverflow}}})});
/// Standby.js.map