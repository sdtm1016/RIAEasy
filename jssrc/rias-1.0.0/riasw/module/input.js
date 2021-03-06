define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 31,
	"_riaswType": "rias.riasw.studio.Module",
	"_riaswVersion": "0.7",
	"activeChild": "edt_val",
	"iconClass": "inputIcon",
	"infos": "",
	"style": {
		"padding": "0px",
		"width": "25em"
	},
	"value": "",
	"afterFiler": function (result){
			//var m = this;
			//m.edt_val.set("value", m.value);
		this.lbInfos.set("content", "<font color='darkblue'><b>" + this.infos + "</b></font>");
		this.lbOldValue.set("content", "<font color='darkblue'><b>原来的值: " + this._oldValue + "</b></font>");
		this.edt_val.set("value", this._get("value"));
		},
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
			"_riaswIdOfModule": "lbInfos",
			"layoutPriority": 0,
			"style": {
				"padding": "0.25em"
			}
		},
		{
			"_riaswType": "rias.riasw.layout.ContentPanel",
			"_riaswIdOfModule": "lbOldValue",
			"layoutPriority": 1,
			"style": {
				"padding": "0.25em"
			}
		},
		{
			"_riaswType": "rias.riasw.layout.Panel",
			"_riaswIdOfModule": "_editWidgets",
			"layoutPriority": 2,
			"style": {
				"height": "3em",
				"padding": "1em"
			},
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_val",
					"label": "请输入：",
					"labelWidth": "4em",
					"name": "val",
					"region": "top",
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
						if(!m.isLoaded){
							return;
						}
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
