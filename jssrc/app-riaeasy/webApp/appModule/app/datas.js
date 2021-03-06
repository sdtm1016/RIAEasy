define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 76,
	"_riaswType": "rias.riasw.studio.Module",
	"_riaswVersion": "0.7",
	"caption": "",
	"style": {
	},
	"title": "数据集",
	"actions": function (){
		return {
			xdict: rias.webApp.dataServerAddr + 'act/xdict/query',		
			xoper: rias.webApp.dataServerAddr + 'act/xoper/query'		
		};
	},
	"afterLoaded": function (){
		var m = this;
		if(rias.hostMobile && rias.mobileShell){
			m.xdict.target = rias.xhr.toServerUrl(m.actions().xdict);
		}else{
			m.xdict.target = m.actions().xdict;
		}	
	},
	"loadDatas": function (querys){
		var m = this,
			dfs;
		m.dataLoaded = false;
		console.debug("begin datas.loadDatas()");
		try{
			dfs = (rias.hostMobile && rias.mobileShell ? [
				m.loadXdict(querys && querys.xdict)
			] : [
				m.loadXdict(querys && querys.xdict)
			]);
		}catch(e){
			dfs = [];
			console.error("datas.loadDatas() error.", rias.captureStackTrace(e));
		}
		return rias.all(dfs).then(function(){
			m.dataLoaded = true;
			console.debug("end datas.loadDatas()");
		}, function(e){
			m.dataLoadError = true;
			console.error("datas.loadDatas() error.", e);
		});
	},
	"loadXdict": function (query){
		return this.xdict.loadByHttp(query || {
			_initData: 1
		}).then(function(){
			console.debug("datas.loadXdict() ok.");
		}, function(){
			console.error("datas.loadXdict() error.", e);
		});
	},
	"getXdictTextById": function (id){
		return this.xdict.index[id] ? this.xdict.data[this.xdict.index[id]].text : id;
	},
	"getXdictTextByIdpDval": function (idp, dval){
		var item = this.xdict.find({
			idp: idp,
			dval: dval
		});
		return item && item.length > 0 ? item[0].text : dval;
	},
	"getXdictTextByCodepDval": function (codep, dval){
		var item = this.xdict.find({
			parentCode: codep,
			dval: dval
		});
		return item && item.length > 0 ? item[0].text : dval;
	},
	"getXdictTextByCode": function (code){
		var item = this.xdict.find({
			code: code
		});
		return item && item.length > 0 ? item[0].text : code;
	},
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.store.MemoryStore",
			"_riaswIdOfModule": "xdict",
			"defaultData": [
				{
					"id": "",
					"code": "",
					"parentCode": "",
					"text": "无"
				}
			],
			"idAttribute": "id",
			"target": {
				"$refScript": "return module.actions.xdict;"
			},
			"timeout": {
				"$refScript": "return rias.webApp.defaultTimeout;"
			}
		}
	]
}
	
});
