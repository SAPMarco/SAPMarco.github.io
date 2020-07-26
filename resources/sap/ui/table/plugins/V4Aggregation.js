/*
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PluginBase","../utils/TableUtils","sap/ui/unified/MenuItem"],function(e,t,n){"use strict";var a=e.extend("sap.ui.table.plugins.V4Aggregation",{metadata:{library:"sap.ui.table",properties:{},events:{}}});a.prototype.init=function(){this.aGroupMenuItems=[];this.aAggregateMenuItems=[];this.aContextMenuItems=[]};a.prototype.isApplicable=function(e){return e.getMetadata().getName()==="sap.ui.table.Table"};a.prototype.onActivate=function(n){e.prototype.onActivate.apply(this,arguments);t.Grouping.setGroupMode(n);t.Hook.register(n,t.Hook.Keys.Row.UpdateState,this.updateRowState,this);t.Hook.register(n,t.Hook.Keys.Table.OpenMenu,this.onOpenMenu,this);t.Hook.register(n,t.Hook.Keys.Column.MenuItemNotification,this.notifyColumnAboutMenuItems,this)};a.prototype.onDeactivate=function(n){e.prototype.onDeactivate.apply(this,arguments);t.Grouping.clearMode(n);t.Hook.deregister(n,t.Hook.Keys.Row.UpdateState,this.updateRowState,this);t.Hook.deregister(n,t.Hook.Keys.Table.OpenMenu,this.onOpenMenu,this);t.Hook.deregister(n,t.Hook.Keys.Column.MenuItemNotification,this.notifyColumnAboutMenuItems,this);this.aGroupMenuItems.concat(this.aAggregateMenuItems,this.aContextMenuItems).forEach(function(e){e.destroy()});this.aGroupMenuItems=[];this.aAggregateMenuItems=[];this.aContextMenuItems=[];var a=n.getBinding("rows");if(a){a.setAggregation()}};a.prototype.onTableRowsBound=function(e){this.updateAggregation()};a.prototype.updateRowState=function(e){if(typeof e.context.getValue("@$ui5.node.isExpanded")==="boolean"){e.type=e.Type.GroupHeader}else if(e.context.getValue("@$ui5.node.isTotal")){e.type=e.Type.Summary}e.title="todo";e.expandable=e.type===e.Type.GroupHeader;e.expanded=e.context.getValue("@$ui5.node.isExpanded")===true;e.level=e.context.getValue("@$ui5.node.level")};a.prototype.setGroupLevels=function(e){this._aGroupLevels=e};a.prototype.getGroupLevels=function(){return this._aGroupLevels||[]};a.prototype.expandRow=function(e){var n=this.getTableBinding();if(n&&t.isA(e,"sap.ui.table.Row")){if(n.expand){n.expand(e.getIndex())}else{sap.m.MessageToast.show("not yet ;)")}}};a.prototype.collapseRow=function(e){var n=this.getTableBinding();if(n&&t.isA(e,"sap.ui.table.Row")){if(n.collapse){n.collapse(e.getIndex())}else{sap.m.MessageToast.show("not yet ;)")}}};function o(e){var t;if(e.isA("sap.ui.table.Table")){t=e.getColumns()}else{t=[e]}return t.reduce(function(e,t){var n=t.data("propertyInfo");if(t.getVisible()&&n){for(var a in n){if(n[a].groupable&&e.indexOf(a)===-1){e.push(a)}}}return e},[])}function i(e){var t;if(e.isA("sap.ui.table.Table")){t=e.getColumns()}else{t=[e]}return t.reduce(function(e,t){var n=t.data("propertyInfo");if(t.getVisible()&&n){for(var a in n){if(n[a].aggregatable&&e.indexOf(a)===-1){e.push(a)}}}return e},[])}function s(e){var t=i(e);var n=e.data("propertyInfo");var a=[];for(var o=0;o<t.length;o++){var s=t[o];var r=n[t[o]];var u=Object.assign({grandtotal:true,subtotals:true},r.aggregationDetails);var g={grandTotal:u.grandtotal===true,subtotals:u.subtotals===true};if(g.grandTotal&&g.subtotals){a.push({name:s,menuText:"All Totals",config:g})}if(g.grandTotal){a.push({name:s,menuText:"GrandTotal",config:{grandTotal:true}})}if(g.subtotals){a.push({name:s,menuText:"Subtotals",config:{subtotals:true}})}if(u.custom){for(var p in u.custom){var l=u.custom[p];a.push({name:p,menuText:p,config:l})}}}return a}function r(e){return o(e).reduce(function(e,t){e[t]={};return e},{})}function u(e){var t=i(e).reduce(function(e,t){e[t]={};return e},{});return e.getColumns().reduce(function(e,t){var n=t.data("extendedState");if(n&&n.aggregations){n.aggregations.forEach(function(t){e[t.name]=t.config})}return e},t)}a.prototype.updateAggregation=function(){var e=this.getTable();var t=this.getTableBinding();var n={aggregate:u(e),group:r(e),groupLevels:this.getGroupLevels()};t.setAggregation(n)};a.prototype.onOpenMenu=function(e,a){var i=this;var r=this.getTable();if(e.isOfType(t.CELLTYPE.COLUMNHEADER)){var u=r.getColumns()[e.columnIndex];var g=o(u);var p=s(u);if(g.length>0){var l=function(e){var t=this.getGroupLevels();if(this.getGroupLevels().indexOf(e)===-1){t.push(e);this.setGroupLevels(t)}else{t.splice(t.indexOf(e),1);this.setGroupLevels(t)}this.updateAggregation()}.bind(this);g.forEach(function(e,o){if(!this.aGroupMenuItems[o]||this.aGroupMenuItems[o].bIsDestroyed){this.aGroupMenuItems[o]=new n(this.getId()+"-group"+"-"+o,{text:t.getResourceText("TBL_GROUP")+": "+e,icon:this.getGroupLevels().indexOf(e)>-1?"sap-icon://accept":null,select:function(){l(e)}})}else{this.aGroupMenuItems[o].mEventRegistry.select[0].fFunction=function(){l(e)};this.aGroupMenuItems[o].setText(t.getResourceText("TBL_GROUP")+": "+e);this.aGroupMenuItems[o].setIcon(this.getGroupLevels().indexOf(e)>-1?"sap-icon://accept":null)}a.addItem(this.aGroupMenuItems[o])}.bind(this))}if(p.length>0){var d=function(e){var t=u.data("extendedState");var n=true;if(!t){t={aggregations:[]}}for(var a=0;a<t.aggregations.length;a++){var o=t.aggregations[a];if(o.name===e.name){t.aggregations.splice(a,1);n=false;break}}if(n){t.aggregations.push(e)}u.data("extendedState",t);this.updateAggregation()}.bind(this);var c=function(e){var t=u.data("extendedState");if(!t||!t.aggregations){return{icon:null,enabled:true}}return{icon:t.aggregations.some(function(t){return t.name===e.name&&t.menuText===e.menuText})?"sap-icon://accept":null,enabled:!t.aggregations.some(function(t){return t.name===e.name})||t.aggregations.some(function(t){return t.menuText===e.menuText})}};p.forEach(function(e,t){if(!this.aAggregateMenuItems[t]||this.aAggregateMenuItems[t].bIsDestroyed){var o=c(e);this.aAggregateMenuItems[t]=new n(this.getId()+"-aggregate"+"-"+t,{text:e.menuText,icon:o.icon,enabled:o.enabled,select:function(){d(e)}})}else{var o=c(e);this.aAggregateMenuItems[t].mEventRegistry.select[0].fFunction=function(){d(e)};this.aAggregateMenuItems[t].setText(e.menuText);this.aAggregateMenuItems[t].setIcon(o.icon);this.aAggregateMenuItems[t].setEnabled(o.enabled)}a.addItem(this.aAggregateMenuItems[t])}.bind(this))}}else if(e.isOfType(t.CELLTYPE.ANYCONTENTCELL)){var f=this.getTable().getRows()[e.rowIndex];if(f.isGroupHeader()){if(this.aContextMenuItems[0]){this.aContextMenuItems[0].destroy()}this.aContextMenuItems[0]=new n(this.getId()+"-expandrow",{text:"expand index ("+f.getIndex()+")",select:function(){i.expandRow(f)}});a.addItem(this.aContextMenuItems[0]);if(this.aContextMenuItems[1]){this.aContextMenuItems[1].destroy()}this.aContextMenuItems[1]=new n(this.getId()+"-collapserow",{text:"collapse ("+f.getIndex()+")",select:function(){i.collapseRow(f)}});a.addItem(this.aContextMenuItems[1])}}};a.prototype.notifyColumnAboutMenuItems=function(e,t){if(o(e).length>0||s(e).length>0){t()}};return a});