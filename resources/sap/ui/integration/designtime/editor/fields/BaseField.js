/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/Button","sap/m/FormattedText","sap/m/MultiInput","./Settings","sap/m/Token","sap/ui/core/Core","sap/ui/integration/util/BindingHelper","sap/ui/core/ListItem"],function(t,e,i,s,a,n,r,o,l){"use strict";var g=r.getLibraryResourceBundle("sap.ui.integration"),u="sap/ui/integration/designtime/editor/fields/viz";var d=t.extend("sap.ui.integration.designtime.editor.fields.BaseField",{metadata:{properties:{configuration:{type:"object"},specialButton:{type:"object"},mode:{type:"string"},host:{type:"object"},visible:{type:"boolean",defaultValue:true}},aggregations:{_field:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_settingsButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_dynamicField:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_hint:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"}},associations:{_messageIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{afterInit:{}}},renderer:function(t,e){var i=e.getAggregation("_field"),s=e.getAggregation("_settingsButton"),a=e._getDynamicField();t.openStart("div");t.addClass("sapUiIntegrationCardEditorItemField");if(i&&i.getWidth&&!s){}if(!e.getVisible()){t.addStyle("display","none")}t.writeClasses();t.writeStyles();t.writeElementData(e);t.openEnd();if(e.getVisible()){t.openStart("span");t.writeClasses();t.openEnd();t.openStart("span");t.addClass("sapUiIntegrationCardEditorEditor");if(e._hasDynamicValue()){t.addStyle("width","1px");t.addStyle("opacity","0")}t.writeStyles();t.writeClasses();t.openEnd();t.renderControl(i);t.close("span");t.close("span");if(s||e._hasDynamicValue()){t.openStart("span");t.addClass("sapUiIntegrationCardEditorSettings");t.writeClasses();t.openEnd();t.openStart("span");t.addClass("sapUiIntegrationCardEditorSettingsField");if(e._hasDynamicValue()){t.addStyle("width","calc(100% - 2.5rem)");t.addStyle("opacity","1")}t.writeClasses();t.writeStyles();t.openEnd();t.renderControl(a);t.close("span");t.openStart("span");t.addClass("sapUiIntegrationCardEditorSettingsButton");t.writeClasses();t.openEnd();t.renderControl(s);t.close("span");t.close("span")}t.openStart("div");t.writeAttribute("id",e.getId()+"-ms");t.addStyle("height","0");t.writeStyles();t.openEnd();t.close("div");if(e.getMode()!=="translation"){var n=e.getAggregation("_hint");if(n){t.openStart("div");t.addClass("sapUiIntegrationCardEditorHint");t.writeClasses();t.openEnd();t.renderControl(n);t.close("div")}}}t.close("div")}});d.prototype.init=function(){this._readyPromise=new Promise(function(t){this._fieldResolver=t}.bind(this))};d.prototype.setConfiguration=function(t,e){if(t!==this.getConfiguration()){this._sanitizeValidationSettings(t);this.setProperty("configuration",t,e);if(t){Promise.resolve().then(function(){this.initEditor(t);if(t.hint&&t.type!=="boolean"){this._addHint(t.hint)}else if(t.hint&&t.type==="boolean"&&t.cols&&t.cols===1){this._addHint(t.hint)}}.bind(this))}}return this};d.prototype._addHint=function(t){t=t.replace(/<a href/g,"<a target='blank' href");var e=new i({htmlText:t});this.setAggregation("_hint",e)};d.prototype._sanitizeValidationSettings=function(t){t.validations=t.validations||[];if(t.validation&&t.validations&&Array.isArray(t.validations)){t.validations.push(t.validation);delete t.validation}if(t.validation&&!t.validations){t.validations=[t.validation];delete t.validation}if(t.required){t.validations.unshift({required:true,type:"error"})}};d.prototype._triggerValidation=function(t){var e=this.getConfiguration();var i=false;if(e.required){i=true}else if(e.type==="string"&&t){i=true}else if((e.type==="integer"||e.type==="number")&&!isNaN(t)){if(t!==""){i=true}}if(e.validations&&Array.isArray(e.validations)&&i){for(var s=0;s<e.validations.length;s++){if(!this._handleValidation(e.validations[s],t)){return false}}}this._hideValueState();return true};d.validations={string:{maxLength:function(t,e){return t.length<=e},maxLengthTxt:"CARDEDITOR_VAL_MAXLENGTH",minLength:function(t,e){return t.length>=e},minLengthTxt:"CARDEDITOR_VAL_MINLENGTH",pattern:function(t,e){var i=new RegExp(e);return i.test(t)},patternTxt:"CARDEDITOR_VAL_NOMATCH",required:function(t,e){return e&&!!t},requiredTxt:"CARDEDITOR_VAL_TEXTREQ",validateTxt:"CARDEDITOR_VAL_NOMATCH"},integer:{maximum:function(t,e,i){if(i.exclusiveMaximum){i._txt="maximumExclusiveTxt";return t<e}return t<=e},maximumTxt:"CARDEDITOR_VAL_MAX",maximumExclusiveTxt:"CARDEDITOR_VAL_MAX_E",minimum:function(t,e,i){if(i.exclusiveMinimum){i._txt="minimumExclusiveTxt";return t>e}return t>=e},minimumTxt:"CARDEDITOR_VAL_MIN",minimumExclusiveTxt:"CARDEDITOR_VAL_MIN_E",multipleOf:function(t,e){return t%e===0},multipleOfTxt:"CARDEDITOR_VAL_MULTIPLE",required:function(t,e){return!isNaN(t)&&t!==""},requiredTxt:"CARDEDITOR_VAL_NUMBERREQ",validateTxt:"CARDEDITOR_VAL_NOMATCH"},number:{maximum:function(t,e,i){if(i.exclusiveMaximum){i._txt="maximumExclusiveTxt";return t<e}return t<=e},maximumTxt:"CARDEDITOR_VAL_MAX",maximumExclusiveTxt:"CARDEDITOR_VAL_MAX_E",minimum:function(t,e,i){if(i.exclusiveMinimum){i._txt="minimumExclusiveTxt";return t>e}return t>=e},minimumTxt:"CARDEDITOR_VAL_MIN",minimumExclusiveTxt:"CARDEDITOR_VAL_MAX_E",multipleOf:function(t,e){return t%e===0},multipleOfTxt:"CARDEDITOR_VAL_MULTIPLE",required:function(t,e){return!isNaN(t)&&t!==""},requiredTxt:"CARDEDITOR_VAL_NUMBERREQ",validateTxt:"CARDEDITOR_VAL_NOMATCH"}};d.prototype._handleValidation=function(t,e){var i=this.getConfiguration(),s=d.validations[i.type];for(var a in t){if(s){var n=s[a];t._txt="";if(n){if(!n(e,t[a],t)){var r;if(typeof t.message==="function"){r=t.message(e,i)}else{r=t.message}if(!r){if(t._txt){r=g.getText(s[t._txt],[t[a]])}else{r=g.getText(s[a+"Txt"],[t[a]])}}this._showValueState(t.type||"error",r);return false}}}if(a==="validate"){if(!t[a](e,i)){var r;if(typeof t.message==="function"){r=t.message(e,i)}else{r=t.message}if(!r){if(t._txt){r=g.getText(s[t._txt],[t[a]])}else{r=g.getText(s[a+"Txt"],[t[a]])}}this._showValueState(t.type||"error",r);return false}}}return true};d.prototype.onAfterRendering=function(){this._applyMessage();var t=this.getParent().getAggregation("_messageStrip")||this.getParent().getParent().getAggregation("_messageStrip");if(t&&t.getDomRef()){t.getDomRef().style.opacity="0"}};d.prototype._applyMessage=function(){var t=r.byId(this.getAssociation("_messageIcon"));if(this.getAssociation("_messageIcon")&&t){var e=t.getDomRef();if(e){e.classList.remove("error");e.classList.remove("warning");e.classList.remove("success");if(this._message){e.classList.add(this._message.type)}}}};d.prototype._showValueState=function(t,e){var i=this.getAggregation("_field"),s=t.substring(0,1).toUpperCase()+t.substring(1);this._message={enum:s,type:t,message:e,atControl:false};var a=this.getParent().getAggregation("_messageStrip")||this.getParent().getParent().getAggregation("_messageStrip");if(i.setValueState){this._message.atControl=true;if(i.setShowValueStateMessage){i.setShowValueStateMessage(false)}i.setValueState(s);i.setValueStateText(e)}else if(a&&a.getVisible()){this._showMessage()}this._applyMessage()};d.prototype._hideValueState=function(){if(!this.getParent()){return}var t=this.getParent().getAggregation("_messageStrip")||this.getParent().getParent().getAggregation("_messageStrip");if(this._message){var e=this.getAggregation("_field");this._message={enum:"Success",type:"success",message:"Corrected",atControl:this._message.atControl};if(this._messageto){clearTimeout(this._messageto)}this._messageto=setTimeout(function(){this._messageto=null;this._applyMessage();if(!this._message&&e.setValueState){e.setValueState("None")}}.bind(this),1500);this._applyMessage();if(t.getDomRef()){t.getDomRef().style.opacity="0"}if(e.setValueState){e.setValueState("Success")}t.onAfterRendering=null;this._message=null}};d.prototype.onfocusin=function(t){if(t&&t.target.classList.contains("sapMBtn")){return}this._showMessage()};d.prototype.onfocusout=function(t){this._hideMessage()};d.prototype._showMessage=function(){if(!this.getParent()){return}var t=this.getParent().getAggregation("_messageStrip")||this.getParent().getParent().getAggregation("_messageStrip");if(this._message){t.applySettings({type:this._message.enum,text:this._message.message});var e=this;t.onAfterRendering=function(){t.getDomRef().style.opacity="1";e.getDomRef("ms").appendChild(t.getDomRef());var i=e.getAggregation("_field");if(e._message&&!e._message.atControl){t.getDomRef().style.marginTop="0";t.getDomRef().style.marginLeft="0"}t.getDomRef().style.width=i.getDomRef().offsetWidth-2+"px"};t.rerender()}};d.prototype._hideMessage=function(){var t=this.getParent().getAggregation("_messageStrip")||this.getParent().getParent().getAggregation("_messageStrip");var e=this.getAggregation("_field"),i=e.getDomRef().contains(window.document.activeElement);if(t){if(!i&&t.getDomRef()){t.getDomRef().style.opacity="0"}t.onAfterRendering=null}};d.prototype.initEditor=function(e){var i;this.initVisualization&&this.initVisualization(e);if(this._visualization.editor){i=this._visualization.editor}else if(this._visualization.type){if(typeof this._visualization.type==="string"){if(this._visualization.type.indexOf("/")===-1){this._visualization.type=u+"/"+this._visualization.type;this._visualization.settings=this._visualization.settings||{value:"{currentSettings>value}",editable:e.editable}}sap.ui.require([this._visualization.type],function(t){this._visualization.type=t;this.initEditor(e)}.bind(this));return}i=new this._visualization.type(this._visualization.settings||{})}if(i instanceof t){this.setAggregation("_field",i);if(i.attachChange){i.attachChange(function(t){this._triggerValidation(t.getParameter("value"))}.bind(this))}var s=this.getModel("currentSettings").bindProperty("value",this.getBindingContext("currentSettings"));s.attachChange(function(){this._triggerValidation(e.value)}.bind(this));this._triggerValidation(e.value)}var a=this.getMode();e.allowSettings=e.allowSettings||e.allowSettings!==false&&a==="admin";e.allowDynamicValues=e.allowDynamicValues||e.allowDynamicValues!==false;e._changeDynamicValues=e.visible&&e.editable&&(e.allowDynamicValues||e.allowSettings)&&a!=="translation";if(e._changeDynamicValues){this._addSettingsButton()}this._applySettings(e);this.fireAfterInit()};d.prototype.initVisualization=function(){};d.prototype._hasDynamicValue=function(){var t=this._getCurrentProperty("value");var e=typeof t==="string"&&(t.indexOf("{context>")===0||t.indexOf("{{parameters")===0);this._setCurrentProperty("_hasDynamicValue",e);return e};d.prototype._hasSettings=function(){var t=this.getConfiguration();if(t._next){t._hasSettings=t._next.editable===false||t._next.visible===false||t._next.allowDynamicValues===false}else{t._hasSettings=false}return t._hasSettings};d.prototype._getDynamicField=function(){var t=this.getAggregation("_dynamicField");if(!t){var t=new s({showValueHelp:false});this.setAggregation("_dynamicField",t)}return t};d.prototype._hideDynamicField=function(){var t=this._getDynamicField(),e=this.getAggregation("_field");if(t.getDomRef()){var i=t.getDomRef().parentNode.style;i.width="1px";i.opacity=0;i=e.getDomRef().parentNode.style;e.getDomRef().style.visibility="visible";i.width="calc(100% - 2.5rem)";i.opacity=1}};d.prototype._showDynamicField=function(){var t=this._getDynamicField(),e=this.getAggregation("_field");if(t.getDomRef()){var i=t.getDomRef().parentNode.style;i.width="calc(100% - 2.5rem)";i.opacity=1;i=e.getDomRef().parentNode.style;e.getDomRef().style.visibility="hidden";i.width="1px";i.opacity=0}};d.prototype._getSettingsPanel=function(){if(!this._oSettingsPanel){this._oSettingsPanel=new a}return this._oSettingsPanel};d.prototype._openSettingsDialog=function(t){var e=this._getSettingsPanel();window.setTimeout(function(){e.setConfiguration(this.getConfiguration());var t=this.getParent().getParent().getAggregation("_preview")||this.getParent().getParent().getParent().getAggregation("_preview")||this.getParent().getParent().getParent().getParent().getAggregation("_preview");e.open(this.getAggregation("_settingsButton"),this.getAggregation("_settingsButton"),t,this.getHost(),this,this._applySettings.bind(this),this._cancelSettings.bind(this))}.bind(this),t||600)};d.prototype._addSettingsButton=function(){this._getDynamicField();this.setAggregation("_settingsButton",new e({icon:"{= ${currentSettings>_hasDynamicValue} ? 'sap-icon://display-more' : 'sap-icon://enter-more'}",type:"Transparent",tooltip:g.getText("CARDEDITOR_FIELD_MORE_SETTINGS"),press:function(){this._openSettingsDialog(200)}.bind(this)}))};d.prototype._setCurrentProperty=function(t,e){if(this._getCurrentProperty(t)!==e){this.getModel("currentSettings").setProperty(t,e,this.getBindingContext("currentSettings"))}};d.prototype._getCurrentProperty=function(t){return this.getModel("currentSettings").getProperty(t,this.getBindingContext("currentSettings"))};d.prototype._applySettings=function(t){var e=this._getDynamicField(),i=this.getModel("contextflat")._getValueObject(t.value);e.removeAllTokens();if(!this._getCurrentProperty("_changeDynamicValues")){e.setEnabled(false)}if(i&&i.path!=="empty"){if(i.object.value&&i.object.value.indexOf("{{")==0){this._setCurrentProperty("value",i.object.value)}else{this._setCurrentProperty("value",i.value)}e.addToken(new n({text:i.object.label,delete:function(){this._setCurrentProperty("value","");if(!this._hasDynamicValue()){this._hideDynamicField()}this._applyButtonStyles();window.setTimeout(function(){this.getAggregation("_field").focus()}.bind(this),100)}.bind(this)}))}else{this._setCurrentProperty("value",t.value);this._setCurrentProperty("_changed",t._changed);this._hideDynamicField()}this._setCurrentProperty("_next",t._next);this._applyButtonStyles();if(!this._hasDynamicValue()){this._hideDynamicField()}else{this._showDynamicField()}this._fieldResolver&&this._fieldResolver();this._fieldResolver=null};d.prototype._cancelSettings=function(){this._applyButtonStyles();if(!this._hasDynamicValue()){this._hideDynamicField()}};d.prototype._applyButtonStyles=function(){if(!this._hasDynamicValue()){this.removeStyleClass("dynamicvalue")}else{this.addStyleClass("dynamicvalue")}if(!this._hasSettings()){this.removeStyleClass("settings")}else{this.addStyleClass("settings")}};d.prototype.isFilterBackend=function(t){var e=false;if(t&&t.values&&t.values.data){if(t.values.data.request&&t.values.data.request.parameters&&t.values.data.request.parameters.$filter&&t.values.data.request.parameters.$filter.indexOf("{currentSettings>suggestValue}")>-1){e=true}else if(t.values.data.request&&t.values.data.request.url&&t.values.data.request.url.indexOf("{currentSettings>suggestValue}")>-1){e=true}}return e};d.prototype.formatListItem=function(t){var e=new l;for(var i in t){e.bindProperty(i,o.createBindingInfos(t[i]))}return e};return d});