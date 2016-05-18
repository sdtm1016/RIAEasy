//>>built
define("dojox/mobile/scrollable","dojo/_base/kernel dojo/_base/connect dojo/_base/event dojo/_base/lang dojo/_base/window dojo/dom-class dojo/dom-construct dojo/dom-style dojo/dom-geometry dojo/touch dijit/registry dijit/form/_TextBoxMixin ./sniff ./_css3 ./_maskUtils dojo/_base/declare require".split(" "),function(r,n,s,v,g,l,t,m,w,x,z,A,h,f,y,u,B){var p=v.getObject("dojox.mobile",!0);h.add("translate3d",function(){if(h("css3-animations")){var a=g.doc.createElement("div");a.style[f.name("transform")]=
"translate3d(0px,1px,0px)";g.doc.documentElement.appendChild(a);var b=g.doc.defaultView.getComputedStyle(a,"")[f.name("transform",!0)],b=b&&0===b.indexOf("matrix");g.doc.documentElement.removeChild(a);return b}});u=function(){};v.extend(u,{fixedHeaderHeight:0,fixedFooterHeight:0,isLocalFooter:!1,scrollBar:!0,scrollDir:"v",weight:0.6,fadeScrollBar:!0,disableFlashScrollBar:!1,threshold:4,constraint:!0,touchNode:null,propagatable:!0,dirLock:!1,height:"",scrollType:0,_parentPadBorderExtentsBottom:0,_moved:!1,
init:function(a){if(a)for(var b in a)a.hasOwnProperty(b)&&(this[b]=("domNode"==b||"containerNode"==b)&&"string"==typeof a[b]?g.doc.getElementById(a[b]):a[b]);"undefined"!=typeof this.domNode.style.msTouchAction&&(this.domNode.style.msTouchAction="none");this.touchNode=this.touchNode||this.containerNode;this._v=-1!=this.scrollDir.indexOf("v");this._h=-1!=this.scrollDir.indexOf("h");this._f="f"==this.scrollDir;this._ch=[];this._ch.push(n.connect(this.touchNode,x.press,this,"onTouchStart"));if(h("css3-animations"))if(this._useTopLeft=
this.scrollType?2===this.scrollType:!1,this._useTopLeft||(this._useTransformTransition=this.scrollType?3===this.scrollType:6<=h("ios")||h("android")||h("bb")),this._useTopLeft)this._ch.push(n.connect(this.containerNode,f.name("transitionEnd"),this,"onFlickAnimationEnd"));else{if(this._useTransformTransition)this._ch.push(n.connect(this.containerNode,f.name("transitionEnd"),this,"onFlickAnimationEnd"));else{this._ch.push(n.connect(this.containerNode,f.name("animationEnd"),this,"onFlickAnimationEnd"));
this._ch.push(n.connect(this.containerNode,f.name("animationStart"),this,"onFlickAnimationStart"));for(a=0;3>a;a++)this.setKeyframes(null,null,a)}h("translate3d")&&m.set(this.containerNode,f.name("transform"),"translate3d(0,0,0)")}this._speed={x:0,y:0};this._appFooterHeight=0;this.isTopLevel()&&!this.noResize&&this.resize();var c=this;setTimeout(function(){c.flashScrollBar()},600);g.global.addEventListener&&(this._onScroll=function(a){if(c.domNode&&"none"!==c.domNode.style.display){a=c.domNode.scrollTop;
var b=c.domNode.scrollLeft,k;if(0<a||0<b)k=c.getPos(),c.domNode.scrollLeft=0,c.domNode.scrollTop=0,c.scrollTo({x:k.x-b,y:k.y-a})}},g.global.addEventListener("scroll",this._onScroll,!0));!this.disableTouchScroll&&this.domNode.addEventListener&&(this._onFocusScroll=function(a){if(c.domNode&&"none"!==c.domNode.style.display){a=g.doc.activeElement;var b,k;a&&(b=a.getBoundingClientRect(),k=c.domNode.getBoundingClientRect(),b.height<c.getDim().d.h&&(b.top<k.top+c.fixedHeaderHeight?c.scrollIntoView(a,!0):
b.top+b.height>k.top+k.height-c.fixedFooterHeight&&c.scrollIntoView(a,!1)))}},this.domNode.addEventListener("focus",this._onFocusScroll,!0))},isTopLevel:function(){return!0},cleanup:function(){if(this._ch){for(var a=0;a<this._ch.length;a++)n.disconnect(this._ch[a]);this._ch=null}this._onScroll&&g.global.removeEventListener&&(g.global.removeEventListener("scroll",this._onScroll,!0),this._onScroll=null);this._onFocusScroll&&this.domNode.removeEventListener&&(this.domNode.removeEventListener("focus",
this._onFocusScroll,!0),this._onFocusScroll=null)},findDisp:function(a){if(!a.parentNode)return null;if(1===a.nodeType&&l.contains(a,"mblSwapView")&&"none"!==a.style.display)return a;for(var b=a.parentNode.childNodes,c=0;c<b.length;c++){var e=b[c];if(1===e.nodeType&&l.contains(e,"mblView")&&"none"!==e.style.display)return e}return a},getScreenSize:function(){return{h:g.global.innerHeight||g.doc.documentElement.clientHeight||g.doc.documentElement.offsetHeight,w:g.global.innerWidth||g.doc.documentElement.clientWidth||
g.doc.documentElement.offsetWidth}},resize:function(a){this._appFooterHeight=this._fixedAppFooter?this._fixedAppFooter.offsetHeight:0;this.isLocalHeader&&(this.containerNode.style.marginTop=this.fixedHeaderHeight+"px");var b=0;for(a=this.domNode;a&&"BODY"!=a.tagName;a=a.offsetParent){a=this.findDisp(a);if(!a)break;b+=a.offsetTop+w.getBorderExtents(a).h}var c;a=this.getScreenSize().h;b=a-b-this._appFooterHeight;if("inherit"===this.height)this.domNode.offsetParent&&(c=w.getContentBox(this.domNode.offsetParent).h-
w.getBorderExtents(this.domNode).h+"px");else if("auto"===this.height){if(c=this.domNode.offsetParent){this.domNode.style.height="0px";c=c.getBoundingClientRect();var b=this.domNode.getBoundingClientRect(),e=c.bottom-this._appFooterHeight-this._parentPadBorderExtentsBottom,b=b.bottom>=e?a-(b.top-c.top)-this._appFooterHeight-this._parentPadBorderExtentsBottom:e-b.bottom}a=Math.max(this.domNode.scrollHeight,this.containerNode.scrollHeight);c=(a?Math.min(a,b):b)+"px"}else this.height&&(c=this.height);
c||(c=b+"px");"-"!==c.charAt(0)&&"default"!==c&&(this.domNode.style.height=c);if(!this._conn)this.onTouchEnd()},onFlickAnimationStart:function(a){a&&s.stop(a)},onFlickAnimationEnd:function(a){h("ios")&&this._keepInputCaretInActiveElement();if(a){var b=a.animationName;if(b&&-1===b.indexOf("scrollableViewScroll2")){-1!==b.indexOf("scrollableViewScroll0")?this._scrollBarNodeV&&l.remove(this._scrollBarNodeV,"mblScrollableScrollTo0"):-1!==b.indexOf("scrollableViewScroll1")?this._scrollBarNodeH&&l.remove(this._scrollBarNodeH,
"mblScrollableScrollTo1"):(this._scrollBarNodeV&&(this._scrollBarNodeV.className=""),this._scrollBarNodeH&&(this._scrollBarNodeH.className=""));return}if(this._useTransformTransition||this._useTopLeft)if(b=a.target,b===this._scrollBarV||b===this._scrollBarH){a="mblScrollableScrollTo"+(b===this._scrollBarV?"0":"1");l.contains(b,a)?l.remove(b,a):b.className="";return}a.srcElement&&s.stop(a)}this.stopAnimation();if(this._bounce){var c=this,e=c._bounce;setTimeout(function(){c.slideTo(e,0.3,"ease-out")},
0);c._bounce=void 0}else this.hideScrollBar(),this.removeCover()},isFormElement:function(a){a&&1!==a.nodeType&&(a=a.parentNode);if(!a||1!==a.nodeType)return!1;a=a.tagName;return"SELECT"===a||"INPUT"===a||"TEXTAREA"===a||"BUTTON"===a},onTouchStart:function(a){!this.disableTouchScroll&&!(this._conn&&500>(new Date).getTime()-this.startTime)&&(this._conn||(this._conn=[],this._conn.push(n.connect(g.doc,x.move,this,"onTouchMove")),this._conn.push(n.connect(g.doc,x.release,this,"onTouchEnd"))),this._aborted=
!1,l.contains(this.containerNode,"mblScrollableScrollTo2")?this.abort():(this._scrollBarNodeV&&(this._scrollBarNodeV.className=""),this._scrollBarNodeH&&(this._scrollBarNodeH.className="")),this.touchStartX=a.touches?a.touches[0].pageX:a.clientX,this.touchStartY=a.touches?a.touches[0].pageY:a.clientY,this.startTime=(new Date).getTime(),this.startPos=this.getPos(),this._dim=this.getDim(),this._time=[0],this._posX=[this.touchStartX],this._posY=[this.touchStartY],this._moved=this._locked=!1,this._preventDefaultInNextTouchMove=
!0,this.isFormElement(a.target)||(this.propagatable?a.preventDefault():s.stop(a),this._preventDefaultInNextTouchMove=!1))},onTouchMove:function(a){if(!this._locked){if(this._preventDefaultInNextTouchMove){this._preventDefaultInNextTouchMove=!1;var b=z.getEnclosingWidget((a.targetTouches&&1===a.targetTouches.length?a.targetTouches[0]:a).target);b&&b.isInstanceOf(A)&&(this.propagatable?a.preventDefault():s.stop(a))}b=a.touches?a.touches[0].pageX:a.clientX;a=a.touches?a.touches[0].pageY:a.clientY;var c=
b-this.touchStartX,e=a-this.touchStartY,d={x:this.startPos.x+c,y:this.startPos.y+e},k=this._dim,c=Math.abs(c),e=Math.abs(e);if(1==this._time.length){if(this.dirLock&&(this._v&&!this._h&&c>=this.threshold&&c>=e||(this._h||this._f)&&!this._v&&e>=this.threshold&&e>=c)){this._locked=!0;return}if(this._v&&this._h){if(e<this.threshold&&c<this.threshold)return}else if(this._v&&e<this.threshold||(this._h||this._f)&&c<this.threshold)return;this._moved=!0;this.addCover();this.showScrollBar()}c=this.weight;
this._v&&this.constraint&&(0<d.y?d.y=Math.round(d.y*c):d.y<-k.o.h&&(d.y=k.c.h<k.d.h?Math.round(d.y*c):-k.o.h-Math.round((-k.o.h-d.y)*c)));if((this._h||this._f)&&this.constraint)0<d.x?d.x=Math.round(d.x*c):d.x<-k.o.w&&(d.x=k.c.w<k.d.w?Math.round(d.x*c):-k.o.w-Math.round((-k.o.w-d.x)*c));this.scrollTo(d);d=this._time.length;if(2<=d){this._moved=!0;var f,g;this._v&&!this._h?(f=this._posY[d-1]-this._posY[d-2],g=a-this._posY[d-1]):!this._v&&this._h&&(f=this._posX[d-1]-this._posX[d-2],g=b-this._posX[d-
1]);0>f*g&&(this._time=[this._time[d-1]],this._posX=[this._posX[d-1]],this._posY=[this._posY[d-1]],d=1)}10==d&&(this._time.shift(),this._posX.shift(),this._posY.shift());this._time.push((new Date).getTime()-this.startTime);this._posX.push(b);this._posY.push(a)}},_keepInputCaretInActiveElement:function(){var a=g.doc.activeElement,b;if(a&&("INPUT"==a.tagName||"TEXTAREA"==a.tagName))b=a.value,a.value="number"==a.type||"week"==a.type?b?a.value+1:"week"==a.type?"2013-W10":1:a.value+" ",a.value=b},onTouchEnd:function(a){if(!this._locked){var b=
this._speed={x:0,y:0},c=this._dim,e=this.getPos(),d={};if(a){if(!this._conn)return;for(b=0;b<this._conn.length;b++)n.disconnect(this._conn[b]);this._conn=null;b=!1;!this._aborted&&!this._moved&&(b=!0);if(b){this.hideScrollBar();this.removeCover();if(h("clicks-prevented")&&!this.isFormElement(a.target)){var k=a.target;1!=k.nodeType&&(k=k.parentNode);setTimeout(function(){p._sendClick(k,a)})}return}b=this._speed=this.getSpeed()}else{if(0==e.x&&0==e.y)return;c=this.getDim()}this._v&&(d.y=e.y+b.y);if(this._h||
this._f)d.x=e.x+b.x;if(!1!==this.adjustDestination(d,e,c)){if(this.constraint){if("v"==this.scrollDir&&c.c.h<c.d.h){this.slideTo({y:0},0.3,"ease-out");return}if("h"==this.scrollDir&&c.c.w<c.d.w){this.slideTo({x:0},0.3,"ease-out");return}if(this._v&&this._h&&c.c.h<c.d.h&&c.c.w<c.d.w){this.slideTo({x:0,y:0},0.3,"ease-out");return}}var f,g="ease-out",q={};this._v&&this.constraint&&(0<d.y?0<e.y?(f=0.3,d.y=0):(d.y=Math.min(d.y,20),g="linear",q.y=0):-b.y>c.o.h- -e.y&&(e.y<-c.o.h?(f=0.3,d.y=c.c.h<=c.d.h?
0:-c.o.h):(d.y=Math.max(d.y,-c.o.h-20),g="linear",q.y=-c.o.h)));if((this._h||this._f)&&this.constraint)0<d.x?0<e.x?(f=0.3,d.x=0):(d.x=Math.min(d.x,20),g="linear",q.x=0):-b.x>c.o.w- -e.x&&(e.x<-c.o.w?(f=0.3,d.x=c.c.w<=c.d.w?0:-c.o.w):(d.x=Math.max(d.x,-c.o.w-20),g="linear",q.x=-c.o.w));this._bounce=void 0!==q.x||void 0!==q.y?q:void 0;if(void 0===f){var m,l;this._v&&this._h?(l=Math.sqrt(b.x*b.x+b.y*b.y),m=Math.sqrt(Math.pow(d.y-e.y,2)+Math.pow(d.x-e.x,2))):this._v?(l=b.y,m=d.y-e.y):this._h&&(l=b.x,
m=d.x-e.x);if(0===m&&!a)return;f=0!==l?Math.abs(m/l):0.01}this.slideTo(d,f,g)}}},adjustDestination:function(a,b,c){return!0},abort:function(){this._aborted=!0;this.scrollTo(this.getPos());this.stopAnimation()},stopAnimation:function(){l.remove(this.containerNode,"mblScrollableScrollTo2");this._scrollBarV&&(this._scrollBarV.className="");this._scrollBarH&&(this._scrollBarH.className="");if(this._useTransformTransition||this._useTopLeft)this.containerNode.style[f.name("transition")]="",this._scrollBarV&&
(this._scrollBarV.style[f.name("transition")]=""),this._scrollBarH&&(this._scrollBarH.style[f.name("transition")]="")},scrollIntoView:function(a,b,c){if(this._v){for(var e=this.containerNode,d=this.getDim().d.h,f=0,g=a;g!==e;g=g.offsetParent){if(!g||"BODY"===g.tagName)return;f+=g.offsetTop}a=b?Math.max(d-e.offsetHeight,-f):Math.min(0,d-f-a.offsetHeight);c&&"number"===typeof c?this.slideTo({y:a},c,"ease-out"):this.scrollTo({y:a})}},getSpeed:function(){var a=0,b=0,c=this._time.length;if(2<=c&&500>(new Date).getTime()-
this.startTime-this._time[c-1])var a=this._posX[c-(3<c?2:1)]-this._posX[0<=c-6?c-6:0],e=this._time[c-(3<c?2:1)]-this._time[0<=c-6?c-6:0],b=this.calcSpeed(this._posY[c-(3<c?2:1)]-this._posY[0<=c-6?c-6:0],e),a=this.calcSpeed(a,e);return{x:a,y:b}},calcSpeed:function(a,b){return 4*Math.round(100*(a/b))},scrollTo:function(a,b,c){var e,d;d=!0;!this._aborted&&this._conn&&(this._dim||(this._dim=this.getDim()),e=0<a.y?a.y:0,d=0>this._dim.o.h+a.y?-1*(this._dim.o.h+a.y):0,e={bubbles:!1,cancelable:!1,x:a.x,y:a.y,
beforeTop:0<e,beforeTopHeight:e,afterBottom:0<d,afterBottomHeight:d},d=this.onBeforeScroll(e));if(d){c=(c||this.containerNode).style;if(h("css3-animations"))if(this._useTopLeft){if(c[f.name("transition")]="",this._v&&(c.top=a.y+"px"),this._h||this._f)c.left=a.x+"px"}else this._useTransformTransition&&(c[f.name("transition")]=""),c[f.name("transform")]=this.makeTranslateStr(a);else if(this._v&&(c.top=a.y+"px"),this._h||this._f)c.left=a.x+"px";h("ios")&&this._keepInputCaretInActiveElement();b||this.scrollScrollBarTo(this.calcScrollBarPos(a));
if(e)this.onAfterScroll(e)}},onBeforeScroll:function(a){return!0},onAfterScroll:function(a){},slideTo:function(a,b,c){this._runSlideAnimation(this.getPos(),a,b,c,this.containerNode,2);this.slideScrollBarTo(a,b,c)},makeTranslateStr:function(a){var b=this._v&&"number"==typeof a.y?a.y+"px":"0px";a=(this._h||this._f)&&"number"==typeof a.x?a.x+"px":"0px";return h("translate3d")?"translate3d("+a+","+b+",0px)":"translate("+a+","+b+")"},getPos:function(){if(h("css3-animations")){var a=g.doc.defaultView.getComputedStyle(this.containerNode,
"");if(this._useTopLeft)return{x:parseInt(a.left)||0,y:parseInt(a.top)||0};var b=a[f.name("transform")];return b&&0===b.indexOf("matrix")?(a=b.split(/[,\s\)]+/),b=0===b.indexOf("matrix3d")?12:4,{y:a[b+1]-0,x:a[b]-0}):{x:0,y:0}}return{y:parseInt(this.containerNode.style.top)||0,x:this.containerNode.offsetLeft}},getDim:function(){var a={};a.c={h:this.containerNode.offsetHeight,w:this.containerNode.offsetWidth};a.v={h:this.domNode.offsetHeight+this._appFooterHeight,w:this.domNode.offsetWidth};a.d={h:a.v.h-
this.fixedHeaderHeight-this.fixedFooterHeight-this._appFooterHeight,w:a.v.w};a.o={h:a.c.h-a.v.h+this.fixedHeaderHeight+this.fixedFooterHeight+this._appFooterHeight,w:a.c.w-a.v.w};return a},showScrollBar:function(){if(this.scrollBar){var a=this._dim;if(!("v"==this.scrollDir&&a.c.h<=a.d.h)&&!("h"==this.scrollDir&&a.c.w<=a.d.w)&&(!this._v||!this._h||!(a.c.h<=a.d.h&&a.c.w<=a.d.w)))a=function(a,c){var e=a["_scrollBarNode"+c];if(!e){var e=t.create("div",null,a.domNode),d={position:"absolute",overflow:"hidden"};
"V"==c?(d.right="2px",d.width="5px"):(d.bottom=(a.isLocalFooter?a.fixedFooterHeight:0)+2+"px",d.height="5px");m.set(e,d);e.className="mblScrollBarWrapper";a["_scrollBarWrapper"+c]=e;e=t.create("div",null,e);m.set(e,f.add({opacity:0.6,position:"absolute",backgroundColor:"#606060",fontSize:"1px",MozBorderRadius:"2px",zIndex:2147483647},{borderRadius:"2px",transformOrigin:"0 0"}));m.set(e,"V"==c?{width:"5px"}:{height:"5px"});a["_scrollBarNode"+c]=e}return e},this._v&&!this._scrollBarV&&(this._scrollBarV=
a(this,"V")),this._h&&!this._scrollBarH&&(this._scrollBarH=a(this,"H")),this.resetScrollBar()}},hideScrollBar:function(){if(this.fadeScrollBar&&h("css3-animations")&&!p._fadeRule){var a=t.create("style",null,g.doc.getElementsByTagName("head")[0]);a.textContent=".mblScrollableFadeScrollBar{  "+f.name("animation-duration",!0)+": 1s;  "+f.name("animation-name",!0)+": scrollableViewFadeScrollBar;}@"+f.name("keyframes",!0)+" scrollableViewFadeScrollBar{  from { opacity: 0.6; }  to { opacity: 0; }}";p._fadeRule=
a.sheet.cssRules[1]}this.scrollBar&&(a=function(a,c){m.set(a,f.add({opacity:0},{animationDuration:""}));if(!c._useTopLeft||!h("android"))a.className="mblScrollableFadeScrollBar"},this._scrollBarV&&(a(this._scrollBarV,this),this._scrollBarV=null),this._scrollBarH&&(a(this._scrollBarH,this),this._scrollBarH=null))},calcScrollBarPos:function(a){var b={},c=this._dim,e=function(a,c,b,e,f){b=Math.round((e-c-8)/(e-f)*b);b<-c+5&&(b=-c+5);b>a-5&&(b=a-5);return b};"number"==typeof a.y&&this._scrollBarV&&(b.y=
e(this._scrollBarWrapperV.offsetHeight,this._scrollBarV.offsetHeight,a.y,c.d.h,c.c.h));"number"==typeof a.x&&this._scrollBarH&&(b.x=e(this._scrollBarWrapperH.offsetWidth,this._scrollBarH.offsetWidth,a.x,c.d.w,c.c.w));return b},scrollScrollBarTo:function(a){this.scrollBar&&(this._v&&(this._scrollBarV&&"number"==typeof a.y)&&(h("css3-animations")?this._useTopLeft?m.set(this._scrollBarV,f.add({top:a.y+"px"},{transition:""})):(this._useTransformTransition&&(this._scrollBarV.style[f.name("transition")]=
""),this._scrollBarV.style[f.name("transform")]=this.makeTranslateStr({y:a.y})):this._scrollBarV.style.top=a.y+"px"),this._h&&(this._scrollBarH&&"number"==typeof a.x)&&(h("css3-animations")?this._useTopLeft?m.set(this._scrollBarH,f.add({left:a.x+"px"},{transition:""})):(this._useTransformTransition&&(this._scrollBarH.style[f.name("transition")]=""),this._scrollBarH.style[f.name("transform")]=this.makeTranslateStr({x:a.x})):this._scrollBarH.style.left=a.x+"px"))},slideScrollBarTo:function(a,b,c){if(this.scrollBar){var e=
this.calcScrollBarPos(this.getPos());a=this.calcScrollBarPos(a);this._v&&this._scrollBarV&&this._runSlideAnimation({y:e.y},{y:a.y},b,c,this._scrollBarV,0);this._h&&this._scrollBarH&&this._runSlideAnimation({x:e.x},{x:a.x},b,c,this._scrollBarH,1)}},_runSlideAnimation:function(a,b,c,e,d,g){if(h("css3-animations"))if(this._useTopLeft){if(void 0!==b.x||void 0!==b.y)this.onFlickAnimationStart(),m.set(d,f.add({},{transitionProperty:void 0!==b.x&&void 0!==b.y?"top, left":void 0!==b.y?"top":"left",transitionDuration:c+
"s",transitionTimingFunction:e})),setTimeout(function(){var a={};void 0!==b.x&&(a.left=b.x+"px");void 0!==b.y&&(a.top=b.y+"px");m.set(d,a)},0),l.add(d,"mblScrollableScrollTo"+g)}else if(this._useTransformTransition)if(void 0===b.x&&(b.x=a.x),void 0===b.y&&(b.y=a.y),b.x!==a.x||b.y!==a.y){this.onFlickAnimationStart();m.set(d,f.add({},{transitionProperty:f.name("transform"),transitionDuration:c+"s",transitionTimingFunction:e}));var n=this.makeTranslateStr(b);setTimeout(function(){m.set(d,f.add({},{transform:n}))},
0);l.add(d,"mblScrollableScrollTo"+g)}else this.hideScrollBar(),this.removeCover();else this.setKeyframes(a,b,g),m.set(d,f.add({},{animationDuration:c+"s",animationTimingFunction:e})),l.add(d,"mblScrollableScrollTo"+g),2==g?this.scrollTo(b,!0,d):this.scrollScrollBarTo(b);else if(r.fx&&r.fx.easing&&c){var p=this;r.fx.slideTo({node:d,duration:1E3*c,left:b.x,top:b.y,easing:"ease-out"==e?r.fx.easing.quadOut:r.fx.easing.linear,onBegin:function(){if(2==g)p.onFlickAnimationStart()},onEnd:function(){if(2==
g)p.onFlickAnimationEnd()}}).play()}else 2==g?(this.onFlickAnimationStart(),this.scrollTo(b,!1,d),this.onFlickAnimationEnd()):this.scrollScrollBarTo(b)},resetScrollBar:function(){var a=function(a,b,d,f,g,h){if(b){var l={};l[h?"top":"left"]=g+4+"px";g=0>=d-8?1:d-8;l[h?"height":"width"]=g+"px";m.set(a,l);a=Math.round(d*d/f);a=Math.min(Math.max(a-8,5),g);b.style[h?"height":"width"]=a+"px";m.set(b,{opacity:0.6})}},b=this.getDim();a(this._scrollBarWrapperV,this._scrollBarV,b.d.h,b.c.h,this.fixedHeaderHeight,
!0);a(this._scrollBarWrapperH,this._scrollBarH,b.d.w,b.c.w,0);this.createMask()},createMask:function(){h("mask-image")&&(this._scrollBarWrapperV&&y.createRoundMask(this._scrollBarWrapperV,0,0,0,0,5,this._scrollBarWrapperV.offsetHeight,2,2,0.5),this._scrollBarWrapperH&&y.createRoundMask(this._scrollBarWrapperH,0,0,0,0,this._scrollBarWrapperH.offsetWidth,5,2,2,0.5))},flashScrollBar:function(){if(!this.disableFlashScrollBar&&this.domNode&&(this._dim=this.getDim(),!(0>=this._dim.d.h))){this.showScrollBar();
var a=this;setTimeout(function(){a.hideScrollBar()},300)}},addCover:function(){},removeCover:function(){},setKeyframes:function(a,b,c){p._rule||(p._rule=[]);if(!p._rule[c]){var e=t.create("style",null,g.doc.getElementsByTagName("head")[0]);e.textContent=".mblScrollableScrollTo"+c+"{"+f.name("animation-name",!0)+": scrollableViewScroll"+c+";}@"+f.name("keyframes",!0)+" scrollableViewScroll"+c+"{}";p._rule[c]=e.sheet.cssRules[1]}if(c=p._rule[c])a&&(c.deleteRule(h("webkit")?"from":0),(c.insertRule||
c.appendRule).call(c,"from { "+f.name("transform",!0)+": "+this.makeTranslateStr(a)+"; }")),b&&(void 0===b.x&&(b.x=a.x),void 0===b.y&&(b.y=a.y),c.deleteRule(h("webkit")?"to":1),(c.insertRule||c.appendRule).call(c,"to { "+f.name("transform",!0)+": "+this.makeTranslateStr(b)+"; }"))},setSelectable:function(a,b){a.style.KhtmlUserSelect=b?"auto":"none";a.style.MozUserSelect=b?"":"none";a.onselectstart=b?null:function(){return!1};if(h("ie")){a.unselectable=b?"":"on";for(var c=a.getElementsByTagName("*"),
e=0;e<c.length;e++)c[e].unselectable=b?"":"on"}}});v.setObject("dojox.mobile.scrollable",u);return u});
/// scrollable.js.map