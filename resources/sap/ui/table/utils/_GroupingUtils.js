/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/model/Sorter","sap/ui/Device","../library","sap/ui/thirdparty/jquery"],function(e,r,t,o,n){"use strict";var a={TableUtils:null,clearMode:function(e){e._mode=null},setGroupMode:function(e){e._mode="Group"},isGroupMode:function(e){return e?e._mode==="Group":false},setTreeMode:function(e){e._mode="Tree"},isTreeMode:function(e){return e?e._mode==="Tree":false},getModeCssClass:function(e){switch(e._mode){case"Group":return"sapUiTableGroupMode";case"Tree":return"sapUiTableTreeMode";default:return null}},showGroupMenuButton:function(e){return!t.system.desktop&&a.TableUtils.isA(e,"sap.ui.table.AnalyticalTable")},toggleGroupHeader:function(e,r,t){var o=[];var n=e?e.getBinding("rows"):null;if(!e||!n||!n.expand||r==null){return null}if(typeof r==="number"){o=[r]}else if(Array.isArray(r)){if(t==null&&r.length>1){return null}o=r}var a=e._getTotalRowCount();var i=o.filter(function(e){var r=n.isExpanded(e);var o=true;if(n.nodeHasChildren){if(n.getNodeByIndex){o=!n.nodeHasChildren(n.getNodeByIndex(e))}else{o=false}}return e>=0&&e<a&&!o&&t!==r}).sort(function(e,r){return e-r});if(i.length===0){return null}for(var l=i.length-1;l>0;l--){if(t){n.expand(i[l],true)}else{n.collapse(i[l],true)}}if(t===true){n.expand(i[0],false)}else if(t===false){n.collapse(i[0],false)}else{n.toggleIndex(i[0])}return n.isExpanded(i[0])},toggleGroupHeaderByRef:function(e,r,t){var o=a.TableUtils.getCell(e,r);var n=a.TableUtils.getCellInfo(o);var i=e.getRows()[n.rowIndex];var l=e.getBinding("rows");if(i&&i.isExpandable()&&l){var s=i.getIndex();var u=a.toggleGroupHeader(e,s,t);var p=u===true||u===false;if(p&&e._onGroupHeaderChanged){e._onGroupHeaderChanged(s,u)}return p}return false},isInGroupHeaderRow:function(e){var r=a.TableUtils.getCellInfo(e);if(r.isOfType(a.TableUtils.CELLTYPE.ANYCONTENTCELL)){return r.cell.parent().hasClass("sapUiTableGroupHeaderRow")}return false},isInSummaryRow:function(e){var r=a.TableUtils.getCellInfo(e);if(r.isOfType(a.TableUtils.CELLTYPE.ANYCONTENTCELL)){return r.cell.parent().hasClass("sapUiTableSummaryRow")}return false},calcGroupIndent:function(e){var r=e.getLevel();var t=0;for(var o=1;o<r;o++){t+=o<=2?12:8}return t},calcTreeIndent:function(e){return(e.getLevel()-1)*17},setGroupIndent:function(e,r){var t=e.getDomRefs(true);var o=t.row;var n=t.rowHeaderPart;var a=e.getTable()._bRtlMode;var i=o.find("td.sapUiTableCellFirst > .sapUiTableCellInner");var l=n.find(".sapUiTableGroupShield");if(r<=0){n.css(a?"right":"left","");l.css("width","").css(a?"margin-right":"margin-left","");i.css(a?"padding-right":"padding-left","")}else{n.css(a?"right":"left",r+"px");l.css("width",r+"px").css(a?"margin-right":"margin-left",-1*r+"px");i.css(a?"padding-right":"padding-left",r+8+"px")}},setTreeIndent:function(e,r){var t=e.getDomRefs(true);var o=t.row;var n=e.getTable()._bRtlMode;var a=o.find(".sapUiTableTreeIcon");a.css(n?"margin-right":"margin-left",r>0?r+"px":"")},updateTableRowForGrouping:function(e){var r=e.getTable();var t=e.getDomRefs(true);var o=t.row;var n=e.getLevel();var i=e.isExpanded();var l=e.isExpandable();o.attr({"data-sap-ui-level":n}).data("sap-ui-level",n).toggleClass("sapUiTableSummaryRow",e.isSummary()).toggleClass("sapUiTableGroupHeaderRow",e.isGroupHeader());if(a.isGroupMode(r)){var s=e.getTitle();var u=a.calcGroupIndent(e);e.$("groupHeader").toggleClass("sapUiTableGroupIconOpen",l&&i).toggleClass("sapUiTableGroupIconClosed",l&&!i).attr("title",r._getShowStandardTooltips()&&s?s:null).text(s);a.setGroupIndent(e,u);o.toggleClass("sapUiTableRowIndented",u>0)}if(a.isTreeMode(r)){var p=o.find(".sapUiTableTreeIcon");p.toggleClass("sapUiTableTreeIconLeaf",!l).toggleClass("sapUiTableTreeIconNodeOpen",l&&i).toggleClass("sapUiTableTreeIconNodeClosed",l&&!i);a.setTreeIndent(e,a.calcTreeIndent(e))}if(a.showGroupMenuButton(r)){var d=t.rowHeaderPart;var g=0;var f=r.$();if(f.hasClass("sapUiTableVScr")){g+=f.find(".sapUiTableVSb").width()}var c=d.find(".sapUiTableGroupMenuButton");if(r._bRtlMode){c.css("right",f.width()-c.width()+d.position().left-g-5+"px")}else{c.css("left",f.width()-c.width()-d.position().left-g-5+"px")}}r._getAccExtension().updateAriaExpandAndLevelState(e)},cleanupTableRowForGrouping:function(e){var r=e.getTable();var t=e.getDomRefs(true);t.row.removeAttr("data-sap-ui-level");t.row.removeData("sap-ui-level");if(a.isGroupMode(r)){t.row.removeClass("sapUiTableGroupHeaderRow sapUiTableSummaryRow sapUiTableRowIndented");e.$("groupHeader").removeClass("sapUiTableGroupIconOpen","sapUiTableGroupIconClosed").attr("title","").text("");a.setGroupIndent(e,0)}if(a.isTreeMode(r)){t.row.find(".sapUiTableTreeIcon").removeClass("sapUiTableTreeIconLeaf").removeClass("sapUiTableTreeIconNodeOpen").removeClass("sapUiTableTreeIconNodeClosed");a.setTreeIndent(e,0)}r._getAccExtension().updateAriaExpandAndLevelState(e)},updateGroups:function(e){if(a.isGroupMode(e)||a.isTreeMode(e)){var r=e.getBinding("rows");if(r){e.getRows().forEach(function(e){a.updateTableRowForGrouping(e)})}else{e.getRows().forEach(function(e){a.cleanupTableRowForGrouping(e)})}}},setupExperimentalGrouping:function(t){if(!t.getEnableGrouping()){return}var o=e.prototype.getBinding.call(t,"rows");var i=sap.ui.getCore().byId(t.getGroupBy());var l=i&&i.getGrouped()&&a.TableUtils.isA(o,"sap.ui.model.ClientListBinding");if(!l||o._modified){return}o._modified=true;a.setGroupMode(t);var s=i.getSortProperty();o.sort(new r(s));var u=t._getTotalRowCount(),p=o.getContexts(0,u);var d;var g=0;for(var f=u-1;f>=0;f--){var c=p[f].getProperty(s);if(!d){d=c}if(d!==c){var T=p[f+1].getModel().getContext("/sap.ui.table.GroupInfo"+f);T.__groupInfo={oContext:p[f+1],name:d,count:g,groupHeader:true,expanded:true};p.splice(f+1,0,T);d=c;g=0}g++}var T=p[0].getModel().getContext("/sap.ui.table.GroupInfo");T.__groupInfo={oContext:p[0],name:d,count:g,groupHeader:true,expanded:true};p.splice(0,0,T);n.extend(o,{getLength:function(){return p.length},getContexts:function(e,r){return p.slice(e,e+r)},isGroupHeader:function(e){var r=p[e];return(r&&r.__groupInfo&&r.__groupInfo.groupHeader)===true},getTitle:function(e){var r=p[e];return r&&r.__groupInfo&&r.__groupInfo.name+" - "+r.__groupInfo.count},isExpanded:function(e){var r=p[e];return this.isGroupHeader(e)&&r.__groupInfo&&r.__groupInfo.expanded},expand:function(e){if(this.isGroupHeader(e)&&!p[e].__groupInfo.expanded){for(var r=0;r<p[e].__childs.length;r++){p.splice(e+1+r,0,p[e].__childs[r])}delete p[e].__childs;p[e].__groupInfo.expanded=true;this._fireChange()}},collapse:function(e){if(this.isGroupHeader(e)&&p[e].__groupInfo.expanded){p[e].__childs=p.splice(e+1,p[e].__groupInfo.count);p[e].__groupInfo.expanded=false;this._fireChange()}},toggleIndex:function(e){if(this.isExpanded(e)){this.collapse(e)}else{this.expand(e)}},nodeHasChildren:function(e){if(!e||!e.__groupInfo){return false}else{return e.__groupInfo.groupHeader===true}},getNodeByIndex:function(e){return p[e]}});t._experimentalGroupingRowState=function(e){var r=e.context;if((r&&r.__groupInfo&&r.__groupInfo.groupHeader)===true){e.type=e.Type.GroupHeader}e.title=r&&r.__groupInfo&&r.__groupInfo.name+" - "+r.__groupInfo.count;e.expandable=e.type===e.Type.GroupHeader;e.expanded=e.expandable&&r.__groupInfo&&r.__groupInfo.expanded;e.level=e.expandable?1:2;e.contentHidden=e.expandable};a.TableUtils.Hook.register(t,a.TableUtils.Hook.Keys.Row.UpdateState,t._experimentalGroupingRowState,t);t._mTimeouts.groupingFireBindingChange=t._mTimeouts.groupingFireBindingChange||window.setTimeout(function(){o._fireChange()},0)},resetExperimentalGrouping:function(e){var r=e.getBinding("rows");if(r&&r._modified){a.clearMode(e);var t=e.getBindingInfo("rows");e.unbindRows();e.bindRows(t)}a.TableUtils.Hook.deregister(e,a.TableUtils.Hook.Keys.Row.UpdateState,e._experimentalGroupingRowState,e)}};return a},true);