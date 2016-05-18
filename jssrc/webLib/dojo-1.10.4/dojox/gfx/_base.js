//>>built
define("dojox/gfx/_base","dojo/_base/kernel dojo/_base/lang dojo/_base/Color dojo/_base/sniff dojo/_base/window dojo/_base/array dojo/dom dojo/dom-construct dojo/dom-geometry".split(" "),function(r,g,m,n,h,p,s,q,t){var d=g.getObject("dojox.gfx",!0),e=d._base={};d._hasClass=function(a,c){var b=a.getAttribute("className");return b&&0<=(" "+b+" ").indexOf(" "+c+" ")};d._addClass=function(a,c){var b=a.getAttribute("className")||"";if(!b||0>(" "+b+" ").indexOf(" "+c+" "))a.setAttribute("className",b+(b?
" ":"")+c)};d._removeClass=function(a,c){var b=a.getAttribute("className");b&&a.setAttribute("className",b.replace(RegExp("(^|\\s+)"+c+"(\\s+|$)"),"$1$2"))};e._getFontMeasurements=function(){var a={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,small:0,medium:0,large:0,"x-large":0,"xx-large":0},c,b;n("ie")&&(b=h.doc.documentElement.style.fontSize||"",b||(h.doc.documentElement.style.fontSize="100%"));var f=q.create("div",{style:{position:"absolute",left:"0",top:"-100px",width:"30px",
height:"1000em",borderWidth:"0",margin:"0",padding:"0",outline:"none",lineHeight:"1",overflow:"hidden"}},h.body());for(c in a)f.style.fontSize=c,a[c]=16*Math.round(12*f.offsetHeight/16)/12/1E3;n("ie")&&(h.doc.documentElement.style.fontSize=b);h.body().removeChild(f);return a};var k=null;e._getCachedFontMeasurements=function(a){if(a||!k)k=e._getFontMeasurements();return k};var l=null,u={};e._getTextBox=function(a,c,b){var f,d,e=arguments.length,g;l||(l=q.create("div",{style:{position:"absolute",top:"-10000px",
left:"0",visibility:"hidden"}},h.body()));f=l;f.className="";d=f.style;d.borderWidth="0";d.margin="0";d.padding="0";d.outline="0";if(1<e&&c)for(g in c)g in u||(d[g]=c[g]);2<e&&b&&(f.className=b);f.innerHTML=a;f.getBoundingClientRect?(d=f.getBoundingClientRect(),d={l:d.left,t:d.top,w:d.width||d.right-d.left,h:d.height||d.bottom-d.top}):d=t.getMarginBox(f);f.innerHTML="";return d};e._computeTextLocation=function(a,c,b,d){var e={};switch(a.align){case "end":e.x=a.x-c;break;case "middle":e.x=a.x-c/2;
break;default:e.x=a.x}e.y=a.y-b*(d?0.75:1);return e};e._computeTextBoundingBox=function(a){if(!d._base._isRendered(a))return{x:0,y:0,width:0,height:0};var c;c=a.getShape();var b=a.getFont()||d.defaultFont;a=a.getTextWidth();b=d.normalizedLength(b.size);c=e._computeTextLocation(c,a,b,!0);return{x:c.x,y:c.y,width:a,height:b}};e._isRendered=function(a){for(a=a.parent;a&&a.getParent;)a=a.parent;return null!==a};var v=0;e._getUniqueId=function(){var a;do a=r._scopeName+"xUnique"+ ++v;while(s.byId(a));
return a};e._fixMsTouchAction=function(a){a=a.rawNode;"undefined"!=typeof a.style.msTouchAction&&(a.style.msTouchAction="none")};g.mixin(d,{defaultPath:{type:"path",path:""},defaultPolyline:{type:"polyline",points:[]},defaultRect:{type:"rect",x:0,y:0,width:100,height:100,r:0},defaultEllipse:{type:"ellipse",cx:0,cy:0,rx:200,ry:100},defaultCircle:{type:"circle",cx:0,cy:0,r:100},defaultLine:{type:"line",x1:0,y1:0,x2:100,y2:100},defaultImage:{type:"image",x:0,y:0,width:0,height:0,src:""},defaultText:{type:"text",
x:0,y:0,text:"",align:"start",decoration:"none",rotated:!1,kerning:!0},defaultTextPath:{type:"textpath",text:"",align:"start",decoration:"none",rotated:!1,kerning:!0},defaultStroke:{type:"stroke",color:"black",style:"solid",width:1,cap:"butt",join:4},defaultLinearGradient:{type:"linear",x1:0,y1:0,x2:100,y2:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultRadialGradient:{type:"radial",cx:0,cy:0,r:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultPattern:{type:"pattern",
x:0,y:0,width:0,height:0,src:""},defaultFont:{type:"font",style:"normal",variant:"normal",weight:"normal",size:"10pt",family:"serif"},getDefault:function(){var a={};return function(c){var b=a[c];if(b)return new b;b=a[c]=new Function;b.prototype=d["default"+c];return new b}}(),normalizeColor:function(a){return a instanceof m?a:new m(a)},normalizeParameters:function(a,c){var b;if(c){var d={};for(b in a)b in c&&!(b in d)&&(a[b]=c[b])}return a},makeParameters:function(a,c){var b=null;if(!c)return g.delegate(a);
var d={};for(b in a)b in d||(d[b]=g.clone(b in c?c[b]:a[b]));return d},formatNumber:function(a,c){var b=a.toString();if(0<=b.indexOf("e"))b=a.toFixed(4);else{var d=b.indexOf(".");0<=d&&5<b.length-d&&(b=a.toFixed(4))}return 0>a?b:c?" "+b:b},makeFontString:function(a){return a.style+" "+a.variant+" "+a.weight+" "+a.size+" "+a.family},splitFontString:function(a){var c=d.getDefault("Font");a=a.split(/\s+/);if(!(5>a.length)){c.style=a[0];c.variant=a[1];c.weight=a[2];var b=a[3].indexOf("/");c.size=0>b?
a[3]:a[3].substring(0,b);var e=4;0>b&&("/"==a[4]?e=6:"/"==a[4].charAt(0)&&(e=5));e<a.length&&(c.family=a.slice(e).join(" "))}return c},cm_in_pt:72/2.54,mm_in_pt:7.2/2.54,px_in_pt:function(){return d._base._getCachedFontMeasurements()["12pt"]/12},pt2px:function(a){return a*d.px_in_pt()},px2pt:function(a){return a/d.px_in_pt()},normalizedLength:function(a){if(0===a.length)return 0;if(2<a.length){var c=d.px_in_pt(),b=parseFloat(a);switch(a.slice(-2)){case "px":return b;case "pt":return b*c;case "in":return 72*
b*c;case "pc":return 12*b*c;case "mm":return b*d.mm_in_pt*c;case "cm":return b*d.cm_in_pt*c}}return parseFloat(a)},pathVmlRegExp:/([A-Za-z]+)|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,pathSvgRegExp:/([A-DF-Za-df-z])|([-+]?\d*[.]?\d+(?:[eE][-+]?\d+)?)/g,equalSources:function(a,c){return a&&c&&a===c},switchTo:function(a){var c="string"==typeof a?d[a]:a;c&&(p.forEach("Group Rect Ellipse Circle Line Polyline Image Text Path TextPath Surface createSurface fixTarget".split(" "),function(a){d[a]=c[a]}),
"string"==typeof a?d.renderer=a:p.some(["svg","vml","canvas","canvasWithEvents","silverlight"],function(a){return d.renderer=d[a]&&d[a].Surface===d.Surface?a:null}))}});return d});
/// _base.js.map