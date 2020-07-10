/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/extend"],function(e){"use strict";var t={};var n=["width","height","url"];function r(e,t){var r={};n.forEach(function(n){var i=e.getProperty(t,n);if(i!==undefined){r[n]=i}});return r}function i(t,n,r){var i=e({_settings:r},r);t.applySettings(n,i)}t.applyChange=function(e,t,n){var a=n.modifier;var o=e.getDefinition();var f=a.getControlMetadata(t);if(f.getName()!=="sap.ui.fl.util.IFrame"){throw new Error("UpdateIFrame only for sap.ui.fl.util.IFrame")}e.setRevertData({originalSettings:r(a,t)});i(a,t,o.settings)};t.revertChange=function(e,t,n){var r=e.getRevertData();if(r){i(n.modifier,t,r.originalSettings);e.resetRevertData()}else{throw new Error("Attempt to revert an unapplied change.")}};t.completeChangeContent=function(e,t){var r=e.getDefinition();if(!t.content||!Object.keys(t.content).some(function(e){return n.indexOf(e)!==-1})){throw new Error("oSpecificChangeInfo attribute required")}r.settings=t.content};return t},true);