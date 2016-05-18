//>>built
define("dojox/editor/plugins/Breadcrumb","dojo dijit dojox dijit/_Widget dijit/_TemplatedMixin dijit/_Contained dijit/Toolbar dijit/Menu dijit/MenuItem dijit/MenuSeparator dijit/_editor/_Plugin dijit/form/Button dijit/form/ComboButton dojo/_base/connect dojo/_base/declare dojo/i18n dojo/string dojo/i18n!dojox/editor/plugins/nls/Breadcrumb".split(" "),function(a,f,p,k,l,m,q,r,s,t,n){a.experimental("dojox.editor.plugins.Breadcrumb");var h=a.declare("dojox.editor.plugins._BreadcrumbMenuTitle",[k,l,m],
{templateString:'\x3ctr\x3e\x3ctd dojoAttachPoint\x3d"title" colspan\x3d"4" class\x3d"dijitToolbar" style\x3d"font-weight: bold; padding: 3px;"\x3e\x3c/td\x3e\x3c/tr\x3e',menuTitle:"",postCreate:function(){a.setSelectable(this.domNode,!1);this.domNode.setAttribute("aria-labelledby",this.id+"_text")},_setMenuTitleAttr:function(a){this.title.innerHTML=a},_getMenuTitleAttr:function(a){return this.title.innerHTML}}),g=a.declare("dojox.editor.plugins.Breadcrumb",n,{_menu:null,breadcrumbBar:null,setEditor:function(c){this.editor=
c;this._buttons=[];this.breadcrumbBar=new f.Toolbar;var d=a.i18n.getLocalization("dojox.editor.plugins","Breadcrumb");this._titleTemplate=d.nodeActions;a.place(this.breadcrumbBar.domNode,c.footer);this.editor.onLoadDeferred.addCallback(a.hitch(this,function(){this._menu=new f.Menu({});a.addClass(this.breadcrumbBar.domNode,"dojoxEditorBreadcrumbArrow");var b=new f.form.ComboButton({showLabel:!0,label:"body",_selNode:c.editNode,dropDown:this._menu,onClick:a.hitch(this,function(){this._menuTarget=c.editNode;
this._selectContents()})});this._menuTitle=new h({menuTitle:d.nodeActions});this._selCMenu=new f.MenuItem({label:d.selectContents,onClick:a.hitch(this,this._selectContents)});this._delCMenu=new f.MenuItem({label:d.deleteContents,onClick:a.hitch(this,this._deleteContents)});this._selEMenu=new f.MenuItem({label:d.selectElement,onClick:a.hitch(this,this._selectElement)});this._delEMenu=new f.MenuItem({label:d.deleteElement,onClick:a.hitch(this,this._deleteElement)});this._moveSMenu=new f.MenuItem({label:d.moveStart,
onClick:a.hitch(this,this._moveCToStart)});this._moveEMenu=new f.MenuItem({label:d.moveEnd,onClick:a.hitch(this,this._moveCToEnd)});this._menu.addChild(this._menuTitle);this._menu.addChild(this._selCMenu);this._menu.addChild(this._delCMenu);this._menu.addChild(new f.MenuSeparator({}));this._menu.addChild(this._selEMenu);this._menu.addChild(this._delEMenu);this._menu.addChild(new f.MenuSeparator({}));this._menu.addChild(this._moveSMenu);this._menu.addChild(this._moveEMenu);b._ddConnect=a.connect(b,
"openDropDown",a.hitch(this,function(){this._menuTarget=b._selNode;this._menuTitle.set("menuTitle",a.string.substitute(this._titleTemplate,{nodeName:"\x26lt;body\x26gt;"}));this._selEMenu.set("disabled",!0);this._delEMenu.set("disabled",!0);this._selCMenu.set("disabled",!1);this._delCMenu.set("disabled",!1);this._moveSMenu.set("disabled",!1);this._moveEMenu.set("disabled",!1)}));this.breadcrumbBar.addChild(b);this.connect(this.editor,"onNormalizedDisplayChanged","updateState")}));this.breadcrumbBar.startup();
a.isIE&&setTimeout(a.hitch(this,function(){this.breadcrumbBar.domNode.className=this.breadcrumbBar.domNode.className}),100)},_selectContents:function(){this.editor.focus();if(this._menuTarget)switch(this._menuTarget.tagName.toLowerCase()){case "br":case "hr":case "img":case "input":case "base":case "meta":case "area":case "basefont":break;default:try{this.editor._sCall("collapse",[null]),this.editor._sCall("selectElementChildren",[this._menuTarget]),this.editor.onDisplayChanged()}catch(a){}}},_deleteContents:function(){this._menuTarget&&
(this.editor.beginEditing(),this._selectContents(),this.editor._sCall("remove",[this._menuTarget]),this.editor.endEditing(),this._updateBreadcrumb(),this.editor.onDisplayChanged())},_selectElement:function(){this.editor.focus();this._menuTarget&&(this.editor._sCall("collapse",[null]),this.editor._sCall("selectElement",[this._menuTarget]),this.editor.onDisplayChanged())},_deleteElement:function(){this._menuTarget&&(this.editor.beginEditing(),this._selectElement(),this.editor._sCall("remove",[this._menuTarget]),
this.editor.endEditing(),this._updateBreadcrumb(),this.editor.onDisplayChanged())},_moveCToStart:function(){this.editor.focus();this._menuTarget&&(this._selectContents(),this.editor._sCall("collapse",[!0]))},_moveCToEnd:function(){this.editor.focus();this._menuTarget&&(this._selectContents(),this.editor._sCall("collapse",[!1]))},_updateBreadcrumb:function(){var c=this.editor;if(c.window){var d=f.range.getSelection(c.window);if(d&&0<d.rangeCount){var d=d.getRangeAt(0),b=c._sCall("getSelectedElement",
[])||d.startContainer,d=[];if(b&&b.ownerDocument===c.document){for(;b&&b!==c.editNode&&b!=c.document.body&&b!=c.document;)1===b.nodeType&&d.push({type:b.tagName.toLowerCase(),node:b}),b=b.parentNode;for(d=d.reverse();this._buttons.length;)c=this._buttons.pop(),a.disconnect(c._ddConnect),this.breadcrumbBar.removeChild(c);this._buttons=[];for(var e=this,c=0;c<d.length;c++)b=d[c],b=new f.form.ComboButton({showLabel:!0,label:b.type,_selNode:b.node,dropDown:this._menu,onClick:function(){e._menuTarget=
this._selNode;e._selectContents()}}),b._ddConnect=a.connect(b,"openDropDown",a.hitch(b,function(){e._menuTarget=this._selNode;var c=e._menuTarget.tagName.toLowerCase(),b=a.string.substitute(e._titleTemplate,{nodeName:"\x26lt;"+c+"\x26gt;"});e._menuTitle.set("menuTitle",b);switch(c){case "br":case "hr":case "img":case "input":case "base":case "meta":case "area":case "basefont":e._selCMenu.set("disabled",!0);e._delCMenu.set("disabled",!0);e._moveSMenu.set("disabled",!0);e._moveEMenu.set("disabled",
!0);e._selEMenu.set("disabled",!1);e._delEMenu.set("disabled",!1);break;default:e._selCMenu.set("disabled",!1),e._delCMenu.set("disabled",!1),e._selEMenu.set("disabled",!1),e._delEMenu.set("disabled",!1),e._moveSMenu.set("disabled",!1),e._moveEMenu.set("disabled",!1)}})),this._buttons.push(b),this.breadcrumbBar.addChild(b);a.isIE&&(this.breadcrumbBar.domNode.className=this.breadcrumbBar.domNode.className)}}}},updateState:function(){if("none"===a.style(this.editor.iframe,"display")||this.get("disabled"))a.style(this.breadcrumbBar.domNode,
"display","none");else{"none"===a.style(this.breadcrumbBar.domNode,"display")&&a.style(this.breadcrumbBar.domNode,"display","block");this._updateBreadcrumb();var c=a.marginBox(this.editor.domNode);this.editor.resize({h:c.h})}},destroy:function(){this.breadcrumbBar&&(this.breadcrumbBar.destroyRecursive(),this.breadcrumbBar=null);this._menu&&(this._menu.destroyRecursive(),delete this._menu);this._buttons=null;delete this.editor.breadcrumbBar;this.inherited(arguments)}});g._BreadcrumbMenuTitle=h;a.subscribe(f._scopeName+
".Editor.getPlugin",null,function(a){!a.plugin&&"breadcrumb"===a.args.name.toLowerCase()&&(a.plugin=new g({}))});return g});
/// Breadcrumb.js.map