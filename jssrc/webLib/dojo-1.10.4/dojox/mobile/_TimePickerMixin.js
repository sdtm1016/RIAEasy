//>>built
define("dojox/mobile/_TimePickerMixin",["dojo/_base/declare","dojo/dom-class","dojo/date/locale"],function(c,e,d){return c("dojox.mobile._TimePickerMixin",null,{reset:function(){var a=new Date,b=a.getHours()+"",a=a.getMinutes(),a=(10>a?"0":"")+a;this.set("colors",[b,a]);this.values?(this.set("values",this.values),this.values=null):this.values12?(this.set("values12",this.values12),this.values12=null):this.set("values",[b,a])},_getDateAttr:function(){var a=this.get("values");return d.parse(a[0]+":"+
a[1],{timePattern:"H:m",selector:"time"})}})});
/// _TimePickerMixin.js.map