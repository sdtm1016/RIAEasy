//>>built
define("dojo/_base/xhr","./kernel ./sniff require ../io-query ../dom ../dom-form ./Deferred ./config ./json ./lang ./array ../on ../aspect ../request/watch ../request/xhr ../request/util".split(" "),function(b,r,G,p,y,l,z,A,u,n,B,H,v,m,w,C){b._xhrObj=w._create;var s=b.config;b.objectToQuery=p.objectToQuery;b.queryToObject=p.queryToObject;b.fieldToObject=l.fieldToObject;b.formToObject=l.toObject;b.formToQuery=l.toQuery;b.formToJson=l.toJson;b._blockAsync=!1;var q=b._contentHandlers=b.contentHandlers=
{text:function(a){return a.responseText},json:function(a){return u.fromJson(a.responseText||null)},"json-comment-filtered":function(a){A.useCommentedJson||console.warn("Consider using the standard mimetype:application/json. json-commenting can introduce security issues. To decrease the chances of hijacking, use the standard the 'json' handler and prefix your json with: {}\x26\x26\nUse djConfig.useCommentedJson\x3dtrue to turn off this message.");a=a.responseText;var b=a.indexOf("/*"),f=a.lastIndexOf("*/");
if(-1==b||-1==f)throw Error("JSON was not comment filtered");return u.fromJson(a.substring(b+2,f))},javascript:function(a){return b.eval(a.responseText)},xml:function(a){var b=a.responseXML;b&&(r("dom-qsa2.1")&&!b.querySelectorAll&&r("dom-parser"))&&(b=(new DOMParser).parseFromString(a.responseText,"application/xml"));if(r("ie")&&(!b||!b.documentElement)){var f=function(a){return"MSXML"+a+".DOMDocument"},f=["Microsoft.XMLDOM",f(6),f(4),f(3),f(2)];B.some(f,function(f){try{var c=new ActiveXObject(f);
c.async=!1;c.loadXML(a.responseText);b=c}catch(g){return!1}return!0})}return b},"json-comment-optional":function(a){return a.responseText&&/^[^{\[]*\/\*/.test(a.responseText)?q["json-comment-filtered"](a):q.json(a)}};b._ioSetArgs=function(a,d,f,D){var c={args:a,url:a.url},g=null;if(a.form){var g=y.byId(a.form),h=g.getAttributeNode("action");c.url=c.url||(h?h.value:null);g=l.toObject(g)}h=[{}];g&&h.push(g);a.content&&h.push(a.content);a.preventCache&&h.push({"dojo.preventCache":(new Date).valueOf()});
c.query=p.objectToQuery(n.mixin.apply(null,h));c.handleAs=a.handleAs||"text";var k=new z(function(a){a.canceled=!0;d&&d(a);var b=a.ioArgs.error;b||(b=Error("request cancelled"),b.dojoType="cancel",a.ioArgs.error=b);return b});k.addCallback(f);var t=a.load;t&&n.isFunction(t)&&k.addCallback(function(b){return t.call(a,b,c)});var e=a.error;e&&n.isFunction(e)&&k.addErrback(function(b){return e.call(a,b,c)});var m=a.handle;m&&n.isFunction(m)&&k.addBoth(function(b){return m.call(a,b,c)});k.addErrback(function(a){return D(a,
k)});s.ioPublish&&(b.publish&&!1!==c.args.ioPublish)&&(k.addCallbacks(function(a){b.publish("/dojo/io/load",[k,a]);return a},function(a){b.publish("/dojo/io/error",[k,a]);return a}),k.addBoth(function(a){b.publish("/dojo/io/done",[k,a]);return a}));k.ioArgs=c;return k};var E=function(a){a=q[a.ioArgs.handleAs](a.ioArgs.xhr);return void 0===a?null:a},F=function(a,b){b.ioArgs.args.failOk||console.error(a);return a},x=function(a){0>=e&&(e=0,s.ioPublish&&(b.publish&&(!a||a&&!1!==a.ioArgs.args.ioPublish))&&
b.publish("/dojo/io/stop"))},e=0;v.after(m,"_onAction",function(){e-=1});v.after(m,"_onInFlight",x);b._ioCancelAll=m.cancelAll;b._ioNotifyStart=function(a){s.ioPublish&&(b.publish&&!1!==a.ioArgs.args.ioPublish)&&(e||b.publish("/dojo/io/start"),e+=1,b.publish("/dojo/io/send",[a]))};b._ioWatch=function(a,b,f,e){a.ioArgs.options=a.ioArgs.args;n.mixin(a,{response:a.ioArgs,isValid:function(c){return b(a)},isReady:function(b){return f(a)},handleResponse:function(b){return e(a)}});m(a);x(a)};b._ioAddQueryToUrl=
function(a){a.query.length&&(a.url+=(-1==a.url.indexOf("?")?"?":"\x26")+a.query,a.query=null)};b.xhr=function(a,d,f){var e,c=b._ioSetArgs(d,function(a){e&&e.cancel()},E,F),g=c.ioArgs;"postData"in d?g.query=d.postData:"putData"in d?g.query=d.putData:"rawBody"in d?g.query=d.rawBody:(2<arguments.length&&!f||-1==="POST|PUT".indexOf(a.toUpperCase()))&&b._ioAddQueryToUrl(g);var h={method:a,handleAs:"text",timeout:d.timeout,withCredentials:d.withCredentials,ioArgs:g};"undefined"!==typeof d.headers&&(h.headers=
d.headers);"undefined"!==typeof d.contentType&&(h.headers||(h.headers={}),h.headers["Content-Type"]=d.contentType);"undefined"!==typeof g.query&&(h.data=g.query);"undefined"!==typeof d.sync&&(h.sync=d.sync);b._ioNotifyStart(c);try{e=w(g.url,h,!0)}catch(k){return c.cancel(),c}c.ioArgs.xhr=e.response.xhr;e.then(function(){c.resolve(c)}).otherwise(function(a){g.error=a;a.response&&(a.status=a.response.status,a.responseText=a.response.text,a.xhr=a.response.xhr);c.reject(a)});return c};b.xhrGet=function(a){return b.xhr("GET",
a)};b.rawXhrPost=b.xhrPost=function(a){return b.xhr("POST",a,!0)};b.rawXhrPut=b.xhrPut=function(a){return b.xhr("PUT",a,!0)};b.xhrDelete=function(a){return b.xhr("DELETE",a)};b._isDocumentOk=function(a){return C.checkStatus(a.status)};b._getText=function(a){var d;b.xhrGet({url:a,sync:!0,load:function(a){d=a}});return d};n.mixin(b.xhr,{_xhrObj:b._xhrObj,fieldToObject:l.fieldToObject,formToObject:l.toObject,objectToQuery:p.objectToQuery,formToQuery:l.toQuery,formToJson:l.toJson,queryToObject:p.queryToObject,
contentHandlers:q,_ioSetArgs:b._ioSetArgs,_ioCancelAll:b._ioCancelAll,_ioNotifyStart:b._ioNotifyStart,_ioWatch:b._ioWatch,_ioAddQueryToUrl:b._ioAddQueryToUrl,_isDocumentOk:b._isDocumentOk,_getText:b._getText,get:b.xhrGet,post:b.xhrPost,put:b.xhrPut,del:b.xhrDelete});return b.xhr});
/// xhr.js.map