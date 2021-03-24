/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/base/util/restricted/_isNil","sap/base/util/isPlainObject"],function(t,i,e){"use strict";var a=t.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.groupEditor.GroupEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.groupEditor.GroupEditor",metadata:{library:"sap.ui.integration"},renderer:t.getMetadata().getRenderer().render});a.configMetadata=Object.assign({},t.configMetadata,{allowBindings:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"}});a.prototype.getDefaultValidators=function(){var i=this.getConfig();return Object.assign({},t.prototype.getDefaultValidators.call(this),{isValidBinding:{type:"isValidBinding",isEnabled:i.allowBindings},notABinding:{type:"notABinding",isEnabled:!i.allowBindings},maxLength:{type:"maxLength",isEnabled:typeof i.maxLength==="number",config:{maxLength:i.maxLength}}})};return a});