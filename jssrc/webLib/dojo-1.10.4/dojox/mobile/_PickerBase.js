//>>built
define("dojox/mobile/_PickerBase","dojo/_base/array dojo/_base/declare dijit/_Contained dijit/_Container dijit/_WidgetBase dojo/has require".split(" "),function(d,e,f,g,h,k,l){return e("dojox.mobile._PickerBase",[h,g,f],{slotClasses:[],slotProps:[],slotOrder:[],buildRendering:function(){this.inherited(arguments);this.slots=[];for(var a=0;a<this.slotClasses.length;a++){var b=this.slotOrder.length?this.slotOrder[a]:a,c=new this.slotClasses[b](this.slotProps[b]);this.addChild(c);this.slots[b]=c}},startup:function(){this._started||
(this._duringStartup=!0,this.inherited(arguments),this.reset(),delete this._duringStartup)},getSlots:function(){return this.slots.length?this.slots:d.filter(this.getChildren(),function(a){return-1!==a.declaredClass.indexOf("Slot")})},_getValuesAttr:function(){return d.map(this.getSlots(),function(a){return a.get("value")})},_setValuesAttr:function(a){d.forEach(this.getSlots(),function(b,c){b.set("value",a[c])})},_setColorsAttr:function(a){d.forEach(this.getSlots(),function(b,c){b.setColor&&b.setColor(a[c])})},
reset:function(){d.forEach(this.getSlots(),function(a){a.setInitialValue()})}})});
/// _PickerBase.js.map