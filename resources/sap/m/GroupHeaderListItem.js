/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","./library","./ListItemBase","./GroupHeaderListItemRenderer"],function(e,t,r,n){"use strict";var a=t.ListMode;var o=e.TextDirection;var i=r.extend("sap.m.GroupHeaderListItem",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Data",defaultValue:null},count:{type:"string",group:"Data",defaultValue:null},upperCase:{type:"boolean",group:"Appearance",defaultValue:false},titleTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:o.Inherit}}}});i.prototype.getMode=function(){return a.None};i.prototype.shouldClearLastValue=function(){return true};i.prototype.getTable=function(){var e=this.getParent();if(e&&e.isA("sap.m.Table")){return e}};i.prototype.onBeforeRendering=function(){var e=this.getTable();if(e){e.getColumns().forEach(function(e){e.clearLastValue()});this.TagName="tr"}};i.prototype.getAccessibilityType=function(e){var t=this.getTable()?"ROW":"OPTION";return e.getText("LIST_ITEM_GROUP_HEADER")+" "+e.getText("ACC_CTR_TYPE_"+t)};i.prototype.getContentAnnouncement=function(){return this.getTitle()};i.prototype.getGroupAnnouncement=function(){};return i});