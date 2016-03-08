define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 488,
	"_riaswVersion": "0.7",
	"style": {
		"height": "12em",
		"padding": "0px",
		"width": "60em"
	},
	"onSubmit": function (){
		var m = this,
			d = rias.newDeferred();
		rias.when(m.baseModule.onSubmit(), function(){
			d.resolve(1);
		}, function(){
			d.reject(0);
		});
		return d.promise;
	},
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.studio.Module",
			"_riaswIdOfModule": "baseModule",
			"disabled": {
				"$refObj": "disabled"
			},
			"moduleMeta": "appModule/xdict/xdictBase",
			"op": {
				"$refScript": "return module.op;"
			},
			"query": {
				"$refScript": "return module.query;"
			},
			"readOnly": {
				"$refObj": "readOnly"
			},
			"region": "center",
			"style": {
			}
		}
	]
}
	
});
