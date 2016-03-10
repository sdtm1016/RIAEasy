//>>built

require({cache:{"url:dojox/calc/templates/FuncGen.html":"<div style=\"border:1px solid black;\">\n\t<select data-dojo-type=\"dijit.form.ComboBox\" placeholder=\"functionName\" data-dojo-attach-point='combo' style=\"width:45%;\" class=\"dojoxCalcFuncGenNameBox\" data-dojo-attach-event='onChange:onSelect'></select>\n\t<input data-dojo-type=\"dijit.form.TextBox\" placeholder=\"arguments\" class=\"dojoxCalcFuncGenTextBox\" style=\"width:50%;\" data-dojo-attach-point='args' />\n\t<BR>\n\t<TEXTAREA data-dojo-type=\"dijit.form.SimpleTextarea\" placeholder=\"function body\" class=\"dojoxCalcFuncGenTextArea\" style=\"text-align:left;width:95%;\" rows=10 data-dojo-attach-point='textarea' value=\"\" data-dojo-attach-event='onClick:readyStatus'></TEXTAREA>\n\t<BR>\n\t<input data-dojo-type=\"dijit.form.Button\" class=\"dojoxCalcFuncGenSave\" data-dojo-attach-point='saveButton' label=\"Save\" data-dojo-attach-event='onClick:onSaved' />\n\t<input data-dojo-type=\"dijit.form.Button\" class=\"dojoxCalcFuncGenReset\" data-dojo-attach-point='resetButton' label=\"Reset\" data-dojo-attach-event='onClick:onReset' />\n\t<input data-dojo-type=\"dijit.form.Button\" class=\"dojoxCalcFuncGenClear\" data-dojo-attach-point='clearButton' label=\"Clear\" data-dojo-attach-event='onClick:onClear' />\n\t<input data-dojo-type=\"dijit.form.Button\" class=\"dojoxCalcFuncGenClose\" data-dojo-attach-point='closeButton' label=\"Close\" />\n\t<BR><BR>\n\t<input data-dojo-type=\"dijit.form.Button\" class=\"dojoxCalcFuncGenDelete\" data-dojo-attach-point='deleteButton' label=\"Delete\" data-dojo-attach-event='onClick:onDelete' />\n\t<BR>\n\t<input data-dojo-type=\"dijit.form.TextBox\" style=\"width:45%;\" data-dojo-attach-point='status' class=\"dojoxCalcFuncGenStatusTextBox\" readonly value=\"Ready\" />\n</div>\n"}});
define("dojox/calc/FuncGen", ["dojo/_base/declare", "dojo/_base/lang", "dojo/dom-style", "dijit/_WidgetBase", "dijit/_WidgetsInTemplateMixin", "dijit/_TemplatedMixin", "dojox/math/_base", "dijit/registry", "dojo/text!./templates/FuncGen.html", "dojox/calc/_Executor", "dijit/form/ComboBox", "dijit/form/SimpleTextarea", "dijit/form/Button", "dijit/form/TextBox"], function (declare, lang, domStyle, WidgetBase, WidgetsInTemplateMixin, TemplatedMixin, math, registry, template, calc) {
    var FuncGen = declare("dojox.calc.FuncGen", [WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {templateString:template, onSelect:function () {
        this.reset();
    }, onClear:function () {
        var answer = confirm("Do you want to clear the name, argument, and body text?");
        if (answer) {
            this.clear();
        }
    }, saveFunction:function (name, args, body) {
    }, onSaved:function () {
    }, clear:function () {
        this.textarea.set("value", "");
        this.args.set("value", "");
        this.combo.set("value", "");
    }, reset:function () {
        if (this.combo.get("value") in this.functions) {
            this.textarea.set("value", this.functions[this.combo.get("value")].body);
            this.args.set("value", this.functions[this.combo.get("value")].args);
        }
    }, onReset:function () {
        if (this.combo.get("value") in this.functions) {
            var answer = confirm("Do you want to reset this function?");
            if (answer) {
                this.reset();
                this.status.set("value", "The function has been reset to its last save point.");
            }
        }
    }, deleteThing:function (item) {
        if (this.writeStore.isItem(item)) {
            this.writeStore.deleteItem(item);
            this.writeStore.save();
        } else {
        }
    }, deleteFunction:function (name) {
    }, onDelete:function () {
        var name;
        if ((name = this.combo.get("value")) in this.functions) {
            var answer = confirm("Do you want to delete this function?");
            if (answer) {
                var item = this.combo.item;
                this.writeStore.deleteItem(item);
                this.writeStore.save();
                this.deleteFunction(name);
                delete this.functions[name];
                this.clear();
            }
        } else {
            this.status.set("value", "Function cannot be deleted, it isn't saved.");
        }
    }, readyStatus:function () {
        this.status.set("value", "Ready");
    }, writeStore:null, readStore:null, functions:null, startup:function () {
        this.combo.set("store", this.writeStore);
        this.inherited(arguments);
        var parent = registry.getEnclosingWidget(this.domNode.parentNode);
        if (parent && typeof parent.close == "function") {
            this.closeButton.set("onClick", lang.hitch(parent, "close"));
        } else {
            domStyle.set(this.closeButton.domNode, {display:"none"});
        }
    }});
    return lang.mixin(calc, {FuncGen:FuncGen});
});

