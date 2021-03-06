//RIAStudio client runtime widget - MenuItem

define([
	"rias",
	"dijit/MenuItem"
], function(rias, _Widget) {

	rias.theme.loadRiasCss([
		"widget/Menu.css"
	]);

	var riasType = "rias.riasw.widget.MenuItem";
	var Widget = rias.declare(riasType, [_Widget], {
	});

	Widget._riasdMeta = {
		visual: true,
		iconClass: "riaswMenuItemIcon",
		iconClass16: "riaswMenuItemIcon16",
		defaultParams: {
			//content: "<span></span>",
			//label: "MenuItem",
			accelKey: ""
		},
		initialSize: {},
		resizable: "none",
		allowedParent: "dijit.Menu, dijit.PopupMenuBarItem",
		allowedChild: "",
		"property": {
			"label": {
				"datatype": "string",
				"title": "Label"
			},
			"iconClass": {
				"datatype": "string",
				"title": "Icon Class"
			},
			"accelKey": {
				"datatype": "string",
				"title": "Shortcut Key"
			},
			"disabled": {
				"datatype": "boolean",
				"title": "Disabled"
			}
		}
	};

	return Widget;

});