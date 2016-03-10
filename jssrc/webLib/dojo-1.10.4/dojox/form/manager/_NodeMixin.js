//>>built

define("dojox/form/manager/_NodeMixin", ["dojo/_base/lang", "dojo/_base/array", "dojo/on", "dojo/dom", "dojo/dom-attr", "dojo/query", "./_Mixin", "dijit/form/_FormWidget", "dijit/_base/manager", "dojo/_base/declare"], function (lang, array, on, dom, domAttr, query, _Mixin, _FormWidget, manager, declare) {
    var fm = lang.getObject("dojox.form.manager", true), aa = fm.actionAdapter, keys = fm._keys, ce = fm.changeEvent = function (node) {
        var eventName = "click";
        switch (node.tagName.toLowerCase()) {
          case "textarea":
            eventName = "keyup";
            break;
          case "select":
            eventName = "change";
            break;
          case "input":
            switch (node.type.toLowerCase()) {
              case "text":
              case "password":
                eventName = "keyup";
                break;
            }
            break;
        }
        return eventName;
    }, registerNode = function (node, groupNode) {
        var name = domAttr.get(node, "name");
        groupNode = groupNode || this.domNode;
        if (name && !(name in this.formWidgets)) {
            for (var n = node; n && n !== groupNode; n = n.parentNode) {
                if (domAttr.get(n, "widgetId") && manager.byNode(n).isInstanceOf(_FormWidget)) {
                    return null;
                }
            }
            if (node.tagName.toLowerCase() == "input" && node.type.toLowerCase() == "radio") {
                var a = this.formNodes[name];
                a = a && a.node;
                if (a && lang.isArray(a)) {
                    a.push(node);
                } else {
                    this.formNodes[name] = {node:[node], connections:[]};
                }
            } else {
                this.formNodes[name] = {node:node, connections:[]};
            }
        } else {
            name = null;
        }
        return name;
    }, getObserversFromNode = function (name) {
        var observers = {};
        aa(function (_, n) {
            var o = domAttr.get(n, "data-dojo-observer") || domAttr.get(n, "observer");
            if (o && typeof o == "string") {
                array.forEach(o.split(","), function (o) {
                    o = lang.trim(o);
                    if (o && lang.isFunction(this[o])) {
                        observers[o] = 1;
                    }
                }, this);
            }
        }).call(this, null, this.formNodes[name].node);
        return keys(observers);
    }, connectNode = function (name, observers) {
        var t = this.formNodes[name], c = t.connections;
        if (c.length) {
            array.forEach(c, function (item) {
                item.remove();
            });
            c = t.connections = [];
        }
        aa(function (_, n) {
            var eventName = ce(n);
            array.forEach(observers, function (o) {
                c.push(on(n, eventName, lang.hitch(this, function (evt) {
                    if (this.watching) {
                        this[o](this.formNodeValue(name), name, n, evt);
                    }
                })));
            }, this);
        }).call(this, null, t.node);
    };
    return declare("dojox.form.manager._NodeMixin", null, {destroy:function () {
        for (var name in this.formNodes) {
            array.forEach(this.formNodes[name].connections, function (item) {
                item.remove();
            });
        }
        this.formNodes = {};
        this.inherited(arguments);
    }, registerNode:function (node) {
        if (typeof node == "string") {
            node = dom.byId(node);
        }
        var name = registerNode.call(this, node);
        if (name) {
            connectNode.call(this, name, getObserversFromNode.call(this, name));
        }
        return this;
    }, unregisterNode:function (name) {
        if (name in this.formNodes) {
            array.forEach(this.formNodes[name].connections, function (item) {
                item.remove();
            });
            delete this.formNodes[name];
        }
        return this;
    }, registerNodeDescendants:function (node) {
        if (typeof node == "string") {
            node = dom.byId(node);
        }
        query("input, select, textarea, button", node).map(function (n) {
            return registerNode.call(this, n, node);
        }, this).forEach(function (name) {
            if (name) {
                connectNode.call(this, name, getObserversFromNode.call(this, name));
            }
        }, this);
        return this;
    }, unregisterNodeDescendants:function (node) {
        if (typeof node == "string") {
            node = dom.byId(node);
        }
        query("input, select, textarea, button", node).map(function (n) {
            return domAttr.get(node, "name") || null;
        }).forEach(function (name) {
            if (name) {
                this.unregisterNode(name);
            }
        }, this);
        return this;
    }, formNodeValue:function (elem, value) {
        var isSetter = arguments.length == 2 && value !== undefined, result;
        if (typeof elem == "string") {
            elem = this.formNodes[elem];
            if (elem) {
                elem = elem.node;
            }
        }
        if (!elem) {
            return null;
        }
        if (lang.isArray(elem)) {
            if (isSetter) {
                array.forEach(elem, function (node) {
                    node.checked = "";
                });
                array.forEach(elem, function (node) {
                    node.checked = node.value === value ? "checked" : "";
                });
                return this;
            }
            array.some(elem, function (node) {
                if (node.checked) {
                    result = node;
                    return true;
                }
                return false;
            });
            return result ? result.value : "";
        }
        switch (elem.tagName.toLowerCase()) {
          case "select":
            if (elem.multiple) {
                if (isSetter) {
                    if (lang.isArray(value)) {
                        var dict = {};
                        array.forEach(value, function (v) {
                            dict[v] = 1;
                        });
                        query("> option", elem).forEach(function (opt) {
                            opt.selected = opt.value in dict;
                        });
                        return this;
                    }
                    query("> option", elem).forEach(function (opt) {
                        opt.selected = opt.value === value;
                    });
                    return this;
                }
                result = query("> option", elem).filter(function (opt) {
                    return opt.selected;
                }).map(function (opt) {
                    return opt.value;
                });
                return result.length == 1 ? result[0] : result;
            }
            if (isSetter) {
                query("> option", elem).forEach(function (opt) {
                    opt.selected = opt.value === value;
                });
                return this;
            }
            return elem.value || "";
          case "button":
            if (isSetter) {
                elem.innerHTML = "" + value;
                return this;
            }
            return elem.innerHTML;
          case "input":
            if (elem.type.toLowerCase() == "checkbox") {
                if (isSetter) {
                    elem.checked = value ? "checked" : "";
                    return this;
                }
                return Boolean(elem.checked);
            }
        }
        if (isSetter) {
            elem.value = "" + value;
            return this;
        }
        return elem.value;
    }, inspectFormNodes:function (inspector, state, defaultValue) {
        var name, result = {};
        if (state) {
            if (lang.isArray(state)) {
                array.forEach(state, function (name) {
                    if (name in this.formNodes) {
                        result[name] = inspector.call(this, name, this.formNodes[name].node, defaultValue);
                    }
                }, this);
            } else {
                for (name in state) {
                    if (name in this.formNodes) {
                        result[name] = inspector.call(this, name, this.formNodes[name].node, state[name]);
                    }
                }
            }
        } else {
            for (name in this.formNodes) {
                result[name] = inspector.call(this, name, this.formNodes[name].node, defaultValue);
            }
        }
        return result;
    }});
});

