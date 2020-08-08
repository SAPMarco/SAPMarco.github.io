/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/IconPool","sap/m/library","sap/ui/Device","sap/ui/core/InvisibleText","sap/ui/core/library"],function(e,t,a,i,n,r){"use strict";var s=r.TextDirection;var l=r.ValueState;var d=a.SelectType;var o={apiVersion:2};o.CSS_CLASS="sapMSlt";o.render=function(e,a){var n=a.getTooltip_AsString(),r=a.getType(),s=a.getAutoAdjustWidth(),c=a.getEditable(),u=a.getEnabled(),S=a.getWidth(),g=S.indexOf("%")>-1,p=s||S==="auto"||g,I=o.CSS_CLASS;e.openStart("div",a);this.addClass(e,a);e.class(I);e.class(I+a.getType());if(a.getRequired()){e.attr("required","required")}if(!u){e.class(I+"Disabled")}else if(!c){e.class(I+"Readonly")}if(p&&r===d.Default){e.class(I+"MinWidth")}if(s){e.class(I+"AutoAdjustedWidth")}else{e.style("width",S)}if(a.getIcon()){e.class(I+"WithIcon")}if(u&&c&&i.system.desktop){e.class(I+"Hoverable")}e.class(I+"WithArrow");if(a.getValueState()!==l.None){this.addValueStateClasses(e,a)}e.style("max-width",a.getMaxWidth());this.writeAccessibilityState(e,a);if(n){e.attr("title",n)}else if(r===d.IconOnly){var f=t.getIconInfo(a.getIcon());if(f){e.attr("title",f.text)}}if(u){e.attr("tabindex","0")}e.openEnd();this.renderHiddenInput(e,a);this.renderLabel(e,a);switch(r){case d.Default:this.renderArrow(e,a);break;case d.IconOnly:this.renderIcon(e,a);break}var b=a.getList();if(a._isShadowListRequired()&&b){this.renderShadowList(e,b)}if(a.getName()){this.renderInput(e,a)}e.close("div")};o.renderHiddenInput=function(e,t){e.voidStart("input",t.getId()+"-hiddenInput");e.attr("aria-readonly","true");e.attr("tabindex","-1");e.attr("aria-hidden","true");e.class("sapUiPseudoInvisibleText");e.voidEnd()};o.renderLabel=function(t,a){var i=a.getSelectedItem(),n=a.getTextDirection(),r=e.getTextAlign(a.getTextAlign(),n),c=o.CSS_CLASS;t.openStart("span",a.getId()+"-label");t.attr("aria-live","polite");t.class(c+"Label");if(a.getValueState()!==l.None){t.class(c+"LabelState");t.class(c+"Label"+a.getValueState())}if(a.getType()===d.IconOnly){t.class("sapUiPseudoInvisibleText")}if(n!==s.Inherit){t.attr("dir",n.toLowerCase())}t.style("text-align",r);t.openEnd();if(a.getType()!==d.IconOnly){t.renderControl(a._getValueIcon());t.openStart("span",a.getId()+"-labelText");t.class("sapMSelectListItemText");t.openEnd();t.text(i&&i.getParent()?i.getText():null);t.close("span")}t.close("span")};o.renderArrow=function(e,t){var a=o.CSS_CLASS;e.openStart("span",t.getId()+"-arrow");e.class(a+"Arrow");if(t.getValueState()!==l.None){e.class(a+"ArrowState")}e.openEnd().close("span")};o.renderIcon=function(e,t){var a=t.getTooltip_AsString();e.icon(t.getIcon(),o.CSS_CLASS+"Icon",{id:t.getId()+"-icon",title:a||null})};o.renderInput=function(e,t){e.voidStart("input",t.getId()+"-input");e.attr("type","hidden");e.class(o.CSS_CLASS+"Input");e.attr("aria-hidden","true");e.attr("tabindex","-1");if(!t.getEnabled()){e.attr("disabled","disabled")}e.attr("name",t.getName());e.attr("value",t.getSelectedKey());e.voidEnd()};o.renderShadowList=function(e,t){var a=t.getRenderer();a.writeOpenListTag(e,t,{elementData:false});this.renderShadowItems(e,t);a.writeCloseListTag(e,t)};o.renderShadowItems=function(e,t){var a=t.getRenderer(),i=t.getItems().length,n=t.getSelectedItem();for(var r=0,s=t.getItems();r<s.length;r++){a.renderItem(e,t,s[r],{selected:n===s[r],setsize:i,posinset:r+1,elementData:false})}};o.addClass=function(e,t){};o.addValueStateClasses=function(e,t){e.class(o.CSS_CLASS+"State");e.class(o.CSS_CLASS+t.getValueState())};o.getAriaRole=function(e){switch(e.getType()){case d.Default:return"combobox";case d.IconOnly:return"button"}};o._getValueStateString=function(e){var t="sap.ui.core";switch(e.getValueState()){case l.Success:return n.getStaticId(t,"VALUE_STATE_SUCCESS");case l.Warning:return n.getStaticId(t,"VALUE_STATE_WARNING");case l.Information:return n.getStaticId(t,"VALUE_STATE_INFORMATION")}return""};o.writeAccessibilityState=function(e,a){var i=this._getValueStateString(a),n=a.getSelectedItem(),r=a.getType()===d.IconOnly,s=a._getValueIcon(),o,c,u;if(i){i=" "+i}if(a.isOpen()&&n&&n.getDomRef()){c=n.getId()}if(n&&!n.getText()&&n.getIcon&&n.getIcon()){var S=t.getIconInfo(n.getIcon());if(S){u=S.text||S.name}}o={value:u&&s?s.getId():a.getId()+"-label"+i,append:true};e.accessibilityState(a,{role:this.getAriaRole(a),roledescription:a._sAriaRoleDescription,disabled:!a.getEnabled(),readonly:r?undefined:a.getEnabled()&&!a.getEditable(),expanded:a.isOpen(),invalid:a.getValueState()===l.Error?true:undefined,labelledby:r?undefined:o,activedescendant:c,haspopup:"listbox"})};return o},true);