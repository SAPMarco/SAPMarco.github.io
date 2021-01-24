/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/integration/designtime/baseEditor/util/isValidBindingString"],function(t,e){"use strict";var i=t.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.selectEditor.SelectEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.selectEditor.SelectEditor",metadata:{library:"sap.ui.integration"},renderer:t.getMetadata().getRenderer().render});i.configMetadata=Object.assign({},t.configMetadata,{allowBindings:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},allowCustomValues:{defaultValue:false,mergeStrategy:"mostRestrictiveWins",mostRestrictiveValue:true}});i.prototype.getDefaultValidators=function(){var e=this.getConfig();return Object.assign({},t.prototype.getDefaultValidators.call(this),{isValidBinding:{type:"isValidBinding",isEnabled:e.allowBindings},notABinding:{type:"notABinding",isEnabled:!e.allowBindings},isSelectedKey:{type:"isSelectedKey",config:{keys:function(t){return t.getConfig().items.map(function(t){return t.key})}},isEnabled:!e.allowCustomValues}})};i.prototype._onChange=function(){var t=this.getContent();var e=t.getSelectedKey();var i=t.getValue();this.setValue(e||i)};i.prototype._getItemTitle=function(t){var e=this.getConfig()&&this.getConfig().items||[];var i=e.find(function(e){return e.key===t});return(i||{}).title||t};return i});