define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 239,
	"requires": [
	],
	"moduleCss": [
	],
	"_riaswVersion": "1.0",
	"region": "center",
	"caption": "新的页面模块",
	"title": "新的页面模块",
	"style": {
	},
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.layout.CaptionPanel",
			"_riaswIdOfModule": "panTree",
			"caption": "导航",
			"layoutPriority": 0,
			"region": "left",
			"splitter": true,
			"style": {
				"width": "20em"
			},
			"toggleable": true,
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.grid.DGrid",
					"_riaswIdOfModule": "gridTree",
					"cellOpParams": [
					],
					"query": {
						"parentId": "1"
					},
					"refreshOnSetCollection": true,
					"region": "center",
					"showFooterSummary": false,
					"showHeader": false,
					"showRowNum": false,
					"showSelector": false,
					"structure": [
						{
							"field": "id",
							"format": function (cellData, data){
				return data.text + "(" + cellData + ")";
			},
							"name": "条目名称",
							"width": "15em"
						}
					],
					"style": {
						"border": "1px #b1badf solid"
					},
					"target": {
						"$refScript": "return rias.webApp.dataServerAddr + 'act/xdict/query';"
					},
					"topBtns": [
						"btnRefresh"
					],
					"treeColumns": [
						"id"
					],
					"viewModule": "appModule/xdict/xdictForm",
					"onSelect": function (e){
		var d = e.rows[0];
		d = d && d.data;
		if(d){
			this._riasrModule.grid.refresh({
				id: d.id + "%"
			});
		}
	}
				}
			]
		},
		{
			"_riaswType": "rias.riasw.layout.CaptionPanel",
			"_riaswIdOfModule": "panGrid",
			"caption": "明细",
			"layoutPriority": 0,
			"region": "center",
			"splitter": true,
			"style": {
				"height": "30em"
			},
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.grid.DGrid",
					"_riaswIdOfModule": "grid",
					"cellOpParams": [
						{
							"func": "cellOpOnClick",
							"name": "view",
							"text": "查看",
							"tooltip": "查看详细信息"
						},
						{
							"func": "cellOpOnClick",
							"name": "modify",
							"text": "修改",
							"tooltip": "修改详细信息"
						},
						{
							"func": "cellOpOnClick",
							"name": "copy",
							"text": "复制",
							"tooltip": "复制并新增"
						}
					],
					"query": {
					},
					"region": "center",
					"showHeader": true,
					"refreshOnSetCollection": false,
					"structure": [
						{
							"field": "id",
							"fixed": true,
							"name": "id",
							"width": "10em"
						},
						{
							"editor": "rias.riasw.form.TextBox",
							"field": "text",
							"name": "条目名称",
							"width": "12em"
						},
						{
							"editor": "rias.riasw.form.TextBox",
							"field": "idp",
							"name": "上级id",
							"width": "8em"
						},
						{
							"editor": "rias.riasw.form.TextBox",
							"field": "code",
							"name": "条目编码",
							"width": "8em"
						},
						{
							"editor": "rias.riasw.form.FilteringSelect",
							"editorArgs": {
								"labelAttr": "text",
								"query": {
									"parentCode": "xdictstat"
								},
								"queryExpr": "${0}*",
								"searchAttr": "dval",
								"store": {
									"$refObj": "rias.webApp.datas.xdict"
								}
							},
							"field": "stat",
							"formatter": function (cellData, data){
				return rias.webApp.datas.getXdictTextByCodepDval("xdictstat", cellData);
			},
							"name": "条目状态",
							"width": "6em"
						},
						{
							"editor": "rias.riasw.form.FilteringSelect",
							"editorArgs": {
								"labelAttr": "text",
								"query": {
									"parentCode": "xdicttyp"
								},
								"queryExpr": "${0}*",
								"searchAttr": "dval",
								"store": {
									"$refObj": "rias.webApp.datas.xdict"
								}
							},
							"field": "typ",
							"formatter": function (cellData, data){
				return rias.webApp.datas.getXdictTextByCodepDval("xdicttyp", cellData);
			},
							"name": "条目类型",
							"width": "8em"
						},
						{
							"editor": "rias.riasw.form.FilteringSelect",
							"editorArgs": {
								"query": {
									"parentCode": "xdictdtyp"
								},
								"queryExpr": "${0}*",
								"searchAttr": "dval",
								"store": {
									"$refObj": "rias.webApp.datas.xdict"
								}
							},
							"field": "dtyp",
							"name": "值类型",
							"width": "6em"
						},
						{
							"editor": "rias.riasw.form.TextBox",
							"field": "dval",
							"name": "值",
							"width": "12em"
						},
						{
							"editor": "rias.riasw.form.NumberSpinner",
							"editorArgs": {
								"constraints": {
									"max": 999999,
									"min": 0
								}
							},
							"field": "ord",
							"name": "顺序号",
							"width": "8em"
						},
						{
							"field": "children",
							"name": "子项数",
							"width": "5em"
						}
					],
					"style": {
						"border": "1px #b1badf solid"
					},
					"target": {
						"$refScript": "return rias.webApp.dataServerAddr + 'act/xdict/query';"
					},
					"topBtns": [
						"btnRefresh",
						"btnAddons",
						"btnPrint",
						"btnExport",
						"btnAdd",
						"btnDelete",
						"btnEdit"
					],
					"treeColumns": [
					],
					"viewModule": "appModule/xdict/xdictForm"
				}
			]
		}
	]
}
	
});
