//>>built

define("dojox/calc/_Executor", ["dojo/_base/kernel", "dojo/_base/declare", "dojo/_base/lang", "dojo/number", "dijit/_base/manager", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojox/math/_base"], function (kernel, declare, lang, number, dijit, WidgetBase, TemplatedMixin, math) {
    kernel.experimental("dojox.calc");
    var calcEnv, calc;
    var magicBigInt = (1 << 30) - 35;
    var Executor = declare("dojox.calc._Executor", [WidgetBase, TemplatedMixin], {templateString:"<iframe src=\"" + require.toUrl("dojox/calc/_ExecutorIframe.html") + "\" style=\"display:none;\" onload=\"if(arguments[0] && arguments[0].Function)" + dijit._scopeName + ".byNode(this)._onLoad(arguments[0])\"></iframe>", _onLoad:function (env) {
        calcEnv = env;
        env.outerPrompt = window.prompt;
        env.dojox = {math:{}};
        for (var f in math) {
            env.dojox.math[f] = lang.hitch(math, f);
        }
        if ("toFrac" in calc) {
            env.toFracCall = lang.hitch(calc, "toFrac");
            this.Function("toFrac", "x", "return toFracCall(x)");
        }
        env.isJavaScriptLanguage = number.format(1.5, {pattern:"#.#"}) == "1.5";
        env.Ans = 0;
        env.pi = Math.PI;
        env.eps = Math.E;
        env.powCall = lang.hitch(calc, "pow");
        this.normalizedFunction("sqrt", "x", "return Math.sqrt(x)");
        this.normalizedFunction("sin", "x", "return Math.sin(x)");
        this.normalizedFunction("cos", "x", "return Math.cos(x)");
        this.normalizedFunction("tan", "x", "return Math.tan(x)");
        this.normalizedFunction("asin", "x", "return Math.asin(x)");
        this.normalizedFunction("acos", "x", "return Math.acos(x)");
        this.normalizedFunction("atan", "x", "return Math.atan(x)");
        this.normalizedFunction("atan2", "y, x", "return Math.atan2(y, x)");
        this.normalizedFunction("Round", "x", "return Math.round(x)");
        this.normalizedFunction("Int", "x", "return Math.floor(x)");
        this.normalizedFunction("Ceil", "x", "return Math.ceil(x)");
        this.normalizedFunction("ln", "x", "return Math.log(x)");
        this.normalizedFunction("log", "x", "return Math.log(x)/Math.log(10)");
        this.normalizedFunction("pow", "x, y", "return powCall(x,y)");
        this.normalizedFunction("permutations", "n, r", "return dojox.math.permutations(n, r);");
        this.normalizedFunction("P", "n, r", "return dojox.math.permutations(n, r);");
        this.normalizedFunction("combinations", "n, r", "return dojox.math.combinations(n, r);");
        this.normalizedFunction("C", "n, r", "return dojox.math.combinations(n, r)");
        this.normalizedFunction("toRadix", "number, baseOut", "if(!baseOut){ baseOut = 10; } if(typeof number == 'string'){ number = parseFloat(number); }return number.toString(baseOut);");
        this.normalizedFunction("toBin", "number", "return toRadix(number, 2)");
        this.normalizedFunction("toOct", "number", "return toRadix(number, 8)");
        this.normalizedFunction("toHex", "number", "return toRadix(number, 16)");
        this.onLoad();
    }, onLoad:function () {
    }, Function:function (name, args, body) {
        return lang.hitch(calcEnv, calcEnv.Function.apply(calcEnv, arguments));
    }, normalizedFunction:function (name, args, body) {
        return lang.hitch(calcEnv, calcEnv.normalizedFunction.apply(calcEnv, arguments));
    }, deleteFunction:function (name) {
        calcEnv[name] = undefined;
        delete calcEnv[name];
    }, eval:function (text) {
        return calcEnv.eval.apply(calcEnv, arguments);
    }, destroy:function () {
        this.inherited(arguments);
        calcEnv = null;
    }});
    return calc = {pow:function (base, exponent) {
        function isInt(n) {
            return Math.floor(n) == n;
        }
        if (base >= 0 || isInt(exponent)) {
            return Math.pow(base, exponent);
        } else {
            var inv = 1 / exponent;
            return (isInt(inv) && (inv & 1)) ? -Math.pow(-base, exponent) : NaN;
        }
    }, approx:function (r) {
        if (typeof r == "number") {
            return Math.round(r * magicBigInt) / magicBigInt;
        }
        return r;
    }, _Executor:Executor};
});

