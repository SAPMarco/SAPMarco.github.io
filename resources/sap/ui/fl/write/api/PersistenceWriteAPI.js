/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/includes","sap/base/util/restricted/_omit","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/apply/_internal/ChangesController","sap/ui/fl/apply/_internal/appVariant/DescriptorChangeTypes","sap/ui/fl/write/api/FeaturesAPI","sap/base/Log","sap/ui/fl/Layer"],function(e,t,n,r,a,l,s,o,i){"use strict";function c(t){return t._getMap&&e(l.getChangeTypes(),t._getMap().changeType)||t.getChangeType&&e(l.getChangeTypes(),t.getChangeType())}function g(e){e.includeCtrlVariants=true;e.invalidateCache=false;return p._getUIChanges(e).then(function(e){return e.length>0})}function u(e){e.includeCtrlVariants=true;e.invalidateCache=false;return p._getUIChanges(e).then(function(e){return e.some(function(e){return e.packageName==="$TMP"||e.packageName===""})})}var p={hasHigherLayerChanges:function(e){return a.getFlexControllerInstance(e.selector).hasHigherLayerChanges(t(e,"selector"))},save:function(e){var n=a.getFlexControllerInstance(e.selector);var r=a.getDescriptorFlexControllerInstance(e.selector);e.invalidateCache=true;e.componentId=a.getAppComponentForSelector(e.selector).getId();return n.saveAll(e.skipUpdateCache,e.draft).then(r.saveAll.bind(r,e.skipUpdateCache,e.draft)).then(p._getUIChanges.bind(null,t(e,"skipUpdateCache")))},getResetAndPublishInfo:function(e){return Promise.all([g(e),u(e),s.isPublishAvailable()]).then(function(t){var n={isResetEnabled:t[0],isPublishEnabled:t[1]};var r=t[2];var l=!(e.layer===i.USER)&&(!n.isResetEnabled||r&&!n.isPublishEnabled);if(l){return a.getFlexControllerInstance(e.selector).getResetAndPublishInfo(e).then(function(e){n.isResetEnabled=n.isResetEnabled||e.isResetEnabled;n.isPublishEnabled=n.isPublishEnabled||e.isPublishEnabled;return n}).catch(function(e){o.error("Sending request to flex/info route failed: "+e.message);return n})}return n})},reset:function(e){var t=a.getAppComponentForSelector(e.selector);var n=a.getFlexControllerInstance(t);var r=[e.layer,e.generator,t,e.selectorIds,e.changeTypes];return n.resetChanges.apply(n,r)},publish:function(e){e.styleClass=e.styleClass||"";var t=a.getAppComponentForSelector(e.selector);return a.getFlexControllerInstance(t)._oChangePersistence.transportAllUIChanges({},e.styleClass,e.layer,e.appVariantDescriptors)},add:function(e){if(c(e.change)){return e.change.store()}var t=a.getAppComponentForSelector(e.selector);return a.getFlexControllerInstance(t).addPreparedChange(e.change,t)},remove:function(e){if(!e.selector){throw new Error("An invalid selector was passed so change could not be removed with id: "+e.change.getId())}var t=a.getAppComponentForSelector(e.selector);if(!t){throw new Error("Invalid application component for selector, change could not be removed with id: "+e.change.getId())}if(c(e.change)){var l=a.getDescriptorFlexControllerInstance(t);l.deleteChange(e.change,t);return}var s=n.bySelector(e.change.getSelector(),t);var o=a.getFlexControllerInstance(t);if(s){r.destroyAppliedCustomData(s,e.change,n)}o.deleteChange(e.change,t)},_getUIChanges:function(e){if(e.layer){e.currentLayer=e.layer}return a.getFlexControllerInstance(e.selector)._oChangePersistence.getChangesForComponent(t(e,["invalidateCache","selector"]),e.invalidateCache)}};return p},true);