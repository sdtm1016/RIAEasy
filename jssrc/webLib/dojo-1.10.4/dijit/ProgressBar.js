//>>built
require({cache:{"url:dijit/templates/ProgressBar.html":'\x3cdiv class\x3d"dijitProgressBar dijitProgressBarEmpty" role\x3d"progressbar"\n\t\x3e\x3cdiv  data-dojo-attach-point\x3d"internalProgress" class\x3d"dijitProgressBarFull"\n\t\t\x3e\x3cdiv class\x3d"dijitProgressBarTile" role\x3d"presentation"\x3e\x3c/div\n\t\t\x3e\x3cspan style\x3d"visibility:hidden"\x3e\x26#160;\x3c/span\n\t\x3e\x3c/div\n\t\x3e\x3cdiv data-dojo-attach-point\x3d"labelNode" class\x3d"dijitProgressBarLabel" id\x3d"${id}_label"\x3e\x3c/div\n\t\x3e\x3cspan data-dojo-attach-point\x3d"indeterminateHighContrastImage"\n\t\t   class\x3d"dijitInline dijitProgressBarIndeterminateHighContrastImage"\x3e\x3c/span\n\x3e\x3c/div\x3e\n'}});
define("dijit/ProgressBar","require dojo/_base/declare dojo/dom-class dojo/_base/lang dojo/number ./_Widget ./_TemplatedMixin dojo/text!./templates/ProgressBar.html".split(" "),function(e,f,d,g,h,k,l,m){return f("dijit.ProgressBar",[k,l],{progress:"0",value:"",maximum:100,places:0,indeterminate:!1,label:"",name:"",templateString:m,_indeterminateHighContrastImagePath:e.toUrl("./themes/a11y/indeterminate_progress.gif"),postMixInProperties:function(){this.inherited(arguments);this.params&&"value"in this.params||
(this.value=this.indeterminate?Infinity:this.progress)},buildRendering:function(){this.inherited(arguments);this.indeterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath.toString());this.update()},_setDirAttr:function(a){var b="rtl"==a.toLowerCase();d.toggle(this.domNode,"dijitProgressBarRtl",b);d.toggle(this.domNode,"dijitProgressBarIndeterminateRtl",this.indeterminate&&b);this.inherited(arguments)},update:function(a){g.mixin(this,a||{});a=this.internalProgress;
var b=this.domNode,c=1;this.indeterminate?b.removeAttribute("aria-valuenow"):(-1!=String(this.progress).indexOf("%")?(c=Math.min(parseFloat(this.progress)/100,1),this.progress=c*this.maximum):(this.progress=Math.min(this.progress,this.maximum),c=this.maximum?this.progress/this.maximum:0),b.setAttribute("aria-valuenow",this.progress));b.setAttribute("aria-labelledby",this.labelNode.id);b.setAttribute("aria-valuemin",0);b.setAttribute("aria-valuemax",this.maximum);this.labelNode.innerHTML=this.report(c);
d.toggle(this.domNode,"dijitProgressBarIndeterminate",this.indeterminate);d.toggle(this.domNode,"dijitProgressBarIndeterminateRtl",this.indeterminate&&!this.isLeftToRight());a.style.width=100*c+"%";this.onChange()},_setValueAttr:function(a){this._set("value",a);Infinity==a?this.update({indeterminate:!0}):this.update({indeterminate:!1,progress:a})},_setLabelAttr:function(a){this._set("label",a);this.update()},_setIndeterminateAttr:function(a){this._set("indeterminate",a);this.update()},report:function(a){return this.label?
this.label:this.indeterminate?"\x26#160;":h.format(a,{type:"percent",places:this.places,locale:this.lang})},onChange:function(){}})});
/// ProgressBar.js.map