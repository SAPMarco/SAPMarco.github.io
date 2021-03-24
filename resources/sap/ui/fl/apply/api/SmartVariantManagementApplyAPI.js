/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/apply/_internal/flexState/compVariants/CompVariantMerger","sap/ui/fl/apply/_internal/ChangesController","sap/ui/fl/Change","sap/ui/fl/registry/Settings","sap/ui/fl/Utils","sap/ui/fl/LayerUtils"],function(e,t,n,r,a,o,i,l){"use strict";function u(e){return e&&e.getPersistencyKey&&e.getPersistencyKey()}function c(n,r){var a=t.getFlexReferenceForControl(n);var o=u(n);var i=e.getCompVariantsMap(a);return i._getOrCreate(o,r)}function p(n){var r=t.getFlexReferenceForControl(n.control);return e.initialize({reference:r,componentData:{},manifest:i.getAppDescriptor(n.control),componentId:i.getAppComponentForControl(n.control).getId()}).then(c.bind(undefined,n.control))}var f={loadVariants:function(e){return p(e).then(function(t){var r=u(e.control);return n.merge(r,t,e.standardVariant,e.variants)})},getEntityById:function(n){var r=t.getFlexReferenceForControl(n.control);return e.getCompEntitiesByIdMap(r)[n.id]},isApplicationVariant:function(e){var t=e.control;if(i.isApplicationVariant(t)){return true}var n=i.getComponentForControl(t);if(n&&n.getAppComponent){n=n.getAppComponent();if(n){return true}}return false},isVendorLayer:function(){return l.isVendorLayer()},isVariantDownport:function(){return f.isVendorLayer()&&i.isHotfixMode()},getDefaultVariantId:function(e){var t=c(e.control).defaultVariant;return t?t.getContent().defaultVariantName:""},getExecuteOnSelect:function(e){var t=c(e.control).standardVariant;return t?t.getContent().executeOnSelect:null},getChangeById:function(e){return f.getEntityById(e)},_getChangeMap:function(n){var r=t.getFlexReferenceForControl(n);var a=u(n);var o=e.getCompEntitiesByIdMap(r);var i={};Object.keys(o).forEach(function(e){if(o[e].getSelector&&o[e].getSelector().persistencyKey===a&&o[e].getFileType()==="change"){i[e]=o[e]}});return i}};return f},true);