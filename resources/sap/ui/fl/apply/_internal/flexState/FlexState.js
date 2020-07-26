/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/base/util/ObjectPath","sap/ui/core/Component","sap/ui/fl/apply/_internal/StorageUtils","sap/ui/fl/apply/_internal/flexState/Loader","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/apply/_internal/flexState/prepareAppDescriptorMap","sap/ui/fl/apply/_internal/flexState/prepareChangesMap","sap/ui/fl/apply/_internal/flexState/prepareVariantsMap","sap/ui/fl/LayerUtils","sap/ui/fl/Utils","sap/base/Log"],function(e,n,t,a,r,i,o,p,s,l,c,f){"use strict";var u={};var g={};var d={};var h={};var S={appDescriptorMap:o,changesMap:p,variantsMap:s};function m(e){var n=t.get(e.componentId);g[e.reference].componentData=n?n.getComponentData():e.componentData}function v(e){var n=t.get(e.componentId);e.componentData=e.componentData||n.getComponentData()||{};e.manifest=e.manifest||e.rawManifest||n.getManifestObject();e.reference=e.reference||i.getFlexReference(e)}function M(e,n){if(!g[e]){throw new Error("State is not yet initialized")}if(!g[e].preparedMaps[n]){var t={unfilteredStorageResponse:g[e].unfilteredStorageResponse,storageResponse:g[e].storageResponse,componentId:g[e].componentId,componentData:g[e].componentData};g[e].preparedMaps[n]=u._callPrepareFunction(n,t)}return g[e].preparedMaps[n]}function R(e){return M(e,"appDescriptorMap")}function F(e){return M(e,"changesMap")}function x(e){return M(e,"variantsMap")}function D(n){if(n.reference.endsWith(".Component")){var t=n.reference.split(".");t.pop();var r=t.join(".");g[r]=e({},{storageResponse:{changes:a.getEmptyFlexDataResponse()},unfilteredStorageResponse:{changes:a.getEmptyFlexDataResponse()},preparedMaps:{},componentId:n.componentId,partialFlexState:n.partialFlexState});h[r]=h[n.reference]}}function y(n){var t=e({},n);var a=t.changes;var r=["changes","variants","variantChanges","variantDependentControlChanges","variantManagementChanges"];if(l.isLayerFilteringRequired()){r.forEach(function(e){a[e]=l.filterChangeDefinitionsByMaxLayer(a[e])})}return t}function C(n){h[n.reference]=r.loadFlexData(n).then(function(t){g[n.reference]=e({},{unfilteredStorageResponse:t,preparedMaps:{},componentId:n.componentId,componentData:n.componentData,partialFlexState:n.partialFlexState});D(n);I(n.reference);return t});return h[n.reference]}function I(e){c.ifUShellContainerThen(function(n){d[e]=z.bind(null,e);n[0].registerNavigationFilter(d[e])},["ShellNavigation"])}function b(e){c.ifUShellContainerThen(function(n){if(d[e]){n[0].unregisterNavigationFilter(d[e]);delete d[e]}},["ShellNavigation"])}function z(e,n,t){return c.ifUShellContainerThen(function(a){try{var r=l.getMaxLayerTechnicalParameter(n);var i=l.getMaxLayerTechnicalParameter(t);if(r!==i){u.clearFilteredResponse(e)}}catch(e){f.error(e.message)}return a[0].NavigationFilterStatus.Continue},["ShellNavigation"])}function U(e){if(g[e]){g[e].preparedMaps={}}}function _(n){var t=g[n.reference];if(t.partialFlexState===true&&n.partialFlexState!==true){t.partialFlexState=false;n.partialFlexData=e({},t.unfilteredStorageResponse.changes);n.reInitialize=true}return n}function L(e){var n=g[e.reference].componentId;if(!e.reInitialize&&n!==e.componentId){e.reInitialize=true}return e}u.initialize=function(e){return Promise.resolve(e).then(function(e){v(e);var n=e.reference;if(h[n]){return h[n].then(_.bind(null,e)).then(L).then(function(e){return e.reInitialize?C(e):g[n].unfilteredStorageResponse})}return C(e)}).then(function(e,n){if(!g[e.reference].storageResponse){g[e.reference].storageResponse=y(n);m(e);u.getVariantsState(e.reference)}}.bind(null,e))};u.clearAndInitialize=function(e){v(e);var t=!!n.get(["preparedMaps","variantsMap"],g[e.reference]);u.clearState(e.reference);u.clearState(c.normalizeReference(e.reference));return u.initialize(e).then(function(e,n){if(e){return u.getVariantsState(n)}}.bind(null,t,e.reference))};u.clearState=function(e){if(e){b(e);delete g[e];delete h[e]}else{Object.keys(g).forEach(function(e){b(e)});g={};h={}}};u.clearFilteredResponse=function(e){delete g[e].storageResponse;U(e)};u.getUIChanges=function(e){return F(e).changes};u.getAppDescriptorChanges=function(e){return R(e).appDescriptorChanges};u.getVariantsState=function(e){return x(e)};u.getUI2Personalization=function(e){return g[e].unfilteredStorageResponse.changes.ui2personalization};u._callPrepareFunction=function(e,n){return S[e](n)};u.getStorageResponse=function(e){if(h[e]){return h[e].then(function(){return g[e].unfilteredStorageResponse})}};u.getFlexObjectsFromStorageResponse=function(e){return g[e]&&g[e].unfilteredStorageResponse.changes};return u},true);