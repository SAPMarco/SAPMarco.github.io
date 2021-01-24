/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/base/Log","sap/ui/model/Model","sap/ui/integration/util/BindingHelper","sap/base/util/extend"],function(e,r,n,i,t){"use strict";var a=e.extend("sap.ui.integration.util.SimpleControl",{metadata:{library:"sap.ui.integration",properties:{resolved:{type:"any"}}}});var o=new a;var s={};function u(e,n,i,t,a){if(t===a){r.warning("BindingResolver maximum level processing reached. Please check for circular dependencies.");return e}if(Array.isArray(e)){return e.map(function(e){return u(e,n,i,t+1,a)})}if(e&&typeof e==="object"&&!s.isBindingInfo(e)){var o={};for(var l in e){o[l]=u(e[l],n,i,t+1,a)}return o}if(typeof e==="string"||typeof e==="object"&&s.isBindingInfo(e)){return f(e,n,i)}return e}function f(r,a,s){if(!r){return r}var u=typeof r==="string"?e.bindingParser(r):t({},r);if(!u){return r}if(!s){s="/"}if(a instanceof n){o.setModel(a)}else{i.copyModels(a,o)}o.bindObject(s);o.bindProperty("resolved",u);var f=o.getResolved();o.unbindProperty("resolved");o.unbindObject();o.setModel(null);return f}s.resolveValue=function(e,r,n){var i=0,t=30;if(r){return u(e,r,n,i,t)}else{return e}};s.isBindingInfo=function(e){if(!e){return false}return e.hasOwnProperty("path")||e.hasOwnProperty("parts")&&e.hasOwnProperty("formatter")};return s});