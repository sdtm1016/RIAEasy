//>>built
define("dojox/validate/regexp",["dojo/_base/lang","dojo/regexp","dojox/main"],function(g,e,f){var d=g.getObject("validate.regexp",!0,f);return d=f.validate.regexp={ipAddress:function(a){a="object"==typeof a?a:{};"boolean"!=typeof a.allowDottedDecimal&&(a.allowDottedDecimal=!0);"boolean"!=typeof a.allowDottedHex&&(a.allowDottedHex=!0);"boolean"!=typeof a.allowDottedOctal&&(a.allowDottedOctal=!0);"boolean"!=typeof a.allowDecimal&&(a.allowDecimal=!0);"boolean"!=typeof a.allowHex&&(a.allowHex=!0);"boolean"!=
typeof a.allowIPv6&&(a.allowIPv6=!0);"boolean"!=typeof a.allowHybrid&&(a.allowHybrid=!0);var b=[];a.allowDottedDecimal&&b.push("((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])");a.allowDottedHex&&b.push("(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]");a.allowDottedOctal&&b.push("(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]");a.allowDecimal&&b.push("(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])");
a.allowHex&&b.push("0[xX]0*[\\da-fA-F]{1,8}");a.allowIPv6&&b.push("([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}");a.allowHybrid&&b.push("([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])");a="";0<b.length&&(a="("+b.join("|")+")");return a},host:function(a){a="object"==typeof a?a:{};"boolean"!=typeof a.allowIP&&(a.allowIP=!0);"boolean"!=typeof a.allowLocal&&(a.allowLocal=!1);"boolean"!=typeof a.allowPort&&(a.allowPort=!0);"boolean"!=typeof a.allowNamed&&
(a.allowNamed=!1);var b=a.allowPort?"(\\:\\d+)?":"",c="((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)+(?:[a-zA-Z](?:[-\\da-zA-Z]{0,6}[\\da-zA-Z])?)\\.?)";a.allowIP&&(c+="|"+d.ipAddress(a));a.allowLocal&&(c+="|localhost");a.allowNamed&&(c+="|^[^-][a-zA-Z0-9_-]*");return"("+c+")"+b},url:function(a){a="object"==typeof a?a:{};"scheme"in a||(a.scheme=[!0,!1]);return e.buildGroupRE(a.scheme,function(a){return a?"(https?|ftps?)\\://":""})+d.host(a)+"(/(?:[^?#\\s/]+/)*(?:[^?#\\s/]+(?:\\?[^?#\\s/]*)?(?:#[A-Za-z][\\w.:-]*)?)?)?"},
emailAddress:function(a){a="object"==typeof a?a:{};"boolean"!=typeof a.allowCruft&&(a.allowCruft=!1);a.allowPort=!1;var b="([!#-'*+\\-\\/-9\x3d?A-Z^-~]+[.])*[!#-'*+\\-\\/-9\x3d?A-Z^-~]+@"+d.host(a);a.allowCruft&&(b="\x3c?(mailto\\:)?"+b+"\x3e?");return b},emailAddressList:function(a){a="object"==typeof a?a:{};"string"!=typeof a.listSeparator&&(a.listSeparator="\\s;,");var b=d.emailAddress(a);return"("+b+"\\s*["+a.listSeparator+"]\\s*)*"+b+"\\s*["+a.listSeparator+"]?\\s*"},numberFormat:function(a){a=
"object"==typeof a?a:{};"undefined"==typeof a.format&&(a.format="###-###-####");return e.buildGroupRE(a.format,function(a){return e.escapeString(a,"?").replace(/\?/g,"\\d?").replace(/#/g,"\\d")})},ca:{postalCode:function(){return"([A-Z][0-9][A-Z] [0-9][A-Z][0-9])"},province:function(){return"(AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT)"}},us:{state:function(a){a="object"==typeof a?a:{};"boolean"!=typeof a.allowTerritories&&(a.allowTerritories=!0);"boolean"!=typeof a.allowMilitary&&(a.allowMilitary=!0);
var b="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";a.allowTerritories&&(b+="|AS|FM|GU|MH|MP|PW|PR|VI");a.allowMilitary&&(b+="|AA|AE|AP");return"("+b+")"}}}});
/// regexp.js.map