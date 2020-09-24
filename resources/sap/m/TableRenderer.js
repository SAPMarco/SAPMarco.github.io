/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/Core","./library","./ListBaseRenderer","./ColumnListItemRenderer"],function(e,t,a,s,l){"use strict";var i=a.ListKeyboardMode;var o=e.extend(s);o.apiVersion=2;var r=t.getConfiguration().getRTL();o.columnAlign={left:r?"flex-end":"flex-start",center:"center",right:r?"flex-start":"flex-end"};o.renderColumns=function(e,t,a){var i=0,r=0,n=false,d=false,c=t.getMode(),u=s.ModeOrder[c],p="sapMListTbl",g=t.getId("tbl"),f=a=="Head"?"th":"td",C="t"+a.toLowerCase(),b=t.getColumns(),h=t.shouldRenderDummyColumn(),m,H=function(t,s,l){e.openStart(f,s&&g+s);if(f==="th"){e.class("sapMTableTH");e.attr("role",l?"presentation":"columnheader");e.attr("scope","col")}else if(l){e.attr("role","presentation")}l&&e.attr("aria-hidden","true");e.class(p+t);if(a==="Foot"){if(t==="HighlightCol"){e.class("sapMTableHighlightFooterCell")}else if(t==="NavigatedCol"){e.class("sapMTableNavigatedFooterCell")}}e.openEnd();e.close(f);i++};if(a=="Head"){var L=b.reduce(function(e,t,a){t.setIndex(-1);t.setInitialOrder(a);t.setForcedColumn(false);return t.getCalculatedMinScreenWidth()<e.getCalculatedMinScreenWidth()?t:e},b[0]);var M=b.filter(function(e){return e.getVisible()&&!e.isPopin()&&!e.isHidden()}).length;if(!M&&L){L.setForcedColumn(true);M=1}m=b.every(function(e){return!e.getHeader()||!e.getHeader().getVisible()||!e.getVisible()||e.isPopin()||e.isHidden()})}e.openStart(C);if(t._hasFooter&&a==="Foot"){e.class("sapMTableTFoot");if(t.hasPopin()){e.class("sapMListTblHasPopin")}}e.openEnd();e.openStart("tr",t.addNavSection(g+a+"er"));if(a!=="Head"&&h){e.class("sapMListTblRowHasDummyCell")}e.attr("tabindex",-1);if(m){e.class("sapMListTblHeaderNone")}else{e.class("sapMListTblRow").class("sapMLIBFocusable").class("sapMListTbl"+a+"er");l.addLegacyOutlineClass.call(l,e)}e.openEnd();H("HighlightCol",a+"Highlight",true);if(u==-1){if(c=="MultiSelect"&&a=="Head"&&!m){e.openStart("th");e.class("sapMTableTH");e.attr("scope","col");e.attr("aria-hidden","true");e.class(p+"SelCol");e.attr("role","presentation");e.openEnd();e.renderControl(t._getSelectAllCheckbox());e.close("th");i++}else{H("SelCol","",true)}}t.getColumns(true).forEach(function(s,l){if(!s.getVisible()){return}if(s.isPopin()){n=true;return}var c=s.isHidden();if(c){r++}var u=s["get"+a+"er"](),g=M==1?"":s.getWidth(),C=s.getStyleClass(true),b=s.getCssAlign();if(a=="Head"){e.openStart(f,s);e.class("sapMTableTH");e.attr("role","columnheader");e.attr("scope","col");var h=s.getSortIndicator().toLowerCase();h!=="none"&&e.attr("aria-sort",h)}else{e.openStart(f)}C&&e.class(C);e.class(p+"Cell");e.class(p+a+"erCell");e.attr("data-sap-width",s.getWidth());e.style("width",g);if(b&&a!=="Head"){e.style("text-align",b)}if(c){e.style("display","none");e.attr("aria-hidden","true")}e.openEnd();if(u){if(a==="Head"){e.openStart("div");e.class("sapMColumnHeader");if(t.bActiveHeaders&&!u.isA("sap.ui.core.InvisibleText")){e.attr("tabindex",0);e.attr("role","button");e.attr("aria-haspopup","dialog");e.class("sapMColumnHeaderActive")}if(b){e.style("justify-content",o.columnAlign[b]);e.style("text-align",b)}e.openEnd();e.renderControl(u.addStyleClass("sapMColumnHeaderContent"));e.close("div")}else{e.renderControl(u)}}if(a=="Head"&&!d){d=!!s.getFooter()}e.close(f);s.setIndex(i++)});if(n&&h){H("DummyCol",a+"DummyCol",true)}H("NavCol",a+"Nav",!t._iItemNeedsColumn);if(u==1){H("SelCol","",true)}H("NavigatedCol",a+"Navigated",true);if(!n&&h){H("DummyCol",a+"DummyCol",true)}e.close("tr");e.close(C);if(a==="Head"){t._bPopinChanged=t._hasPopin!==n||t._iHiddenPopinColumns!==t._getHiddenInPopin().length||n;t._hasPopin=n;t._colCount=i-r;t._hasFooter=d;t._headerHidden=m}};o.renderContainerAttributes=function(e,t){e.attr("role","application");e.class("sapMListTblCnt");e.accessibilityState(t,this.getAccessibilityState(t))};o.renderListStartAttributes=function(e,t){e.openStart("table",t.getId("listUl"));e.class("sapMListTbl");if(t.getFixedLayout()===false){e.style("table-layout","auto")}if(t._iItemNeedsColumn){e.class("sapMListTblHasNav")}};o.getAriaRole=function(e){return""};o.getAriaLabelledBy=function(e){var t=s.getAriaLabelledBy.call(this,e);var a=this.getAriaAnnouncement("TABLE_ROLE_DESCRIPTION");if(t&&a){return t+" "+a}return a||t};o.renderListHeadAttributes=function(e,t){this.renderColumns(e,t,"Head");e.openStart("tbody",t.addNavSection(t.getId("tblBody")));e.class("sapMListItems");e.class("sapMTableTBody");if(t.getAlternateRowColors()){e.class(t._getAlternateRowColorsClass())}if(t.hasPopin()){e.class("sapMListTblHasPopin")}e.openEnd()};o.renderListEndAttributes=function(e,t){e.close("tbody");t._hasFooter&&this.renderColumns(e,t,"Foot");e.close("table")};o.renderNoData=function(e,a){e.openStart("tr",a.getId("nodata"));e.attr("tabindex",a.getKeyboardMode()==i.Navigation?-1:0);e.class("sapMLIB").class("sapMListTblRow").class("sapMLIBTypeInactive");l.addFocusableClasses.call(l,e);if(!a._headerHidden||!a.getHeaderText()&&!a.getHeaderToolbar()){e.class("sapMLIBShowSeparator")}e.openEnd();e.openStart("td",a.getId("nodata-text"));e.attr("colspan",a.getColCount());e.class("sapMListTblCell").class("sapMListTblCellNoData");e.openEnd();if(!a.shouldRenderItems()){e.text(t.getLibraryResourceBundle("sap.m").getText("TABLE_NO_COLUMNS"))}else{e.text(a.getNoDataText(true))}e.close("td");e.close("tr")};return o},true);