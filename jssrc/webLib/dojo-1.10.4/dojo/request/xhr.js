//>>built
define("dojo/request/xhr",["../errors/RequestError","./watch","./handlers","./util","../has"],function(n,x,p,e,c){function y(a,b){var d=a.xhr;a.status=a.xhr.status;try{a.text=d.responseText}catch(c){}"xml"===a.options.handleAs&&(a.data=d.responseXML);if(!b)try{p(a)}catch(f){b=f}b?this.reject(b):e.checkStatus(d.status)?this.resolve(a):(b=new n("Unable to load "+a.url+" status: "+d.status,a),this.reject(b))}function z(a){return this.xhr.getResponseHeader(a)}function k(a,b,d){var u=c("native-formdata")&&
b&&b.data&&b.data instanceof FormData,f=e.parseArgs(a,e.deepCreate(A,b),u);a=f.url;b=f.options;var q,h=e.deferred(f,r,s,v,y,function(){q&&q()}),g=f.xhr=k._create();if(!g)return h.cancel(new n("XHR was not created")),d?h:h.promise;f.getHeader=z;t&&(q=t(g,h,f));var p=b.data,B=!b.sync,C=b.method;try{g.open(C,a,B,b.user||void 0,b.password||void 0);b.withCredentials&&(g.withCredentials=b.withCredentials);c("native-response-type")&&b.handleAs in w&&(g.responseType=w[b.handleAs]);var l=b.headers;a=u?!1:
"application/x-www-form-urlencoded";if(l)for(var m in l)"content-type"===m.toLowerCase()?a=l[m]:l[m]&&g.setRequestHeader(m,l[m]);a&&!1!==a&&g.setRequestHeader("Content-Type",a);(!l||!("X-Requested-With"in l))&&g.setRequestHeader("X-Requested-With","XMLHttpRequest");e.notify&&e.notify.emit("send",f,h.promise.cancel);g.send(p)}catch(D){h.reject(D)}x(h);g=null;return d?h:h.promise}c.add("native-xhr",function(){return"undefined"!==typeof XMLHttpRequest});c.add("dojo-force-activex-xhr",function(){return c("activex")&&
!document.addEventListener&&"file:"===window.location.protocol});c.add("native-xhr2",function(){if(c("native-xhr")){var a=new XMLHttpRequest;return"undefined"!==typeof a.addEventListener&&("undefined"===typeof opera||"undefined"!==typeof a.upload)}});c.add("native-formdata",function(){return"undefined"!==typeof FormData});c.add("native-response-type",function(){return c("native-xhr")&&"undefined"!==typeof(new XMLHttpRequest).responseType});c.add("native-xhr2-blob",function(){if(c("native-response-type")){var a=
new XMLHttpRequest;a.open("GET","/",!0);a.responseType="blob";var b=a.responseType;a.abort();return"blob"===b}});var w={blob:c("native-xhr2-blob")?"blob":"arraybuffer",document:"document",arraybuffer:"arraybuffer"},s,v,t,r;c("native-xhr2")?(s=function(a){return!this.isFulfilled()},r=function(a,b){b.xhr.abort()},t=function(a,b,d){function c(a){b.handleResponse(d)}function f(a){a=new n("Unable to load "+d.url+" status: "+a.target.status,d);b.handleResponse(d,a)}function e(a){a.lengthComputable?(d.loaded=
a.loaded,d.total=a.total,b.progress(d)):3===d.xhr.readyState&&(d.loaded=a.position,b.progress(d))}a.addEventListener("load",c,!1);a.addEventListener("error",f,!1);a.addEventListener("progress",e,!1);return function(){a.removeEventListener("load",c,!1);a.removeEventListener("error",f,!1);a.removeEventListener("progress",e,!1);a=null}}):(s=function(a){return a.xhr.readyState},v=function(a){return 4===a.xhr.readyState},r=function(a,b){var c=b.xhr,e=typeof c.abort;("function"===e||"object"===e||"unknown"===
e)&&c.abort()});var A={data:null,query:null,sync:!1,method:"GET"};k._create=function(){throw Error("XMLHTTP not available");};if(c("native-xhr")&&!c("dojo-force-activex-xhr"))k._create=function(){return new XMLHttpRequest};else if(c("activex"))try{new ActiveXObject("Msxml2.XMLHTTP"),k._create=function(){return new ActiveXObject("Msxml2.XMLHTTP")}}catch(E){try{new ActiveXObject("Microsoft.XMLHTTP"),k._create=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}catch(F){}}e.addCommonMethods(k);
return k});
/// xhr.js.map