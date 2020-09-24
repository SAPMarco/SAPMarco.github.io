/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/includes","sap/base/util/restricted/_pick","sap/ui/fl/apply/_internal/flexState/controlVariants/VariantManagementState","sap/ui/fl/apply/_internal/changes/Reverter"],function(e,n,r,t){"use strict";function a(e){var t=r.getControlChangesForVariant(Object.assign(n(e,["vmReference","variantsMap","reference"]),{changeInstance:true,vReference:e.currentVReference}));var a=r.getControlChangesForVariant(Object.assign(n(e,["vmReference","variantsMap","reference"]),{changeInstance:true,vReference:e.newVReference}));var s=Object.keys(e.changesMap).reduce(function(n,r){return n.concat(e.changesMap[r])},[]);var c=s.map(function(e){return e.getId()});var i=t.reduce(function(e,n){var r=c.indexOf(n.getId());if(r>-1){e=e.concat(s[r])}return e},[]);var o=[];if(a.length>0){o=i.slice();i.some(function(e){if(a[0]&&e.getId()===a[0].getId()){a.shift();o.shift()}else{return true}})}else{o=i}var l={changesToBeReverted:o.reverse(),changesToBeApplied:a};return l}var s={switchVariant:function(e){return Promise.resolve().then(function(){e.changesMap=e.flexController._oChangePersistence.getChangesMapForComponent().mChanges;e.variantsMap=r.getContent(e.reference);var n=a(e);return t.revertMultipleChanges(n.changesToBeReverted,e).then(e.flexController.applyVariantChanges.bind(e.flexController,n.changesToBeApplied,e.appComponent)).then(r.setCurrentVariant.bind(null,e))})}};return s},true);