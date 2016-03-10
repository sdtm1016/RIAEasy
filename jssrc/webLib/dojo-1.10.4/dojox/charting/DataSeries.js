//>>built

define("dojox/charting/DataSeries", ["dojo/_base/lang", "dojo/_base/declare", "dojo/_base/array", "dojo/_base/connect", "dojox/lang/functional"], function (Lang, declare, ArrayUtil, connect, df) {
    return declare("dojox.charting.DataSeries", null, {constructor:function (store, kwArgs, value) {
        this.store = store;
        this.kwArgs = kwArgs;
        if (value) {
            if (Lang.isFunction(value)) {
                this.value = value;
            } else {
                if (Lang.isObject(value)) {
                    this.value = Lang.hitch(this, "_dictValue", df.keys(value), value);
                } else {
                    this.value = Lang.hitch(this, "_fieldValue", value);
                }
            }
        } else {
            this.value = Lang.hitch(this, "_defaultValue");
        }
        this.data = [];
        this._events = [];
        if (this.store.getFeatures()["dojo.data.api.Notification"]) {
            this._events.push(connect.connect(this.store, "onNew", this, "_onStoreNew"), connect.connect(this.store, "onDelete", this, "_onStoreDelete"), connect.connect(this.store, "onSet", this, "_onStoreSet"));
        }
        this._initialRendering = true;
        this.fetch();
    }, destroy:function () {
        ArrayUtil.forEach(this._events, connect.disconnect);
    }, setSeriesObject:function (series) {
        this.series = series;
    }, _dictValue:function (keys, dict, store, item) {
        var o = {};
        ArrayUtil.forEach(keys, function (key) {
            o[key] = store.getValue(item, dict[key]);
        });
        return o;
    }, _fieldValue:function (field, store, item) {
        return store.getValue(item, field);
    }, _defaultValue:function (store, item) {
        return store.getValue(item, "value");
    }, fetch:function () {
        if (!this._inFlight) {
            this._inFlight = true;
            var kwArgs = Lang.delegate(this.kwArgs);
            kwArgs.onComplete = Lang.hitch(this, "_onFetchComplete");
            kwArgs.onError = Lang.hitch(this, "onFetchError");
            this.store.fetch(kwArgs);
        }
    }, _onFetchComplete:function (items, request) {
        this.items = items;
        this._buildItemMap();
        this.data = ArrayUtil.map(this.items, function (item) {
            return this.value(this.store, item);
        }, this);
        this._pushDataChanges();
        this._inFlight = false;
    }, onFetchError:function (errorData, request) {
        this._inFlight = false;
    }, _buildItemMap:function () {
        if (this.store.getFeatures()["dojo.data.api.Identity"]) {
            var itemMap = {};
            ArrayUtil.forEach(this.items, function (item, index) {
                itemMap[this.store.getIdentity(item)] = index;
            }, this);
            this.itemMap = itemMap;
        }
    }, _pushDataChanges:function () {
        if (this.series) {
            this.series.chart.updateSeries(this.series.name, this, this._initialRendering);
            this._initialRendering = false;
            this.series.chart.delayedRender();
        }
    }, _onStoreNew:function () {
        this.fetch();
    }, _onStoreDelete:function (item) {
        if (this.items) {
            var flag = ArrayUtil.some(this.items, function (it, index) {
                if (it === item) {
                    this.items.splice(index, 1);
                    this._buildItemMap();
                    this.data.splice(index, 1);
                    return true;
                }
                return false;
            }, this);
            if (flag) {
                this._pushDataChanges();
            }
        }
    }, _onStoreSet:function (item) {
        if (this.itemMap) {
            var id = this.store.getIdentity(item), index = this.itemMap[id];
            if (typeof index == "number") {
                this.data[index] = this.value(this.store, this.items[index]);
                this._pushDataChanges();
            }
        } else {
            if (this.items) {
                var flag = ArrayUtil.some(this.items, function (it, index) {
                    if (it === item) {
                        this.data[index] = this.value(this.store, it);
                        return true;
                    }
                    return false;
                }, this);
                if (flag) {
                    this._pushDataChanges();
                }
            }
        }
    }});
});
