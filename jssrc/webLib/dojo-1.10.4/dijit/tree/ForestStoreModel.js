//>>built
define("dijit/tree/ForestStoreModel",["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","./TreeStoreModel"],function(e,g,h,f,k){return g("dijit.tree.ForestStoreModel",k,{rootId:"$root$",rootLabel:"ROOT",query:null,constructor:function(a){this.root={store:this,root:!0,id:a.rootId,label:a.rootLabel,children:a.rootChildren}},mayHaveChildren:function(a){return a===this.root||this.inherited(arguments)},getChildren:function(a,b,c){a===this.root?this.root.children?b(this.root.children):
this.store.fetch({query:this.query,onComplete:f.hitch(this,function(a){this.root.children=a;b(a)}),onError:c}):this.inherited(arguments)},isItem:function(a){return a===this.root?!0:this.inherited(arguments)},fetchItemByIdentity:function(a){if(a.identity==this.root.id){var b=a.scope||h.global;a.onItem&&a.onItem.call(b,this.root)}else this.inherited(arguments)},getIdentity:function(a){return a===this.root?this.root.id:this.inherited(arguments)},getLabel:function(a){return a===this.root?this.root.label:
this.inherited(arguments)},newItem:function(a,b,c){return b===this.root?(this.onNewRootItem(a),this.store.newItem(a)):this.inherited(arguments)},onNewRootItem:function(){},pasteItem:function(a,b,c,d,e){if(b===this.root&&!d)this.onLeaveRoot(a);this.inherited(arguments,[a,b===this.root?null:b,c===this.root?null:c,d,e]);if(c===this.root)this.onAddToRoot(a)},onAddToRoot:function(a){console.log(this,": item ",a," added to root")},onLeaveRoot:function(a){console.log(this,": item ",a," removed from root")},
_requeryTop:function(){var a=this.root.children||[];this.store.fetch({query:this.query,onComplete:f.hitch(this,function(b){this.root.children=b;if(a.length!=b.length||e.some(a,function(a,d){return b[d]!=a}))this.onChildrenChange(this.root,b)})})},onNewItem:function(a,b){this._requeryTop();this.inherited(arguments)},onDeleteItem:function(a){-1!=e.indexOf(this.root.children,a)&&this._requeryTop();this.inherited(arguments)},onSetItem:function(a,b,c,d){this._requeryTop();this.inherited(arguments)}})});
/// ForestStoreModel.js.map