//>>built
define("dojox/store/db/IndexedDB","dojo/_base/declare dojo/_base/lang dojo/Deferred dojo/when dojo/promise/all dojo/store/util/SimpleQueryEngine dojo/store/util/QueryResults".split(" "),function(x,K,L,F,M,G,P){function y(a){var b=new L;a.onsuccess=function(a){b.resolve(a.target.result)};a.onerror=function(){a.error.message=a.webkitErrorMessage;b.reject(a.error)};return b.promise}function A(a,b,c){if(h||u.length){a&&(u.push({cursor:a,priority:b,retry:c}),u.sort(function(a,b){return a.priority>b.priority?
1:-1}));if(h>=Q)return;var e=u.pop();a=e&&e.cursor}if(a)try{a["continue"](),h++}catch(f){if(("TransactionInactiveError"===f.name||0===f.name)&&e)e.retry();else throw f;}}function R(){return!0}function N(a){function b(b,d){e?b&&c.then(function(a){a.forEach(b,d)}):(b&&f.push(b),c||(c=a.filter(function(a){e=!0;for(var b=0,c=f.length;b<c;b++)f[b].call(d,a);return!0})));return c}var c,e,f=[];return{total:a.total,filter:function(a,d){var c;return b(function(b){c||(c=!a.call(d,b))})},forEach:b,map:function(a,
c){var f=[];return b(function(b){f.push(a.call(c,b))}).then(function(){return f})},then:function(a,c){return b().then(a,c)}}}var u=[],Q=1,h=0,H=/(.*)\*$/,n=window.IDBKeyRange||window.webkitIDBKeyRange;return x(null,{constructor:function(a){x.safeMixin(this,a);var b=this,c=this.dbConfig;this.indices=c.stores[this.storeName];this.cachedCount={};for(var e in b.indices)a=b.indices[e],"number"===typeof a&&(b.indices[e]={preference:a});this.db=this.db||c.db;if(!this.db){var f=c.openRequest;f||(f=c.openRequest=
window.indexedDB.open(c.name||"dojo-db",parseInt(c.version,10)),f.onupgradeneeded=function(){var a=b.db=f.result,d;for(d in c.stores){var e=c.stores[d];if(a.objectStoreNames.contains(d))p=f.transaction.objectStore(d);else var p=e.idProperty||"id",p=a.createObjectStore(d,{keyPath:p,autoIncrement:e[p]&&e[p].autoIncrement||!1});for(var k in e)!p.indexNames.contains(k)&&("autoIncrement"!==k&&!1!==e[k].indexed)&&p.createIndex(k,k,e[k])}},c.available=y(f));this.available=c.available.then(function(a){return b.db=
a})}},idProperty:"id",storeName:"",indices:{},queryEngine:G,transaction:function(){var a=this;this._currentTransaction=null;return{abort:function(){a._currentTransaction.abort()},commit:function(){a._currentTransaction=null}}},_getTransaction:function(){if(!this._currentTransaction){this._currentTransaction=this.db.transaction([this.storeName],"readwrite");var a=this;this._currentTransaction.oncomplete=function(){a._currentTransaction=null};this._currentTransaction.onerror=function(a){console.error(a)}}return this._currentTransaction},
_callOnStore:function(a,b,c,e){var f=this;return F(this.available,function d(){var h=f._currentTransaction;if(h)var p=!0;else h=f._getTransaction();var k,m;if(p)try{m=h.objectStore(f.storeName),c&&(m=m.index(c)),k=m[a].apply(m,b)}catch(n){if("TransactionInactiveError"===n.name||"InvalidStateError"===n.name)return f._currentTransaction=null,d();throw n;}else m=h.objectStore(f.storeName),c&&(m=m.index(c)),k=m[a].apply(m,b);return e?k:y(k)})},get:function(a){return this._callOnStore("get",[a])},getIdentity:function(a){return a[this.idProperty]},
put:function(a,b){b=b||{};this.cachedCount={};return this._callOnStore(!1===b.overwrite?"add":"put",[a])},add:function(a,b){b=b||{};b.overwrite=!1;return this.put(a,b)},remove:function(a){this.cachedCount={};return this._callOnStore("delete",[a])},query:function(a,b){function c(a,b,c){B++;var e=d.indices[a];if(e&&!1!==e.indexed&&(b=b||e.preference*(c||1)||0.001,b>y))return y=b,r=a,!0;B++}b=b||{};var e=b.start||0,f=b.count||Infinity,q=b.sort,d=this;if(a.forEach){var u={sort:q},p=this.queryEngine({},
u),k=[],m=0,x=0;return N({total:{then:function(){return M(k).then(function(a){return a.reduce(function(a,b){return a+b})*m/(x||1)}).then.apply(this,arguments)}},filter:function(b,c){var g=0,I=[],l,h={},n=[];return M(a.map(function(a,q){function r(a){t.push(a);for(var d=[],h=[];I.every(function(a){if(0<a.length)return(a=a[0])&&h.push(a),d.push(a)});){if(g>=e+f||0===h.length){l=!0;return}a=p(h)[0];I[d.indexOf(a)].shift();if(g++>=e&&(n.push(a),!b.call(c,a))){l=!0;return}d=[];h=[]}return!0}var t=I[q]=
[],s=d.query(a,u);k[q]=s.total;return s.filter(function(a){if(!l){var b=d.getIdentity(a);x++;if(b in h)return!0;m++;h[b]=!0;return r(a)}}).then(function(a){r(null);return a})})).then(function(){return n})}})}var z,C=JSON.stringify(a)+"-"+JSON.stringify(b.sort),s,r,y=0,B=0,g,D;for(D in a){g=a[D];var O=!1,v,w=null;if("boolean"!==typeof g){if(g)if(g.from||g.to)O=!0,function(a,b){w={test:function(c){return!a||a<=c&&(!b||b>=c)},keyRange:a?b?n.bound(a,b,g.excludeFrom,g.excludeTo):n.lowerBound(a,g.excludeFrom):
n.upperBound(b,g.excludeTo)}}(g.from,g.to);else if("object"===typeof g&&g.contains)(function(a){var b,c=(b=a[0])&&b.match&&b.match(H);c?(b=c[1],b=n.bound(b,b+"~")):b=n.only(b);w={test:function(b){return a.every(function(a){var c=a&&a.match&&a.match(H);return c?(a=c[1],b&&b.some(function(b){return b.slice(0,a.length)===a})):b&&-1<b.indexOf(a)})},keyRange:b}})(g.contains);else if(v=g.match&&g.match(H))v=v[1],w=RegExp("^"+v),w.keyRange=n.bound(v,v+"~");w&&(a[D]=w);c(D,null,O?0.1:1)}}var t;if(q)if(q=
q[0],q.attribute===r||c(q.attribute,1))t=q.descending;else var E=!0,e=0,f=Infinity;var J;r?(z=r in a?(g=a[r])&&g.keyRange?g.keyRange:n.only(g):null,J=[z,t?"prev":"next"]):J=[];var l=d.cachedPosition;l&&l.queryId===C&&l.offset<e&&1<B?(s=l.preFilterOffset+1,d.cachedPosition=l=K.mixin({},l)):(l=d.cachedPosition={offset:-1,preFilterOffset:-1,queryId:C},2>B&&(l.offset=l.preFilterOffset=(s=e)-1));var G=this.queryEngine(a);t={total:{then:function(a){function b(a){d.cachedCount[C]=a;return Math.round((l.offset+
1.01)/(l.preFilterOffset+1.01)*a)}var c=d.cachedCount[C];return c?a(b(c)):(this.then=(z?d._callOnStore("count",[z],r):d._callOnStore("count")).then(b)).then.apply(this,arguments)}},filter:function(a,c){function g(){F(d._callOnStore("openCursor",J,r,!0),function(d){h++;d.onsuccess=function(p){h--;var m=p.target.result;if(m){if(s){m.advance(s);h++;s=!1;return}l.preFilterOffset++;try{var q=m.value;b.join&&(q=b.join(q));return F(q,function(h){if(G.matches(h)&&(l.offset++,l.offset>=e&&(n.push(h),!a.call(c,
h)||l.offset>=e+f-1))){d.lastCursor=m;k.resolve(n);A();return}return A(m,b.priority,function(){s=l.preFilterOffset;g()})})}catch(r){k.reject(r)}}else k.resolve(n);A()};d.onerror=function(a){h--;k.reject(a);A()}})}var k=new L,n=[];g();return k.promise}};return E?(p=this.queryEngine({},b),E=K.delegate(t.filter(R).then(function(a){return p(a)})),E.total=t.total,new P(E)):b.rawResults?t:N(t)}})});
/// IndexedDB.js.map