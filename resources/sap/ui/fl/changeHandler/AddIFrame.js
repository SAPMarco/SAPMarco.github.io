/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/common/revertAddedControls","sap/ui/fl/changeHandler/common/getTargetAggregationIndex","sap/ui/fl/changeHandler/common/createIFrame"],function(e,t,n){"use strict";var r={};r.applyChange=function(e,r,o){var a=o.modifier;var i=e.getDefinition();var g=o.view;var c=i.content.targetAggregation;var s=a.findAggregation(r,c);if(!s){throw new Error("The given Aggregation is not available in the given control: "+a.getId(r))}var f=t(e,r,o);var l=n(e,o,i.content.selector);a.insertAggregation(r,c,l,f,g);e.setRevertData([a.getId(l)])};r.revertChange=e;r.completeChangeContent=function(e,t,n){var r=e.getDefinition();var o=n.modifier;var a=n.appComponent;["targetAggregation","baseId","url"].forEach(function(e){if(!Object.prototype.hasOwnProperty.call(t.content,e)){throw new Error("Attribute missing from the change specific content '"+e+"'")}});r.content=Object.assign(r.content||{},t.content);r.content.selector=o.getSelector(r.content.baseId,a)};return r},true);