//>>built
define("dojox/storage/Provider",["dijit","dojo","dojox"],function(g,b,f){b.provide("dojox.storage.Provider");b.declare("dojox.storage.Provider",null,{constructor:function(){},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){console.warn("dojox.storage.initialize not implemented")},isAvailable:function(){console.warn("dojox.storage.isAvailable not implemented")},
put:function(a,c,d,e){console.warn("dojox.storage.put not implemented")},get:function(a,c){console.warn("dojox.storage.get not implemented")},hasKey:function(a,c){return!!this.get(a,c)},getKeys:function(a){console.warn("dojox.storage.getKeys not implemented")},clear:function(a){console.warn("dojox.storage.clear not implemented")},remove:function(a,c){console.warn("dojox.storage.remove not implemented")},getNamespaces:function(){console.warn("dojox.storage.getNamespaces not implemented")},isPermanent:function(){console.warn("dojox.storage.isPermanent not implemented")},
getMaximumSize:function(){console.warn("dojox.storage.getMaximumSize not implemented")},putMultiple:function(a,c,d,e){for(var b=0;b<a.length;b++)f.storage.put(a[b],c[b],d,e)},getMultiple:function(a,c){for(var b=[],e=0;e<a.length;e++)b.push(f.storage.get(a[e],c));return b},removeMultiple:function(a,b){for(var d=0;d<a.length;d++)f.storage.remove(a[d],b)},isValidKeyArray:function(a){return null===a||void 0===a||!b.isArray(a)?!1:!b.some(a,function(a){return!this.isValidKey(a)},this)},hasSettingsUI:function(){return!1},
showSettingsUI:function(){console.warn("dojox.storage.showSettingsUI not implemented")},hideSettingsUI:function(){console.warn("dojox.storage.hideSettingsUI not implemented")},isValidKey:function(a){return null===a||void 0===a?!1:/^[0-9A-Za-z_]*$/.test(a)},getResourceList:function(){return[]}})});
/// Provider.js.map