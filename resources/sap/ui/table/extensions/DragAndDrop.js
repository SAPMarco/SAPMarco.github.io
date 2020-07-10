/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExtensionBase","../utils/TableUtils","sap/ui/core/library"],function(t,e,o){"use strict";var i="sap.ui.table";var r=o.dnd.DropPosition;var a={getSessionData:function(t,e){return t.getComplexData(i+(e==null?"":"-"+e))},setSessionData:function(t,e,o){t.setComplexData(i+(o==null?"":"-"+o),e)},getInstanceSessionData:function(t,e){return this.getSessionData(t,e.getId())},setInstanceSessionData:function(t,e,o){this.setSessionData(t,o,e.getId())}};var n={ondragstart:function(t){var e=t.dragSession;if(!e||!e.getDragControl()){return}var o=e.getDragControl();var i={};if(o.isA("sap.ui.table.Row")){if(o.isEmpty()||o.isGroupHeader()||o.isSummary()){t.preventDefault();return}else{i.draggedRowContext=o.getRowBindingContext()}}a.setInstanceSessionData(e,this,i)},ondragenter:function(t){var o=t.dragSession;if(!o||!o.getDropControl()){return}var i=a.getInstanceSessionData(o,this);var n=o.getDragControl();var s=o.getDropControl();if(!i){i={}}if(s.isA("sap.ui.table.Row")){var l=i.draggedRowContext;var g=s.getRowBindingContext();var f=o.getDropInfo().getDropPosition();if(s.isEmpty()&&f===r.On&&e.hasData(this)||l&&l===g||s.isGroupHeader()||s.isSummary()){t.setMarked("NonDroppable")}else{if(!g){var u=this.getRows()[e.getNonEmptyVisibleRowCount(this)-1];o.setDropControl(u||this)}if(o.getDropControl()!==this){var d=this.getDomRef().classList.contains("sapUiTableVScr");var p=this.getDomRef("sapUiTableCnt").getBoundingClientRect();o.setIndicatorConfig({width:p.width-(d?16:0),left:p.left+(this._bRtlMode&&d?16:0)})}}}else if(s.isA("sap.ui.table.Column")){var p=this.getDomRef("sapUiTableCnt").getBoundingClientRect();o.setIndicatorConfig({height:p.height-(this._getScrollExtension().isHorizontalScrollbarVisible()?16:0)})}else if(n===s){t.setMarked("NonDroppable")}if(!i.verticalScrollEdge){var v=window.pageYOffset;var c=this.getDomRef("table").getBoundingClientRect();i.verticalScrollEdge={bottom:c.bottom+v,top:c.top+v}}var h=window.pageXOffset;var D=this.getDomRef("sapUiTableCtrlScr").getBoundingClientRect();i.horizontalScrollEdge={left:D.left+h,right:D.right+h};a.setInstanceSessionData(o,this,i)},ondragover:function(t){var e=t.dragSession;if(!e){return}var o=a.getInstanceSessionData(e,this);if(!o){return}var i=32;var r=50;var n=e.getDropControl();var s=this._getScrollExtension();var l=s.getVerticalScrollbar();var g=s.getHorizontalScrollbar();var f=o.verticalScrollEdge;var u=o.horizontalScrollEdge;if(f&&l&&n!==this){var d=t.pageY;if(d>=f.top-r&&d<=f.top+r){l.scrollTop-=i}else if(d<=f.bottom+r&&d>=f.bottom-r){l.scrollTop+=i}}if(u&&g&&n!==this){var p=t.pageX;if(p>=u.left-r&&p<=u.left+r){g.scrollLeft-=i}else if(p<=u.right+r&&p>=u.right-r){g.scrollLeft+=i}}},onlongdragover:function(t){var o=t.dragSession;if(!o){return}var i=e.getCell(this,t.target);var r=e.getCellInfo(i).rowIndex;var a=r==null?null:this.getRows()[r];var n=o.getDropControl();if(a&&(n==a||!n)){e.Grouping.toggleGroupHeader(this,a.getIndex(),true)}}};var s=t.extend("sap.ui.table.extensions.DragAndDrop",{_init:function(t,o,i){this._oDelegate=n;e.addDelegate(t,this._oDelegate,t);return"DragAndDropExtension"},_debug:function(){this._ExtensionDelegate=n},destroy:function(){var e=this.getTable();if(e){e.removeEventDelegate(this._oDelegate)}this._oDelegate=null;t.prototype.destroy.apply(this,arguments)}});return s});