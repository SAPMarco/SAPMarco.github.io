/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/integration/designtime/baseEditor/propertyEditor/mapEditor/MapEditor","sap/base/util/includes","sap/base/util/restricted/_merge"],function(e,t,a,i){"use strict";var r=t.extend("sap.ui.integration.designtime.cardEditor.propertyEditor.parametersEditor.ParametersEditor",{metadata:{library:"sap.ui.integration"},renderer:e.getMetadata().getRenderer().render});r.configMetadata=Object.assign({},t.configMetadata,{allowLabelChange:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"}});r.prototype.formatItemConfig=function(e){var a=t.prototype.formatItemConfig.apply(this,arguments);var i=e.key;var r=e.value.type;var l=this.getNestedDesigntimeMetadataValue(i);var n=(e.value.visible||l.visible)!==false;var o=(e.value.editable||l.editable)!==false;var s=e.value.manifestpath||l.manifestpath||"";var p=e.value.description||l.description||"";var u=(e.value.translatable||l.translatable)===true;var g=(e.value.allowSettings||l.allowSettings)===true;var d=(e.value.allowDynamicValues||l.allowDynamicValues)===true;var y=e.value.visualization||l.visualization;var E=l.label;a.push({label:this.getI18nProperty("CARD_EDITOR.LABEL"),path:"label",value:E,placeholder:E?undefined:i,type:"string",enabled:this.getConfig().allowLabelChange,itemKey:i},{label:this.getI18nProperty("CARD_EDITOR.PARAMETERS.DESCRIPTION"),path:"description",value:p,allowBindings:true,visible:r!=="group",type:"string",itemKey:i},{label:this.getI18nProperty("CARD_EDITOR.PARAMETERS.MANIFESTPATH"),path:"manifestpath",value:s,allowBindings:true,visible:r!=="group",type:"string",itemKey:i},{label:this.getI18nProperty("CARD_EDITOR.PARAMETERS.VISIBLE"),path:"visible",value:n,allowBindings:true,type:"boolean",itemKey:i},{label:this.getI18nProperty("CARD_EDITOR.PARAMETERS.EDITABLE"),path:"editable",allowBindings:true,value:o,enabled:true,visible:r!=="group",type:"boolean",itemKey:i},{label:this.getI18nProperty("CARD_EDITOR.PARAMETERS.TRANSLATABLE"),path:"translatable",value:u,enabled:true,type:"boolean",itemKey:i},{label:this.getI18nProperty("CARD_EDITOR.PARAMETERS.ALLOWDYNAMICVALUES"),path:"allowDynamicValues",allowBindings:true,enabled:true,value:d,visible:r!=="group",type:"boolean",itemKey:i},{label:this.getI18nProperty("CARD_EDITOR.PARAMETERS.ALLOWSETTINGS"),path:"allowSettings",allowBindings:true,value:g,visible:r!=="group",type:"boolean",itemKey:i},{label:this.getI18nProperty("CARD_EDITOR.PARAMETERS.VISUALIZATION"),path:"visualization",allowBindings:true,value:y,visible:r!=="group",placeholder:this.getI18nProperty("CARD_EDITOR.PARAMETERS.VISUALIZATION.PLACEHOLDER"),type:"textArea",itemKey:i});return a};r.prototype.processInputValue=function(e){return e};r.prototype.processOutputValue=function(e){return e};r.prototype._configItemsFormatter=function(e){return Array.isArray(e)?e.map(function(e){var t=this.getNestedDesigntimeMetadataValue(e.key);var a=i({},e.value,t);if(!a.label){a.label=e.key}a.itemKey=e.key;a.path="value";a.designtime=this.getNestedDesigntimeMetadata(e.key);return a}.bind(this)):[]};r.prototype.getItemChangeHandlers=function(){return Object.assign({},t.prototype.getItemChangeHandlers.apply(this,arguments),{label:this._onDesigntimeChange})};r.prototype.onBeforeConfigChange=function(e){if(!e.allowTypeChange&&!e.allowKeyChange){this.setFragment("sap.ui.integration.designtime.cardEditor.propertyEditor.parametersEditor.ParametersConfigurationEditor",function(){return 1})}return e};r.prototype._isValidItem=function(e,t){var i=t.type;var r=t.value;var l=this._getAllowedTypes();return i&&a(l,i)||typeof r==="string"&&a(l,"string")};return r});