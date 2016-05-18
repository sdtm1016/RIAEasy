//>>built
define("dojox/encoding/digests/_sha-64",["./_sha-32"],function(x){function f(a,b){a.h=b.h;a.l=b.l}function C(a,b,e){a.l=b.l>>>e|b.h<<32-e;a.h=b.h>>>e|b.l<<32-e}function I(a,b,e){a.l=b.h>>>e|b.l<<32-e;a.h=b.l>>>e|b.h<<32-e}function q(a,b,e){var f=(b.l&65535)+(e.l&65535),c=(b.l>>>16)+(e.l>>>16)+(f>>>16),d=(b.h&65535)+(e.h&65535)+(c>>>16);b=(b.h>>>16)+(e.h>>>16)+(d>>>16);a.l=f&65535|c<<16;a.h=d&65535|b<<16}var a=function(a,b){return{h:a,l:b}},L=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,
3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),
a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,
106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),
a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)];return{outputTypes:x.outputTypes,stringToUtf8:function(a){return x.stringToUtf8(a)},toWord:function(a){return x.toWord(a)},
toHex:function(a){return x.toHex(a)},toBase64:function(a){return x.toBase64(a)},_toString:function(a){return x._toString(a)},digest:function(u,b,e,x){for(var c=[],d=0,A=e.length;d<A;d+=2)c.push(a(e[d],e[d+1]));A=a(0,0);e=a(0,0);for(var r=a(0,0),y=a(0,0),z=a(0,0),J=a(0,0),s=a(0,0),D=a(0,0),E=a(0,0),B=a(0,0),v=a(0,0),l=a(0,0),F=a(0,0),K=a(0,0),m=a(0,0),n=a(0,0),p=a(0,0),g=Array(80),d=0;80>d;d++)g[d]=a(0,0);u[b>>5]|=128<<24-(b&31);u[(b+128>>10<<5)+31]=b;for(d=0;d<u.length;d+=32){f(r,c[0]);f(y,c[1]);
f(z,c[2]);f(J,c[3]);f(s,c[4]);f(D,c[5]);f(E,c[6]);f(B,c[7]);for(b=0;16>b;b++)g[b].h=u[d+2*b],g[b].l=u[d+2*b+1];for(b=16;80>b;b++){C(m,g[b-2],19);I(n,g[b-2],29);var t=p,h=g[b-2];t.l=h.l>>>6|h.h<<26;t.h=h.h>>>6;l.l=m.l^n.l^p.l;l.h=m.h^n.h^p.h;C(m,g[b-15],1);C(n,g[b-15],8);t=p;h=g[b-15];t.l=h.l>>>7|h.h<<25;t.h=h.h>>>7;v.l=m.l^n.l^p.l;v.h=m.h^n.h^p.h;var t=g[b],k=g[b-7],w=g[b-16],h=(l.l&65535)+(k.l&65535)+(v.l&65535)+(w.l&65535),G=(l.l>>>16)+(k.l>>>16)+(v.l>>>16)+(w.l>>>16)+(h>>>16),H=(l.h&65535)+(k.h&
65535)+(v.h&65535)+(w.h&65535)+(G>>>16),k=(l.h>>>16)+(k.h>>>16)+(v.h>>>16)+(w.h>>>16)+(H>>>16);t.l=h&65535|G<<16;t.h=H&65535|k<<16}for(b=0;80>b;b++)F.l=s.l&D.l^~s.l&E.l,F.h=s.h&D.h^~s.h&E.h,C(m,s,14),C(n,s,18),I(p,s,9),l.l=m.l^n.l^p.l,l.h=m.h^n.h^p.h,C(m,r,28),I(n,r,2),I(p,r,7),v.l=m.l^n.l^p.l,v.h=m.h^n.h^p.h,K.l=r.l&y.l^r.l&z.l^y.l&z.l,K.h=r.h&y.h^r.h&z.h^y.h&z.h,t=A,k=L[b],w=g[b],h=(B.l&65535)+(l.l&65535)+(F.l&65535)+(k.l&65535)+(w.l&65535),G=(B.l>>>16)+(l.l>>>16)+(F.l>>>16)+(k.l>>>16)+(w.l>>>16)+
(h>>>16),H=(B.h&65535)+(l.h&65535)+(F.h&65535)+(k.h&65535)+(w.h&65535)+(G>>>16),k=(B.h>>>16)+(l.h>>>16)+(F.h>>>16)+(k.h>>>16)+(w.h>>>16)+(H>>>16),t.l=h&65535|G<<16,t.h=H&65535|k<<16,q(e,v,K),f(B,E),f(E,D),f(D,s),q(s,J,A),f(J,z),f(z,y),f(y,r),q(r,A,e);q(c[0],c[0],r);q(c[1],c[1],y);q(c[2],c[2],z);q(c[3],c[3],J);q(c[4],c[4],s);q(c[5],c[5],D);q(c[6],c[6],E);q(c[7],c[7],B)}u=[];384==x&&(c.length=6);d=0;for(A=c.length;d<A;d++)u[2*d]=c[d].h,u[2*d+1]=c[d].l;return u}}});
/// _sha-64.js.map