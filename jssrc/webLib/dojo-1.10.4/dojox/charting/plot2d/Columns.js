//>>built
define("dojox/charting/plot2d/Columns","dojo/_base/lang dojo/_base/array dojo/_base/declare dojo/has ./CartesianBase ./_PlotEvents ./common dojox/lang/functional dojox/lang/functional/reversed dojox/lang/utils dojox/gfx/fx".split(" "),function(q,x,y,M,G,H,r,I,J,s,K){var L=J.lambda("item.purgeGroup()");return y("dojox.charting.plot2d.Columns",[G,H],{defaultParams:{gap:0,animate:null,enableCache:!1},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},filter:{},styleFunc:null,
font:"",fontColor:""},constructor:function(a,d){this.opt=q.clone(q.mixin(this.opt,this.defaultParams));s.updateWithObject(this.opt,d);s.updateWithPattern(this.opt,d,this.optionalParams);this.animate=this.opt.animate;this.renderingOptions={"shape-rendering":"crispEdges"}},getSeriesStats:function(){var a=r.collectSimpleStats(this.series);a.hmin-=0.5;a.hmax+=0.5;return a},createRect:function(a,d,c){var f;this.opt.enableCache&&0<a._rectFreePool.length?(f=a._rectFreePool.pop(),f.setShape(c),d.add(f)):
f=d.createRect(c);this.opt.enableCache&&a._rectUsePool.push(f);return f},render:function(a,d){if(this.zoom&&!this.isDataDirty())return this.performZoom(a,d);this.resetEvents();this.dirty=this.isDirty();var c;this.dirty&&(x.forEach(this.series,L),this._eventSeries={},this.cleanGroup(),c=this.getGroup(),I.forEachRev(this.series,function(a){a.cleanGroup(c)}));var f=this.chart.theme,r=this._hScaler.scaler.getTransformerFromModel(this._hScaler),z=this._vScaler.scaler.getTransformerFromModel(this._vScaler),
A=Math.max(0,this._vScaler.bounds.lower),t=z(A),s=this.events(),u=this.getBarProperties(),B=this.series.length;x.forEach(this.series,function(a){a.hidden&&B--});for(var v=this.series.length-1;0<=v;--v){var b=this.series[v];if(!this.dirty&&!b.dirty)f.skip(),this._reconnectEvents(b.name);else{b.cleanGroup();this.opt.enableCache&&(b._rectFreePool=(b._rectFreePool?b._rectFreePool:[]).concat(b._rectUsePool?b._rectUsePool:[]),b._rectUsePool=[]);var C=f.next("column",[this.opt,b]),E=Array(b.data.length);
if(b.hidden)b.dyn.fill=C.series.fill;else{B--;c=b.group;for(var n=x.some(b.data,function(a){return"number"==typeof a||a&&!a.hasOwnProperty("x")}),g=n?Math.max(0,Math.floor(this._hScaler.bounds.from-1)):0,y=n?Math.min(b.data.length,Math.ceil(this._hScaler.bounds.to)):b.data.length;g<y;++g){var m=b.data[g];if(null!=m){var l=this.getValue(m,g,v,n),D=z(l.y),w=Math.abs(D-t),e,k;this.opt.styleFunc||"number"!=typeof m?(e="number"!=typeof m?[m]:[],this.opt.styleFunc&&e.push(this.opt.styleFunc(m)),e=f.addMixin(C,
"column",e,!0)):e=f.post(C,"column");if(1<=u.width&&0<=w){var p={x:d.l+r(l.x+0.5)+u.gap+u.thickness*B,y:a.height-d.b-(l.y>A?D:t),width:u.width,height:w};e.series.shadow&&(k=q.clone(p),k.x+=e.series.shadow.dx,k.y+=e.series.shadow.dy,k=this.createRect(b,c,k).setFill(e.series.shadow.color).setStroke(e.series.shadow),this.animate&&this._animateColumn(k,a.height-d.b+t,w));var h=this._plotFill(e.series.fill,a,d),h=this._shapeFill(h,p),h=this.createRect(b,c,p).setFill(h).setStroke(e.series.stroke);h.setFilter&&
e.series.filter&&h.setFilter(e.series.filter);b.dyn.fill=h.getFill();b.dyn.stroke=h.getStroke();if(s){var F={element:"column",index:g,run:b,shape:h,shadow:k,cx:l.x+0.5,cy:l.y,x:n?g:b.data[g].x,y:n?b.data[g]:b.data[g].y};this._connectEvents(F);E[g]=F}!isNaN(l.py)&&l.py>A&&(p.height=D-z(l.py));this.createLabel(c,m,p,e);this.animate&&this._animateColumn(h,a.height-d.b-t,w)}}}this._eventSeries[b.name]=E;b.dirty=!1}}}this.dirty=!1;return this},getValue:function(a,d,c,f){f?(c="number"==typeof a?a:a.y,a=
d):(c=a.y,a=a.x-1);return{x:a,y:c}},getBarProperties:function(){var a=r.calculateBarSize(this._hScaler.bounds.scale,this.opt);return{gap:a.gap,width:a.size,thickness:0}},_animateColumn:function(a,d,c){0==c&&(c=1);K.animateTransform(q.delegate({shape:a,duration:1200,transform:[{name:"translate",start:[0,d-d/c],end:[0,0]},{name:"scale",start:[1,1/c],end:[1,1]},{name:"original"}]},this.animate)).play()}})});
/// Columns.js.map