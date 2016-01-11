
//RIAStudio client runtime widget - RoundRectList

define([
	"rias/riasw/mobile/mobileBase",
	"dojox/mobile/RoundRectList",
	"dojox/mobile/_EditableListMixin",
	"rias/riasw/mobile/ListItem"
], function(rias, _Widget){

	rias.theme.loadCss([
		"RoundRectList.css"
	], true);

	var riasType = "rias.riasw.mobile.RoundRectList";
	var Widget = rias.declare(riasType, [_Widget], {

	});

	Widget._riasdMeta = {
		visual: true,
		iconClass: "riaswRoundRectListIcon",
		iconClass16: "riaswRoundRectListIcon16",
		defaultParams: {
		},
		initialSize: {},
		//allowedChild: "",
		property: {
		}
	};

	return Widget;

});
