/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/Device","sap/ui/core/InvisibleText","./ListItemBaseRenderer"],function(e,t,r,s){"use strict";var i=e.ListGrowingDirection;var a=e.ListKeyboardMode;var n=e.ToolbarDesign;var o={apiVersion:2};o.ModeOrder={None:0,Delete:1,MultiSelect:-1,SingleSelect:1,SingleSelectLeft:-1,SingleSelectMaster:0};o.render=function(e,t){e.openStart("div",t);e.class("sapMList");if(t.getInset()){e.class("sapMListInsetBG")}e.style("width",t.getWidth());if(t.getBackgroundDesign){e.class("sapMListBG"+t.getBackgroundDesign())}var r=t.getTooltip_AsString();if(r){e.attr("title",r)}var s=t.getStickyStyleValue();if(s){e.class("sapMSticky");e.class("sapMSticky"+s)}this.renderContainerAttributes(e,t);e.openEnd();e.renderControl(t.getAggregation("_messageStrip"));var o=t.getHeaderText();var d=t.getHeaderToolbar();if(d){d.setDesign(n.Transparent,true);d.addStyleClass("sapMListHdr");d.addStyleClass("sapMListHdrTBar");d.addStyleClass("sapMTBHeader-CTX");e.renderControl(d)}else if(o){e.openStart("header",t.getId("header"));e.class("sapMListHdr").class("sapMListHdrText").openEnd();e.text(o);e.close("header")}var l=t.getInfoToolbar();if(l){l.setDesign(n.Info,true);l.addStyleClass("sapMListInfoTBar");e.openStart("div").class("sapMListInfoTBarContainer").openEnd();e.renderControl(l);e.close("div")}var g=t.getItems(),c=t.getShowNoData(),p=t.shouldRenderItems()&&g.length,u=t.getKeyboardMode()==a.Edit?-1:0,f=t.getGrowingDirection()==i.Upwards&&t.getGrowing();if(f){this.renderGrowing(e,t)}if(p||c){this.renderDummyArea(e,t,"before",-1)}this.renderListStartAttributes(e,t);e.class("sapMListUl");if(t._iItemNeedsHighlight){e.class("sapMListHighlight")}if(p||c){e.attr("tabindex",u)}e.class("sapMListShowSeparators"+t.getShowSeparators());e.class("sapMListMode"+t.getMode());if(t._iItemNeedsNavigated){e.class("sapMListNavigated")}e.openEnd();this.renderListHeadAttributes(e,t);if(p){if(f){g.reverse()}for(var S=0;S<g.length;S++){e.renderControl(g[S])}}if(!p&&c){this.renderNoData(e,t)}this.renderListEndAttributes(e,t);if(p||c){this.renderDummyArea(e,t,"after",u)}if(!f){this.renderGrowing(e,t)}if(t.getFooterText()){e.openStart("footer",t.getId("footer")).class("sapMListFtr").openEnd();e.text(t.getFooterText());e.close("footer")}e.close("div")};o.renderContainerAttributes=function(e,t){};o.renderListHeadAttributes=function(e,t){};o.renderListStartAttributes=function(e,t){e.openStart("ul",t.getId("listUl"));e.class("sapMListItems");t.addNavSection(t.getId("listUl"));e.accessibilityState(t,this.getAccessibilityState(t))};o.getAriaRole=function(e){return"listbox"};o.getAriaLabelledBy=function(e){var t=e.getHeaderToolbar();if(t){var r=t.getTitleControl();if(r){return r.getId()}}else if(e.getHeaderText()){return e.getId("header")}};o.getAriaDescribedBy=function(e){if(e.getFooterText()){return e.getId("footer")}};o.getAccessibilityState=function(e){var t=this.getAriaRole(e);return{role:t,multiselectable:t&&e._bSelectionMode?e.getMode()=="MultiSelect":undefined,labelledby:{value:this.getAriaLabelledBy(e),append:true},describedby:{value:this.getAriaDescribedBy(e),append:true}}};o.renderListEndAttributes=function(e,t){e.close("ul")};o.renderNoData=function(e,t){e.openStart("li",t.getId("nodata"));e.attr("tabindex",t.getKeyboardMode()==a.Navigation?-1:0);e.class("sapMLIB").class("sapMListNoData").class("sapMLIBTypeInactive");s.addFocusableClasses.call(s,e);e.openEnd();e.openStart("div",t.getId("nodata-text")).class("sapMListNoDataText").openEnd();e.text(t.getNoDataText(true));e.close("div");e.close("li")};o.renderDummyArea=function(e,r,s,i){e.openStart("div",r.getId(s)).attr("tabindex",i);if(t.system.desktop){e.class("sapMListDummyArea")}e.openEnd().close("div")};o.renderGrowing=function(e,t){var r=t._oGrowingDelegate;if(r){r.render(e)}};o.getAriaAnnouncement=function(e){return r.getStaticId("sap.m",e)};return o},true);