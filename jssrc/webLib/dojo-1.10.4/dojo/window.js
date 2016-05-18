//>>built
define("dojo/window","./_base/lang ./sniff ./_base/window ./dom ./dom-geometry ./dom-style ./dom-construct".split(" "),function(y,d,q,H,l,C,r){d.add("rtl-adjust-position-for-verticalScrollBar",function(b,d){var e=q.body(d),f=r.create("div",{style:{overflow:"scroll",overflowX:"visible",direction:"rtl",visibility:"hidden",position:"absolute",left:"0",top:"0",width:"64px",height:"64px"}},e,"last"),h=r.create("div",{style:{overflow:"hidden",direction:"ltr"}},f,"last"),g=0!=l.position(h).x;f.removeChild(h);
e.removeChild(f);return g});d.add("position-fixed-support",function(b,d){var e=q.body(d),f=r.create("span",{style:{visibility:"hidden",position:"fixed",left:"1px",top:"1px"}},e,"last"),h=r.create("span",{style:{position:"fixed",left:"0",top:"0"}},f,"last"),g=l.position(h).x!=l.position(f).x;f.removeChild(h);e.removeChild(f);return g});var m={getBox:function(b){b=b||q.doc;var d="BackCompat"==b.compatMode?q.body(b):b.documentElement,e=l.docScroll(b);b=m.get(b);return{l:e.x,t:e.y,w:b.innerWidth||d.clientWidth,
h:b.innerHeight||d.clientHeight}},get:function(b){if(d("ie")&&m!==document.parentWindow){b.parentWindow.execScript("document._parentWindow \x3d window;","Javascript");var l=b._parentWindow;b._parentWindow=null;return l}return b.parentWindow||b.defaultView},scrollIntoView:function(b,r){try{b=H.byId(b);var e=b.ownerDocument||q.doc,f=q.body(e),h=e.documentElement||f.parentNode,g=d("ie"),s=d("webkit");if(!(b==f||b==h))if(!d("mozilla")&&(!g&&!s&&!d("opera")&&!d("trident"))&&"scrollIntoView"in b)b.scrollIntoView(!1);
else{var m="BackCompat"==e.compatMode,z=Math.min(f.clientWidth||h.clientWidth,h.clientWidth||f.clientWidth),A=Math.min(f.clientHeight||h.clientHeight,h.clientHeight||f.clientHeight),e=s||m?f:h,n=r||l.position(b),c=b.parentNode,s=function(a){return 6>=g||7==g&&m?!1:d("position-fixed-support")&&"fixed"==C.get(a,"position").toLowerCase()},y=this,D=function(a,b,c){"BODY"==a.tagName||"HTML"==a.tagName?y.get(a.ownerDocument).scrollBy(b,c):(b&&(a.scrollLeft+=b),c&&(a.scrollTop+=c))};if(!s(b))for(;c;){c==
f&&(c=e);var a=l.position(c),E=s(c),B="rtl"==C.getComputedStyle(c).direction.toLowerCase();if(c==e){a.w=z;a.h=A;if(e==h&&(g||d("trident"))&&B)a.x+=e.offsetWidth-a.w;if(0>a.x||!g||9<=g||d("trident"))a.x=0;if(0>a.y||!g||9<=g||d("trident"))a.y=0}else{var t=l.getPadBorderExtents(c);a.w-=t.w;a.h-=t.h;a.x+=t.l;a.y+=t.t;var p=c.clientWidth,u=a.w-p;0<p&&0<u&&(B&&d("rtl-adjust-position-for-verticalScrollBar")&&(a.x+=u),a.w=p);p=c.clientHeight;u=a.h-p;0<p&&0<u&&(a.h=p)}E&&(0>a.y&&(a.h+=a.y,a.y=0),0>a.x&&(a.w+=
a.x,a.x=0),a.y+a.h>A&&(a.h=A-a.y),a.x+a.w>z&&(a.w=z-a.x));var v=n.x-a.x,w=n.y-a.y,F=v+n.w-a.w,G=w+n.h-a.h,k,x;if(0<F*v&&(c.scrollLeft||c==e||c.scrollWidth>c.offsetHeight)){k=Math[0>v?"max":"min"](v,F);if(B&&(8==g&&!m||9<=g||d("trident")))k=-k;x=c.scrollLeft;D(c,k,0);k=c.scrollLeft-x;n.x-=k}if(0<G*w&&(c.scrollTop||c==e||c.scrollHeight>c.offsetHeight))k=Math.ceil(Math[0>w?"max":"min"](w,G)),x=c.scrollTop,D(c,0,k),k=c.scrollTop-x,n.y-=k;c=c!=e&&!E&&c.parentNode}}}catch(I){console.error("scrollIntoView: "+
I),b.scrollIntoView(!1)}}};y.setObject("dojo.window",m);return m});
/// window.js.map