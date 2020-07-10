/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/appVariant/AppVariantInlineChangeFactory","sap/ui/fl/apply/_internal/appVariant/DescriptorChangeTypes","sap/base/util/merge"],function(e,a,r){"use strict";function t(e,a,t){var n=r({},{changeType:e},{content:a});if(t){n.texts=t}return n}var n={};n.getDescriptorChangeTypes=function(){return a.getChangeTypes()};n.getCondensableDescriptorChangeTypes=function(){return a.getCondensableChangeTypes()};n.createNew=function(a,r,n){var p=t(a,r,n);return e.createNew(p)};n.createDescriptorInlineChange=function(a,r,n){var p=t(a,r,n);return e.createDescriptorInlineChange(p)};n.create_ovp_addNewCard=function(a,r){var n=t("appdescr_ovp_addNewCard",a,r);return e.create_ovp_addNewCard(n)};n.create_ovp_removeCard=function(a){var r=t("appdescr_ovp_removeCard",a);return e.create_ovp_removeCard(r)};n.create_ovp_changeCard=function(a,r){var n=t("appdescr_ovp_changeCard",a,r);return e.create_ovp_changeCard(n)};n.create_app_addNewInbound=function(a,r){var n=t("appdescr_app_addNewInbound",a,r);return e.create_app_addNewInbound(n)};n.create_app_removeInbound=function(a){var r=t("appdescr_app_removeInbound",a);return e.create_app_removeInbound(r)};n.create_app_removeAllInboundsExceptOne=function(a){var r=t("appdescr_app_removeAllInboundsExceptOne",a);return e.create_app_removeAllInboundsExceptOne(r)};n.create_app_changeInbound=function(a,r){var n=t("appdescr_app_changeInbound",a,r);return e.create_app_changeInbound(n)};n.create_app_addNewOutbound=function(a){var r=t("appdescr_app_addNewOutbound",a);return e.create_app_addNewOutbound(r)};n.create_app_removeOutbound=function(a){var r=t("appdescr_app_removeOutbound",a);return e.create_app_removeOutbound(r)};n.create_app_changeOutbound=function(a){var r=t("appdescr_app_changeOutbound",a);return e.create_app_changeOutbound(r)};n.create_app_addNewDataSource=function(a){var r=t("appdescr_app_addNewDataSource",a);return e.create_app_addNewDataSource(r)};n.create_app_removeDataSource=function(a){var r=t("appdescr_app_removeDataSource",a);return e.create_app_removeDataSource(r)};n.create_app_changeDataSource=function(a){var r=t("appdescr_app_changeDataSource",a);return e.create_app_changeDataSource(r)};var p={BEGINNING:"BEGINNING",END:"END"};n.create_app_addAnnotationsToOData=function(a){var r=t("appdescr_app_addAnnotationsToOData",a);return e.create_app_addAnnotationsToOData(r)};n.create_app_setTitle=function(a,r){if(!r){r={"":a};a={}}var n=t("appdescr_app_setTitle",a,r);return e.create_app_setTitle(n)};n.create_app_setSubTitle=function(a,r){if(!r){r={"":a};a={}}var n=t("appdescr_app_setSubTitle",a,r);return e.create_app_setSubTitle(n)};n.create_app_setShortTitle=function(a,r){if(!r){r={"":a};a={}}var n=t("appdescr_app_setShortTitle",a,r);return e.create_app_setShortTitle(n)};n.create_app_setDescription=function(a,r){if(!r){r={"":a};a={}}var n=t("appdescr_app_setDescription",a,r);return e.create_app_setDescription(n)};n.create_app_setInfo=function(a,r){if(!r){r={"":a};a={}}var n=t("appdescr_app_setInfo",a,r);return e.create_app_setInfo(n)};n.create_app_setAch=function(a){var r=t("appdescr_app_setAch",a);return e.create_app_setAch(r)};n.create_app_setDestination=function(a){var r=t("appdescr_app_setDestination",a);return e.create_app_setDestination(r)};n.create_app_setKeywords=function(a,r){var n=t("appdescr_app_setKeywords",a,r);return e.create_app_setKeywords(n)};n.create_app_addTechnicalAttributes=function(a){var r=t("appdescr_app_addTechnicalAttributes",a);return e.create_app_addTechnicalAttributes(r)};n.create_app_removeTechnicalAttributes=function(a){var r=t("appdescr_app_removeTechnicalAttributes",a);return e.create_app_removeTechnicalAttributes(r)};n.create_app_addCdsViews=function(a){var r=t("appdescr_app_addCdsViews",a);return e.create_app_addCdsViews(r)};n.create_app_removeCdsViews=function(a){var r=t("appdescr_app_removeCdsViews",a);return e.create_app_removeCdsViews(r)};n.create_flp_setConfig=function(a){var r=t("appdescr_flp_setConfig",a);return e.create_flp_setConfig(r)};n.create_ui5_addNewModel=function(a){var r=t("appdescr_ui5_addNewModel",a);return e.create_ui5_addNewModel(r)};n.create_ui5_removeModel=function(a){var r=t("appdescr_ui5_removeModel",a);return e.create_ui5_removeModel(r)};n.create_ui5_addNewModelEnhanceWith=function(a,r){var n=t("appdescr_ui5_addNewModelEnhanceWith",a,r);return e.create_ui5_addNewModelEnhanceWith(n)};n.create_ui5_replaceComponentUsage=function(a){var r=t("appdescr_ui5_replaceComponentUsage",a);return e.create_ui5_replaceComponentUsage(r)};n.create_ui5_addLibraries=function(a){var r=t("appdescr_ui5_addLibraries",a);return e.create_ui5_addLibraries(r)};n.create_ui5_setMinUI5Version=function(a){var r=t("appdescr_ui5_setMinUI5Version",a);return e.create_ui5_setMinUI5Version(r)};n.create_smb_addNamespace=function(a){var r=t("appdescr_smb_addNamespace",a);return e.create_smb_addNamespace(r)};n.create_smb_changeNamespace=function(a){var r=t("appdescr_smb_changeNamespace",a);return e.create_smb_changeNamespace(r)};n.create_ui_generic_app_setMainPage=function(a,r){var n=t("appdescr_ui_generic_app_setMainPage",a,r);return e.create_ui_generic_app_setMainPage(n)};n.create_ui_setIcon=function(a){var r=t("appdescr_ui_setIcon",a);return e.create_ui_setIcon(r)};n.create_ui_setDeviceTypes=function(a){var r=t("appdescr_ui_setDeviceTypes",a);return e.create_ui_setDeviceTypes(r)};n.create_url_setUri=function(a){var r=t("appdescr_url_setUri",a);return e.create_url_setUri(r)};n.create_fiori_setRegistrationIds=function(a){var r=t("appdescr_fiori_setRegistrationIds",a);return e.create_fiori_setRegistrationIds(r)};n.create_ui5_setFlexExtensionPointEnabled=function(a){var r=t("appdescr_ui5_setFlexExtensionPointEnabled",a);return e.create_ui5_setFlexExtensionPointEnabled(r)};return n},true);