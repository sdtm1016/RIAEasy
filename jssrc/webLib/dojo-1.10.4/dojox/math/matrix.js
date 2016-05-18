//>>built
define("dojox/math/matrix",["dojo","dojox"],function(n,m){n.getObject("math.matrix",!0,m);n.mixin(m.math.matrix,{iDF:0,ALMOST_ZERO:1E-10,multiply:function(b,c){var e=b.length,d=b[0].length,a=c.length,f=c[0].length;if(d!=a)return console.warn("Can't multiply matricies of sizes "+d+","+e+" and "+f+","+a),[[0]];for(var a=[],g=0;g<e;g++){a[g]=[];for(var h=0;h<f;h++)for(var k=a[g][h]=0;k<d;k++)a[g][h]+=b[g][k]*c[k][h]}return a},product:function(){if(0==arguments.length)return console.warn("can't multiply 0 matrices!"),
1;for(var b=arguments[0],c=1;c<arguments.length;c++)b=this.multiply(b,arguments[c]);return b},sum:function(){if(0==arguments.length)return console.warn("can't sum 0 matrices!"),0;var b=this.copy(arguments[0]),c=b.length;if(0==c)return console.warn("can't deal with matrices of 0 rows!"),0;var e=b[0].length;if(0==e)return console.warn("can't deal with matrices of 0 cols!"),0;for(var d=1;d<arguments.length;++d){var a=arguments[d];if(a.length!=c||a[0].length!=e)return console.warn("can't add matrices of different dimensions: first dimensions were "+
c+"x"+e+", current dimensions are "+a.length+"x"+a[0].length),0;for(var f=0;f<c;f++)for(var g=0;g<e;g++)b[f][g]+=a[f][g]}return b},inverse:function(b){if(1==b.length&&1==b[0].length)return[[1/b[0][0]]];var c=b.length,e=this.create(c,c),d=this.adjoint(b),a=this.determinant(b);b=0;if(0==a)return console.warn("Determinant Equals 0, Not Invertible."),[[0]];b=1/a;for(a=0;a<c;a++)for(var f=0;f<c;f++)e[a][f]=b*d[a][f];return e},determinant:function(b){if(b.length!=b[0].length)return console.warn("Can't calculate the determinant of a non-squre matrix!"),
0;var c=b.length,e=1;b=this.upperTriangle(b);for(var d=0;d<c;d++){var a=b[d][d];if(Math.abs(a)<this.ALMOST_ZERO)return 0;e*=a}return e*=this.iDF},upperTriangle:function(b){b=this.copy(b);var c=0,c=0,e=b.length,d=1;this.iDF=1;for(var a=0;a<e-1;a++){"number"!=typeof b[a][a]&&console.warn("non-numeric entry found in a numeric matrix: m["+a+"]["+a+"]\x3d"+b[a][a]);for(var d=1,f=0;0==b[a][a]&&!f;)if(a+d>=e)this.iDF=0,f=1;else{for(var g=0;g<e;g++)c=b[a][g],b[a][g]=b[a+d][g],b[a+d][g]=c;d++;this.iDF*=-1}for(d=
a+1;d<e;d++)if("number"!=typeof b[d][a]&&console.warn("non-numeric entry found in a numeric matrix: m["+d+"]["+a+"]\x3d"+b[d][a]),"number"!=typeof b[a][d]&&console.warn("non-numeric entry found in a numeric matrix: m["+a+"]["+d+"]\x3d"+b[a][d]),0!=b[a][a]){c=-1*b[d][a]/b[a][a];for(f=a;f<e;f++)b[d][f]=c*b[a][f]+b[d][f]}}return b},create:function(b,c,e){e=e||0;for(var d=[],a=0;a<c;a++){d[a]=[];for(var f=0;f<b;f++)d[a][f]=e}return d},ones:function(b,c){return this.create(b,c,1)},zeros:function(b,c){return this.create(b,
c)},identity:function(b,c){c=c||1;for(var e=[],d=0;d<b;d++){e[d]=[];for(var a=0;a<b;a++)e[d][a]=d==a?c:0}return e},adjoint:function(b){var c=b.length;if(1>=c)return console.warn("Can't find the adjoint of a matrix with a dimension less than 2"),[[0]];if(b.length!=b[0].length)return console.warn("Can't find the adjoint of a non-square matrix"),[[0]];for(var e=this.create(c,c),d=this.create(c-1,c-1),a=0,f=0,g=0,h=0,k=a=0;k<c;k++)for(var l=0;l<c;l++){for(a=g=0;a<c;a++)if(a!=k){for(f=h=0;f<c;f++)f!=l&&
(d[g][h]=b[a][f],h++);g++}a=this.determinant(d);e[k][l]=Math.pow(-1,k+l)*a}return this.transpose(e)},transpose:function(b){for(var c=this.create(b.length,b[0].length),e=0;e<b.length;e++)for(var d=0;d<b[e].length;d++)c[d][e]=b[e][d];return c},format:function(b,c){c=c||5;for(var e=b.length,d=0<e?b[0].length:0,a="",f=0;f<e;f++){for(var a=a+"| ",g=0;g<d;g++){var h=b[f][g],k=c,l=Math.pow(10,k),h=(Math.round(h*l)/l).toString();"-"!=h.charAt(0)&&(h=" "+h);for(-1<h.indexOf(".")&&(h+=".");h.length<k+3;)h+=
"0";a+=h+" "}a+="|\n"}return a},copy:function(b){for(var c=b.length,e=b[0].length,d=this.create(e,c),a=0;a<c;a++)for(var f=0;f<e;f++)d[a][f]=b[a][f];return d},scale:function(b,c){b=this.copy(b);for(var e=b.length,d=b[0].length,a=0;a<e;a++)for(var f=0;f<d;f++)b[a][f]*=c;return b}});return m.math.matrix});
/// matrix.js.map