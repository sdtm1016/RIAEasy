define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 14,
	"_riaswType": "rias.riasw.studio.Module",
	"_riaswVersion": "0.7",
	"caption": "操作员信息",
	"op": "query",
	"query": {
	},
	"style": {
		"height": "12em",
		"padding": "0px",
		"width": "56em"
	},
	"target": {
		"$refScript": "return rias.webApp.dataServerAddr + 'act/xoper/query';"
	},
	"afterLoaded": function (/*{widgets: widgets, parent: parent, module: m}*/result){
		var m = this;
		m.loadData(m.query).then(function(){
		});
	},
	"loadData": function (query){
		var m = this,
			s = m._store,
			d = rias.newDeferred();
		if(query){
			rias.when(s.query(query), function(items){
				if(items.length > 0){
					m.table.set("value", items[0]);
				}else{
					m.table.reset();
				}
				d.resolve(items);
			}, function(err){
				console.error("error loading the data: ", query, err);
				d.resolve(m, err);
			});
		}else{
			d.resolve(m);
		}
		return d.promise;
	},
	"onSubmit": function (){
		var m = this,
			v = m.table.get("value"),
			d = rias.newDeferred();
		function _cb(result){
			if(!result.success || result.success < 1){
				m.canClose = false;
				rias.warn({parent: m, content: "提交处理失败", caption: m.caption});
				d.reject(0);
			}else{
				m.canClose = true;
				d.resolve(1);
				if(rias.webApp.datas){
					rias.webApp.datas.loadXoper();
				}
			}
		}
		if(m.target){
			if(m.op === "add"){
				rias.xhrPost(m.target, v, _cb);
			}else if(m.op === "modify"){
				v._idDirty = m.query.id;
				rias.xhrPut(m.target, v, _cb);
			}else{
				d.resolve(1);
			}
		}else{
			d.resolve(1);
		}
		return d.promise;
	},
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.layout.TablePanel",
			"_riaswIdOfModule": "table",
			"cellStyle": {
				"border": "0px solid darkblue",
				"height": "2.2em"
			},
			"childLabelWidth": "6em",
			"childShowLabel": true,
			"childStyle": {
				"height": "2em",
				"width": "100%"
			},
			"colWidths": [
				"35%",
				"35%",
				"30%"
			],
			"cols": 3,
			"region": "center",
			"style": {
				"height": "100%",
				"margin": "auto",
				"width": "60em"
			},
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_code",
					"label": "操作员工号",
					"name": "code",
					"position": {
						"col": 0,
						"row": 0
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_text",
					"label": "操作员姓名",
					"name": "text",
					"position": {
						"col": 1,
						"row": 0
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_id",
					"label": "检索字(id)",
					"name": "id",
					"position": {
						"col": 2,
						"row": 0
					},
					"readOnly": true
				},
				{
					"_riaswType": "rias.riasw.form.ComboBox",
					"_riaswIdOfModule": "edt_typ",
					"label": "操作员类型",
					"name": "typ",
					"pageSize": 16,
					"position": {
						"col": 0,
						"row": 1
					},
					"query": {
						"parentCode": "/^s*$|xopertyp/"
					},
					"queryExpr": "${0}*",
					"searchAttr": "text",
					"store": {
						"$refObj": "rias.webApp.datas.xdict"
					}
				},
				{
					"_riaswType": "rias.riasw.form.ComboBox",
					"_riaswIdOfModule": "edt_stat",
					"label": "账号状态",
					"name": "stat",
					"pageSize": 16,
					"position": {
						"col": 1,
						"row": 1
					},
					"query": {
						"parentCode": "/^s*$|xoperstat/"
					},
					"queryExpr": "${0}*",
					"searchAttr": "text",
					"store": {
						"$refObj": "rias.webApp.datas.xdict"
					}
				},
				{
					"_riaswType": "rias.riasw.form.ComboBox",
					"_riaswIdOfModule": "edt_dxm",
					"label": "工作状态",
					"name": "dstat",
					"position": {
						"col": 2,
						"row": 1
					},
					"query": {
						"parentCode": "/^s*$|xoperdstat/"
					},
					"queryExpr": "${0}*",
					"searchAttr": "text",
					"store": {
						"$refObj": "rias.webApp.datas.xdict"
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_dmobile",
					"label": "绑定手机",
					"name": "dmobile",
					"position": {
						"col": 0,
						"row": 2
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_dcode",
					"label": "证件编号",
					"name": "dcode",
					"position": {
						"col": 1,
						"row": 2
					}
				},
				{
					"_riaswType": "rias.riasw.form.ComboBox",
					"_riaswIdOfModule": "edt_dtyp",
					"label": "证件类型",
					"name": "dtyp",
					"pageSize": 16,
					"position": {
						"col": 2,
						"row": 2
					},
					"query": {
						"parentCode": "/^s*$|idcardtyp/"
					},
					"queryExpr": "${0}*",
					"searchAttr": "text",
					"store": {
						"$refObj": "rias.webApp.datas.xdict"
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_demail",
					"label": "eMail",
					"name": "demail",
					"position": {
						"col": 1,
						"colSpan": 2,
						"row": 3
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_dtele",
					"label": "其他联系方式",
					"name": "dtele",
					"position": {
						"col": 0,
						"row": 3
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_dinfo",
					"dropDownArgs": {
						"moduleMeta": {
							"moduleMeta": "appModule/mainMenu",
							"style": {
								"height": "480px",
								"width": "260px"
							}
						}
					},
					"label": "备注",
					"name": "dinfo",
					"position": {
						"col": 0,
						"colSpan": 3,
						"row": 4
					}
				}
			]
		},
		{
			"_riaswType": "rias.riasw.store.JsonXhrStore",
			"_riaswIdOfModule": "_store",
			"idAttribute": "id",
			"target": {
				"$refScript": "return module.target;"
			}
		}
	]
}
	
});
