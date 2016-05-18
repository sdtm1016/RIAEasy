//>>built
define("dojox/json/ref","dojo/_base/array dojo/_base/json dojo/_base/kernel dojo/_base/lang dojo/date/stamp dojox".split(" "),function(E,t,H,z,B,w){z.getObject("json",!0,w);return w.json.ref={resolveJson:function(f,h){function p(d,C,k,a,r,l){var c,A,b;k=q in d?d[q]:k;if(q in d||void 0!==k&&a)k=(s+k).replace(x,"$2$3");a=l||d;if(void 0!==k){w&&(d.__id=k);if(h.schemas&&!(d instanceof Array)&&(b=k.match(/^(.+\/)[^\.\[]*$/)))r=h.schemas[b[1]];if(n[k]&&d instanceof Array==n[k]instanceof Array)a=n[k],delete a.$ref,
delete a._loadObject,A=!0;else if(b=r&&r.prototype)m.prototype=b,a=new m;n[k]=a;u&&(u[k]=h.time)}for(;r;){if(b=r.properties)for(c in d){var y=b[c];y&&("date-time"==y.format&&"string"==typeof d[c])&&(d[c]=B.fromISOString(d[c]))}r=r["extends"]}r=d.length;for(c in d){if(c==r)break;if(d.hasOwnProperty(c)){b=d[c];if("object"==typeof b&&b&&!(b instanceof Date)&&"__parent"!=c){g=b[v]||t&&b[q];if((!g||!b.__parent)&&d!=e)b.__parent=a;if(g)if(delete d[c],l=g.toString().replace(/(#)([^\.\[])/,"$1.$2").match(/(^([^\[]*\/)?[^#\.\[]*)#?([\.\[].*)?/),
n[(s+g).replace(x,"$2$3")]?g=n[(s+g).replace(x,"$2$3")]:(g="$"==l[1]||"this"==l[1]||""==l[1]?f:n[(s+l[1]).replace(x,"$2$3")])&&l[3]&&l[3].replace(/(\[([^\]]+)\])|(\.?([^\.\[]+))/g,function(a,c,b,d,e){g=g&&g[b?b.replace(/[\"\'\\]/,""):e]}),g)b=g;else{if(!C){var D;D||e.push(a);D=!0;b=p(b,!1,b[v],!0,y);b._loadObject=h.loader}}else C||(b=p(b,e==d,void 0===k?void 0:G(k,c),!1,y,a!=d&&"object"==typeof a[c]&&a[c]))}d[c]=b;if(a!=d&&!a.__isDirty&&(l=a[c],a[c]=b,A&&b!==l&&!a._loadObject&&!("_"==c.charAt(0)&&
"_"==c.charAt(1))&&"$ref"!=c&&!(b instanceof Date&&l instanceof Date&&b.getTime()==l.getTime())&&!("function"==typeof b&&"function"==typeof l&&b.toString()==l.toString())&&n.onUpdate))n.onUpdate(a,c,l,b)}}if(A&&(q in d||a instanceof Array))for(c in a){if(!a.__isDirty&&a.hasOwnProperty(c)&&!d.hasOwnProperty(c)&&!("_"==c.charAt(0)&&"_"==c.charAt(1))&&!(a instanceof Array&&isNaN(c))){if(n.onUpdate&&"_loadObject"!=c&&"_idAttr"!=c)n.onUpdate(a,c,a[c],void 0);for(delete a[c];a instanceof Array&&a.length&&
void 0===a[a.length-1];)a.length--}}else if(n.onLoad)n.onLoad(a);return a}h=h||{};var q=h.idAttribute||"id",v=this.refAttribute,t=h.idAsRef,s=h.idPrefix||"",w=h.assignAbsoluteIds,n=h.index||{},u=h.timeStamps,g,e=[],x=/^(.*\/)?(\w+:\/\/)|[^\/\.]+\/\.\.\/|^.*\/(\/)/,G=this._addProp,m=function(){};f&&"object"==typeof f&&(f=p(f,!1,h.defaultId,!0),p(e,!1));return f},fromJson:function(f,h){try{var p=eval("("+f+")")}catch(q){throw new SyntaxError("Invalid JSON string: "+q.message+" parsing: "+f);}return p?
this.resolveJson(p,h):p},toJson:function(f,h,p,q){function v(e,f,g){if("object"==typeof e&&e){if(e instanceof Date)return'"'+B.toISOString(e,{zulu:!0})+'"';var m=e.__id;if(m){if("#"!=f&&(z&&!m.match(/#/)||n[m]))return g=m,"#"!=m.charAt(0)&&(g=e.__clientId==m?"cid:"+m:m.substring(0,p.length)==p?m.substring(p.length):m),e={},e[F]=g,t.toJson(e,h);f=m}else e.__id=f,u[f]=e;n[f]=e;g=g||"";var d=h?g+t.toJsonIndentStr:"",q=h?"\n":"",m=h?" ":"";if(e instanceof Array)return"["+E.map(e,function(a,e){var b=v(a,
s(f,e),d);"string"!=typeof b&&(b="undefined");return q+d+b}).join(","+m)+q+g+"]";var k=[],a;for(a in e)if(e.hasOwnProperty(a)){var r;if("number"==typeof a)r='"'+a+'"';else if("string"==typeof a&&("_"!=a.charAt(0)||"_"!=a.charAt(1)))r=t._escapeString(a);else continue;var l=v(e[a],s(f,a),d);"string"==typeof l&&k.push(q+d+r+":"+m+l)}return"{"+k.join(","+m)+q+g+"}"}return"function"==typeof e&&w.json.ref.serializeFunctions?e.toString():t.toJson(e)}var z=this._useRefs,s=this._addProp,F=this.refAttribute;
p=p||"";var n={},u={};f=v(f,"#","");if(!q)for(var g in u)delete u[g].__id;return f},_addProp:function(f,h){return f+(f.match(/#/)?1==f.length?"":".":"#")+h},refAttribute:"$ref",_useRefs:!1,serializeFunctions:!1}});
/// ref.js.map