
//RIAStudio client runtime widget - RoundRectCategory

define([
	"rias",
	"dojox/mobile/RoundRectCategory"
], function(rias, _Widget){

	rias.theme.loadRiasCss([
		"RoundRectCategory.css"
	], true);

	var riasType = "rias.riasw.mobile.RoundRectCategory";
	var Widget = rias.declare(riasType, [_Widget], {

	});

	Widget._riasdMeta = {
		visual: true,
		iconClass: "riaswRoundRectCategoryIcon",
		iconClass16: "riaswRoundRectCategoryIcon16",
		defaultParams: {
		},
		initialSize: {},
		//allowedChild: "",
		property: {
		}
	};

	return Widget;

});
