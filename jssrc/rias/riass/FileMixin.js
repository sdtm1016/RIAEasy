define(["rias/riass/riass"],function(l){var f=l.host,n="rias serverApp serverAct appModule rsfsModule webApp".split(" ");return l.declare("rias.riass.FileMixin",null,{_initPackagePath:function(){this.packagePath={};this.packagePath.rias=this.path.riasLib;this.packagePath.serverApp=this.path.appRoot+"/serverApp";this.packagePath.serverAct=this.path.appRoot+"/serverApp/act";this.packagePath.appModule=this.path.appRoot+"/webApp/module";this.packagePath.rsfsModule=this.path.appRoot+"/rsfs/module";this.packagePath.webApp=this.path.appRoot+"/webApp";this.packageRegExp={};this.packageRegExp.rias=RegExp("^rias","gi");this.packageRegExp.serverApp=RegExp("^serverApp","gi");this.packageRegExp.serverAct=RegExp("^serverAct","gi");this.packageRegExp.appModule=RegExp("^appModule","gi");this.packageRegExp.rsfsModule=RegExp("^rsfsModule","gi");this.packageRegExp.webApp=RegExp("^webApp","gi");this.packageRegExp.riasPath=new RegExp("^"+this.packagePath.rias,"gi");this.packageRegExp.serverAppPath=new RegExp("^"+this.packagePath.serverApp,"gi");this.packageRegExp.serverActPath=new RegExp("^"+this.packagePath.serverAct,"gi");this.packageRegExp.appModulePath=new RegExp("^"+this.packagePath.appModule,"gi");this.packageRegExp.rsfsModulePath=new RegExp("^"+this.packagePath.rsfsModule,"gi");this.packageRegExp.webAppPath=new RegExp("^"+this.packagePath.webApp,"gi")},compactPath:function(a){var b=[],c,e;for(a=a.replace(/\\/g,"/").split("/");a.length;)c=a.shift(),".."==c&&b.length&&".."!=e?(b.pop(),e=b[b.length-1]):"."!=c&&b.push(e=c);return b.join("/")},getFilePathName:function(a){l.isString(a)&&(a=f.newFile(a));return f.getFilePathName(a)},convertFilePathName:function(a,b,c){function e(c){h=g.packagePath[c];f=g.packageRegExp[c];if(!h)throw Error("error packagename:"+c);if(f.test(a))return a=a.replace(f,h),!0;b&&!a&&(a=h);return!1}function d(b){f=g.packageRegExp[b+"Path"];if(!f)throw Error("error packagename:"+b);return f.test(a)?(a=a.replace(f,b),!0):!1}var g=this,h,f,k,m=n.length;l.isString(a)||(a=this.getFilePathName(a));if(b)e(b),c&&d(b);else{for(k=0;k<m&&!e(n[k]);k++);if(c)for(k=0;k<m&&!d(n[k]);k++);}return a},_getFile:function(a,b){a=a||"";if(l.isString(a)){a=this.convertFilePathName(a,b,!1);var c=this.packagePath[b],e=f.newFile(a);a=this.getFilePathName(e);if(""!==c&&a.startWith(c))return e;throw"hasNoRight... packagename:["+b+"], filepathname:"+a;}return a},extractDir:function(a){var b=a.lastIndexOf("/");return-1<=b?a.substring(0,b):a},extractFilename:function(a){var b=a.lastIndexOf("/");return-1<b?a.substring(b+1):a},extractFilenameNoExt:function(a){a=this.extractFilename(a);var b=a.lastIndexOf(".");return-1<b?a.substring(0,b):a},extractFileExt:function(a){a=this.extractFilename(a);var b=a.lastIndexOf(".");return-1<b?a.substring(b+1):""},changeFileExt:function(a,b){var c=a.lastIndexOf(".");return-1<c?a.substring(0,c)+("."===b[0]?b:"."+b):a},getFileType:function(a){return this.extractFileExt(a)},fileSize:function(a,b){var c=this._getFile(a,b);return f.fileSize(c)},fileLastModified:function(a,b){var c=this._getFile(a,b);return f.fileLastModified(c)},fileExists:function(a,b){var c=this._getFile(a,b);return f.fileExists(c)},isFile:function(a,b){var c=this._getFile(a,b);return c&&this.fileExists(c)&&f.isFile(c)},isDirectory:function(a,b){var c=this._getFile(a,b);return c&&this.fileExists(c)&&f.isDirectory(c)},readText:function(a,b,c,e){if(!a)return"";a=this._getFile(a,b);if(!a)return"";var d=1;if(!this.fileExists(a))if(1==c)d=this._getFile(this.extractDir(this.getFilePathName(a)),b),d=this.fileExists(d)?1:this.createNewDir(d,b),0<d&&this.createNewFile(a);else return"";return f.readText(a,e)},readJson:function(a,b,c){return(a=this.readText(a,b,c))?l.fromJson(a):{}},writeText:function(a,b,c,e,d){if(!a)return 0;a=this._getFile(a,b);if(!a)return 0;var g=1;if(!this.fileExists(a))if(1==e)g=this._getFile(this.extractDir(this.getFilePathName(a)),b),g=this.fileExists(g)?1:this.createNewDir(g,b),0<g&&(g=this.createNewFile(a));else return-1;0<=g&&(g=f.writeText(a,c,d));return g},writeJson:function(a,b,c,e,d){c=l.toJson(c,l.mixin({prettyPrint:!0,includeFunc:!0,loopToString:!1,errorToString:!0,simpleObject:!0},e));return this.writeText(a,b,c,d)},getUniqueFile:function(a,b){var c=this._getFile(a,b);if(c){var e=this.getFilePathName(c),d=this.extractDir(e),e=this.extractFilename(e),g,h=e?e.lastIndexOf("."):-1;if(this.fileExists(c)){-1<h&&h<e.length-1?(g=e.substring(h),e=e.substring(0,h)):g="";h=1;do c=f.newFile(d,e+h+g),h++;while(this.fileExists(c))}return c}},copyFile:function(a,b,c,e,d){a=this._getFile(a,c);b=this._getFile(b,c);if(!a||!b)return 0;c=this.fileExists(b);var g=0;if(e&&c){b=this.getUniqueFile(b);if(!b)return 0;c=!1}c||this.createNewFile(b);g=f.copyFile(a,b);d&&(g=1)&&this.deleteFile(a);return g},copyDir:function(a,b,c,e,d){a=this._getFile(a,c);b=this._getFile(b,c);if(!a||!b)return 0;var g;c=this.fileExists(b);if(e&&c){b=this.getUniqueFile(b);if(!b)return 0;c=!1}c||this.createNewDir(b);g=b;b=this.listFiles(a);var h,l=b?b.length:0,k,m=1;for(h=0;h<l;h++)if(k=b[h],c=f.newFile(g,this.getFilePathName(k)),this.isFile(k)){if(!this.copyFile(k,c,e,d)){m=0;break}}else if(!this.copyDir(k,c,e,d)){m=0;break}d&&(m=1)&&this.deleteFile(a);return m},deleteFile:function(a,b){var c=this._getFile(a,b);if(!c)return 0;var e=this.listFiles(c),d,g=e?e.length:0,h;d=1;for(d=0;d<g;d++)if(h=e[d],this.isDirectory(h)){if(!this.deleteFile(h))break}else if(!f.deleteFile(h))break;d=1;f.deleteFile(c);return d},createNewFile:function(a,b,c,e){return(a=this._getFile(a,b))&&this.fileExists(a)?2:a&&f.createNewFile(a)?c?this.writeText(a,b,c,!0,e):1:0},createNewDir:function(a,b){var c=this._getFile(a,b);return c&&this.fileExists(c)?2:c&&f.createNewDir(c)?1:0},listFiles:function(a,b){var c=this._getFile(a,b);return f.listFiles(c)},sortFiles:function(a,b,c){f.sortFiles(a,b,c)},hasSubFile:function(a,b,c){a=this._getFile(a,b);if(!a)return 0;a=this.listFiles(a);1==c&&(a=l.filter(a,function(a){return a.isDirectory()}));return null==a?0:a.length},getFileIcon:function(a,b){var c=this._getFile(a,b);if(c)return(c=this.isDirectory(c)?"":this.extractFileExt(this.getFilePathName(c)).toUpperCase())&&(c="rias"+c+"FileIcon"),c},getFileInfo:function(a,b){var c=this._getFile(a,b);if(c){var e=this.isDirectory(c),d=this.convertFilePathName(c,b,!0);return{name:this.extractFilename(d),pathname:d,directory:this.extractDir(d),itemType:e?"dir":"file",fileExt:this.extractFileExt(d),iconClass:this.getFileIcon(c),size:e?"0":this.fileSize(c),lastModified:this.fileLastModified(c)}}},getFileTree:function(a,b,c,e){if(!a)return[];var d,g=[],f,l=a.length,k;for(f=0;f<l;f++)if(k=a[f],d=this.isDirectory(k),!e||d)if(d=this.getFilePathName(k))d=this.getFileInfo(k,b),d.parentId=c,d.children=this.hasSubFile(k,b,e),g.push(d);return g},getDirAndFile:function(a,b,c,e){var d;d=this._getFile(a,b);if(!d)return[];d=this.listFiles(d);l.isFunction(e)&&(d=l.filter(d,e));this.sortFiles(d);return this.getFileTree(d,b,a,c)}})});