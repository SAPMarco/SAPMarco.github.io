/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/core/InvisibleText","sap/ui/core/ShortcutHintsMixin"],function(t,e,i){"use strict";var a=t.ButtonType;var r={apiVersion:2};r.CSS_CLASS="sapMSB";r.render=function(t,e){var n=e.getWidth(),s=e.getType(),o=e.getEnabled(),l=e.getTitleAttributeValue(),p;t.openStart("div",e).class(r.CSS_CLASS);if(e.getIcon()){t.class(r.CSS_CLASS+"HasIcon")}if(s===a.Accept||s===a.Reject||s===a.Emphasized||s===a.Transparent||s===a.Attention){t.class(r.CSS_CLASS+s)}this.writeAriaAttributes(t,e);t.attr("tabindex",o?"0":"-1");if(l&&!i.isDOMIDRegistered(e.getId())){t.attr("title",l)}if(n!=""||n.toLowerCase()==="auto"){t.style("width",n)}t.openEnd();t.openStart("div").class("sapMSBInner");if(!o){t.class("sapMSBInnerDisabled")}t.openEnd();t.renderControl(e._getTextButton());t.renderControl(e._getArrowButton());t.close("div");if(l){p=e.getId()+"-tooltip";t.openStart("span",p);t.class("sapUiInvisibleText");t.openEnd();t.text(l);t.close("span")}t.close("div")};r.writeAriaAttributes=function(t,e){var i={};this.writeAriaRole(e,i);this.writeAriaLabelledBy(e,i);t.accessibilityState(e,i)};r.writeAriaRole=function(t,e){e["role"]="group"};r.writeAriaLabelledBy=function(t,i){var a="",r=t.getButtonTypeAriaLabelId(),n=t.getTitleAttributeValue(),s;if(t.getText()){a+=t._getTextButton().getId()+"-content";a+=" "}if(r){a+=r;a+=" "}if(n){s=t.getId()+"-tooltip";a+=s+" "}a+=e.getStaticId("sap.m","SPLIT_BUTTON_DESCRIPTION")+" ";a+=e.getStaticId("sap.m","SPLIT_BUTTON_KEYBOARD_HINT");i["labelledby"]={value:a,append:true}};return r},true);