//>>built
define("dojox/widget/rotator/PanFade","dojo/_base/array dojo/_base/connect dojo/_base/lang dojo/_base/fx dojo/dom-style dojo/fx".split(" "),function(x,t,n,g,r,u){function m(a,c){var k={node:c.current.node,duration:c.duration,easing:c.easing},e={node:c.next.node,duration:c.duration,easing:c.easing},h=c.rotatorBox,b=a%2,f=b?"left":"top",h=(b?h.w:h.h)*(2>a?-1:1),b={},d={};r.set(e.node,{display:"",opacity:0});b[f]={start:0,end:-h};d[f]={start:h,end:0};return u.combine([g.animateProperty(n.mixin({properties:b},
k)),g.fadeOut(k),g.animateProperty(n.mixin({properties:d},e)),g.fadeIn(e)])}function v(a,c){r.set(a,"zIndex",c)}var p={panFade:function(a){var c=a.wrap,k=a.rotator.panes,e=k.length,h=e,b=a.current.idx,f=a.next.idx,d=Math.abs(f-b),l=Math.abs(e-Math.max(b,f)+Math.min(b,f))%e,g=b<f,q=3,p=[],w=[],s=a.duration;if(!c&&!g||c&&(g&&d>l||!g&&d<l))q=1;if(a.continuous){a.quick&&(s=Math.round(s/(c?Math.min(l,d):d)));v(k[b].node,h--);for(c=3==q;;){d=b;c?++b>=e&&(b=0):0>--b&&(b=e-1);d=k[d];l=k[b];v(l.node,h--);
p.push(m(q,n.mixin({easing:function(a){return a}},a,{current:d,next:l,duration:s})));if(c&&b==f||!c&&b==f)break;w.push(l.node)}a=u.chain(p);var y=t.connect(a,"onEnd",function(){t.disconnect(y);x.forEach(w,function(a){r.set(a,{display:"none",left:0,opacity:1,top:0,zIndex:0})})});return a}return m(q,a)},panFadeDown:function(a){return m(0,a)},panFadeRight:function(a){return m(1,a)},panFadeUp:function(a){return m(2,a)},panFadeLeft:function(a){return m(3,a)}};n.mixin(n.getObject("dojox.widget.rotator"),
p);return p});
/// PanFade.js.map