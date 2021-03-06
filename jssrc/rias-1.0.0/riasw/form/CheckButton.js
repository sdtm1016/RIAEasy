//RIAStudio client runtime widget - CheckButton

define([
	"rias",
	"rias/riasw/form/ToggleButton"
], function(rias, _Widget) {

	//rias.theme.loadRiasCss([
	//	"form/Button.css"
	//]);

	var riasType = "rias.riasw.form.CheckButton";
	var Widget = rias.declare(riasType, [_Widget], {

		// type: [private] String
		//		type attribute on `<input>` node.
		//		Overrides `dijit/form/Button.type`.  Users should not change this value.
		type: "checkbox",
		// value: String
		//		As an initialization parameter, equivalent to value field on normal checkbox
		//		(if checked, the value is passed as the value when form is submitted).
		value: "on",
		// readOnly: Boolean
		//		Should this widget respond to user input?
		//		In markup, this is specified as "readOnly".
		//		Similar to disabled except readOnly form values are submitted.
		readOnly: false,
		// aria-pressed for toggle buttons, and aria-checked for checkboxes
		_aria_attr: "aria-checked",
		//_setIconClassAttr: null,
		//_setNameAttr: "focusNode",

		templateString:
			'<span data-dojo-attach-point="focusNode,buttonNode" class="dijitReset dijitInline dijitStretch dijitButtonNode dijitButtonContents" data-dojo-attach-event="ondijitclick:__onClick" role="button" aria-labelledby="${id}_label">'+
				'<span data-dojo-attach-point="badgeNode" class="${badgeClass}"></span>'+
				'<span data-dojo-attach-point="checkIconNode" class="dijitReset dijitInline dijitCheckBoxIcon"></span>'+
				'<span data-dojo-attach-point="iconNode" class="dijitReset dijitInline dijitIcon"></span>'+
				//'<span class="dijitReset dijitToggleButtonIconChar">&#x25CF;</span>'+
				'<span data-dojo-attach-point="containerNode,titleNode,labelNode" class="dijitReset dijitInline dijitButtonText" id="${id}_label" role="presentation"></span>'+
				'<input data-dojo-attach-point="valueNode" data-dojo-attach-event="onclick:_onClick" type="${type}" value="${value}" class="dijitOffScreen" tabIndex="-1" role="presentation" aria-hidden="true" ${!nameAttrSetting}/>'+
			'</span>',

		baseClass: "riaswCheckButton dijitButtonNode",
		//iconClass: "dijitCheckBoxIcon",

		_setReadOnlyAttr: function(/*Boolean*/ value){
			this._set("readOnly", value);
			rias.dom.setAttr(this.focusNode, 'readOnly', value);
		},

		_getSubmitValue: function(/*String*/ value){
			return (value == null || value === "") ? "on" : value;
		},
		__setValueAttr: function(newValue){
			newValue = this._getSubmitValue(newValue);	// "on" to match browser native behavior when value unspecified
			this._set("value", newValue);
			rias.dom.setAttr(this.focusNode, "value", newValue);
		},
		_setValueAttr: function(/*String|Boolean*/ newValue, /*Boolean*/ priorityChange){
			// summary:
			//		Handler for value= attribute to constructor, and also calls to
			//		set('value', val).
			// description:
			//		During initialization, just saves as attribute to the `<input type=checkbox>`.
			//
			//		After initialization,
			//		when passed a boolean, controls whether or not the CheckBox is checked.
			//		If passed a string, changes the value attribute of the CheckBox (the one
			//		specified as "value" when the CheckBox was constructed
			//		(ex: `<input data-dojo-type="dijit/CheckBox" value="chicken">`).
			//
			//		`widget.set('value', string)` will check the checkbox and change the value to the
			//		specified string.
			//
			//		`widget.set('value', boolean)` will change the checked state.

			if(typeof newValue == "string"){
				//this.inherited(arguments);
				this.__setValueAttr(newValue);
				newValue = true;
			}
			if(this._created){
				this.set('checked', newValue, priorityChange);
			}
		},
		_getValueAttr: function(){
			// summary:
			//		Hook so get('value') works.
			// description:
			//		If the CheckBox is checked, returns the value attribute.
			//		Otherwise returns false.
			return this.checked && this._get("value");
		},

		reset: function(){
			this.inherited(arguments);
			// Handle unlikely event that the <input type=checkbox> value attribute has changed
			this._set("value", this._getSubmitValue(this.params.value));
			rias.dom.setAttr(this.focusNode, 'value', this.value);
		},

		_onClick: function(/*Event*/ e){
			// summary:
			//		Internal function to handle click actions - need to check
			//		readOnly, since button no longer does that check.
			if(this.readOnly){
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			return this.inherited(arguments);
		}
	});

	Widget._riasdMeta = {
		visual: true,
		iconClass: "riaswToggleButtonIcon",
		iconClass16: "riaswToggleButtonIcon16",
		defaultParams: {
			//content: "<input type='button'></input>",
			//label: "CheckButton",
			//showLabel: true,
		},
		initialSize: {},
		resizable: "none",
		allowedChild: "",
		"property": {
			"name": {
				"datatype": "string",
				"title": "Name"
			},
			"alt": {
				"datatype": "string",
				"hidden": true
			},
			"value": {
				"datatype": "string",
				"title": "Value"
			},
			"tabIndex": {
				"datatype": "string",
				"defaultValue": "0",
				"title": "Tab Index"
			},
			"disabled": {
				"datatype": "boolean",
				"title": "Disabled"
			},
			"readOnly": {
				"datatype": "boolean",
				"hidden": true
			},
			"intermediateChanges": {
				"datatype": "boolean",
				"hidden": true
			},
			"label": {
				"datatype": "string",
				"title": "Label"
			},
			"showLabel": {
				"datatype": "boolean",
				"defaultValue": true,
				"title": "Show Label"
			},
			"iconClass": {
				"datatype": "string",
				"defaultValue": "dijitCheckBoxIcon",
				"title": "Icon Class"
			},
			"checked": {
				"datatype": "boolean",
				"title": "Checked"
			},
			"scrollOnFocus": {
				"datatype": "boolean",
				"description": "On focus, should this widget scroll into view?",
				"hidden": false,
				"defaultValue": true
			}
		}
	};

	return Widget;

});