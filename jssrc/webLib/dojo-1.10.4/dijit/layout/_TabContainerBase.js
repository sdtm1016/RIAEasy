//>>built
require({cache:{"url:dijit/layout/templates/TabContainer.html":'\x3cdiv class\x3d"dijitTabContainer"\x3e\n\t\x3cdiv class\x3d"dijitTabListWrapper" data-dojo-attach-point\x3d"tablistNode"\x3e\x3c/div\x3e\n\t\x3cdiv data-dojo-attach-point\x3d"tablistSpacer" class\x3d"dijitTabSpacer ${baseClass}-spacer"\x3e\x3c/div\x3e\n\t\x3cdiv class\x3d"dijitTabPaneWrapper ${baseClass}-container" data-dojo-attach-point\x3d"containerNode"\x3e\x3c/div\x3e\n\x3c/div\x3e\n'}});
define("dijit/layout/_TabContainerBase","dojo/_base/declare dojo/dom-class dojo/dom-geometry dojo/dom-style ./StackContainer ./utils ../registry ../_TemplatedMixin dojo/text!./templates/TabContainer.html".split(" "),function(e,b,f,g,h,d,k,l,m){return e("dijit.layout._TabContainerBase",[h,l],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:!1,nested:!1,templateString:m,postMixInProperties:function(){this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,
"");this.srcNodeRef&&g.set(this.srcNodeRef,"visibility","hidden");this.inherited(arguments)},buildRendering:function(){this.inherited(arguments);this.tablist=this._makeController(this.tablistNode);this.doLayout||b.add(this.domNode,"dijitTabContainerNoLayout");this.nested?(b.add(this.domNode,"dijitTabContainerNested"),b.add(this.tablist.containerNode,"dijitTabContainerTabListNested"),b.add(this.tablistSpacer,"dijitTabContainerSpacerNested"),b.add(this.containerNode,"dijitTabPaneWrapperNested")):b.add(this.domNode,
"tabStrip-"+(this.tabStrip?"enabled":"disabled"))},_setupChild:function(a){b.add(a.domNode,"dijitTabPane");this.inherited(arguments)},startup:function(){this._started||(this.tablist.startup(),this.inherited(arguments))},layout:function(){if(this._contentBox&&"undefined"!=typeof this._contentBox.l){var a=this.selectedChildWidget;if(this.doLayout){var c=this.tabPosition.replace(/-h/,"");this.tablist.region=c;c=[this.tablist,{domNode:this.tablistSpacer,region:c},{domNode:this.containerNode,region:"center"}];
d.layoutChildren(this.domNode,this._contentBox,c);this._containerContentBox=d.marginBox2contentBox(this.containerNode,c[2]);a&&a.resize&&a.resize(this._containerContentBox)}else{if(this.tablist.resize){c=this.tablist.domNode.style;c.width="0";var b=f.getContentBox(this.domNode).w;c.width="";this.tablist.resize({w:b})}a&&a.resize&&a.resize()}}},destroy:function(a){this.tablist&&this.tablist.destroy(a);this.inherited(arguments)},selectChild:function(a,b){this._focused&&(a=k.byId(a),this.tablist.pane2button(a.id).focus());
return this.inherited(arguments)}})});
/// _TabContainerBase.js.map