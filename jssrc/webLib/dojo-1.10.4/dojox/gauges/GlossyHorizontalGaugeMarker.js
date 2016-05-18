//>>built
define("dojox/gauges/GlossyHorizontalGaugeMarker",["dojo/_base/declare","dojo/_base/Color","./BarLineIndicator"],function(h,f,k){return h("dojox.gauges.GlossyHorizontalGaugeMarker",[k],{interactionMode:"gauge",color:"black",_getShapes:function(d){if(!this._gauge)return null;var a=this.value;a<this._gauge.min&&(a=this._gauge.min);a>this._gauge.max&&(a=this._gauge.max);var c=this._gauge._getPosition(a),a=[],e=new f(this.color);e.a=0.67;var g=f.blendColors(e,new f("white"),0.4);d=a[0]=d.createGroup();
var b=this._gauge.height/100,b=Math.max(b,0.5),b=Math.min(b,1);d.setTransform({xx:1,xy:0,yx:0,yy:1,dx:c,dy:0});c=d.createGroup().setTransform({xx:1,xy:0,yx:0,yy:1,dx:10*-b,dy:this._gauge.dataY+this.offset}).createGroup().setTransform({xx:b,xy:0,yx:0,yy:b,dx:0,dy:0});c.createRect({x:0.5,y:0,width:20,height:47,r:6}).setFill(e).setStroke(g);c.createPath({path:"M 10.106 41 L 10.106 6 C 10.106 2.687 7.419 0 4.106 0 L 0.372 0 C -0.738 6.567 1.022 15.113 1.022 23.917 C 1.022 32.721 2.022 40.667 0.372 47 L 4.106 47 C 7.419 47 10.106 44.314 10.106 41 Z"}).setFill(g).setTransform({xx:1,
xy:0,yx:0,yy:1,dx:10.306,dy:0.009});c.createRect({x:9.5,y:1.5,width:2,height:34,r:0.833717}).setFill(e).setStroke(this.color);c.createRect({x:9,y:0,width:3,height:34,r:6}).setFill({type:"linear",x1:9,y1:0,x2:9,y2:34,colors:[{offset:0,color:"white"},{offset:1,color:this.color}]});return a}})});
/// GlossyHorizontalGaugeMarker.js.map