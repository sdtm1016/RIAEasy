//>>built
define("dojox/drawing/plugins/tools/Iconize",["dojo","../../util/oo","../_Plugin","../../manager/_registry"],function(h,c,l,m){c=c.declare(l,function(d){},{onClick:function(){var d,e;for(e in this.stencils.stencils)if(console.log(" stanceil item:",this.stencils.stencils[e].id,this.stencils.stencils[e]),"path"==this.stencils.stencils[e].shortType){d=this.stencils.stencils[e];break}d&&(console.log("click Iconize plugin",d.points),this.makeIcon(d.points))},makeIcon:function(d){var e=1E4,c=1E4;d.forEach(function(a){void 0!==
a.x&&!isNaN(a.x)&&(e=Math.min(e,a.x),c=Math.min(c,a.y))});var f=0,g=0;d.forEach(function(a){void 0!==a.x&&!isNaN(a.x)&&(a.x=Number((a.x-e).toFixed(1)),a.y=Number((a.y-c).toFixed(1)),f=Math.max(f,a.x),g=Math.max(g,a.y))});console.log("xmax:",f,"ymax:",g);d.forEach(function(a){a.x=60*Number((a.x/f).toFixed(1))+20;a.y=60*Number((a.y/g).toFixed(1))+20});var b="[\n";h.forEach(d,function(a,c){b+="{\t";a.t&&(b+="t:'"+a.t+"'");void 0!==a.x&&!isNaN(a.x)&&(a.t&&(b+=", "),b+="x:"+a.x+",\t\ty:"+a.y);b+="\t}";
c!=d.length-1&&(b+=",");b+="\n"});b+="]";console.log(b);var k=h.byId("data");k&&(k.value=b)}});c.setup={name:"dojox.drawing.plugins.tools.Iconize",tooltip:"Iconize Tool",iconClass:"iconPan"};h.setObject("dojox.drawing.plugins.tools.Iconize",c);m.register(c.setup,"plugin");return c});
/// Iconize.js.map