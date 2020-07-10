/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/supportRules/ui/controllers/BaseController","sap/ui/support/supportRules/ui/models/SelectionUtils","sap/ui/support/supportRules/ui/models/PresetsUtils","sap/ui/core/Fragment","sap/m/MessageToast","sap/m/MessageBox","sap/ui/support/supportRules/ui/models/Documentation","sap/ui/support/supportRules/util/Utils","sap/m/GroupHeaderListItem","sap/ui/thirdparty/jquery","sap/ui/core/library","sap/ui/support/library"],function(e,t,r,o,s,i,p,a,l,n,u,d){"use strict";var c=u.ValueState;var P={SELECT_FRAGMENT_ID:"presetsSelect",EXPORT_FRAGMENT_ID:"presetExport",IMPORT_FRAGMENT_ID:"presetImport",PRESET_GROUP_NONE:"None",PRESET_GROUP_SYSTEM:"System Presets",PRESET_GROUP_CUSTOM:"Custom Presets"};var I=e.extend("sap.ui.support.supportRules.ui.controllers.PresetsController",{constructor:function(t,r){e.call(this);this.oModel=t;this.oView=r}});I.prototype.openPresetVariant=function(){var e=this.oView.byId("presetVariantBtn");e.focus();if(!this._oPresetsPopover){this._oPresetsPopover=sap.ui.xmlfragment(P.SELECT_FRAGMENT_ID,"sap.ui.support.supportRules.ui.views.Presets",this);this.oView.addDependent(this._oPresetsPopover)}if(!this._oPresetsPopover.isOpen()){this._oPresetsPopover.setInitialFocus(o.byId(P.SELECT_FRAGMENT_ID,"select").getSelectedItem().getId());this._oPresetsPopover.openBy(e)}else{this._oPresetsPopover.close()}};I.prototype.onPresetChange=function(e){var t=e.getParameter("listItem").getBindingContext().getPath();this._applyPreset(this.oModel.getProperty(t))};I.prototype.onPresetItemPress=function(){this._oPresetsPopover.close()};I.prototype.onPresetItemDelete=function(e){var t=e.getSource().getBindingContext().getPath(),o=this.oModel.getProperty(t),s=this.oModel.getProperty("/customPresets"),i=e.getSource().$().closest(".sapMLIB").attr("id");var p=this.oModel.getProperty("/selectionPresets");var a=p.indexOf(o);if(a!==-1){p.splice(a,1)}if(o.selected){p[0].selected=true;this._applyPreset(p[0])}this.oModel.setProperty("/selectionPresets",p);if(o.isCustomPreset){s=s.filter(function(e){return e.id!==o.id});this.oModel.setProperty("/customPresets",s)}if(r.isPersistingAllowed()){r.persistSelectionPresets();r.persistCustomPresets()}if(a!==p.length){var l=sap.ui.getCore().byId(i),n=l.ontap;l.ontap=function(){l.ontap=n}}};I.prototype.onPresetItemReset=function(e){var t=e.getSource().getBindingContext().getPath(),o=this.oModel.getProperty(t),s=o.isSystemPreset?r.getSystemPresets():this.oModel.getProperty("/customPresets");s.some(function(e){if(e.id===o.id){o.title=e.title;o.selections=e.selections;o.isModified=false;return true}});this.oModel.refresh();if(o.selected){this._applyPreset(o)}};I.prototype.onImportPress=function(){if(!this._oImportDialog){this._oImportDialog=sap.ui.xmlfragment(P.IMPORT_FRAGMENT_ID,"sap.ui.support.supportRules.ui.views.PresetImport",this);this.oView.addDependent(this._oImportDialog)}this._oImportDialog.open()};I.prototype.onImportFileChange=function(e){var t=e.getSource(),r=new FileReader;if(!t.getValue()){return}this._clearImportErrors();r.onloadend=this.onImportFileLoaded.bind(this);r.onerror=this.onImportFileError.bind(this);r.readAsText(e.getParameter("files")[0],"UTF-8")};I.prototype.onImportFileMismatch=function(e){this._clearImportErrors();this._reportImportFileError('Invalid file type "'+e.getParameter("mimeType")+'". Please, import a valid "application/json" file.',e.getParameter("fileName"))};I.prototype.onImportFileError=function(e){this._reportImportFileError('Error while reading file: "'+e.target.error+'".')};I.prototype.onImportFileLoaded=function(e){var t=this._tryParseImportFile(e.target.result);if(t){this._clearImportErrors();if(!t.id){t.id=a.generateUuidV4()}if(t.dateExported){t.dateExported=new Date(t.dateExported)}this.oModel.setProperty("/currentImportData",t);if(!this._isAlreadyImported(t.id)){o.byId(P.IMPORT_FRAGMENT_ID,"importBtn").setEnabled(true)}}};I.prototype.onImportCancelPress=function(){this._oImportDialog.close()};I.prototype.onImportFinalizePress=function(){var e=this.oModel.getProperty("/currentImportData"),t="";this._importPreset(e);t='The Rule Preset "'+e.title+'" was successfully imported.';if(!r.isPersistingAllowed()){t+=" This import can be stored for your next visit if you check "+'"I agree to use local storage persistency" from Support Assistant settings.'}this._oImportDialog.close();s.show(t,{width:"50%"})};I.prototype.onImportDialogClose=function(){this._clearImportErrors();o.byId(P.IMPORT_FRAGMENT_ID,"fileUpload").setValue(null);this.oModel.setProperty("/currentImportData",null);o.byId(P.IMPORT_FRAGMENT_ID,"importBtn").setEnabled(false)};I.prototype.onExportPress=function(){var e=this.oModel.getProperty("/selectionPresetsCurrent");if(!e.selections.length){i.error("Cannot export Rule Preset without selections.");return}this.oModel.setProperty("/currentExportData",{id:e.isMySelection||e.isSystemPreset?"":e.id,title:e.title,descriptionValue:e.description,dateExportedForDisplay:new Date,isMySelection:e.isMySelection});if(!this._oExportDialog){this._oExportDialog=sap.ui.xmlfragment(P.EXPORT_FRAGMENT_ID,"sap.ui.support.supportRules.ui.views.PresetExport",this);this._oExportDialog.attachAfterClose(function(){this._clearValidationState()}.bind(this));this.oView.addDependent(this._oExportDialog);this.initializeExportValidations()}this._oExportDialog.open()};I.prototype.initializeExportValidations=function(){var e=this._getInputsToValidate();e.forEach(function(e){o.byId(P.EXPORT_FRAGMENT_ID,e.id).attachChange(function(t){this._changeHandler(t,e.validateMessage)}.bind(this))},this)};I.prototype._changeHandler=function(e,t){this._validateInput(e.getSource(),t)};I.prototype._validateForm=function(){var e=true,t=this._getInputsToValidate();t.forEach(function(t){var r=o.byId(P.EXPORT_FRAGMENT_ID,t.id);if(!this._validateInput(r,t.validateMessage)){e=false}},this);return e};I.prototype._validateInput=function(e,t){var r=e.getBinding("value"),o=c.None,s=true;try{if(e.getRequired()&&!e.getValue().trim()){throw{name:"RequiredException",message:e.getLabels()[0].getText()+" is required."}}if(r&&r.getType()){r.getType().validateValue(e.getValue())}}catch(r){var i=r.message;if(r.name==="ValidateException"&&t){i=t}e.setValueStateText(i);o=c.Error;s=false}e.setValueState(o);return s};I.prototype._getInputsToValidate=function(){return[{id:"title"},{id:"presetId",validateMessage:"Invalid value. Possible characters are: a-z A-Z 0-9 - . _"}]};I.prototype._clearValidationState=function(){var e=this._getInputsToValidate();e.forEach(function(e){o.byId(P.EXPORT_FRAGMENT_ID,e.id).setValueState(c.None)})};I.prototype.onExportCancelPress=function(){this._oExportDialog.close()};I.prototype.onExportFinalizePress=function(){var e=o.byId(P.EXPORT_FRAGMENT_ID,"presetId").getValue(),i=o.byId(P.EXPORT_FRAGMENT_ID,"title").getValue(),p=o.byId(P.EXPORT_FRAGMENT_ID,"description").getValue();if(!this._validateForm()){return}if(!e){e=a.generateUuidV4()}r.exportSelectionsToFile(e,i,p,t.getSelectedRules());s.show('The Rule Preset "'+i+'" was successfully exported.',{width:"50%"});this._oExportDialog.close()};I.prototype.openHelp=function(){p.openTopic("3fc864acf926406194744375aa464fe7")};I.prototype._reportImportFileError=function(e,t){var r=o.byId(P.IMPORT_FRAGMENT_ID,"fileError"),s=o.byId(P.IMPORT_FRAGMENT_ID,"fileUpload"),i=o.byId(P.IMPORT_FRAGMENT_ID,"fileName"),p=o.byId(P.IMPORT_FRAGMENT_ID,"importBtn");r.setText(e).setVisible(true);i.addStyleClass("sapUiSupportToolError");this.oModel.setProperty("/currentImportData",{fileName:t||s.getValue()});p.setEnabled(false)};I.prototype._isAlreadyImported=function(e){var t=this.oModel.getProperty("/selectionPresets"),r=t.some(function(t){return t.id===e});if(r){o.byId(P.IMPORT_FRAGMENT_ID,"duplicateIdError").setText("A preset with ID '"+e+"' is already imported.").setVisible(true);o.byId(P.IMPORT_FRAGMENT_ID,"presetId").addStyleClass("sapUiSupportToolError");return true}else{return false}};I.prototype._clearImportErrors=function(){o.byId(P.IMPORT_FRAGMENT_ID,"fileError").setText("").setVisible(false);o.byId(P.IMPORT_FRAGMENT_ID,"fileName").removeStyleClass("sapUiSupportToolError");o.byId(P.IMPORT_FRAGMENT_ID,"duplicateIdError").setText("").setVisible(false);o.byId(P.IMPORT_FRAGMENT_ID,"presetId").removeStyleClass("sapUiSupportToolError")};I.prototype._tryParseImportFile=function(e){var t={};var s='The file cannot be uploaded. Please, choose an "application/json" file exported from the Support Assistant.';try{t=JSON.parse(e)}catch(e){this._reportImportFileError(s);return false}var i=[];if(!r.isValidSelectionImport(t,i)){this._reportImportFileError(s);return false}t.fileName=o.byId(P.IMPORT_FRAGMENT_ID,"fileUpload").getValue();return t};I.prototype._importPreset=function(e){var t=this.oModel.getProperty("/selectionPresets"),o=this.oModel.getProperty("/customPresets");var s={id:e.id,title:e.title,description:e.description,dateExported:e.dateExported,version:e.version,selections:e.selections};t.forEach(function(e){e.selected=false});s.selected=true;s.isCustomPreset=true;t.push(s);o.push(n.extend(true,{},s));if(r.isPersistingAllowed()){r.persistCustomPresets()}this._applyPreset(s)};I.prototype._applyPreset=function(e){this.oModel.setProperty("/selectionPresetsCurrent",e);t.setSelectedRules(e.selections);if(r.isPersistingAllowed()){r.persistSelectionPresets()}};I.prototype.grouper=function(e){if(e.getProperty("isSystemPreset")){return P.PRESET_GROUP_SYSTEM}if(e.getProperty("isCustomPreset")){return P.PRESET_GROUP_CUSTOM}return P.PRESET_GROUP_NONE};I.prototype.getGroupHeader=function(e){var t=!(e.key===P.PRESET_GROUP_NONE);return new l({title:e.key,visible:t}).addStyleClass("sapUiSupportToolGHLI")};return I});