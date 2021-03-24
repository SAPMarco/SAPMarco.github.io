/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t=["BEGINNING","END"];function n(t,n){return Object.keys(t).indexOf(n)>=0}function e(t,n){return!t[n].type||t[n].type==="OData"}function a(t,n,e){return t[e]&&t[e].type==="ODataAnnotation"||n[e]}function o(t,n){return t[n].type&&t[n].type==="ODataAnnotation"}function r(t,n){return t.indexOf(n)>=0}function i(t,a){if(a){if(Object.keys(t).length>0){if(!n(t,a)){throw new Error("There is no dataSource '"+a+"' existing in the manifest. You can only add annotations to already existing dataSources in the manifest")}if(!e(t,a)){throw new Error("The dataSource '"+a+"' is existing in the manifest but is not type of 'OData'. The type of the dataSource in the manifest is '"+t[a].type+"'")}}else{throw new Error("There are no dataSources in the manifest at all")}}else{throw new Error("Invalid change format: The mandatory 'dataSourceId' is not defined. Please define the mandatory property 'dataSourceId' and refer it to an existing OData")}}function s(t){if(t){if(t.length===0){throw new Error("Invalid change format: The 'annotations' array property is empty")}}else{throw new Error("Invalid change format: The mandatory 'annotations' array property is not defined. Please define the 'annotations' array property")}}function f(n){if(!(t.indexOf(n)>=0)&&!(n===undefined)){throw new Error("The defined insert position '"+n+"' is not supported. The supported insert positions are: "+t.join("|"))}}function d(t,n){if(t){if(Object.keys(t).length===0){throw new Error("The 'dataSource' object is empty")}Object.keys(t).forEach(function(e){if(!o(t,e)){throw new Error("The dataSource annotation '"+e+"' is type of '"+t[e].type+"'. Only dataSource annotations of type 'ODataAnnotation' is supported")}if(!r(n,e)){throw new Error("The annotation '"+e+"' is not part of 'annotations' array property. Please add the annotation '"+e+"' in the 'annotations' array property")}})}else{throw new Error("Invalid change format: The mandatory 'dataSource' object is not defined. Please define the mandatory 'dataSource' object")}}function c(t,n,e,a,o){u(t[n],e,a);p(t,o)}function u(t,n,e){if(!t["settings"]){t["settings"]={}}if(!t["settings"].annotations){t["settings"].annotations=[]}var a=t["settings"].annotations.filter(function(t){return n.indexOf(t)<0});t["settings"].annotations=a;if(e==="END"){t["settings"].annotations=t["settings"].annotations.concat(n)}else{t["settings"].annotations=n.concat(t["settings"].annotations)}}function p(t,n){Object.assign(t,n)}function h(t,n,e){e.forEach(function(e){if(!a(t,n,e)){throw new Error("The annotation '"+e+"' is part of 'annotations' array property but does not exists in the change property 'dataSource' and in the manifest (or it is not type of 'ODataAnnotation' in the manifest)")}})}var y={applyChange:function(t,n){var e=n.getContent().dataSourceId;var a=n.getContent().annotations;var o=n.getContent().annotationsInsertPosition;var r=n.getContent().dataSource;i(t["sap.app"].dataSources,e);s(a);f(o);d(r,a);h(t["sap.app"]["dataSources"],r,a);c(t["sap.app"]["dataSources"],e,a,o,r);return t}};return y});