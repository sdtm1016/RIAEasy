//>>built
define("dojox/dtl/_Templated","dojo/aspect dojo/_base/declare ./_base dijit/_TemplatedMixin dojo/dom-construct dojo/cache dojo/_base/array dojo/string dojo/parser".split(" "),function(k,l,g,m,f,n,p,q,d){return l("dojox.dtl._Templated",m,{_dijitTemplateCompat:!1,buildRendering:function(){var b;if(!this.domNode||this._template){if(!this._template){var a=this.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);a instanceof g.Template?this._template=a:b=a.cloneNode(!0)}if(!b){a=
new g._Context(this);this._created||delete a._getter;var c=f.toDom(this._template.render(a));if(1!==c.nodeType&&3!==c.nodeType)for(var a=0,r=c.childNodes.length;a<r&&!(b=c.childNodes[a],1==b.nodeType);++a);else b=c}this._attachTemplateNodes(b);if(this.widgetsInTemplate){var e,h;"[dojoType]"!=d._query&&(e=d._query,h=d._attrName,d._query="[dojoType]",d._attrName="dojoType");c=this._startupWidgets=d.parse(b,{noStart:!this._earlyTemplatedStartup,inherited:{dir:this.dir,lang:this.lang}});e&&(d._query=
e,d._attrName=h);for(a=0;a<c.length;a++)this._processTemplateNode(c[a],function(a,b){return a[b]},function(a,b,c){return b in a?k.after(a,b,c,!0):a.on(b,c,!0)})}this.domNode&&(f.place(b,this.domNode,"before"),this.destroyDescendants(),f.destroy(this.domNode));this.domNode=b;this._fillContent(this.srcNodeRef)}},_processTemplateNode:function(b,a,c){if(this.widgetsInTemplate&&(a(b,"dojoType")||a(b,"data-dojo-type")))return!0;this.inherited(arguments)},_templateCache:{},getCachedTemplate:function(b,a,
c){var d=this._templateCache,e=a||b;if(d[e])return d[e];a=q.trim(a||n(b,{sanitize:!0}));if(this._dijitTemplateCompat&&(c||a.match(/\$\{([^\}]+)\}/g)))a=this._stringRepl(a);return c||!a.match(/\{[{%]([^\}]+)[%}]\}/g)?d[e]=f.toDom(a):d[e]=new g.Template(a)},render:function(){this.buildRendering()},startup:function(){p.forEach(this._startupWidgets,function(b){b&&(!b._started&&b.startup)&&b.startup()});this.inherited(arguments)}})});
/// _Templated.js.map