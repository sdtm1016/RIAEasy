define([
	"rias"
], function(rias){
	return {
		"_rsfVersion": 50,
		"_riaswType": "rias.riasw.studio.Module",
		"_riaswVersion": "0.7",
		"style": {
			"height": "25em",
			"padding": "0px",
			"width": "56em"
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
				"initDisabled": {
					"$refObj": "module.initDisabled"
				},
				"moduleMeta": "appModule/xright/xrightBase",
				"op": {
					"$refObj": "module.op"
				},
				"query": {
					"$refObj": "module.query"
				},
				"initReadOnly": {
					"$refObj": "module.initReadOnly"
				},
				"region": "center"
			}
		]
	}

});
