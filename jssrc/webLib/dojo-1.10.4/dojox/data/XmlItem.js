//>>built
define("dojox/data/XmlItem",["dojo/_base/declare"],function(d){return d("dojox.data.XmlItem",null,{constructor:function(a,b,c){this.element=a;this.store=b;this.q=c},toString:function(){var a="";if(this.element)for(var b=0;b<this.element.childNodes.length;b++){var c=this.element.childNodes[b];if(3===c.nodeType||4===c.nodeType)a+=c.nodeValue}return a}})});
/// XmlItem.js.map