//>>built
require({cache:{"url:dojox/atom/widget/templates/FeedEntryEditor.html":'\x3cdiv class\x3d"feedEntryViewer"\x3e\n    \x3ctable border\x3d"0" width\x3d"100%" class\x3d"feedEntryViewerMenuTable" dojoAttachPoint\x3d"feedEntryViewerMenu" style\x3d"display: none;"\x3e\n        \x3ctr width\x3d"100%"  dojoAttachPoint\x3d"entryCheckBoxDisplayOptions"\x3e\n        \t\x3ctd align\x3d"left" dojoAttachPoint\x3d"entryNewButton"\x3e\n                \x3cspan class\x3d"feedEntryViewerMenu" dojoAttachPoint\x3d"doNew" dojoAttachEvent\x3d"onclick:_toggleNew"\x3e\x3c/span\x3e\n        \t\x3c/td\x3e\n            \x3ctd align\x3d"left" dojoAttachPoint\x3d"entryEditButton" style\x3d"display: none;"\x3e\n                \x3cspan class\x3d"feedEntryViewerMenu" dojoAttachPoint\x3d"edit" dojoAttachEvent\x3d"onclick:_toggleEdit"\x3e\x3c/span\x3e\n            \x3c/td\x3e\n            \x3ctd align\x3d"left" dojoAttachPoint\x3d"entrySaveCancelButtons" style\x3d"display: none;"\x3e\n                \x3cspan class\x3d"feedEntryViewerMenu" dojoAttachPoint\x3d"save" dojoAttachEvent\x3d"onclick:saveEdits"\x3e\x3c/span\x3e\n                \x3cspan class\x3d"feedEntryViewerMenu" dojoAttachPoint\x3d"cancel" dojoAttachEvent\x3d"onclick:cancelEdits"\x3e\x3c/span\x3e\n            \x3c/td\x3e\n            \x3ctd align\x3d"right"\x3e\n                \x3cspan class\x3d"feedEntryViewerMenu" dojoAttachPoint\x3d"displayOptions" dojoAttachEvent\x3d"onclick:_toggleOptions"\x3e\x3c/span\x3e\n            \x3c/td\x3e\n        \x3c/tr\x3e\n        \x3ctr class\x3d"feedEntryViewerDisplayCheckbox" dojoAttachPoint\x3d"entryCheckBoxRow" width\x3d"100%" style\x3d"display: none;"\x3e\n            \x3ctd dojoAttachPoint\x3d"feedEntryCelltitle"\x3e\n                \x3cinput type\x3d"checkbox" name\x3d"title" value\x3d"Title" dojoAttachPoint\x3d"feedEntryCheckBoxTitle" dojoAttachEvent\x3d"onclick:_toggleCheckbox"/\x3e\n\t\t\t\t\x3clabel for\x3d"title" dojoAttachPoint\x3d"feedEntryCheckBoxLabelTitle"\x3e\x3c/label\x3e\n            \x3c/td\x3e\n            \x3ctd dojoAttachPoint\x3d"feedEntryCellauthors"\x3e\n                \x3cinput type\x3d"checkbox" name\x3d"authors" value\x3d"Authors" dojoAttachPoint\x3d"feedEntryCheckBoxAuthors" dojoAttachEvent\x3d"onclick:_toggleCheckbox"/\x3e\n\t\t\t\t\x3clabel for\x3d"title" dojoAttachPoint\x3d"feedEntryCheckBoxLabelAuthors"\x3e\x3c/label\x3e\n            \x3c/td\x3e\n            \x3ctd dojoAttachPoint\x3d"feedEntryCellcontributors"\x3e\n                \x3cinput type\x3d"checkbox" name\x3d"contributors" value\x3d"Contributors" dojoAttachPoint\x3d"feedEntryCheckBoxContributors" dojoAttachEvent\x3d"onclick:_toggleCheckbox"/\x3e\n\t\t\t\t\x3clabel for\x3d"title" dojoAttachPoint\x3d"feedEntryCheckBoxLabelContributors"\x3e\x3c/label\x3e\n            \x3c/td\x3e\n            \x3ctd dojoAttachPoint\x3d"feedEntryCellid"\x3e\n                \x3cinput type\x3d"checkbox" name\x3d"id" value\x3d"Id" dojoAttachPoint\x3d"feedEntryCheckBoxId" dojoAttachEvent\x3d"onclick:_toggleCheckbox"/\x3e\n\t\t\t\t\x3clabel for\x3d"title" dojoAttachPoint\x3d"feedEntryCheckBoxLabelId"\x3e\x3c/label\x3e\n            \x3c/td\x3e\n            \x3ctd rowspan\x3d"2" align\x3d"right"\x3e\n                \x3cspan class\x3d"feedEntryViewerMenu" dojoAttachPoint\x3d"close" dojoAttachEvent\x3d"onclick:_toggleOptions"\x3e\x3c/span\x3e\n            \x3c/td\x3e\n\t\t\x3c/tr\x3e\n\t\t\x3ctr class\x3d"feedEntryViewerDisplayCheckbox" dojoAttachPoint\x3d"entryCheckBoxRow2" width\x3d"100%" style\x3d"display: none;"\x3e\n            \x3ctd dojoAttachPoint\x3d"feedEntryCellupdated"\x3e\n                \x3cinput type\x3d"checkbox" name\x3d"updated" value\x3d"Updated" dojoAttachPoint\x3d"feedEntryCheckBoxUpdated" dojoAttachEvent\x3d"onclick:_toggleCheckbox"/\x3e\n\t\t\t\t\x3clabel for\x3d"title" dojoAttachPoint\x3d"feedEntryCheckBoxLabelUpdated"\x3e\x3c/label\x3e\n            \x3c/td\x3e\n            \x3ctd dojoAttachPoint\x3d"feedEntryCellsummary"\x3e\n                \x3cinput type\x3d"checkbox" name\x3d"summary" value\x3d"Summary" dojoAttachPoint\x3d"feedEntryCheckBoxSummary" dojoAttachEvent\x3d"onclick:_toggleCheckbox"/\x3e\n\t\t\t\t\x3clabel for\x3d"title" dojoAttachPoint\x3d"feedEntryCheckBoxLabelSummary"\x3e\x3c/label\x3e\n            \x3c/td\x3e\n            \x3ctd dojoAttachPoint\x3d"feedEntryCellcontent"\x3e\n                \x3cinput type\x3d"checkbox" name\x3d"content" value\x3d"Content" dojoAttachPoint\x3d"feedEntryCheckBoxContent" dojoAttachEvent\x3d"onclick:_toggleCheckbox"/\x3e\n\t\t\t\t\x3clabel for\x3d"title" dojoAttachPoint\x3d"feedEntryCheckBoxLabelContent"\x3e\x3c/label\x3e\n            \x3c/td\x3e\n        \x3c/tr\x3e\n    \x3c/table\x3e\n    \n    \x3ctable class\x3d"feedEntryViewerContainer" border\x3d"0" width\x3d"100%"\x3e\n        \x3ctr class\x3d"feedEntryViewerTitle" dojoAttachPoint\x3d"entryTitleRow" style\x3d"display: none;"\x3e\n            \x3ctd\x3e\n                \x3ctable width\x3d"100%" cellpadding\x3d"0" cellspacing\x3d"0" border\x3d"0"\x3e\n                    \x3ctr class\x3d"graphic-tab-lgray"\x3e\n\t\t\t\t\t\t\x3ctd class\x3d"lp2"\x3e\n\t\t\t\t\t\t\t\x3cspan class\x3d"lp" dojoAttachPoint\x3d"entryTitleHeader"\x3e\x3c/span\x3e\n\t\t\t\t\t\t\x3c/td\x3e\n                    \x3c/tr\x3e\n                    \x3ctr\x3e\n                        \x3ctd\x3e\n                        \t\x3cselect dojoAttachPoint\x3d"entryTitleSelect" dojoAttachEvent\x3d"onchange:_switchEditor" style\x3d"display: none"\x3e\n                        \t\t\x3coption value\x3d"text"\x3eText\x3c/option\x3e\n\t\t\t\t\t\t\t\t\x3coption value\x3d"html"\x3eHTML\x3c/option\x3e\n\t\t\t\t\t\t\t\t\x3coption value\x3d"xhtml"\x3eXHTML\x3c/option\x3e\n                        \t\x3c/select\x3e\n                        \x3c/td\x3e\n                    \x3c/tr\x3e\n                    \x3ctr\x3e\n                        \x3ctd colspan\x3d"2" dojoAttachPoint\x3d"entryTitleNode"\x3e\n                        \x3c/td\x3e\n                    \x3c/tr\x3e\n                \x3c/table\x3e\n            \x3c/td\x3e\n        \x3c/tr\x3e\n\n        \x3ctr class\x3d"feedEntryViewerAuthor" dojoAttachPoint\x3d"entryAuthorRow" style\x3d"display: none;"\x3e\n            \x3ctd\x3e\n                \x3ctable width\x3d"100%" cellpadding\x3d"0" cellspacing\x3d"0" border\x3d"0"\x3e\n                    \x3ctr class\x3d"graphic-tab-lgray"\x3e\n\t\t\t\t\t\t\x3ctd class\x3d"lp2"\x3e\n\t\t\t\t\t\t\t\x3cspan class\x3d"lp" dojoAttachPoint\x3d"entryAuthorHeader"\x3e\x3c/span\x3e\n\t\t\t\t\t\t\x3c/td\x3e\n                    \x3c/tr\x3e\n                    \x3ctr\x3e\n                        \x3ctd dojoAttachPoint\x3d"entryAuthorNode"\x3e\n                        \x3c/td\x3e\n                    \x3c/tr\x3e\n                \x3c/table\x3e\n            \x3c/td\x3e\n        \x3c/tr\x3e\n\n        \x3ctr class\x3d"feedEntryViewerContributor" dojoAttachPoint\x3d"entryContributorRow" style\x3d"display: none;"\x3e\n            \x3ctd\x3e\n                \x3ctable width\x3d"100%" cellpadding\x3d"0" cellspacing\x3d"0" border\x3d"0"\x3e\n                    \x3ctr class\x3d"graphic-tab-lgray"\x3e\n\t\t\t\t\t\t\x3ctd class\x3d"lp2"\x3e\n\t\t\t\t\t\t\t\x3cspan class\x3d"lp" dojoAttachPoint\x3d"entryContributorHeader"\x3e\x3c/span\x3e\n\t\t\t\t\t\t\x3c/td\x3e\n                    \x3c/tr\x3e\n                    \x3ctr\x3e\n                        \x3ctd dojoAttachPoint\x3d"entryContributorNode" class\x3d"feedEntryViewerContributorNames"\x3e\n                        \x3c/td\x3e\n                    \x3c/tr\x3e\n                \x3c/table\x3e\n            \x3c/td\x3e\n        \x3c/tr\x3e\n        \n        \x3ctr class\x3d"feedEntryViewerId" dojoAttachPoint\x3d"entryIdRow" style\x3d"display: none;"\x3e\n            \x3ctd\x3e\n                \x3ctable width\x3d"100%" cellpadding\x3d"0" cellspacing\x3d"0" border\x3d"0"\x3e\n                    \x3ctr class\x3d"graphic-tab-lgray"\x3e\n\t\t\t\t\t\t\x3ctd class\x3d"lp2"\x3e\n\t\t\t\t\t\t\t\x3cspan class\x3d"lp" dojoAttachPoint\x3d"entryIdHeader"\x3e\x3c/span\x3e\n\t\t\t\t\t\t\x3c/td\x3e\n                    \x3c/tr\x3e\n                    \x3ctr\x3e\n                        \x3ctd dojoAttachPoint\x3d"entryIdNode" class\x3d"feedEntryViewerIdText"\x3e\n                        \x3c/td\x3e\n                    \x3c/tr\x3e\n                \x3c/table\x3e\n            \x3c/td\x3e\n        \x3c/tr\x3e\n    \n        \x3ctr class\x3d"feedEntryViewerUpdated" dojoAttachPoint\x3d"entryUpdatedRow" style\x3d"display: none;"\x3e\n            \x3ctd\x3e\n                \x3ctable width\x3d"100%" cellpadding\x3d"0" cellspacing\x3d"0" border\x3d"0"\x3e\n                    \x3ctr class\x3d"graphic-tab-lgray"\x3e\n\t\t\t\t\t\t\x3ctd class\x3d"lp2"\x3e\n\t\t\t\t\t\t\t\x3cspan class\x3d"lp" dojoAttachPoint\x3d"entryUpdatedHeader"\x3e\x3c/span\x3e\n\t\t\t\t\t\t\x3c/td\x3e\n                    \x3c/tr\x3e\n                    \x3ctr\x3e\n                        \x3ctd dojoAttachPoint\x3d"entryUpdatedNode" class\x3d"feedEntryViewerUpdatedText"\x3e\n                        \x3c/td\x3e\n                    \x3c/tr\x3e\n                \x3c/table\x3e\n            \x3c/td\x3e\n        \x3c/tr\x3e\n    \n        \x3ctr class\x3d"feedEntryViewerSummary" dojoAttachPoint\x3d"entrySummaryRow" style\x3d"display: none;"\x3e\n            \x3ctd\x3e\n                \x3ctable width\x3d"100%" cellpadding\x3d"0" cellspacing\x3d"0" border\x3d"0"\x3e\n                    \x3ctr class\x3d"graphic-tab-lgray"\x3e\n\t\t\t\t\t\t\x3ctd class\x3d"lp2" colspan\x3d"2"\x3e\n\t\t\t\t\t\t\t\x3cspan class\x3d"lp" dojoAttachPoint\x3d"entrySummaryHeader"\x3e\x3c/span\x3e\n\t\t\t\t\t\t\x3c/td\x3e\n                    \x3c/tr\x3e\n                    \x3ctr\x3e\n                        \x3ctd\x3e\n                        \t\x3cselect dojoAttachPoint\x3d"entrySummarySelect" dojoAttachEvent\x3d"onchange:_switchEditor" style\x3d"display: none"\x3e\n                        \t\t\x3coption value\x3d"text"\x3eText\x3c/option\x3e\n\t\t\t\t\t\t\t\t\x3coption value\x3d"html"\x3eHTML\x3c/option\x3e\n\t\t\t\t\t\t\t\t\x3coption value\x3d"xhtml"\x3eXHTML\x3c/option\x3e\n                        \t\x3c/select\x3e\n                        \x3c/td\x3e\n                    \x3c/tr\x3e\n                    \x3ctr\x3e\n                        \x3ctd dojoAttachPoint\x3d"entrySummaryNode"\x3e\n                        \x3c/td\x3e\n                    \x3c/tr\x3e\n                \x3c/table\x3e\n            \x3c/td\x3e\n        \x3c/tr\x3e\n    \n        \x3ctr class\x3d"feedEntryViewerContent" dojoAttachPoint\x3d"entryContentRow" style\x3d"display: none;"\x3e\n            \x3ctd\x3e\n                \x3ctable width\x3d"100%" cellpadding\x3d"0" cellspacing\x3d"0" border\x3d"0"\x3e\n                    \x3ctr class\x3d"graphic-tab-lgray"\x3e\n\t\t\t\t\t\t\x3ctd class\x3d"lp2"\x3e\n\t\t\t\t\t\t\t\x3cspan class\x3d"lp" dojoAttachPoint\x3d"entryContentHeader"\x3e\x3c/span\x3e\n\t\t\t\t\t\t\x3c/td\x3e\n                    \x3c/tr\x3e\n                    \x3ctr\x3e\n                        \x3ctd\x3e\n                        \t\x3cselect dojoAttachPoint\x3d"entryContentSelect" dojoAttachEvent\x3d"onchange:_switchEditor" style\x3d"display: none"\x3e\n                        \t\t\x3coption value\x3d"text"\x3eText\x3c/option\x3e\n\t\t\t\t\t\t\t\t\x3coption value\x3d"html"\x3eHTML\x3c/option\x3e\n\t\t\t\t\t\t\t\t\x3coption value\x3d"xhtml"\x3eXHTML\x3c/option\x3e\n                        \t\x3c/select\x3e\n                        \x3c/td\x3e\n                    \x3c/tr\x3e\n                    \x3ctr\x3e\n                        \x3ctd dojoAttachPoint\x3d"entryContentNode"\x3e\n                        \x3c/td\x3e\n                    \x3c/tr\x3e\n                \x3c/table\x3e\n            \x3c/td\x3e\n        \x3c/tr\x3e\n    \x3c/table\x3e\n\x3c/div\x3e\n',
"url:dojox/atom/widget/templates/PeopleEditor.html":'\x3cdiv class\x3d"peopleEditor"\x3e\n\t\x3ctable style\x3d"width: 100%"\x3e\n\t\t\x3ctbody dojoAttachPoint\x3d"peopleEditorEditors"\x3e\x3c/tbody\x3e\n\t\x3c/table\x3e\n\t\x3cspan class\x3d"peopleEditorButton" dojoAttachPoint\x3d"peopleEditorButton" dojoAttachEvent\x3d"onclick:_add"\x3e\x3c/span\x3e\n\x3c/div\x3e'}});
define("dojox/atom/widget/FeedEntryEditor","dojo/_base/kernel dojo/_base/lang dojo/_base/connect dojo/_base/declare dojo/_base/fx dojo/_base/sniff dojo/dom dojo/dom-style dojo/dom-construct dijit/_Widget dijit/_Templated dijit/_Container dijit/Editor dijit/form/TextBox dijit/form/SimpleTextarea ./FeedEntryViewer ../io/model dojo/text!./templates/FeedEntryEditor.html dojo/text!./templates/PeopleEditor.html dojo/i18n!./nls/FeedEntryViewer dojo/i18n!./nls/FeedEntryEditor dojo/i18n!./nls/PeopleEditor".split(" "),function(q,
t,z,u,A,v,w,g,x,B,C,D,p,r,y,l,n,E,F,m,G,s){q.experimental("dojox.atom.widget.FeedEntryEditor");var k=u("dojox.atom.widget.FeedEntryEditor",l,{_contentEditor:null,_oldContent:null,_setObject:null,enableEdit:!1,_contentEditorCreator:null,_editors:{},entryNewButton:null,_editable:!1,templateString:E,postCreate:function(){""!==this.entrySelectionTopic&&(this._subscriptions=[q.subscribe(this.entrySelectionTopic,this,"_handleEvent")]);var a=m;this.displayOptions.innerHTML=a.displayOptions;this.feedEntryCheckBoxLabelTitle.innerHTML=
a.title;this.feedEntryCheckBoxLabelAuthors.innerHTML=a.authors;this.feedEntryCheckBoxLabelContributors.innerHTML=a.contributors;this.feedEntryCheckBoxLabelId.innerHTML=a.id;this.close.innerHTML=a.close;this.feedEntryCheckBoxLabelUpdated.innerHTML=a.updated;this.feedEntryCheckBoxLabelSummary.innerHTML=a.summary;this.feedEntryCheckBoxLabelContent.innerHTML=a.content;a=G;this.doNew.innerHTML=a.doNew;this.edit.innerHTML=a.edit;this.save.innerHTML=a.save;this.cancel.innerHTML=a.cancel},setEntry:function(a,
b,c){c=this._entry!==a?this._editMode=!1:!0;k.superclass.setEntry.call(this,a,b);this._editable=this._isEditable(a);!c&&!this._editable&&(g.set(this.entryEditButton,"display","none"),g.set(this.entrySaveCancelButtons,"display","none"));this._editable&&this.enableEdit&&!c&&(g.set(this.entryEditButton,"display",""),this.enableMenuFade&&this.entrySaveCancelButton&&A.fadeOut({node:this.entrySaveCancelButton,duration:250}).play())},_toggleEdit:function(){this._editable&&this.enableEdit&&(g.set(this.entryEditButton,
"display","none"),g.set(this.entrySaveCancelButtons,"display",""),this._editMode=!0,this.setEntry(this._entry,this._feed,!0))},_handleEvent:function(a){a.source!=this&&("delete"==a.action&&a.entry&&a.entry==this._entry)&&g.set(this.entryEditButton,"display","none");k.superclass._handleEvent.call(this,a)},_isEditable:function(a){var b=!1;if(a&&null!==a&&a.links&&null!==a.links)for(var c in a.links)if(a.links[c].rel&&"edit"==a.links[c].rel){b=!0;break}return b},setTitle:function(a,b,c){b?c.title&&(c.title.value&&
null!==c.title.value)&&(this._toLoad||(this._toLoad=[]),this.entryTitleSelect.value=c.title.type,a=this._createEditor(a,c.title,!0,"html"===c.title.type||"xhtml"===c.title.type),a.name="title",this._toLoad.push(a),this.setFieldValidity("titleedit",!0),this.setFieldValidity("title",!0)):(k.superclass.setTitle.call(this,a,b,c),c.title&&(c.title.value&&null!==c.title.value)&&this.setFieldValidity("title",!0))},setAuthors:function(a,b,c){b?c.authors&&0<c.authors.length&&(this._editors.authors=this._createPeopleEditor(this.entryAuthorNode,
{data:c.authors,name:"Author"}),this.setFieldValidity("authors",!0)):(k.superclass.setAuthors.call(this,a,b,c),c.authors&&0<c.authors.length&&this.setFieldValidity("authors",!0))},setContributors:function(a,b,c){b?c.contributors&&0<c.contributors.length&&(this._editors.contributors=this._createPeopleEditor(this.entryContributorNode,{data:c.contributors,name:"Contributor"}),this.setFieldValidity("contributors",!0)):(k.superclass.setContributors.call(this,a,b,c),c.contributors&&0<c.contributors.length&&
this.setFieldValidity("contributors",!0))},setId:function(a,b,c){b?c.id&&null!==c.id&&(this._editors.id=this._createEditor(a,c.id),this.setFieldValidity("id",!0)):(k.superclass.setId.call(this,a,b,c),c.id&&null!==c.id&&this.setFieldValidity("id",!0))},setUpdated:function(a,b,c){b?c.updated&&null!==c.updated&&(this._editors.updated=this._createEditor(a,c.updated),this.setFieldValidity("updated",!0)):(k.superclass.setUpdated.call(this,a,b,c),c.updated&&null!==c.updated&&this.setFieldValidity("updated",
!0))},setSummary:function(a,b,c){b?c.summary&&(c.summary.value&&null!==c.summary.value)&&(this._toLoad||(this._toLoad=[]),this.entrySummarySelect.value=c.summary.type,a=this._createEditor(a,c.summary,!0,"html"===c.summary.type||"xhtml"===c.summary.type),a.name="summary",this._toLoad.push(a),this.setFieldValidity("summaryedit",!0),this.setFieldValidity("summary",!0)):(k.superclass.setSummary.call(this,a,b,c),c.summary&&(c.summary.value&&null!==c.summary.value)&&this.setFieldValidity("summary",!0))},
setContent:function(a,b,c){b?c.content&&(c.content.value&&null!==c.content.value)&&(this._toLoad||(this._toLoad=[]),this.entryContentSelect.value=c.content.type,a=this._createEditor(a,c.content,!0,"html"===c.content.type||"xhtml"===c.content.type),a.name="content",this._toLoad.push(a),this.setFieldValidity("contentedit",!0),this.setFieldValidity("content",!0)):(k.superclass.setContent.call(this,a,b,c),c.content&&(c.content.value&&null!==c.content.value)&&this.setFieldValidity("content",!0))},_createEditor:function(a,
b,c,d){if(!b){if(d)return{anchorNode:a,entryValue:"",editor:null,generateEditor:function(){var a=document.createElement("div");a.innerHTML=this.entryValue;this.anchorNode.appendChild(a);return this.editor=a=new p({},a)}};c?(c=document.createElement("textarea"),a.appendChild(c),g.set(c,"width","90%"),a=new y({},c)):(c=document.createElement("input"),a.appendChild(c),g.set(c,"width","95%"),a=new r({},c));a.attr("value","");return a}b=void 0!==b.value?b.value:b.attr?b.attr("value"):b;if(d)return-1!=
b.indexOf("\x3c")&&(b=b.replace(/</g,"\x26lt;")),{anchorNode:a,entryValue:b,editor:null,generateEditor:function(){var a=document.createElement("div");a.innerHTML=this.entryValue;this.anchorNode.appendChild(a);return this.editor=a=new p({},a)}};c?(c=document.createElement("textarea"),a.appendChild(c),g.set(c,"width","90%"),a=new y({},c)):(c=document.createElement("input"),a.appendChild(c),g.set(c,"width","95%"),a=new r({},c));a.attr("value",b);return a},_switchEditor:function(a){var b=null,c=null,
d=null,c=v("ie")?a.srcElement:a.target;c===this.entryTitleSelect?(d=this.entryTitleNode,b="title"):c===this.entrySummarySelect?(d=this.entrySummaryNode,b="summary"):(d=this.entryContentNode,b="content");a=this._editors[b];if("text"===c.value){if(a.isInstanceOf(p)){c=a.attr("value",!1);a.close(!1,!0);for(a.destroy();d.firstChild;)x.destroy(d.firstChild);d=this._createEditor(d,{value:c},!0,!1);this._editors[b]=d}}else if(!a.isInstanceOf(p)){c=a.attr("value");for(a.destroy();d.firstChild;)x.destroy(d.firstChild);
d=this._createEditor(d,{value:c},!0,!0);d=t.hitch(d,d.generateEditor)();this._editors[b]=d}},_createPeopleEditor:function(a,b){var c=document.createElement("div");a.appendChild(c);return new H(b,c)},saveEdits:function(){g.set(this.entrySaveCancelButtons,"display","none");g.set(this.entryEditButton,"display","");g.set(this.entryNewButton,"display","");var a=!1,b,c,d,e;if(this._new){this._new=!1;d=new n.Entry;a=this._editors.title.attr("value");"xhtml"===this.entryTitleSelect.value&&(a=this._enforceXhtml(a),
a='\x3cdiv xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+a+"\x3c/div\x3e");d.setTitle(a,this.entryTitleSelect.value);d.id=this._editors.id.attr("value");e=this._editors.authors.getValues();for(b in e)(e[b].name||e[b].email||e[b].uri)&&d.addAuthor(e[b].name,e[b].email,e[b].uri);e=this._editors.contributors.getValues();for(b in e)(e[b].name||e[b].email||e[b].uri)&&d.addContributor(e[b].name,e[b].email,e[b].uri);a=this._editors.summary.attr("value");"xhtml"===this.entrySummarySelect.value&&(a=this._enforceXhtml(a),
a='\x3cdiv xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+a+"\x3c/div\x3e");d.summary=new n.Content("summary",a,null,this.entrySummarySelect.value);a=this._editors.content.attr("value");"xhtml"===this.entryContentSelect.value&&(a=this._enforceXhtml(a),a='\x3cdiv xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+a+"\x3c/div\x3e");d.content=new n.Content("content",a,null,this.entryContentSelect.value);g.set(this.entryNewButton,"display","");q.publish(this.entrySelectionTopic,[{action:"post",source:this,entry:d}])}else{d=
this.getEntry();if(this._editors.title&&(this._editors.title.attr("value")!=d.title.value||this.entryTitleSelect.value!=d.title.type))a=this._editors.title.attr("value"),"xhtml"===this.entryTitleSelect.value&&(a=this._enforceXhtml(a),0!==a.indexOf('\x3cdiv xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e')&&(a='\x3cdiv xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+a+"\x3c/div\x3e")),d.title=new n.Content("title",a,null,this.entryTitleSelect.value),a=!0;this._editors.id.attr("value")!=d.id&&(d.id=this._editors.id.attr("value"),
a=!0);if(this._editors.summary&&(this._editors.summary.attr("value")!=d.summary.value||this.entrySummarySelect.value!=d.summary.type))a=this._editors.summary.attr("value"),"xhtml"===this.entrySummarySelect.value&&(a=this._enforceXhtml(a),0!==a.indexOf('\x3cdiv xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e')&&(a='\x3cdiv xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+a+"\x3c/div\x3e")),d.summary=new n.Content("summary",a,null,this.entrySummarySelect.value),a=!0;if(this._editors.content&&(this._editors.content.attr("value")!=
d.content.value||this.entryContentSelect.value!=d.content.type))a=this._editors.content.attr("value"),"xhtml"===this.entryContentSelect.value&&(a=this._enforceXhtml(a),0!==a.indexOf('\x3cdiv xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e')&&(a='\x3cdiv xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+a+"\x3c/div\x3e")),d.content=new n.Content("content",a,null,this.entryContentSelect.value),a=!0;if(this._editors.authors)if(a)for(b in d.authors=[],e=this._editors.authors.getValues(),e)(e[b].name||e[b].email||
e[b].uri)&&d.addAuthor(e[b].name,e[b].email,e[b].uri);else{var f=d.authors;e=this._editors.authors.getValues();c=!1;for(b in e){var h;a:{for(b in f)if(f[b].name===e[b].name&&f[b].email===e[b].email&&f[b].uri===e[b].uri){h=!0;break a}h=!1}if(!h){c=!0;break}}if(c){d.authors=[];for(b in e)(e[b].name||e[b].email||e[b].uri)&&d.addAuthor(e[b].name,e[b].email,e[b].uri);a=!0}}if(this._editors.contributors)if(a)for(b in d.contributors=[],e=this._editors.contributors.getValues(),e)(e[b].name||e[b].email||e[b].uri)&&
d.addAuthor(e[b].name,e[b].email,e[b].uri);else{f=d.contributors;e=this._editors.contributors.getValues();c=!1;for(b in e){a:{for(b in f)if(f[b].name===e[b].name&&f[b].email===e[b].email&&f[b].uri===e[b].uri){h=!0;break a}h=!1}if(h){c=!0;break}}if(c){d.contributors=[];for(b in e)(e[b].name||e[b].email||e[b].uri)&&d.addContributor(e[b].name,e[b].email,e[b].uri);a=!0}}a&&q.publish(this.entrySelectionTopic,[{action:"update",source:this,entry:d,callback:this._handleSave}])}this._editMode=!1;this.setEntry(d,
this._feed,!0)},_handleSave:function(a,b){this._editMode=!1;this.clear();this.setEntry(a,this.getFeed(),!0)},cancelEdits:function(){this._new=!1;g.set(this.entrySaveCancelButtons,"display","none");this._editable&&g.set(this.entryEditButton,"display","");g.set(this.entryNewButton,"display","");this._editMode=!1;this.clearEditors();this.setEntry(this.getEntry(),this.getFeed(),!0)},clear:function(){this._editable=!1;this.clearEditors();k.superclass.clear.apply(this);this._contentEditor&&(this._contentEditor=
this._setObject=this._oldContent=this._contentEditorCreator=null,this._editors={})},clearEditors:function(){for(var a in this._editors)this._editors[a].isInstanceOf(p)&&this._editors[a].close(!1,!0),this._editors[a].destroy();this._editors={}},_enforceXhtml:function(a){var b=null;a&&(b=a.replace(/<br>/g,"\x3cbr/\x3e"),b=this._closeTag(b,"hr"),b=this._closeTag(b,"img"));return b},_closeTag:function(a,b){var c="\x3c"+b,d=a.indexOf(c);if(-1!==d)for(;-1!==d;){for(var e="",f=!1,g=0;g<a.length;g++){var k=
a.charAt(g);if(!(g<=d||f)&&"\x3e"===k)e+="/",f=!0;e+=k}a=e;d=a.indexOf(c,d+1)}return a},_toggleNew:function(){g.set(this.entryNewButton,"display","none");g.set(this.entryEditButton,"display","none");g.set(this.entrySaveCancelButtons,"display","");this.entrySummarySelect.value="text";this.entryContentSelect.value="text";this.entryTitleSelect.value="text";this.clearNodes();this._new=!0;var a=new l.EntryHeader({title:m.title});this.entryTitleHeader.appendChild(a.domNode);this._editors.title=this._createEditor(this.entryTitleNode,
null);this.setFieldValidity("title",!0);a=new l.EntryHeader({title:m.authors});this.entryAuthorHeader.appendChild(a.domNode);this._editors.authors=this._createPeopleEditor(this.entryAuthorNode,{name:"Author"});this.setFieldValidity("authors",!0);a=new l.EntryHeader({title:m.contributors});this.entryContributorHeader.appendChild(a.domNode);this._editors.contributors=this._createPeopleEditor(this.entryContributorNode,{name:"Contributor"});this.setFieldValidity("contributors",!0);a=new l.EntryHeader({title:m.id});
this.entryIdHeader.appendChild(a.domNode);this._editors.id=this._createEditor(this.entryIdNode,null);this.setFieldValidity("id",!0);a=new l.EntryHeader({title:m.updated});this.entryUpdatedHeader.appendChild(a.domNode);this._editors.updated=this._createEditor(this.entryUpdatedNode,null);this.setFieldValidity("updated",!0);a=new l.EntryHeader({title:m.summary});this.entrySummaryHeader.appendChild(a.domNode);this._editors.summary=this._createEditor(this.entrySummaryNode,null,!0);this.setFieldValidity("summaryedit",
!0);this.setFieldValidity("summary",!0);a=new l.EntryHeader({title:m.content});this.entryContentHeader.appendChild(a.domNode);this._editors.content=this._createEditor(this.entryContentNode,null,!0);this.setFieldValidity("contentedit",!0);this.setFieldValidity("content",!0);this._displaySections()},_displaySections:function(){g.set(this.entrySummarySelect,"display","none");g.set(this.entryContentSelect,"display","none");g.set(this.entryTitleSelect,"display","none");this.isFieldValid("contentedit")&&
g.set(this.entryContentSelect,"display","");this.isFieldValid("summaryedit")&&g.set(this.entrySummarySelect,"display","");this.isFieldValid("titleedit")&&g.set(this.entryTitleSelect,"display","");k.superclass._displaySections.apply(this);if(this._toLoad){for(var a in this._toLoad){var b;b=this._toLoad[a].generateEditor?t.hitch(this._toLoad[a],this._toLoad[a].generateEditor)():this._toLoad[a];this._editors[this._toLoad[a].name]=b;this._toLoad[a]=null}this._toLoad=null}}}),H=u("dojox.atom.widget.PeopleEditor",
[B,C,D],{templateString:F,_rows:[],_editors:[],_index:0,_numRows:0,postCreate:function(){this.name?"Author"==this.name?this.peopleEditorButton.appendChild(document.createTextNode("["+s.addAuthor+"]")):"Contributor"==this.name&&this.peopleEditorButton.appendChild(document.createTextNode("["+s.addContributor+"]")):this.peopleEditorButton.appendChild(document.createTextNode("["+s.add+"]"));this._editors=[];if(!this.data||0===this.data.length)this._createEditors(null,null,null,0,this.name),this._index=
1;else for(var a in this.data)this._createEditors(this.data[a].name,this.data[a].email,this.data[a].uri,a),this._index++,this._numRows++},destroy:function(){for(var a in this._editors)for(var b in this._editors[a])this._editors[a][b].destroy();this._editors=[]},_createEditors:function(a,b,c,d,e){var f=document.createElement("tr");this.peopleEditorEditors.appendChild(f);f.id="removeRow"+d;var h=document.createElement("td");h.setAttribute("align","right");f.appendChild(h);h.colSpan=2;0<this._numRows&&
(f=document.createElement("hr"),h.appendChild(f),f.id="hr"+d);f=document.createElement("span");h.appendChild(f);f.className="peopleEditorButton";g.set(f,"font-size","x-small");z.connect(f,"onclick",this,"_removeEditor");f.id="remove"+d;h=document.createTextNode("[X]");f.appendChild(h);f=document.createElement("tr");this.peopleEditorEditors.appendChild(f);f.id="editorsRow"+d;var k=document.createElement("td");f.appendChild(k);g.set(k,"width","20%");h=document.createElement("td");f.appendChild(h);f=
document.createElement("table");k.appendChild(f);g.set(f,"width","100%");k=document.createElement("tbody");f.appendChild(k);f=document.createElement("table");h.appendChild(f);g.set(f,"width","100%");h=document.createElement("tbody");f.appendChild(h);this._editors[d]=[];this._editors[d].push(this._createEditor(a,e+"name"+d,"Name:",k,h));this._editors[d].push(this._createEditor(b,e+"email"+d,"Email:",k,h));this._editors[d].push(this._createEditor(c,e+"uri"+d,"URI:",k,h))},_createEditor:function(a,b,
c,d,e){var f=document.createElement("tr");d.appendChild(f);var h=document.createElement("label");h.setAttribute("for",b);h.appendChild(document.createTextNode(c));d=document.createElement("td");d.appendChild(h);f.appendChild(d);f=document.createElement("tr");e.appendChild(f);e=document.createElement("td");f.appendChild(e);c=document.createElement("input");c.setAttribute("id",b);e.appendChild(c);g.set(c,"width","95%");b=new r({},c);b.attr("value",a);return b},_removeEditor:function(a){var b=null,b=
v("ie")?a.srcElement:a.target;a=b.id;a=a.substring(6);for(var c in this._editors[a])this._editors[a][c].destroy();c=w.byId("editorsRow"+a);b=c.parentNode;b.removeChild(c);c=w.byId("removeRow"+a);b=c.parentNode;b.removeChild(c);this._numRows--;1===this._numRows&&"hr"===b.firstChild.firstChild.firstChild.tagName.toLowerCase()&&(c=b.firstChild.firstChild,c.removeChild(c.firstChild));this._editors[a]=null},_add:function(){this._createEditors(null,null,null,this._index);this._index++;this._numRows++},
getValues:function(){var a=[],b;for(b in this._editors)this._editors[b]&&a.push({name:this._editors[b][0].attr("value"),email:this._editors[b][1].attr("value"),uri:this._editors[b][2].attr("value")});return a}});return k});
/// FeedEntryEditor.js.map