//>>built
define("dojox/grid/cells/tree",["dojo/_base/kernel","../../main","dojo/_base/lang","../cells"],function(h,g,k){g.grid.cells.TreeCell={formatAggregate:function(a,d,b){var c=this.grid;a=c.aggregator?c.aggregator.getForCell(this,d,a,d===this.level?"cnt":this.parentCell.aggregate):this.value||this.defaultValue;d=this._defaultFormat(a,[a,d-this.level,b,this]);(b=this.textDir||this.grid.textDir)&&this._enforceTextDirWithUcc&&(d=this._enforceTextDirWithUcc(b,d));return d},formatIndexes:function(a,d){var b=
this.grid.edit.info,c=this.get?this.get(a[0],d,a):this.value||this.defaultValue;if(this.editable&&(this.alwaysEditing||b.rowIndex==a[0]&&b.cell==this))return this.formatEditing(c,a[0],a);b=this._defaultFormat(c,[c,a[0],a,this]);(c=this.textDir||this.grid.textDir)&&this._enforceTextDirWithUcc&&(b=this._enforceTextDirWithUcc(c,b));return b},getOpenState:function(a){var d=this.grid,b=d.store,c=null;b.isItem(a)&&(c=a,a=b.getIdentity(a));this.openStates||(this.openStates={});if("string"!=typeof a||!(a in
this.openStates))this.openStates[a]=d.getDefaultOpenState(this,c);return this.openStates[a]},formatAtLevel:function(a,d,b,c,g,f){k.isArray(a)||(a=[a]);var e="";b>this.level||b===this.level&&c?(f.push("dojoxGridSpacerCell"),b===this.level&&f.push("dojoxGridTotalCell"),e="\x3cspan\x3e\x3c/span\x3e"):b<this.level?(f.push("dojoxGridSummaryCell"),e='\x3cspan class\x3d"dojoxGridSummarySpan"\x3e'+this.formatAggregate(d,b,a)+"\x3c/span\x3e"):(c="",this.isCollapsable&&(c=this.grid.store,e="",c.isItem(d)&&
(e=c.getIdentity(d)),f.push("dojoxGridExpandoCell"),c="\x3cspan "+h._scopeName+'Type\x3d"dojox.grid._Expando" level\x3d"'+b+'" class\x3d"dojoxGridExpando"" toggleClass\x3d"'+g+'" itemId\x3d"'+e+'" cellIdx\x3d"'+this.index+'"\x3e\x3c/span\x3e'),e=c+this.formatIndexes(a,d));this.grid.focus.cell&&(this.index==this.grid.focus.cell.index&&a.join("/")==this.grid.focus.rowIndex)&&f.push(this.grid.focus.focusClass);return e}};return g.grid.cells.TreeCell});
/// tree.js.map