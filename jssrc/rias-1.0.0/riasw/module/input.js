define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 10,
	"_riaswVersion": "0.7",
		iconClass: "inputIcon",
	"activeNode": "edt_val",
	"value": "",
	"style": {
		"border": "0px silver solid",
		"height": "6em",
		"padding": "0px",
		"width": "25em"
	},
	"afterFiler": function (result){
			//var m = this;
			//m.edt_val.set("value", m.value);
		this.lbOldValue.set("content", "<font color='darkblue'><b>原来的值: " + this._oldValue + "</b></font>");
		this.edt_val.set("value", this._get("value"));
		},
		//"_setRiasSelectInitialValueAttr": function (value){
		//	this.set("value", value);
		//},
		//"getRiasrModuleResult": function (){
		//	return this.get("value");
		//},
		"_setValueAttr": function (value){
			if(!("_oldValue" in this)){
				this._oldValue = value ? value : "(无)";
				//if(this.lbOldValue){
				//	this.lbOldValue.set("content", "<font color='darkblue'><b>原来的值: " + this._oldValue + "</b></font>");
				//}
			}
			//if(this.edt_val){
			//	this.edt_val.set("value", value);
			//}else{
				this._set("value", value);
			//}
		},
	"_getValueAttr": function (){
			if(this.edt_val){
				return this.edt_val.get("value");
			}else{
				return this._get("value");
			}
		},
	"onSubmit": function (){
			this.set("value", this.get("value"));
		this.set("_riasrModuleResult", this.get("value"));
			//return this.isValid();
		return this.inherited(arguments);
		},
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.layout.ContentPanel",
			"_riaswIdOfModule": "lbOldValue",
			"region": "top",
			"style": {
				"padding": "4px"
			}
		},
		{
			"_riaswType": "rias.riasw.layout.Panel",
			"_riaswIdOfModule": "_editWidgets",
			"region": "center",
			"style": {
				"padding": "1em"
			},
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_val",
					"region": "top",
					"name": "val",
					"label": "请输入：",
					"labelWidth": "4em",
					"showLabel": true,
					"style": {
						"height": "2em",
						"padding": "0"
					},
					"onKeyDown": function (evt){
						var m = this._riasrModule;
						if(evt.keyCode == rias.keys.ENTER){
							if(m.btnOk){
								m.btnOk.focus();
							}else if(m.btnCancel){
								m.btnCancel.focus();
							}
						}
					},
					"onChange": function (newValue){
						var m = this._riasrModule;
						if(m.btnOk){
							m.btnOk.focus();
						}else if(m.btnCancel){
							m.btnCancel.focus();
						}
					}
				}
			]
		}
	]
}
	
});