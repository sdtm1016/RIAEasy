//>>built
define("dojox/analytics/plugins/mouseClick",["dojo/_base/lang","../_base","dojo/_base/config","dojo/_base/window","dojo/on"],function(f,g,h,k,l){return g.plugins.mouseClick=new function(){this.addData=f.hitch(g,"addData","mouseClick");this.targetProps=h.targetProps||"id className nodeName localName href spellcheck lang".split(" ");this.textContentMaxChars=h.textContentMaxChars||50;this.onClick=function(b){this.addData(this.trimEvent(b))};l(k.doc,"click",f.hitch(this,"onClick"));this.trimEvent=function(b){var e=
{},a;for(a in b)switch(a){case "target":case "originalTarget":case "explicitOriginalTarget":var d=this.targetProps;e[a]={};for(var c=0;c<d.length;c++)b[a][d[c]]&&("text"==d[c]||"textContent"==d[c]?"HTML"!=b[a].localName&&"BODY"!=b[a].localName&&(e[a][d[c]]=b[a][d[c]].substr(0,this.textContentMaxChars)):e[a][d[c]]=b[a][d[c]]);break;case "clientX":case "clientY":case "pageX":case "pageY":case "screenX":case "screenY":e[a]=b[a]}return e}}});
/// mouseClick.js.map