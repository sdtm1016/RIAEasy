//>>built
define("dojox/drawing/manager/_registry",[],function(){var c={tool:{},stencil:{},drawing:{},plugin:{},button:{}};return{register:function(a,b){"drawing"==b?c.drawing[a.id]=a:"tool"==b?c.tool[a.name]=a:"stencil"==b?c.stencil[a.name]=a:"plugin"==b?c.plugin[a.name]=a:"button"==b&&(c.button[a.toolType]=a)},getRegistered:function(a,b){return b?c[a][b]:c[a]}}});
/// _registry.js.map