//>>built
define("dojox/mobile/bidi/SwapView",["dojo/_base/declare"],function(b){return b(null,{_callParentFunction:!1,nextView:function(a){if(this.isLeftToRight()||this._callParentFunction)return this._callParentFunction=!1,this.inherited(arguments);this._callParentFunction=!0;return this.previousView(a)},previousView:function(a){if(this.isLeftToRight()||this._callParentFunction)return this._callParentFunction=!1,this.inherited(arguments);this._callParentFunction=!0;return this.nextView(a)}})});
/// SwapView.js.map