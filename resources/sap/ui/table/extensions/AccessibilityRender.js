/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExtensionBase","../utils/TableUtils","../library"],function(e,t,r){"use strict";var o=r.SelectionMode;var i=function(e,t,r,o,i){i=i||[];i.push("sapUiInvisibleText");e.openStart("span",t+"-"+r);i.forEach(function(t){e.class(t)});e.attr("aria-hidden","true");e.openEnd();if(o){e.text(o)}e.close("span")};var a=e.extend("sap.ui.table.extensions.AccessibilityRender",{_init:function(e,t,r){return"AccRenderExtension"},writeHiddenAccTexts:function(e,r){if(!r._getAccExtension().getAccMode()){return}var a=r.getId();e.openStart("div");e.class("sapUiTableHiddenTexts");e.style("display","none");e.attr("aria-hidden","true");e.openEnd();i(e,a,"ariacount");i(e,a,"toggleedit",t.getResourceText("TBL_TOGGLE_EDIT_KEY"));var c=t.areAllRowsSelected(r);var n=r._getSelectionPlugin().getRenderConfig();var s;if(n.headerSelector.type==="toggle"){s=c?"TBL_DESELECT_ALL":"TBL_SELECT_ALL"}else if(n.headerSelector.type==="clear"){s="TBL_DESELECT_ALL"}i(e,a,"ariaselectall",t.getResourceText(s));i(e,a,"ariarowheaderlabel",t.getResourceText("TBL_ROW_HEADER_LABEL"));i(e,a,"ariarowgrouplabel",t.getResourceText("TBL_ROW_GROUP_LABEL"));i(e,a,"ariagrandtotallabel",t.getResourceText("TBL_GRAND_TOTAL_ROW"));i(e,a,"ariagrouptotallabel",t.getResourceText("TBL_GROUP_TOTAL_ROW"));i(e,a,"ariacolrowheaderlabel",t.getResourceText("TBL_ROW_COL_HEADER_LABEL"));i(e,a,"rownumberofrows");i(e,a,"colnumberofcols");i(e,a,"cellacc");i(e,a,"ariarowselected",t.getResourceText("TBL_ROW_DESC_SELECTED"));i(e,a,"ariacolmenu",t.getResourceText("TBL_COL_DESC_MENU"));i(e,a,"ariacolspan");i(e,a,"ariacolfiltered",t.getResourceText("TBL_COL_DESC_FILTERED"));i(e,a,"ariacolsortedasc",t.getResourceText("TBL_COL_DESC_SORTED_ASC"));i(e,a,"ariacolsorteddes",t.getResourceText("TBL_COL_DESC_SORTED_DES"));i(e,a,"ariainvalid",t.getResourceText("TBL_TABLE_INVALID"));i(e,a,"ariashowcolmenu",t.getResourceText("TBL_COL_VISBILITY_MENUITEM_SHOW"));i(e,a,"ariahidecolmenu",t.getResourceText("TBL_COL_VISBILITY_MENUITEM_HIDE"));i(e,a,"rowexpandtext",t.getResourceText("TBL_ROW_EXPAND_KEY"));i(e,a,"rowcollapsetext",t.getResourceText("TBL_ROW_COLLAPSE_KEY"));var T=r.getSelectionMode();if(T!==o.None){i(e,a,"ariaselection",t.getResourceText(T==o.MultiToggle?"TBL_TABLE_SELECTION_MULTI":"TBL_TABLE_SELECTION_SINGLE"))}if(r.getComputedFixedColumnCount()>0){i(e,a,"ariafixedcolumn",t.getResourceText("TBL_FIXED_COLUMN"))}if(t.hasRowNavigationIndicators(r)){i(e,a,"rownavigatedtext",t.getResourceText("TBL_ROW_STATE_NAVIGATED"))}e.close("div")},writeAriaAttributesFor:function(e,t,r,o){var i=t._getAccExtension();if(!i.getAccMode()){return}var a=i.getAriaAttributesFor(r,o);var c,n;for(n in a){c=a[n];if(Array.isArray(c)){c=c.join(" ")}if(c){e.attr(n.toLowerCase(),c)}}},writeAccRowSelectorText:function(e,t,r,o){if(!t._getAccExtension().getAccMode()){return}var a=t._getSelectionPlugin().isIndexSelected(o);var c=t._getAccExtension().getAriaTextsForSelectionMode(true);var n=c.keyboard[a?"rowDeselect":"rowSelect"];i(e,r.getId(),"rowselecttext",r.isEmpty()?"":n,["sapUiTableAriaRowSel"])},writeAccRowHighlightText:function(e,t,r,o){if(!t._getAccExtension().getAccMode()){return}var a=r.getAggregation("_settings");var c=a._getHighlightText();i(e,r.getId(),"highlighttext",c)},writeAccCreationRowText:function(e,r,o){if(!r._getAccExtension().getAccMode()){return}i(e,o.getId(),"label",t.getResourceText("TBL_CREATEROW_LABEL"))}});return a});