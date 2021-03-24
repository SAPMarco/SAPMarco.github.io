/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/Sorter","sap/ui/Device","sap/ui/thirdparty/jquery"],function(e,r,a){"use strict";var t={TableUtils:null,clearMode:function(e){e._mode=null},setGroupMode:function(e){e._mode="Group"},isGroupMode:function(e){return e?e._mode==="Group":false},setTreeMode:function(e){e._mode="Tree"},isTreeMode:function(e){return e?e._mode==="Tree":false},getModeCssClass:function(e){switch(e._mode){case"Group":return"sapUiTableGroupMode";case"Tree":return"sapUiTableTreeMode";default:return null}},showGroupMenuButton:function(e){return!r.system.desktop&&t.TableUtils.isA(e,"sap.ui.table.AnalyticalTable")},isInGroupHeaderRow:function(e){var r=t.TableUtils.getCellInfo(e);if(r.isOfType(t.TableUtils.CELLTYPE.ANYCONTENTCELL)){return r.cell.parent().hasClass("sapUiTableGroupHeaderRow")}return false},isInSummaryRow:function(e){var r=t.TableUtils.getCellInfo(e);if(r.isOfType(t.TableUtils.CELLTYPE.ANYCONTENTCELL)){return r.cell.parent().hasClass("sapUiTableSummaryRow")}return false},calcGroupIndent:function(e){var r=t.TableUtils.isA(e.getTable(),"sap.ui.table.TreeTable");var a=e.getLevel()-(!e.isGroupHeader()&&!e.isSummary()&&!r?1:0);var o=0;for(var n=1;n<a;n++){if(n===1){o=24}else if(n===2){o+=12}else{o+=8}}return o},calcTreeIndent:function(e){return(e.getLevel()-1)*17},setGroupIndent:function(e,r){var a=e.getDomRefs(true);var t=a.row;var o=a.rowHeaderPart;var n=e.getTable()._bRtlMode;var i=t.find("td.sapUiTableCellFirst > .sapUiTableCellInner");var l=o.find(".sapUiTableGroupShield");if(r<=0){o.css(n?"right":"left","");l.css("width","").css(n?"margin-right":"margin-left","");i.css(n?"padding-right":"padding-left","")}else{o.css(n?"right":"left",r+"px");l.css("width",r+"px").css(n?"margin-right":"margin-left",-1*r+"px");i.css(n?"padding-right":"padding-left",r+8+"px")}},setTreeIndent:function(e,r){var a=e.getDomRefs(true);var t=a.row;var o=e.getTable()._bRtlMode;var n=t.find(".sapUiTableTreeIcon");n.css(o?"margin-right":"margin-left",r>0?r+"px":"")},updateTableRowForGrouping:function(e){var r=e.getTable();var a=e.getDomRefs(true);var o=a.row;var n=e.getLevel();var i=e.isExpanded();var l=e.isExpandable();o.attr({"data-sap-ui-level":n}).data("sap-ui-level",n).toggleClass("sapUiTableSummaryRow",e.isSummary()).toggleClass("sapUiTableGroupHeaderRow",e.isGroupHeader());if(t.isGroupMode(r)){var s=e.getTitle();var p=t.calcGroupIndent(e);e.$("groupHeader").toggleClass("sapUiTableGroupIconOpen",l&&i).toggleClass("sapUiTableGroupIconClosed",l&&!i).attr("title",r._getShowStandardTooltips()&&s?s:null).text(s);t.setGroupIndent(e,p);o.toggleClass("sapUiTableRowIndented",p>0)}if(t.isTreeMode(r)){var u=o.find(".sapUiTableTreeIcon");u.toggleClass("sapUiTableTreeIconLeaf",!l).toggleClass("sapUiTableTreeIconNodeOpen",l&&i).toggleClass("sapUiTableTreeIconNodeClosed",l&&!i);t.setTreeIndent(e,t.calcTreeIndent(e))}if(t.showGroupMenuButton(r)){var d=a.rowHeaderPart;var g=0;var f=r.$();if(f.hasClass("sapUiTableVScr")){g+=f.find(".sapUiTableVSb").width()}var c=d.find(".sapUiTableGroupMenuButton");if(r._bRtlMode){c.css("right",f.width()-c.width()+d.position().left-g-5+"px")}else{c.css("left",f.width()-c.width()-d.position().left-g-5+"px")}}r._getAccExtension().updateAriaExpandAndLevelState(e)},cleanupTableRowForGrouping:function(e){var r=e.getTable();var a=e.getDomRefs(true);a.row.removeAttr("data-sap-ui-level");a.row.removeData("sap-ui-level");if(t.isGroupMode(r)){a.row.removeClass("sapUiTableGroupHeaderRow sapUiTableSummaryRow sapUiTableRowIndented");e.$("groupHeader").removeClass("sapUiTableGroupIconOpen","sapUiTableGroupIconClosed").attr("title","").text("");t.setGroupIndent(e,0)}if(t.isTreeMode(r)){a.row.find(".sapUiTableTreeIcon").removeClass("sapUiTableTreeIconLeaf").removeClass("sapUiTableTreeIconNodeOpen").removeClass("sapUiTableTreeIconNodeClosed");t.setTreeIndent(e,0)}r._getAccExtension().updateAriaExpandAndLevelState(e)},updateGroups:function(e){if(t.isGroupMode(e)||t.isTreeMode(e)){var r=e.getBinding();if(r){e.getRows().forEach(function(e){t.updateTableRowForGrouping(e)})}else{e.getRows().forEach(function(e){t.cleanupTableRowForGrouping(e)})}}},setupExperimentalGrouping:function(r){if(!r.getEnableGrouping()){return}var o=r.getBinding();var n=sap.ui.getCore().byId(r.getGroupBy());var i=n&&n.getGrouped()&&t.TableUtils.isA(o,"sap.ui.model.ClientListBinding");if(!i||o._modified){return}o._modified=true;t.setGroupMode(r);var l=n.getSortProperty();o.sort(new e(l));var s=r._getTotalRowCount(),p=o.getContexts(0,s);var u;var d=0;for(var g=s-1;g>=0;g--){var f=p[g].getProperty(l);if(!u){u=f}if(u!==f){var c=p[g+1].getModel().getContext("/sap.ui.table.GroupInfo"+g);c.__groupInfo={oContext:p[g+1],name:u,count:d,groupHeader:true,expanded:true};p.splice(g+1,0,c);u=f;d=0}d++}var c=p[0].getModel().getContext("/sap.ui.table.GroupInfo");c.__groupInfo={oContext:p[0],name:u,count:d,groupHeader:true,expanded:true};p.splice(0,0,c);a.extend(o,{getLength:function(){return p.length},getContexts:function(e,r){return p.slice(e,e+r)}});function T(e){var r=p[e];return(r&&r.__groupInfo&&r.__groupInfo.groupHeader)===true}r._experimentalGroupingRowState=function(e){var r=e.context;if((r&&r.__groupInfo&&r.__groupInfo.groupHeader)===true){e.type=e.Type.GroupHeader}e.title=r&&r.__groupInfo&&r.__groupInfo.name+" - "+r.__groupInfo.count;e.expandable=e.type===e.Type.GroupHeader;e.expanded=e.expandable&&r.__groupInfo&&r.__groupInfo.expanded;e.level=e.expandable?1:2;e.contentHidden=e.expandable};r._experimentalGroupingExpand=function(e){var r=e.getIndex();if(T(r)&&!p[r].__groupInfo.expanded){for(var a=0;a<p[r].__childs.length;a++){p.splice(r+1+a,0,p[r].__childs[a])}delete p[r].__childs;p[r].__groupInfo.expanded=true;o._fireChange()}};r._experimentalGroupingCollapse=function(e){var r=e.getIndex();if(T(r)&&p[r].__groupInfo.expanded){p[r].__childs=p.splice(r+1,p[r].__groupInfo.count);p[r].__groupInfo.expanded=false;o._fireChange()}};var _=t.TableUtils.Hook;_.register(r,_.Keys.Row.UpdateState,r._experimentalGroupingRowState);_.register(r,_.Keys.Row.Expand,r._experimentalGroupingExpand);_.register(r,_.Keys.Row.Collapse,r._experimentalGroupingCollapse);r._mTimeouts.groupingFireBindingChange=r._mTimeouts.groupingFireBindingChange||window.setTimeout(function(){o._fireChange()},0)},resetExperimentalGrouping:function(e){var r=e.getBinding();var a=t.TableUtils.Hook;if(r&&r._modified){t.clearMode(e);e.bindRows(e.getBindingInfo("rows"))}a.deregister(e,a.Keys.Row.UpdateState,e._experimentalGroupingRowState);a.deregister(e,a.Keys.Row.Expand,e._experimentalGroupingExpand);a.deregister(e,a.Keys.Row.Collapse,e._experimentalGroupingCollapse);delete e._experimentalGroupingRowState;delete e._experimentalGroupingExpand;delete e._experimentalGroupingCollapse}};return t},true);