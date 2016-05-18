//>>built
define("dojox/charting/plot2d/Candlesticks","dojo/_base/lang dojo/_base/declare dojo/_base/array dojo/has ./CartesianBase ./_PlotEvents ./common dojox/lang/functional dojox/lang/functional/reversed dojox/lang/utils dojox/gfx/fx".split(" "),function(r,x,C,M,y,H,D,I,J,u,K){var L=J.lambda("item.purgeGroup()");return x("dojox.charting.plot2d.Candlesticks",[y,H],{defaultParams:{gap:2,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(a,
b){this.opt=r.clone(this.defaultParams);u.updateWithObject(this.opt,b);u.updateWithPattern(this.opt,b,this.optionalParams);this.animate=this.opt.animate},collectStats:function(a){for(var b=r.delegate(D.defaultStats),g=0;g<a.length;g++){var d=a[g];if(d.data.length){var e=b.vmin,v=b.vmax;(!("ymin"in d)||!("ymax"in d))&&C.forEach(d.data,function(a,e){if(null!==a){var d=a.x||e+1;b.hmin=Math.min(b.hmin,d);b.hmax=Math.max(b.hmax,d);b.vmin=Math.min(b.vmin,a.open,a.close,a.high,a.low);b.vmax=Math.max(b.vmax,
a.open,a.close,a.high,a.low)}});"ymin"in d&&(b.vmin=Math.min(e,d.ymin));"ymax"in d&&(b.vmax=Math.max(v,d.ymax))}}return b},getSeriesStats:function(){var a=this.collectStats(this.series);a.hmin-=0.5;a.hmax+=0.5;return a},render:function(a,b){if(this.zoom&&!this.isDataDirty())return this.performZoom(a,b);this.resetEvents();this.dirty=this.isDirty();var g;this.dirty&&(C.forEach(this.series,L),this._eventSeries={},this.cleanGroup(),g=this.getGroup(),I.forEachRev(this.series,function(a){a.cleanGroup(g)}));
var d=this.chart.theme,e,v,r=this._hScaler.scaler.getTransformerFromModel(this._hScaler),s=this._vScaler.scaler.getTransformerFromModel(this._vScaler),u=this.events();e=D.calculateBarSize(this._hScaler.bounds.scale,this.opt);v=e.gap;e=e.size;for(var z=this.series.length-1;0<=z;--z){var c=this.series[z];if(!this.dirty&&!c.dirty)d.skip(),this._reconnectEvents(c.name);else{c.cleanGroup();var A=d.next("candlestick",[this.opt,c]),E=Array(c.data.length);if(c.hidden)c.dyn.fill=A.series.fill,c.dyn.stroke=
A.series.stroke;else{g=c.group;for(var p=0;p<c.data.length;++p){var f=c.data[p];if(null!==f){var l=d.addMixin(A,"candlestick",f,!0),F=r(f.x||p+0.5)+b.l+v,m=a.height-b.b,h=s(f.open),k=s(f.close),t=s(f.high),q=s(f.low);if("mid"in f)var G=s(f.mid);if(q>t)var n=t,t=q,q=n;if(1<=e){var n=h>k,x={x1:e/2,x2:e/2,y1:m-t,y2:m-q},y={x:0,y:m-Math.max(h,k),width:e,height:Math.max(n?h-k:k-h,1)},B=g.createGroup();B.setTransform({dx:F,dy:0});var w=B.createGroup();w.createLine(x).setStroke(l.series.stroke);w.createRect(y).setStroke(l.series.stroke).setFill(n?
l.series.fill:"white");"mid"in f&&w.createLine({x1:l.series.stroke.width||1,x2:e-(l.series.stroke.width||1),y1:m-G,y2:m-G}).setStroke(n?"white":l.series.stroke);c.dyn.fill=l.series.fill;c.dyn.stroke=l.series.stroke;u&&(f={element:"candlestick",index:p,run:c,shape:w,x:F,y:m-Math.max(h,k),cx:e/2,cy:m-Math.max(h,k)+Math.max(n?h-k:k-h,1)/2,width:e,height:Math.max(n?h-k:k-h,1),data:f},this._connectEvents(f),E[p]=f)}this.animate&&this._animateCandlesticks(B,m-q,t-q)}}this._eventSeries[c.name]=E;c.dirty=
!1}}}this.dirty=!1;return this},tooltipFunc:function(a){return'\x3ctable cellpadding\x3d"1" cellspacing\x3d"0" border\x3d"0" style\x3d"font-size:0.9em;"\x3e\x3ctr\x3e\x3ctd\x3eOpen:\x3c/td\x3e\x3ctd align\x3d"right"\x3e\x3cstrong\x3e'+a.data.open+'\x3c/strong\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3eHigh:\x3c/td\x3e\x3ctd align\x3d"right"\x3e\x3cstrong\x3e'+a.data.high+'\x3c/strong\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3eLow:\x3c/td\x3e\x3ctd align\x3d"right"\x3e\x3cstrong\x3e'+a.data.low+
'\x3c/strong\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3eClose:\x3c/td\x3e\x3ctd align\x3d"right"\x3e\x3cstrong\x3e'+a.data.close+"\x3c/strong\x3e\x3c/td\x3e\x3c/tr\x3e"+(void 0!==a.data.mid?'\x3ctr\x3e\x3ctd\x3eMid:\x3c/td\x3e\x3ctd align\x3d"right"\x3e\x3cstrong\x3e'+a.data.mid+"\x3c/strong\x3e\x3c/td\x3e\x3c/tr\x3e":"")+"\x3c/table\x3e"},_animateCandlesticks:function(a,b,g){K.animateTransform(r.delegate({shape:a,duration:1200,transform:[{name:"translate",start:[0,b-b/g],end:[0,0]},{name:"scale",
start:[1,1/g],end:[1,1]},{name:"original"}]},this.animate)).play()}})});
/// Candlesticks.js.map