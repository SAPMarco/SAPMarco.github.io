/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/ChangesController","sap/ui/fl/write/_internal/SaveAs","sap/ui/fl/write/_internal/connectors/LrepConnector"],function(e,r,t){"use strict";var n=function(r,n){if(!n.layer){return Promise.reject("Layer must be provided")}var i=e.getDescriptorFlexControllerInstance(n.selector);n.reference=i.getComponentName();n.url="/sap/bc/lrep";return t.appVariant[r](n)};var i={saveAs:function(t){if(!t.layer){return Promise.reject("Layer must be provided")}if(!t.id){return Promise.reject("App variant ID must be provided")}var n=e.getDescriptorFlexControllerInstance(t.selector);t.reference=n.getComponentName();return r.saveAs(t)},deleteAppVariant:function(t){if(!t.layer){return Promise.reject("Layer must be provided")}var n=e.getDescriptorFlexControllerInstance(t.selector);t.id=n.getComponentName();return r.deleteAppVariant(t)},listAllAppVariants:function(e){if(!e.layer){return Promise.reject("Layer must be provided")}return n("list",e)},getManifest:function(e){if(!e.layer){return Promise.reject("Layer must be provided")}if(!e.appVarUrl){return Promise.reject("appVarUrl must be provided")}return t.appVariant.getManifest(e)},assignCatalogs:function(e){if(!e.layer){return Promise.reject("Layer must be provided")}if(!e.assignFromAppId){return Promise.reject("assignFromAppId must be provided")}if(!e.action){return Promise.reject("action must be provided")}return n("assignCatalogs",e)},unassignCatalogs:function(e){if(!e.layer){return Promise.reject("Layer must be provided")}if(!e.action){return Promise.reject("action must be provided")}return n("unassignCatalogs",e)}};return i},true);