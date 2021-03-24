/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/requireAsync","sap/ui/fl/apply/_internal/changes/descriptor/ApplyUtil","sap/base/Log"],function(e,n,r){"use strict";var a={registry:function(){return e("sap/ui/fl/apply/_internal/changes/descriptor/RegistrationBuild")},handleError:function(e){throw e},processTexts:function(e,r){if(typeof e["sap.app"].i18n==="string"){e["sap.app"].i18n={bundleUrl:e["sap.app"].i18n}}if(!e["sap.app"].i18n.enhanceWith){e["sap.app"].i18n.enhanceWith=[]}var a=n.formatBundleName(e["sap.app"].id,r.i18n);var i=e["sap.app"].i18n.enhanceWith.some(function(e){return e.bundleName===a});if(!i){e["sap.app"].i18n.enhanceWith.push({bundleName:a})}return e}};var i={registry:function(){return e("sap/ui/fl/apply/_internal/changes/descriptor/Registration")},handleError:function(e){r.error(e)},processTexts:function(e,n){var a=JSON.stringify(e);Object.keys(n).forEach(function(e){if(n[e].value[""]){a=a.replace("{{"+e+"}}",n[e].value[""])}else{r.error("Text change has to contain default language")}});return JSON.parse(a)}};var t={getBuildStrategy:function(){return Promise.resolve(a)},getRuntimeStrategy:function(){return Promise.resolve(i)}};return t},true);