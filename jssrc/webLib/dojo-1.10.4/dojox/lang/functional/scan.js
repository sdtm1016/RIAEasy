//>>built
define("dojox/lang/functional/scan",["dojo/_base/kernel","dojo/_base/lang","./lambda"],function(k,l,h){var m={};l.mixin(h,{scanl:function(a,g,d,c){"string"==typeof a&&(a=a.split(""));c=c||k.global;g=h.lambda(g);var e,f,b;if(l.isArray(a)){e=Array((f=a.length)+1);e[0]=d;for(b=0;b<f;d=g.call(c,d,a[b],b,a),e[++b]=d);}else if("function"==typeof a.hasNext&&"function"==typeof a.next){e=[d];for(b=0;a.hasNext();e.push(d=g.call(c,d,a.next(),b++,a)));}else for(b in e=[d],a)b in m||e.push(d=g.call(c,d,a[b],b,
a));return e},scanl1:function(a,g,d){"string"==typeof a&&(a=a.split(""));d=d||k.global;g=h.lambda(g);var c,e,f;e=!0;if(l.isArray(a)){c=Array(e=a.length);c[0]=f=a[0];for(var b=1;b<e;c[b]=f=g.call(d,f,a[b],b,a),++b);}else if("function"==typeof a.hasNext&&"function"==typeof a.next){if(a.hasNext()){c=[f=a.next()];for(b=1;a.hasNext();c.push(f=g.call(d,f,a.next(),b++,a)));}}else for(b in a)b in m||(e?(c=[f=a[b]],e=!1):c.push(f=g.call(d,f,a[b],b,a)));return c},scanr:function(a,g,d,c){"string"==typeof a&&
(a=a.split(""));c=c||k.global;g=h.lambda(g);var e=a.length,f=Array(e+1),b=e;for(f[e]=d;0<b;--b,d=g.call(c,d,a[b],b,a),f[b]=d);return f},scanr1:function(a,g,d){"string"==typeof a&&(a=a.split(""));d=d||k.global;g=h.lambda(g);var c=a.length,e=Array(c),f=a[c-1],c=c-1;for(e[c]=f;0<c;--c,f=g.call(d,f,a[c],c,a),e[c]=f);return e}})});
/// scan.js.map