//>>built
define("dojox/grid/enhanced/plugins/exporter/TableWriter",["dojo/_base/declare","dojo/_base/array","dojo/dom-geometry","./_ExportWriter","../Exporter"],function(h,g,e,k,l){l.registerWriter("table","dojox.grid.enhanced.plugins.exporter.TableWriter");return h("dojox.grid.enhanced.plugins.exporter.TableWriter",k,{constructor:function(a){this._viewTables=[];this._tableAttrs=a||{}},_getTableAttrs:function(a){(a=this._tableAttrs[a]||"")&&" "!=a[0]&&(a=" "+a);return a},_getRowClass:function(a){return a.isHeader?
" grid_header":[" grid_row grid_row_",a.rowIdx+1,a.rowIdx%2?" grid_even_row":" grid_odd_row"].join("")},_getColumnClass:function(a){a=a.cell.index+a.colOffset+1;return[" grid_column grid_column_",a,a%2?" grid_odd_column":" grid_even_column"].join("")},beforeView:function(a){var b=a.viewIdx,c=this._viewTables[b],f=e.getMarginBox(a.view.contentNode).w;if(!c){for(var d=c=0;d<b;++d)c+=this._viewTables[d]._width;c=this._viewTables[b]=['\x3cdiv class\x3d"grid_view" style\x3d"position: absolute; top: 0; ',
e.isBodyLtr()?"left":"right",":",c,'px;"\x3e']}c._width=f;b=a.isHeader?e.getContentBox(a.view.headerContentNode).h:(b=a.grid.getRowNode(a.rowIdx))?e.getContentBox(b).h:a.grid.scroller.averageRowHeight;c.push('\x3ctable class\x3d"',this._getRowClass(a),'" style\x3d"table-layout:fixed; height:',b,"px; width:",f,'px;" ','border\x3d"0" cellspacing\x3d"0" cellpadding\x3d"0" ',this._getTableAttrs("table"),"\x3e\x3ctbody ",this._getTableAttrs("tbody"),"\x3e");return!0},afterView:function(a){this._viewTables[a.viewIdx].push("\x3c/tbody\x3e\x3c/table\x3e")},
beforeSubrow:function(a){this._viewTables[a.viewIdx].push("\x3ctr",this._getTableAttrs("tr"),"\x3e");return!0},afterSubrow:function(a){this._viewTables[a.viewIdx].push("\x3c/tr\x3e")},handleCell:function(a){var b=a.cell;if(!(b.hidden||0<=g.indexOf(a.spCols,b.index))){var c=a.isHeader?"th":"td",f=[b.colSpan?' colspan\x3d"'+b.colSpan+'"':"",b.rowSpan?' rowspan\x3d"'+b.rowSpan+'"':"",' style\x3d"width: ',e.getContentBox(b.getHeaderNode()).w,'px;"',this._getTableAttrs(c),' class\x3d"',this._getColumnClass(a),
'"'].join(""),d=this._viewTables[a.viewIdx];d.push("\x3c",c,f,"\x3e");a.isHeader?d.push(b.name||b.field):d.push(this._getExportDataForCell(a.rowIdx,a.row,b,a.grid));d.push("\x3c/",c,"\x3e")}},afterContent:function(){g.forEach(this._viewTables,function(a){a.push("\x3c/div\x3e")})},toString:function(){return['\x3cdiv style\x3d"position: relative;"\x3e',g.map(this._viewTables,function(a){return a.join("")}).join(""),"\x3c/div\x3e"].join("")}})});
/// TableWriter.js.map