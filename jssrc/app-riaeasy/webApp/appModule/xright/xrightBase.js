define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 576,
	"_riaswType": "rias.riasw.studio.Module",
	"_riaswVersion": "0.7",
	"op": "query",
	"query": {
	},
	"style": {
		"height": "25em",
		"padding": "0px",
		"width": "56em"
	},
	"target": {
		"$refScript": "return rias.webApp.dataServerAddr + 'act/xright/query';"
	},
	"afterLoaded": function (/*{widgets: widgets, parent: parent, module: m}*/result){
			var m = this;
			rias.forEach(m.table._widgets, function(child){
				child.set("disabled", m.initDisabled || child.disabled);
				child.set("readOnly", m.initReadOnly || child.readOnly);
			});
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
				}
			}
			m.edt_typ.item ? v.typ = m.edt_typ.item.dval : delete v.typ;
			m.edt_stat.item ? v.stat = m.edt_stat.item.dval : delete v.stat;
			if(m.target){
				if(m.op === "add" || m.op === "copy"){
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
				"padding": "1px"
			},
			"childLabelWidth": "6em",
			"childShowLabel": true,
			"childStyle": {
				"height": "2em",
				"width": "100%"
			},
			"colWidths": [
				"33%",
				"33%",
				"30%",
				"4%"
			],
			"cols": 4,
			"region": "center",
			"style": {
				"margin": "auto"
			},
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_id",
					"label": "菜单/权限id",
					"name": "id",
					"position": {
						"col": 0,
						"row": 1
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_text",
					"label": "菜单/权限名称",
					"name": "text",
					"position": {
						"col": 1,
						"row": 1
					}
				},
				{
					"_riaswType": "rias.riasw.form.ButtonBox",
					"_riaswIdOfModule": "edt_dicon",
					"label": "图标",
					"name": "dicon",
					"pageSize": 16,
					"position": {
						"col": 2,
						"row": 1
					},
					"query": {
						"parentCode": "xdictdtyp"
					},
					"queryExpr": "${0}%",
					"store": {
						"_riaswType": "rias.riasw.store.JsonXhrStore",
						"idAttribute": "dval",
						"labelAttribute": "text",
						"target": "act/xdict/query"
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_idp",
					"label": "上级id",
					"name": "idp",
					"position": {
						"col": 0,
						"row": 2
					}
				},
				{
					"_riaswType": "rias.riasw.form.NumberSpinner",
					"_riaswIdOfModule": "edt_ord",
					"label": "顺序号",
					"name": "ord",
					"position": {
						"col": 1,
						"row": 2
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_children",
					"disabled": true,
					"label": "子项数",
					"name": "children",
					"position": {
						"col": 2,
						"row": 2
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_code",
					"label": "编码",
					"name": "code",
					"position": {
						"col": 0,
						"row": 3
					}
				},
				{
					"_riaswType": "rias.riasw.form.ComboBox",
					"_riaswIdOfModule": "edt_typ",
					"label": "类型",
					"name": "typ",
					"pageSize": 16,
					"position": {
						"col": 1,
						"row": 3
					},
					"query": {
						"parentCode": "xrighttyp"
					},
					"queryExpr": "${0}%",
					"searchAttr": "text",
					"store": {
						"_riaswType": "rias.riasw.store.JsonXhrStore",
						"idAttribute": "dval",
						"labelAttribute": "text",
						"target": "act/xdict/query"
					}
				},
				{
					"_riaswType": "rias.riasw.form.ComboBox",
					"_riaswIdOfModule": "edt_stat",
					"label": "状态",
					"name": "stat",
					"pageSize": 16,
					"position": {
						"col": 2,
						"row": 3
					},
					"query": {
						"parentCode": "xdictstat"
					},
					"queryExpr": "${0}%",
					"searchAttr": "text",
					"store": {
						"_riaswType": "rias.riasw.store.JsonXhrStore",
						"idAttribute": "dval",
						"labelAttribute": "text",
						"target": "act/xdict/query"
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextArea",
					"_riaswIdOfModule": "edt_dcmd",
					"label": "运行(js)",
					"name": "dcmd",
					"position": {
						"col": 0,
						"colSpan": 3,
						"row": 4
					},
					"style": {
						"height": "15em"
					}
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edt_dinfo",
					"label": "备注",
					"name": "dinfo",
					"position": {
						"col": 0,
						"colSpan": 3,
						"row": 5
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
