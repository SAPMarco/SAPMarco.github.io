/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/Variant","sap/ui/fl/Change","sap/ui/fl/Utils","sap/base/util/ObjectPath","sap/base/util/includes","sap/base/util/restricted/_omit","sap/base/Log","sap/ui/fl/LayerUtils","sap/ui/fl/apply/_internal/flexState/FlexState","sap/base/util/restricted/_pick","sap/ui/fl/apply/_internal/controlVariants/Utils","sap/base/util/isEmptyObject"],function(e,n,t,a,r,i,c,o,f,u,s,v,g){"use strict";var l={};function h(e){var n=[];if(e.variantData.content.variantReference){n=l.getControlChangesForVariant(Object.assign(e,{vReference:e.variantData.content.variantReference,changeInstance:true}));return n.filter(function(n){return f.compareAgainstCurrentLayer(n.getDefinition().layer,e.variantData.content.layer)===-1})}return n}function d(e){var n=l.getContent(e.reference);var t=r.get([e.vmReference,"variants"],n);return t||[]}function p(e,n,t){var a=n.changeType;if(!e){e={}}if(!e[a]){e[a]=[]}if(t){e[a].push(n);return true}return e[a].some(function(t,r){if(t.fileName===n.fileName){e[a].splice(r,1);return true}})}function C(e,n){var t=V(e);n[t].push(e)}function m(e,n){var t=V(e);var a=-1;n[t].some(function(n,t){if(n.fileName===e.fileName){a=t;return true}});if(a>-1){n[t].splice(a,1)}}function V(e){switch(e.fileType){case"change":return"variantDependentControlChanges";case"ctrl_variant":return"variants";case"ctrl_variant_change":return"variantChanges";case"ctrl_variant_management_change":return"variantManagementChanges";default:}}l.getContent=function(e){return u.getVariantsState(e)};l.resetContent=function(e){u.clearFilteredResponse(e)};l.getControlChangesForVariant=function(e){var n=[];var a=l.getVariant(e);if(a){n=a.controlChanges;if(e.changeInstance){n=n.map(function(e,n){var r;if(!e.getDefinition){r=new t(e);a.controlChanges.splice(n,1,r)}else{r=e}return r})}}return n};l.getVariantChangesForVariant=function(e){var n=l.getVariant(e);return n&&n.variantChanges||{}};l.getVariant=function(e){var n;var t=l.getContent(e.reference);e.vReference=e.vReference||t[e.vmReference].defaultVariant;var a=d(e);a.some(function(t){if(t.content.fileName===e.vReference){n=t;return true}});return n};l.getCurrentVariantReference=function(e){var n=l.getContent(e.reference);var t=n[e.vmReference];return t.currentVariant||t.defaultVariant};l.getVariantManagementReferences=function(e){var n=l.getContent(e);return Object.keys(n)};l.addVariantToVariantManagement=function(e){var n=l.getContent(e.reference);var t=n[e.vmReference].variants.slice().splice(1);var a=v.getIndexToSortVariant(t,e.variantData);if(e.variantData.content.variantReference){var r=h(e);e.variantData.controlChanges=r.concat(e.variantData.controlChanges)}n[e.vmReference].variants.splice(a+1,0,e.variantData);return a+1};l.removeVariantFromVariantManagement=function(e){var t;var a=l.getContent(e.reference);var r=a[e.vmReference].variants.some(function(a,r){var i=new n(a);if(i.getId()===e.variant.getId()){t=r;return true}});if(r){a[e.vmReference].variants.splice(t,1)}return t};l.setVariantData=function(e){var n=l.getContent(e.reference);var t=n[e.vmReference].variants;var a=t[e.previousIndex];Object.keys(e.variantData).forEach(function(n){if(a.content.content[n]){a.content.content[n]=e.variantData[n]}});if(a.content.fileName!==e.vmReference){t.splice(e.previousIndex,1);var r=v.getIndexToSortVariant(t.slice(1),a);t.splice(r+1,0,a);return r+1}t.splice(e.previousIndex,1,a);return e.previousIndex};l.addChangeToVariant=function(e){var n=l.getControlChangesForVariant(Object.assign(e,{changeInstance:true}));var t=n.map(function(e){return e.getDefinition().fileName});if(!i(t,e.change.getDefinition().fileName)){var a=l.getVariant(e);a.controlChanges=n.concat([e.change]);return true}return false};l.removeChangeFromVariant=function(e){var n=l.getControlChangesForVariant(Object.assign(e,{changeInstance:true}));var t=l.getVariant(e);var a=false;if(t){t.controlChanges=n.filter(function(n){if(!a&&n.getId()===e.change.getId()){a=true;return false}return true})}return a};l.getInitialChanges=function(e){var n=l.getContent(e.reference);return Object.keys(n).reduce(function(t,a){if(e.vmReference&&e.vmReference===a||!e.vmReference){var r=n[a].currentVariant?"currentVariant":"defaultVariant";var i={vmReference:a,vReference:n[a][r],reference:e.reference,changeInstance:e.changeInstance};return t.concat(l.getControlChangesForVariant(Object.assign({},e,i)))}return t},[])};l.fillVariantModel=function(e){var n=l.getContent(e.reference);return Object.keys(n).reduce(function(t,a){t[a]={defaultVariant:n[a].defaultVariant,variants:[]};if(n[a].currentVariant){t[a].currentVariant=n[a].currentVariant}d(Object.assign(e,{vmReference:a})).forEach(function(e,n){t[a].variants[n]=JSON.parse(JSON.stringify({key:e.content.fileName,title:e.content.content.title,layer:e.content.layer,favorite:e.content.content.favorite,executeOnSelect:e.content.content.executeOnSelect,visible:e.content.content.visible,author:r.get("content.support.user",e)}))});return t},{})};l.updateChangesForVariantManagementInMap=function(e){var n=l.getContent(e.reference);var t=n[e.vmReference];if(e.changeContent.fileType==="ctrl_variant_change"){t.variants.some(function(n){if(n.content.fileName===e.changeContent.selector.id){p(n.variantChanges,e.changeContent,e.add)}})}else if(e.changeContent.fileType==="ctrl_variant_management_change"){p(t.variantManagementChanges,e.changeContent,e.add)}};l.setCurrentVariant=function(e){var n=l.getContent(e.reference);if(r.get([e.vmReference],n)){n[e.vmReference].currentVariant=e.newVReference}};l.updateVariantsState=function(e){var n=l.getContent(e.reference);if(g(n)){o.error("Variant state is not initialized yet");return}var t=u.getFlexObjectsFromStorageResponse(e.reference);if(e.changeToBeAddedOrDeleted){switch(e.changeToBeAddedOrDeleted.getPendingAction()){case"NEW":C(e.changeToBeAddedOrDeleted.getDefinition(),t);break;case"DELETE":m(e.changeToBeAddedOrDeleted.getDefinition(),t);break;default:}}};l.waitForInitialVariantChanges=function(n){var t=l.getInitialChanges({vmReference:n.vmReference,reference:n.reference,changeInstance:true});var r=t.reduce(function(e,n){if(a.indexOfObject(e,n.getSelector())===-1){e.push(n.getSelector())}return e},[]);var i=[];r.map(function(t){var a=e.bySelector(t,n.appComponent);if(a){i.push(a)}});return n.flexController.waitForChangesToBeApplied(i)};return l},true);