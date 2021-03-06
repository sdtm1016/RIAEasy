define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 55,
	"_riaswVersion": "0.7",
	"caption": {
		"$refObj": "rias.i18n.webApp.myHome.caption"
	},
	"iconClass": "homeIcon",
	"region": "center",
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.layout.Panel",
			"_riaswIdOfModule": "myHomeMain",
			"region": "center",
			"style": {
				"border": "0px",
				"padding": "0px"
			},
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.layout.CaptionPanel",
					"_riaswIdOfModule": "download",
					"caption": "源码下载",
					"containerStyle": {
						"font-size": "15px"
					},
					"content": "<p>   源码下载：<a href=\"https://github.com/riaeasy/riaeasy\" target=\"_blank\">https://github.com/riaeasy/riaeasy</a>\n</p>\n",
					"style": {
					},
					"toggleable": true
				},
				{
					"_riaswType": "rias.riasw.layout.CaptionPanel",
					"_riaswIdOfModule": "about",
					"caption": "关于RIAEasy/RIAStudio",
					"containerStyle": {
						"font-size": "15px"
					},
					"style": {
					},
					"toggleable": true,
					"_riaswChildren": [
						{
							"_riaswType": "rias.riasw.layout.ContentPanel",
							"_riaswIdOfModule": "aboutContent",
							"content": "<p style=\"font-size: 15px; line-height: 1.5em; text-indent: 2em;\">\nRIAEasy - A lightweight, modular, mobile-ready, data-driven for single-page-application.模块化、轻量的富客户/单页应用框架。\n</p>\n<p style=\"font-size: 15px; line-height: 1.5em; text-indent: 2em;\">\nRIAEasy是一个单页 Web 应用 (single-page application 简称为 SPA)设计平台。旨在实现RIA/SPA应用的快速、高质量开发，实现模块化开发，实现移动、桌面系统统一的跨浏览器开发。可以使用RIAStudio在线可视化设计器。\n</p>\n<p style=\"font-size: 15px; line-height: 1.5em; text-indent: 2em;\">\nRIAEasy基于webComponent概念设计，包括一整套基础控件，具有良好的运行期动态适应性；实现了完全的前端渲染，数据驱动，前后分离，无需后端服务器生成页面；实现了主题（theme）分离，可以自由换肤；同时支持桌面和移动端。目前已经基本可以替代EasyUI、ExtJS(Sencha)，特别适合于webMIS和webApp应用。\n</p>\n<p style=\"font-size: 15px; line-height: 1.5em; text-indent: 2em;\">\nRIAEasy基于dojo构建（dojo 1.10），支持HTML5、CSS3；采用AMD（异步模块定义）加载，封装并扩展了dojo、dijit和部分dojox模块，封装并扩展了dgrid、gridx（不推荐）和Eclipse&nbsp;orion 7的在线编辑等控件。\n</p>\n<p style=\"font-size: 15px; line-height: 1.5em; text-indent: 2em;\">\nRIAEasy是面向跨平台的单页应用设计平台，与传统的网页设计模式差别较大，反而更接近传统的C/S桌面应用设计模式。尽管RIAEasy也可以用来快速设计传统的网页，但这显然不是其真正的优势。正如RIAEasy的名称已经表明的，这是一个用来做RIA的工具。如果您做过C/S桌面应用，用过Delphi、C++Builder、VisualStudio这些工具，那么就更容易理解RIAEasy。\n</p>\n",
							"style": {
								"border": "0px #b1badf solid",
								"padding": "0px 0px 0px 0px"
							}
						},
						{
							"_riaswType": "rias.riasw.html.Tag",
							"_riaswIdOfModule": "aboutImg1",
							"alt": "设计器图示",
							"src": {
								"$refScript": "return rias.xhr.toUrl(\"appModule/demo/demoAll_0.png\");"
							},
							"style": {
								"border": "0px #b1badf solid",
								"height": "100%",
								"padding": "0px 0px 0px 0px",
								"text-align": "center",
								"width": "100%"
							},
							"tagType": "img"
						},
						{
							"_riaswType": "rias.riasw.html.Tag",
							"_riaswIdOfModule": "aboutImg2",
							"alt": "设计器图示",
							"src": {
								"$refScript": "return rias.xhr.toUrl(\"appModule/demo/demoAll_1.png\");"
							},
							"style": {
								"border": "0px #b1badf solid",
								"height": "100%",
								"padding": "0px 0px 0px 0px",
								"text-align": "center",
								"width": "100%"
							},
							"tagType": "img"
						}
					]
				},
				{
					"_riaswType": "rias.riasw.layout.CaptionPanel",
					"_riaswIdOfModule": "infos",
					"containerStyle": {
						"font-size": "15px"
					},
					"caption": "相关信息",
					"content": "<p>\n   QQ群：249642604&nbsp;<a href=\"http://shang.qq.com/wpa/qunwpa?idkey=af62c18f7ab99974c83de36927d241e22f8191634ef3d25c1c715d7184149687\" target=\"_blank\">\n   <img alt=\"RIAEasy\" border=\"0\" src=\"http://pub.idqqimg.com/wpa/images/group.png\" title=\"RIAEasy\">\n   </a>\n</p>\n<p>\n   临时站点：<a href=\"http://www.riaeasy.com:8081\" target=\"_blank\">RIAEasy演示</a>\n</p>\n<p>\n   技术博客：<a href=\"http://blog.csdn.net/zensst/article/category/2913205\" target=\"_blank\">关于 RIAEasy 的博客</a>\n</p>\n",
					"style": {
					},
					"toggleable": true
				},
				{
					"_riaswType": "rias.riasw.layout.CaptionPanel",
					"_riaswIdOfModule": "history",
					"caption": "变更历史",
					"containerStyle": {
						"font-size": "15px"
					},
					"content": "<p>\n   &nbsp;2015-1-18，RIAEasy的0.7版上线。&nbsp;\n</p>\n<p>\n   2015-1-19，增加 InnerHTML 编辑功能。&nbsp;\n</p>\n<p>\n   2015-1-20，修改了【助手小易】。&nbsp;\n</p>\n<p>\n   2015-1-21，rias.riasw.html.Tag可用。&nbsp;\n</p>\n<p>\n   2015-1-30，扩展 dijit.form.TextBox 及其子类，增加 label 属性；同时修改了其 css。&nbsp;\n</p>\n<p>\n   2015-2-1，调整设计器界面及功能操作，并修改了部分bug。&nbsp;\n</p>\n<p>\n   2015-2-3，新增 rias.riasw.layout.TablePanel 控件，实现 Table 布局。（暂时不支持 rowSpan）&nbsp;\n</p>\n<!--\n   nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div.\n-->\n",
					"style": {
					},
					"toggleable": true
				}
			]
		}
	]
}
	
});
