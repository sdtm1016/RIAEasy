
//RIAStudio Client/Server Runtime riasLang(rias).
//非常重要：由于低版本ie不支持Array的indexOf、each等方法，请使用rias.indexOf和rias.each等函数来代替。
//非常重要：Rhino中的String不是js的string，请使用 “==” 来判断，而不是“===”

///是否需要显式申明？在 redef() 时有什么影响？
//var rias = {};///移到 rias/main 中加载

define([
	"rias",
	"dojo/i18n!rias/nls/riasi18n",

	"dojo/_base/sniff",//包含has，并初始化浏览器相关判断
	"dojo/_base/lang",
	"dojo/_base/array",
	//"dojo/_base/json",
	"dojo/json",

	"dojo/date/locale",
	"dojo/date/stamp",

	"dojo/errors/create", // createError
	"dojo/number",
	"dojo/string",

	"dojo/_base/declare",
	"dojo/_base/config",

	"dojo/aspect",
	"dojo/promise/Promise",
	"dojo/Deferred",
	"dojo/promise/all",
	"dojo/when",
	"dojo/topic",
	"dojo/cache"
], function(rias, riasi18n,
			has, lang, array, json,
			dateLocale, dateStamp,
			createError, number, string,
			declare, config,
			aspect, Promise, Deferred, all, when, topic, cache) {

	//var rias = lang.getObject("rias", true);
	//rias._scopeName = "rias";
	//dojo.scopeMap.rias = ["rias", rias];

///lang******************************************************************************///

	rias.noop = function(){};
	rias.ifnull = function(any, nullValue){
		return any == null ? nullValue : any;
	};

	// use the function constructor so our eval is scoped close to (but not in) in the global space with minimal pollution
	var _eval = new Function('return eval(arguments[0]);');
	rias._eval = function(scope, text, hint){
		return _eval.call(scope, text + "\r\n////@ sourceURL=" + hint);
	};
	rias.$run = function(scope, text, hint){
		return (new Function(
			'rias',
			text + "\r\n////@ sourceURL=" + hint))(scope, rias);
	};
	rias.$runByModule = function(module, text, hint){
		var r = new Function(
			'rias',
			'module',
			text + "\r\n////@ sourceURL=" + hint);
		//r.remove = function(){};
		//if(rias.isRiasw_Module(module)){
		//	module.own(r);
		//}
		r = r.call(module, rias, module);
		if(r && r.$refScript){
			r = rias.$runByModule(module, r.$refScript, hint);
		}
		return r;
	};

	//rias.raise = dojo.raise;//没有 dojo.raise
	rias.captureStackTrace = function(e) {
		if(e.stack){
			return e.stack;
		}
		if(e instanceof Error){
			if(rias.isDebug && Error.captureStackTrace){
				Error.captureStackTrace(e, arguments.callee);
			}
			return e.stack;
		}
		return e;
	};
	rias.createError = createError;
	rias.exists = lang.exists;
	rias.isEmpty = function(any){
		if(any == undefined || any === "" || (rias.isArrayLike(any) && any.length == 0)){
			return true;
		}
		if(rias.isObject(any)){
			//return JSON.stringify(any) === "{}";
			for(var n in any){
				return false;
			}
			return true;
		}
		return false;
	};
	rias.isString = lang.isString;
	rias.isArray = lang.isArray;
	rias.isArrayLike = lang.isArrayLike;/// ArrayLike("") = "", String 不是 ArrayLike。
	rias.isAlien = lang.isAlien;
	rias.isFunction = lang.isFunction;
	rias.isObject = lang.isObject;
	rias.isObjectExact = function(it){
		return (it != undefined) && (it != null) && (typeof it === "object") && (!rias.isArray(it)) && (!rias.isFunction(it));
	};
	rias.isObjectSimple = function(it){
		return (it != undefined) && (it != null) && (typeof it === "object") && (it.constructor.name === "Object");
	};
	rias.isNumber = function(v){
		return typeof v === "number" && isFinite(v);
	};
	rias.likeNumber = function(v){
		return Number(v) == v;
	};
	rias.isBoolean = function(v){
		return typeof v === "boolean";
	};
	rias.isDatetime = function(it){
		return it instanceof Date;
		//return (it != undefined) && (it != null) && (typeof it === "object") && (it.constructor.name === "Date");
	};
	rias.isUrl = function(location){
		return /^:\/\//.test(location);
	};
	rias.isUrlLocal = function(location){
		return /^file:\/\//.test(location) && !/^http/.test(location);
	};
	rias.isPromise = function(obj){
		return obj && obj == "[object Promise]" && rias.isFunction(obj.then);
	};
	rias.likePromise = function(obj){
		return obj && rias.isFunction(obj.then);
	};

	rias.isInstanceOf = function(obj, base){
		function _do(ctor){
			if(rias.isString(ctor)){
				ctor = rias.getObject(ctor);
			}
			if(!ctor){
				return false;
			}
			if(obj instanceof ctor){
				return true;
			}
			if(obj && obj.constructor && obj.constructor._meta){
				var bases = obj.constructor._meta.bases;
				for(var i = 0, l = bases.length; i < l; ++i){
					if(bases[i] === ctor){
						return true;
					}
				}
			}
			return false;
		}
		if(rias.isArray(base)){
			return rias.some(base, function(item){
				return _do(item);
			});
		}else{
			return _do(base);
		}
	};

	rias.hostBrowser = !!has("host-browser");

	rias.isDomNode = function(obj){
		///IE不支持 instanceof Node
		return !!(rias.hostBrowser && obj && /*(obj instanceof Node) &&*/ obj.nodeType > 0);
	};
	///注意：在 _WidgetBase.postCreate() 之前（包含 _WidgetBase.postCreate()） obj._created都为 false，故 rias.isDijit() 为 false。
	///建议在 _WidgetBase.startUp() 之后使用。
	rias.isDijit = function(obj){
		///因为有可能 redef() 导致重载，故必须用 rias.getObject() 来获取当前的实例。
		return !!(rias.hostBrowser && obj && obj._created && (!!obj.domNode) && rias.isInstanceOf(obj, "dijit._WidgetBase"));
	};
	rias.isRiasd = function(obj){
		return !!(rias.isObjectSimple(obj) && obj._riaswType);
		//return !!_getRiaswMapper(obj);
	};
	rias.isRiasw = function(obj){
		return !!(obj && obj._riasrCreated && obj._riaswType);// && obj.constructor && obj.constructor._riasdMeta;// && rias.isDijit(obj);//有非 Dijit 的 RiasWidget
	};
	rias.isRiasw_Module = function(obj){
		///因为有可能 redef() 导致重载，故必须用 rias.getObject() 来获取当前的实例。
		return !!(rias.hostBrowser && rias.isRiasw(obj) && rias.isInstanceOf(obj, "rias.riasw.studio._ModuleMixin"));
	};
	rias.isRiaswModule = function(obj){
		///因为有可能 redef() 导致重载，故必须用 rias.getObject() 来获取当前的实例。
		//return rias.hostBrowser && rias.isRiasw(obj) && (rias.isInstanceOf(obj, rias.getObject("rias.riasw.studio.Module")) || rias.isInstanceOf(obj, rias.getObject("rias.riasw.studio.App")));
		//return rias.hostBrowser && rias.isRiasw(obj) && obj.moduleMeta != undefined && rias.isInstanceOf(obj, rias.getObject("rias.riasw.studio._ModuleMixin"));
		return !!(rias.hostBrowser && rias.isRiasw(obj)
			&& (rias.isInstanceOf(obj, ["rias.riasw.studio.Module", "rias.riasw.studio.App"])
				|| obj.moduleMeta != undefined && rias.isInstanceOf(obj, "rias.riasw.studio._ModuleMixin")));
	};
	rias.isRiasWebApp = function(obj){
		///因为有可能 redef() 导致重载，故必须用 rias.getObject() 来获取当前的实例。
		return !!(rias.hostBrowser && rias.isRiasw(obj) && rias.isInstanceOf(obj, "rias.riasw.studio.App"));
	};

	///这里只做 Object 的 by，dom 和 Widget 的 by 在 riasw 中实现。
	rias.by = function(/*String|DOMNode|Dijit|riasWidget*/any, context){
		var w;
		if(rias.isObjectSimple(any) && any.$refObj){
			any = rias.by(any.$refObj, context) || any.$refObj;
		}
		if(rias.isString(any)){
			///TODO:zensst. context => module
			w = rias.getObject(any, false, context);
			if(!w && !/^module\.|^context\./.test(any)){
				w = rias.getObject(any);
			}
			any = w;
		}
		if(!any){
			return undefined;
		}
		return any;
	};

	rias.objLike = function(srcObj, likeObj){
		var name,
			ok = rias.isObject(srcObj) && rias.isObject(likeObj);
		if(ok){
			for(name in likeObj){
				if(!(name in srcObj) || (srcObj[name] !== likeObj[name])){
					ok = false;
					break;
				}
			}
		}
		return ok;
	};
	rias.objEqual = function(srcObj, equalObj){
		var name,
			ok = rias.isObject(srcObj) && rias.isObject(equalObj);
		if(ok){
			for(name in equalObj){
				if(!(name in srcObj) || (srcObj[name] !== equalObj[name])){
					ok = false;
					break;
				}
			}
			for(name in srcObj){
				if(!(name in equalObj)){
					ok = false;
					break;
				}
			}
		}
		return ok;
	};

	function _delete(dest, ref, /*Integer*/deep){
		//deep是嵌套的层数.
		var name, s, i, empty = {}, a = [];
		function _dele1(name){
			s = ref[name];
			if(name in dest){
				if (deep > 0){
					try{
						if(s instanceof Date){
							delete dest[name];
						}else if(s instanceof RegExp){
							delete dest[name];
						}else if(rias.isArray(s)){
							if (!rias.isArray(dest[name])){
								delete dest[name];
							}else{
								_delete(dest[name], s, deep - 1);
							}
						}else if(rias.isObjectExact(s)){
							///因为有可能没有 require([riasw])，所以需要检查 isRiasw、isDijit
							if((rias.isRiasw && rias.isRiasw(s)) || (rias.isDijit && rias.isDijit(s)) || s.nodeType){
								delete dest[name];//复杂对象不建议深度delete，比如 DOM Node
							}else{
								if (!rias.isObjectExact(dest[name])){
									delete dest[name];
								}else{
									_delete(dest[name], s, deep - 1);
								}
							}
						}else{
							delete dest[name];
						}
					}catch(e){
						console.error(rias.captureStackTrace(e));
						throw e;
					}
				}else{
					delete dest[name];
				}
			}
		}

		deep = rias.isNumber(deep) ? deep : 0;
		for(name in ref){
			if (ref.hasOwnProperty(name)) {///不要delete原型链，否则可能出现不可测问题。
				_dele1(name);
			}
		}
		return dest; // Object
	}
	rias.dele = function(/*Object*/dest, /*Object..*/refs) {
		if(!dest){
			return {};
		}
		for(var i = 1, l = arguments.length; i < l; i++){
			_delete(dest, arguments[i]);
		}
		return dest; // Object
	};
	rias.deleteDeep = function(/*Object*/dest, /*Object..*/refs) {
		//针对下级含有object（不包含数组、函数）的object的mixin，可以保留下级object原有的属性，而不是直接覆盖替换
		//数组和函数任然直接覆盖
		if(!dest){
			return {};
		}
		for(var i = 1, l = arguments.length; i < l; i++){
			//_mixin(dest, arguments[i], undefined, rias.toInt(deep, 99));
			_delete(dest, arguments[i], 99);
		}
		return dest; // Object
	};

	rias.mixin_notexists = function(/*Object*/dest, /*Object..*/sources){
		///只 mixin dest 中不存在的
		/// 没有 Deep
		var n;
		function _mix(src){
			for(n in src){
				if(!(n in dest)){
					dest[n] = src[n];
				}
			}
		}
		if(!dest){
			dest = {};
		}
		for(var i = 1, l = arguments.length; i < l; i++){
			_mix(arguments[i]);
		}
		return dest;
	};
	function _mixin(dest, source, copyFunc, /*Integer*/deep, ord, exact, onlyCopy){
		// the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
		// inherited from Object.prototype. For example, if dest has a custom toString() method,
		// don't overwrite it with the toString() method that source inherited from Object.prototype
		//deep是嵌套的层数.
		var name, s, i, empty = {}, a = [];
		function _mix1(name){
			if(exact && !(name in source)){
				return;
			}
			s = source[name];
			if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
				if (deep > 0){
					try{
						if(s instanceof Date){
							dest[name] = new Date(s.getTime());	// Date
						}else if(s instanceof RegExp){
							dest[name] = new RegExp(s);   // RegExp
						}else if(rias.isArray(s)){
							if (!rias.isArray(dest[name])){
								dest[name] = [];
							}
							_mixin(dest[name], s, copyFunc, deep - 1, ord, exact, onlyCopy);
						}else if(rias.isObjectExact(s)){
							///因为有可能没有 require([riasw])，所以需要检查 isRiasw、isDijit
							if((rias.isRiasw && rias.isRiasw(s)) || (rias.isDijit && rias.isDijit(s)) || s.nodeType){
								dest[name] = s;	//复杂对象不建议深度mix，比如 DOM Node
							}else{
								if (!rias.isObjectExact(dest[name])){
									dest[name] = {};
								}
								_mixin(dest[name], s, copyFunc, deep - 1, ord, exact, onlyCopy);
							}
						}else if(rias.isFunction(s)){
							dest[name] = copyFunc ? copyFunc(s) : s;
							dest[name].nom = name;
						}else{
							dest[name] = copyFunc ? copyFunc(s) : s;
						}
					}catch(e){
						console.error(rias.captureStackTrace(e));
						throw e;
					}
				}else{
					dest[name] = copyFunc ? copyFunc(s) : s;
				}
			}
		}

		deep = rias.isNumber(deep) ? deep : 0;
		if(ord){
			for(name in dest){
				a.push(name);
			}
			if(!onlyCopy){
				for(name in source){
					a.push(name);
				}
			}
			if(rias.isFunction(ord)){
				a.sort(ord);
			}else{
				a.sort();
			}
			rias.forEach(a, _mix1);
		}else{
			if(onlyCopy){
				for(name in dest){
					_mix1(name);
				}
			}else{
				for(name in source){
					_mix1(name);
				}
			}
		}
		if(has("bug-for-in-skips-shadowed")){
			if(source){
				for(i = 0; i < lang._extraNames.length; ++i){
					name = lang._extraNames[i];
					if(onlyCopy){
						_mix1(name);
					}else{
						_mix1(name);
					}
				}
			}
		}
		return dest; // Object
	}
	rias.mixin_notexists = function(/*Object*/dest, /*Object..*/sources){
		if(!dest){ dest = {}; }
		for(var i = 1, l = arguments.length; i < l; i++){
			_mixin(dest, arguments[i]);
		}
		return dest; // Object
	};
	rias.mixin = function(/*Object*/dest, /*Object..*/sources) {
		if(!dest){ dest = {}; }
		for(var i = 1, l = arguments.length; i < l; i++){
			_mixin(dest, arguments[i]);
		}
		return dest; // Object
	};
	rias.mixin_ord = function(/*Object*/dest, /*Object..*/sources) {
		if(!dest){ dest = {}; }
		for(var i = 1, l = arguments.length; i < l; i++){
			_mixin(dest, arguments[i], undefined, undefined, 1);
		}
		return dest; // Object
	};
	rias.mixin_exact = function(/*Object*/dest, /*Object..*/sources) {
		if(!dest){ dest = {}; }
		for(var i = 1, l = arguments.length; i < l; i++){
			_mixin(dest, arguments[i], undefined, undefined, undefined, true);
		}
		return dest; // Object
	};
	rias.mixinDeep = function(/*Object*/dest, /*Object..*/sources) {
		//针对下级含有object（包含数组、不包含函数?）的object的mixin，可以保留下级object原有的属性，而不是直接覆盖替换
		//函数任然直接覆盖
		if(!dest){
			dest = {};
		}
		for(var i = 1, l = arguments.length; i < l; i++){
			//_mixin(dest, arguments[i], undefined, rias.toInt(deep, 99));
			_mixin(dest, arguments[i], undefined, 99);
		}
		return dest; // Object
	};
	rias.mixinDeep_ord = function(/*Object*/dest, /*Object..*/sources) {
		//针对下级含有object（包含数组、不包含函数?）的object的mixin，可以保留下级object原有的属性，而不是直接覆盖替换
		//函数任然直接覆盖
		if(!dest){
			dest = {};
		}
		for(var i = 1, l = arguments.length; i < l; i++){
			//_mixin(dest, arguments[i], undefined, rias.toInt(deep, 99), 1);
			_mixin(dest, arguments[i], undefined, 99, 1);
		}
		return dest; // Object
	};
	rias.mixinDeep_exact = function(/*Object*/dest, /*Object..*/sources) {
		//针对下级含有object（包含数组、不包含函数?）的object的mixin，可以保留下级object原有的属性，而不是直接覆盖替换
		//函数任然直接覆盖
		if(!dest){
			dest = {};
		}
		for(var i = 1, l = arguments.length; i < l; i++){
			//_mixin(dest, arguments[i], undefined, rias.toInt(deep, 99), 1);
			_mixin(dest, arguments[i], undefined, 99, undefined, true);
		}
		return dest; // Object
	};
	rias.copy = function(/*Object*/dest, /*Object..*/sources){
		//只获取 dest 中已有的属性
		if(!dest){
			dest = {};
		}
		for(var i = 1, l = arguments.length; i < l; i++){
			_mixin(dest, arguments[i], undefined, undefined, undefined, undefined, true);
		}
		return dest; // Object
	};
	rias.copyDeep = function(/*Object*/dest, /*Object..*/sources){
		//只获取 dest 中已有的属性
		//针对下级含有object（包含数组、不包含函数?）的object的mixin，可以保留下级object原有的属性，而不是直接覆盖替换
		//函数任然直接覆盖
		if(!dest){
			dest = {};
		}
		for(var i = 1, l = arguments.length; i < l; i++){
			_mixin(dest, arguments[i], undefined, 99, undefined, undefined, true);
		}
		return dest; // Object
	};
	rias.clone = function(/*anything*/ src){
		if(!src || typeof src !== "object" || rias.isFunction(src)){
			// null, undefined, any non-object, or function
			return src;	// anything
		}
		if(src.nodeType && "cloneNode" in src){
			// DOM Node
			return src.cloneNode(true); // Node
		}
		if(src instanceof Date){
			// Date
			return new Date(src.getTime());	// Date
		}
		if(src instanceof RegExp){
			// RegExp
			return new RegExp(src);   // RegExp
		}
		var r, i, l;
		if(rias.isArray(src)){
			r = [];
			for(i = 0, l = src.length; i < l; ++i){
				if(i in src){
					r.push(rias.clone(src[i]));
				}
			}
			//we don't clone functions for performance reasons
			//}else if(d.isFunction(src)){
			//	// function
			//	r = function(){ return src.apply(this, arguments); };
		}else{
			// generic objects
			r = src.constructor ? new src.constructor() : {};
		}
		return _mixin(r, src, rias.clone);
	};
	/*rias.cloneDeep = function(Obj) {
		var buf;
		if (Obj instanceof Array) {
			buf = [];  //创建一个空的数组
			var i = Obj.length;
			while (i--) {
				buf[i] = rias.cloneDeep(Obj[i]);
			}
			return buf;
		}else if (Obj instanceof Object){
			buf = {};  //创建一个空对象
			for (var k in Obj) {  //为这个对象添加新的属性
				buf[k] = rias.cloneDeep(Obj[k]);
			}
			return buf;
		}else{
			return Obj;
		}
	};*/

	rias.number = number;
	rias.number.add = function(n1, n2){
		var m1, m2, m;
		try{
			m1 = n1.toString().split(".")[1].length;
		}catch(e){
			m1 = 0;
		}
		try{
			m2 = n2.toString().split(".")[1].length;
		}catch(e){
			m2 = 0;
		}
		m = Math.pow(10, Math.max(m1, m2));
		return number.round(n1 * m + n2 * m) / m;
	};
	rias.number.mul = function(n1, n2){
		var s1 = n1.toString(),
			s2 = n2.toString(),
			m = 0;
		try{
			m += s1.split(".")[1].length;
		}catch(e){
		}
		try{
			m += s2.split(".")[1].length;
		}catch(e){
		}
		return Number(s1.replace(".", "")) * Number(s2.replace(".","")) / Math.pow(10, m);
	};
	rias.number.div = function(n1, n2){
		var s1 = n1.toString(),
			s2 = n2.toString(),
			m1 = 0, m2 = 0;
		try{
			m1 = s1.split(".")[1].length;
		}catch(e){
		}
		try{
			m2 = s2.split(".")[1].length;
		}catch(e){
		}
		return Number(s1.replace(".", "")) / Number(s2.replace(".","")) * Math.pow(10, m2 - m1);
	};
	rias.toNumber = function(n, def){
		if(rias.isNumber(n)){
			return n;
		}
		if(n != "" && Number(n) == n){
			return Number(n);
		}
		if(rias.isNumber(def)){
			return def;
		}
		throw n + " is not Number.";
	};
	rias.toFixed = function(x, length){
		length = (length || 0);
		length = (length >= 0 ? length : 0) + 2;
		x = rias.toNumber(x) + Math.pow(10, -length);
		/// Number.toFixed 是返回 String
		return x.toFixed(length - 2);
	};
	rias.toInt = function(n, def, trunc){
		if(trunc){
			return rias.trunc(n, def);
		}
		n = rias.toNumber(n, def);
		return number.round(n);
	};
	rias.trunc = function(x, def) {
		x = rias.toNumber(x, def);
		return x < 0 ? Math.ceil(x) : Math.floor(x);
	};
	rias.toStr = function(obj){
		if(!obj){
			obj = "";
		}else{
			if(rias.isFunction(obj.toString)){
				obj = obj.toString();
			}else{
				obj = obj + "";
			}
		}
		return obj;
	};
	//rias.toHTMLStr = function(str){
	//	return str//.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;").replace(/'/gm, "&quot;")
	//		.replace(/\n/g, "<br/>");//.replace(/\s/g, "&nbsp;");///先转换 回车（\n），否则 回车会被当做 空格（\s）处理
	//};
	rias.toChinese = function(value, len, compact){
		var s, c, space, result = "",
			i, l, j,
			pad = true;//!compact;
		s = rias.toStr(rias.toFixed(value, 2));
		//if(s[0] === "-"){
		//	//s = s.slice(1);
		//	//throw "待转换的值不能为负！";
		//}
		//s = TrimStrNum(S);
		if (len > 0){
			rias.pad(s, len, "0", false);
		}
		l = s.length;
		for(i = l - 1; i >= 0; i--){
			c = s[l - 1 - i];
			switch(c){
				case "0":
					if(pad){
						result += "零";
					}
					break;
				case "1":
					result += "壹";
					break;
				case "2":
					result += "贰";
					break;
				case "3":
					result += "叁";
					break;
				case "4":
					result += "肆";
					break;
				case "5":
					result += "伍";
					break;
				case "6":
					result += "陆";
					break;
				case "7":
					result += "柒";
					break;
				case "8":
					result += "捌";
					break;
				case "9":
					result += "玖";
					break;
				case "-":
					result += "负";
					break;
			}
			pad = !compact || c !== "0";
			switch(i){
				case 0:
					if(pad){
						result += "分";
					}
					break;
				case 1:
					if(pad){
						result += "角";
					}
					break;
				case 3:
					if(pad || result === "零"){
						result += "元";
					}else{
						result = result.slice(0, -1) + "元";
					}
					break;
				case 4:
					if(pad){
						result += "拾";
					}
					break;
				case 5:
					if(pad){
						result += "佰";
					}
					break;
				case 6:
					if(pad){
						result += "仟";
					}
					break;
				case 7:
					if(pad || result === "零"){
						result += "万";
					}else{
						result = result.slice(0, -1) + "万";
					}
					break;
				case 8:
					if(pad){
						result += "拾";
					}
					break;
				case 9:
					if(pad){
						result += "佰";
					}
					break;
				case 10:
					if(pad){
						result += "仟";
					}
					break;
				case 11:
					if(pad || result === "零"){
						result += "亿";
					}else{
						result = result.slice(0, -1) + "亿";
					}
					break;
				case 12:
					if(pad){
						result += "拾";
					}
					break;
				case 13:
					if(pad){
						result += "佰";
					}
					break;
				case 14:
					if(pad){
						result += "仟";
					}
					break;
				case 15:
					if(pad || result === "零"){
						result += "万";
					}else{
						result = result.slice(0, -1) + "万";
					}
					break;
			}
		}
		if(!!compact && rias.endWith(result, "零")){
			result = result.slice(0, -1);
		}
		return result;
	};

	//如果是字符串，则去掉首尾空格；如果是数组，则去掉全部 null/undefined/""
	rias.trim = function(/*string | array*/arr){
		if(rias.isArray(arr)){
			var a = [], i, l = arr.length;
			for(i = 0; i < l; i++){
				if(arr[i]){
					a.push(arr[i]);
				}
			}
			return a;
		}else if(rias.isString(arr)){
			return string.trim(arr);
		}
		return arr;
	};
	rias.trimStartChars = function(str, /*chars?*/trim){
		var p = 0;
		if(trim.indexOf(str.charAt(p)) >= 0){
			p++;
		}
		return str.substring(p);
	};
	rias.trimEndChars = function(str, /*string*/trim){
		var p = str.length;
		if(trim.indexOf(str.charAt(p - 1)) >= 0){
			p--;
		}
		return str.substring(0, p);
	};
	rias.startWith = function(s, sub){
		return new RegExp("^" + sub).test(s);
	};
	rias.endWith = function(s, sub){
		return new RegExp(sub + "$").test(s);
	};
	if(!String.prototype.startWith){
		String.prototype.startWith = function(sub){
			return new RegExp("^" + sub).test(this);
		}
	}
	if(!String.prototype.endWith){
		String.prototype.endWith = function(sub){
			return new RegExp(sub + "$").test(this);
		}
	}
	rias.lowerCaseFirst = function(s){
		return (s && rias.isString(s) ? s.charAt(0).toLowerCase() + s.substr(1) : "");
	};
	rias.upperCaseFirst = function(s){
		return (s && rias.isString(s) ? s.charAt(0).toUpperCase() + s.substr(1) : "");
	};
	//rias.replace = string.replace;//被替换的部分不包含 '$'
	rias.substitute = string.substitute;//被替换的部分包含 '$'
	rias.escape = string.escape;
	rias.rep = string.rep;
	rias.pad = string.pad;
	rias.lastString = function(str, separator){
		var p = str.lastIndexOf(separator);
		(p < 0) ? p = "" : p = str.substring(p + 1);
		return p;
	};
	rias.formatPath = function (path) {
		if(!path){
			return "/";
		}
		if (!path.endWith("/")) {
			return path + "/";
		}
		return path;
	};

	var _langCache = {};
	function buildFn(fn){
		return _langCache[fn] = new Function("item", "index", "array", fn); // Function
	}
	rias.toArray = lang._toArray;
	rias.every = array.every;
	rias.some = array.some;
	if(!Array.prototype.indexOf){
		Array.prototype.indexOf = function(a, from){
			var len = this.length >>> 0;
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);
			if(from < 0){
				from += len;
			}
			for(; from < len; from++){
				if (from in this && this[from] === a){
					return from;
				}
			}
			return -1;
		};
	}
	//rias.indexOf = array.indexOf;///只能用于 array，如果用于 String，则只能 indexOf(char)。
	rias.indexOf = function(arr, value, fromIndex, findLast){
		if(rias.isArray(arr)){
			return array.indexOf(arr, value, fromIndex, findLast);
		}else{
			if(findLast){
				return (arr + "").lastIndexOf(value, fromIndex);
			}
			return (arr + "").indexOf(value, fromIndex);
		}
	};
	rias.indexOfByAttr = function(arr, value, attrName){
		var i = 0, l = arr.length;
		for(; i < l; i++){
			if(arr[i] && arr[i][attrName] == value){
				return i;
			}
		}
		return -1;
	};
	//rias.lastIndexOf = array.lastIndexOf;
	rias.lastIndexOf = function(arr, value, fromIndex){
		if(rias.isArray(arr)){
			return array.lastIndexOf(arr, value, fromIndex);
		}else{
			return (arr + "").lastIndexOf(value, fromIndex);
		}
	};
	rias.map = array.map;
	rias.filter = array.filter;
	//rias.forEach = array.forEach;
	rias.each = rias.forEach = function(arrayOrObject, callback, context){
		if (!arrayOrObject) {
			return;
		}
		if(typeof callback == "string") {
			callback = _langCache[callback] || buildFn(callback);
		}
		var i = 0, l;
		if(rias.isNumber(arrayOrObject.length)){
			l = arrayOrObject.length || 0;
			if(l && rias.isString(arrayOrObject)) {
				arrayOrObject = arrayOrObject.split("");
			}
			if(context){
				for(; i < l; ++i){
					if(arrayOrObject[i] != undefined){
						callback.call(context, arrayOrObject[i], i, arrayOrObject);
					}
				}
			}else{
				for(; i < l; ++i){
					if(arrayOrObject[i] != undefined){
						callback(arrayOrObject[i], i, arrayOrObject);
					}
				}
			}
		}else{
			if(context){
				for (i in arrayOrObject) {
					if(arrayOrObject[i] != undefined){
						callback.call(context, arrayOrObject[i], i, arrayOrObject);
					}
				}
			}else{
				for (i in arrayOrObject) {
					if(arrayOrObject[i] != undefined){
						callback(arrayOrObject[i], i, arrayOrObject);
					}
				}
			}
		}
	};
	function _concat(dest, src, uni){
		if(rias.isArray(dest) && rias.isArrayLike(src)){
			var i, l = src.length, item;
			for(i = 0; i < l; i++){
				item = src[i];
				if(item && (!uni || rias.indexOf(dest, item) < 0)){
					dest.push(item);
				}
			}
			return dest;
		}else{
			return dest.concat(src);
		}
	}
	rias.concat = function(dest, sources){
		if(!dest){
			dest = [];
		}
		for(var i = 1, l = arguments.length; i < l; i++){
			_concat(dest, arguments[i]);
		}
		return dest; // Object
	};
	rias.concatUnique = function(dest, sources){
		if(!dest){
			dest = [];
		}
		for(var i = 1, l = arguments.length; i < l; i++){
			_concat(dest, arguments[i], true);
		}
		return dest; // Object
	};
	rias.removeItems = function(src, items){
		var i;
		function _do(item){
			while((i = src.indexOf(item)) > -1){
				src.splice(i, 1);
			}
		}
		if(rias.isArray(items)){
			rias.forEach(items, function(item){
				_do(item);
			});
		}else{
			_do(items);
		}
		return src;
	};
	rias.sort = function(arr, func){
		if(rias.isArray(arr)){
			return arr.sort(func);
		}
		return arr;
	};
	rias.exchangeItem = function(arr, src, dest){
		///不支持多个相同的 item
		///arr[arr.indexOf(src)] = dest 之后，arr.indexOf(dest) 不正确，需要先获取。
		var i = arr.indexOf(dest);
		arr[arr.indexOf(src)] = dest;
		arr[i] = src;
	};
	//rias.filterByQuery = function(arr, query){
	//	return rias.filter(arr, function (item) {
	//		return true;
	//	});
	//};
	//rias.queryArray = function(arr, query, options){
	//	return QueryResults(SimpleQueryEngine(query, options)(arr));
	//};

	rias.min = function(args){
		var result = arguments[0],
			t;
		for(var i = 1, l = arguments.length; i < l; i++){
			t = typeof arguments[i];
			if(t === "number" || t === "string"){
				if (arguments[i] < result){
					result = arguments[i];
				}
			}
		}
		return result;
	};
	rias.max = function(args){
		var result = arguments[0],
			t;
		for(var i = 1, l = arguments.length; i < l; i++){
			t = typeof arguments[i];
			if(t === "number" || t === "string"){
				if (arguments[i] > result){
					result = arguments[i];
				}
			}
		}
		return result;
	};

	rias.dateStamp = dateStamp;
	rias.dateLocale = dateLocale;
	//var __dt = new Date();
	rias.datetime = {};
	rias.datetime.defaultDateFormatStr = "yyyy-MM-dd";
	rias.datetime.defaultTimeFormatStr = "HH:mm:ss";
	rias.datetime.defaultFormatStr = rias.datetime.defaultDateFormatStr + " " + rias.datetime.defaultTimeFormatStr;
	rias.toDatetime = rias.datetime.toDatetime = function(datetime){
		if(!rias.isDatetime(datetime)){
			return new Date(datetime);
		}
		return datetime;
	};
	rias.formatDatetime = rias.datetime.format = function(datetime, formatStr){
		if(datetime == undefined){
			return "";
		}
		if(!rias.isDatetime(datetime)){
			datetime = new Date(datetime);
		}
		return rias.dateLocale.format(datetime, {
			selector: 'time',
			timePattern: formatStr || rias.datetime.defaultFormatStr
		});
	};
	/*if(!Date.prototype.format){
		Date.prototype.format = function(fmt){
			var k,
				o = {
				"M+" : this.getMonth() + 1,                 //月份
				"d+" : this.getDate(),                    //日
				"h+" : this.getHours(),                   //小时
				"m+" : this.getMinutes(),                 //分
				"s+" : this.getSeconds(),                 //秒
				"q+" : Math.floor((this.getMonth() + 3) / 3), //季度
				"S"  : this.getMilliseconds()             //毫秒
			};
			if(/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for(k in o)
				if(new RegExp("("+ k +")").test(fmt))
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		};
	}*/

	function _getF(f){
		var i = 0, n = 0, c;
		if(!rias.isString(f)){
			f = f.toString();
		}
		while(c = f.charAt(i)){
			if(c === ")" && n === 1){
				i++;
				break;
			}
			if(c === "("){
				n++;
			}else if(c === ")"){
				n--;
			}
			i++;
		}
		//return f.slice(0, i).replace(/connectToDomNode/i, "");
		return f.slice(0, i) + "{}";
	}
	function escapeString(/*String*/str){
		// summary:
		//		Adds escape sequences for non-visual characters, double quote and
		//		backslash and surrounds with double quotes to form a valid string
		//		literal.
		return ('"' + str.replace(/(["\\])/g, '\\$1') + '"')
			.replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n")
			.replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r"); // string
	}
	rias.json = {
		parse: json.parse,
		//stringify: json.stringify
		stringify: function(value, replacer, spacer, args){
			var objPath = [],
				undef;
			if(rias.isBoolean(args)){
				args = {
					prettyPrint: args
				};
			}else if(!rias.isObjectExact(args)){
				args = {};
			}
			if(typeof replacer == "string"){
				spacer = replacer;
				replacer = null;
			}
			function stringify(it, indent, key){
				if(replacer){
					it = replacer(key, it);
				}
				var val, objtype = typeof it;
				if(objtype == "number"){
					return isFinite(it) ? it + "" : "null";
				}
				if(objtype == "boolean"){
					return it + "";
				}
				if(it === null){
					return "null";
				}
				if(typeof it == "string"){
					return escapeString(it);
				}
				if(objtype == "undefined"){
					return undef; //直接返回 undef 变量，即undefined
				}
				if(objtype == "function"){
					if(args.includeFunc == true){
						return it.toString();
					}else if(args.includeFuncName == true){
						return _getF(it);
					}else{
						return undef; //直接返回 undef 变量，即undefined
					}
				}
				// short-circuit for objects that support "json" serialization
				// if they return "self" then just pass-through...
				if(typeof it.toJSON == "function"){
					return stringify(it.toJSON(key), indent, key);
				}
				if(it instanceof Date){
					return '"{FullYear}-{Month+}-{Date}T{Hours}:{Minutes}:{Seconds}Z"'.replace(/\{(\w+)(\+)?\}/g, function(t, prop, plus){
						var num = it["getUTC" + prop]() + (plus ? 1 : 0);
						return num < 10 ? "0" + num : num;
					});
				}
				if(it.valueOf() !== it){
					// primitive wrapper, try again unwrapped:
					return stringify(it.valueOf(), indent, key);
				}
				var nextIndent= spacer ? (indent + spacer) : "";
				/* we used to test for DOM nodes and throw, but FF serializes them as {}, so cross-browser consistency is probably not efficiently attainable */

				var sep = spacer ? " " : "";
				var newLine = spacer ? "\n" : "";

				// array
				if(it instanceof Array){
					var itl = it.length, res = [];
					for(key = 0; key < itl; key++){
						var obj = it[key];
						val = stringify(obj, nextIndent, key);
						if(typeof val != "string"){
							val = "null";
						}
						res.push(newLine + nextIndent + val);
					}
					return "[" + res.join(",") + newLine + indent + "]";
				}
				// generic object code path
				if(rias.indexOf(objPath, it) >= 0){
					if(args.loopToString != true){
						console.error("rias.toJson(it): it has circular reference.", it);
						throw rias.mixin(new Error("rias.toJson(it): it has circular reference."), {it: it});
					}else{
						console.debug("rias.toJson(it): it has circular reference.", it);
						return it.toString() + " (circular reference.)";
						/*return rias.toJson(it, {
							prettyPrint: args.prettyPrint,
							includeFunc: args.includeFunc,
							includeFuncName: args.includeFuncName,
							loopToString: args.loopToString,
							errorToString: args.errorToString,
							simpleObject: true,//args.simpleObject,
							ignoreProperty_: args.ignoreProperty_
						});*/
					}
				}
				if(args.simpleObject == true){
					if(rias.isObjectExact(it) && !rias.isObjectSimple(it)){
						return it.toString();
					}
				}
				objPath.push(it);
				var output = [];
				for(key in it){
					//if(key == "_riasrWidget"){
					//	if(rias.isDebug){
					//		console.debug(key, it);
					//	}else{
					//		console.error("_riasrWidget:", key);
					//	}
					//}
					var keyStr;
					if(it.hasOwnProperty(key)){
						if(typeof key == "number"){
							keyStr = '"' + key + '"';
						}else if(typeof key == "string"){
							if(args.ignoreProperty_ == true && rias.startWith(key, "_") && !rias.startWith(key, "_rias")){
								continue;
							}
							keyStr = escapeString(key);
						}else{
							// skip non-string or number keys
							continue;
						}
						try{
							val = stringify(it[key], nextIndent, key);
						}catch(e){
							if(args.errorToString != true){
								throw e;
							}else{
								val = "Convert error of [" + it.toString() + "], errormessage: " + e.message;
							}
						}
						if(typeof val != "string"){
							// skip non-serializable values
							continue;
						}
						// At this point, the most non-IE browsers don't get in this branch
						// (they have native JSON), so push is definitely the way to
						output.push(newLine + nextIndent + keyStr + ":" + sep + val);
					}
				}
				objPath.pop();
				return "{" + output.join(",") + newLine + indent + "}"; // String
			}
			return stringify(value, "", "");
		}
	};
	rias.toJson = function(/*Object*/ it, args){
		//args = {
		//	prettyPrint: false,
		//	includeFunc: false,
		//	loopToString: false,
		//	errorToString: false,
		//	simpleObject: false,
		//	ignoreProperty_: false
		//};
		if(rias.isBoolean(args)){
			args = {
				prettyPrint: args
			};
		}else if(!rias.isObjectExact(args)){
			args = {};
		}
		return rias.json.stringify(it, function(key, value){
			if(value){
				var tf = value.__json__ || value.json;
				if(typeof tf == "function"){
					return tf.call(value);
				}
			}
			return value;
		}, args.prettyPrint && "\t", args);	// String
	};
	//rias.fromJson = json.fromJson;
	rias.fromJson = function(js){
		try{
			return eval("(" + js + ")"); // Object
		}catch(e){
			console.error(e, rias.captureStackTrace(e));
			throw e;
		}
	};
	/*rias.fromJsonFunc = function(js){
		try{
			return (new Function("","return " + js))();
		}catch(e){
			console.error(e, rias.captureStackTrace(e));
			throw e;
		}
	};*/

	rias.defer = function(scope, fcn, delay, args){
		if(rias.isString(fcn)){
			if(!scope[fcn]){
				throw(['rias.defer: scope["', fcn, '"] is null.', scope].join(''));
			}
			fcn = scope[fcn];
		}
		var timer = setTimeout(function(){
			if(!timer){
				return;
			}
			timer = null;
			try{
				fcn.apply(scope, args || []);///IE8 不支持 args = undefined。
			}catch(e){
				console.error("rias.defer()", rias.captureStackTrace(e));
			}
		}, delay || 0);
		return {
			remove: function(){
				if(timer){
					clearTimeout(timer);
					timer = null;
				}
				return null; // so this works well: handle = handle.remove();
			}
		};
	};
	rias._defaultThrottleDelay = 50;
	//rias.throttle = function (func, threshold, alt) {
	//	var last = Date.now();
	//	threshold = threshold || 100;
	//	return function () {
	//		var now = Date.now();
	//		if (now - last < threshold) {
	//			if (alt) {
	//				alt.apply(this, arguments);
	//			}
	//			return;
	//		}
	//		last = now;
	//		func.apply(this, arguments);
	//	};
	//};
	var _throttleCache = {};
	rias.throttle = function(id, callback, scope, delay, callPass){
		/// 调用一开始即执行 callback，并在 delay 时间内不再执行，类似 keydown
		/// callback
		/// |------delay------|callback
		///                   |------delay------|...
		// summary:
		//		Returns a function which calls the given callback at most once per
		//		delay milliseconds.  (Inspired by plugd)
		id = id + "";
		var r = function (){
			if(_throttleCache[id]){
				if(rias.isFunction(callPass)){
					callPass(r);
				}
				return;
			}
			_throttleCache[id] = setTimeout(function(){
				delete _throttleCache[id];
			}, delay || rias._defaultThrottleDelay);
			callback.apply(scope, arguments);
		};
		r.remove = function(){
			clearTimeout(_throttleCache[id]);
			delete _throttleCache[id];
		};
		return r;
	};
	var _throttleDelayedCache = {};
	rias.throttleDelayed = function(id, callback, scope, delay, callPass){
		/// 调用开始的 delay 时间后执行 callback，并在 delay 时间内不再执行，类似 keyup
		/// |------delay------|callback
		///                   |------delay------|callback...
		// summary:
		//		Like throttle, except that the callback runs after the delay,
		//		rather than before it.
		id = id + "";
		var r = function (){
			if (_throttleDelayedCache[id]) {
				if(rias.isFunction(callPass)){
					callPass(r);
				}
				return;
			}
			var a = arguments;
			_throttleDelayedCache[id] = setTimeout(function () {
				delete _throttleDelayedCache[id];
				callback.apply(scope, a);
			}, delay || rias._defaultThrottleDelay);
		};
		r.remove = function(){
			clearTimeout(_throttleDelayedCache[id]);
			delete _throttleDelayedCache[id];
		};
		return r;
	};
	var _debounceCache = {};
	rias.debounce = function(id, callback, scope, delay, callPass){
		/// 调用开始的 delay 时间后不再有调用时才执行 callback，类似 defer once
		/// |------delay------|
		///          |------delay------|
		///                           |------delay------|callback...
		// summary:
		//		Returns a function which calls the given callback only after a
		//		certain time has passed without successive calls.  (Inspired by plugd)
		id = id + "";
		var r = function () {
			if (_debounceCache[id]) {
				clearTimeout(_debounceCache[id]);
				delete _debounceCache[id];
				if(rias.isFunction(callPass)){
					callPass(r);
				}
			}
			var a = arguments;
			_debounceCache[id] = setTimeout(function () {
				delete _debounceCache[id];
				callback.apply(scope, a);
			}, delay || rias._defaultThrottleDelay);
		};
		r.remove = function(){
			clearTimeout(_debounceCache[id]);
			delete _debounceCache[id];
		};
		return r;
	};

	rias.config = config;
	rias.isDebug = config.isDebug;
	rias.has = has;
	rias.i18n = dojo.delegate(dojo.i18n);
	rias.locale = dojo.locale;

	rias.extend = dojo.extend;
	rias.hitch = dojo.hitch;
	rias.delegate = dojo.delegate;
	rias.partial = dojo.partial;

	rias.safeMixin = declare.safeMixin;

	rias.define = define;
	rias.require = require;
	require.on("error", function(arg){
		try{
			console.error("require error: ", arg.info, arg.src, arg.message, rias.captureStackTrace(arg));
		}catch(e){
			console.error("require error: ", arg, rias.captureStackTrace(arg));
		}
	});

	rias.baseUrl = rias.require.baseUrl;
	rias.toUrl = rias.require.toUrl;
	rias.undef = function(moduleId, referenceModule){
		///FIXME:zensst.大小写
		if(!rias.isFunction(rias.require.undef)){
			return;
		}
		/*var ns, n, s, m, i = 0;
		if(rias.hostBrowser){
			ns = rias.dom.scripts;
			for(; i < ns.length; i++){
				n = ns[i];
				if(n.type){
					//s = n.src.split(".")[0].split("?")[0].split("#")[0];
					s = n.src.split(".")[0];
					if(rias.endWith(s, moduleId)){
						m = n;
					}
				}
			}
			if(m && m.parentNode){
				//m.parentNode.removeChild(m);
			}
		}*/
		var m = rias.require.modules[moduleId];
		if(m){
			m._riasrUndef = true;
			if(m.node && m.node.parentNode){
				m.node.parentNode.removeChild(m.node);
			}
			if(m.executed){
				console.debug("rias.undef: " + moduleId);
			}
			rias.require.undef(moduleId, referenceModule);
		}
	};
	rias.declare = declare;
	function getProp(/*Array*/parts, /*Boolean*/create, /*Object*/context){
		if(!context){
			if(parts[0] && dojo.scopeMap[parts[0]]) {
				// Voodoo code from the old days where "dojo" or "dijit" maps to some special object
				// rather than just window.dojo
				context = dojo.scopeMap[parts.shift()][1];
			}else{
				context = dojo.global;
			}
		}

		try{
			for(var i = 0; i < parts.length; i++){
				var p = parts[i];
				if(!(p in context)){
					if(create){
						context[p] = {};
					}else{
						return;		// return undefined
					}
				}
				context = context[p];
			}
			return context; // mixed
		}catch(e){
			// "p in context" throws an exception when context is a number, boolean, etc. rather than an object,
			// so in that corner case just return undefined (by having no return statement)
		}
	}
	rias.setObject = dojo.setObject = function(name, value, context){
		var parts = name.split("."),
			p = parts.pop(),
			obj = getProp(parts, true, context);
		return obj && p ? (rias.isFunction(obj.set) ? obj.set(p, value) : obj[p] = value) : undefined; // Object
	};
	rias.getObject = dojo.getObject = function(name, create, context){
		return getProp(name ? name.split(".") : [], create, context); // Object
	};

	rias.deprecated = dojo.deprecated;
	rias.experimental = dojo.experimental;
	rias.aspect = aspect;
	rias.before = aspect.before;
	rias.after = aspect.after;
	rias.around = aspect.around;

	rias.newDeferred = function(canceler){
		return new Deferred(canceler);
	};
	rias.Deferred = Deferred;
	rias.when = when;
	rias.all = all;

	rias.topic = topic;
	rias.publish = topic.publish;
	rias.subscribe = topic.subscribe;

	rias.cache = cache;

	return rias;

});