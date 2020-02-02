/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/base/util/ObjectPath","sap/base/Log","sap/ui/VersionInfo"],function(e,n,i,a){"use strict";var t={};var r=["sap.chart.Chart","sap.m.ColumnHeaderPopover","sap.m.FacetFilterItem","sap.m.internal.NumericInput","sap.m.LightBox","sap.m.Menu","sap.m.NotificationListBase","sap.m.NotificationListItem","sap.m.QuickViewBase","sap.m.QuickViewGroup","sap.m.QuickViewGroupElement","sap.m.TabStripItem","sap.m.TimePickerSlider","sap.m.TimePickerSliders","sap.m.UploadCollectionToolbarPlaceholder","sap.m.Wizard","sap.makit.Chart","sap.me.TabContainer","sap.suite.ui.microchart.InteractiveBarChart","sap.suite.ui.microchart.InteractiveDonutChart","sap.tnt.NavigationList","sap.ui.comp.smartform.Group","sap.ui.comp.smartform.GroupElement","sap.ui.comp.valuehelpdialog.ValueHelpDialog","sap.ui.core.mvc.HTMLView","sap.ui.core.mvc.JSONView","sap.ui.core.mvc.JSView","sap.ui.core.mvc.TemplateView","sap.ui.core.mvc.View","sap.ui.core.mvc.XMLView","sap.ui.core.tmpl.Template","sap.ui.core.UIComponent","sap.ui.core.util.Export","sap.ui.documentation.sdk.controls.BorrowedList","sap.ui.documentation.sdk.controls.LightTable","sap.ui.layout.BlockLayoutRow","sap.ui.layout.form.ResponsiveGridLayoutPanel","sap.ui.layout.form.ResponsiveLayoutPanel","sap.ui.richtexteditor.RichTextEditor","sap.ui.richtexteditor.ToolbarWrapper","sap.ui.rta.AddElementsDialog","sap.ui.rta.ContextMenu","sap.ui.suite.TaskCircle","sap.ui.table.ColumnMenu","sap.ui.unified.Menu","sap.ui.ux3.ActionBar","sap.ui.ux3.ExactList.LB","sap.ui.ux3.NotificationBar","sap.uiext.inbox.composite.InboxTaskTitleControl","sap.uiext.inbox.InboxFormattedTextView","sap.uiext.inbox.InboxTaskDetails","sap.uiext.inbox.InboxToggleTextView","sap.uiext.inbox.SubstitutionRulesManager","sap.uxap.AnchorBar","sap.uxap.BlockBase","sap.uxap.BreadCrumbs","sap.uxap.ObjectPageHeader","sap.uxap.ObjectPageSubSection","sap.viz.ui5.controls.common.BaseControl","sap.viz.ui5.controls.VizRangeSlider","sap.viz.ui5.controls.VizTooltip","sap.viz.ui5.core.BaseChart"];function o(e,n){if(!s(e,n)){return false}if(r.indexOf(e)>-1){return false}return true}var u=["sap.makit.Chart","sap.ui.commons.SearchField","sap.ui.commons.SearchField.CB","sap.ui.commons.SearchFieldCB","sap.ui.commons.Tab","sap.ui.comp.transport.TransportDialog","sap.ui.core.ComponentContainer","sap.ui.core.mvc.HTMLView","sap.ui.core.mvc.JSONView","sap.ui.core.mvc.JSView","sap.ui.core.mvc.TemplateView","sap.ui.core.mvc.View","sap.ui.core.mvc.XMLView","sap.ui.core.XMLComposite","sap.ui.mdc.BaseControl","sap.ui.mdc.odata.v4.microchart.MicroChart","sap.ui.mdc.ValueHelpDialog","sap.ui.mdc.XMLComposite","sap.ui.rta.AddElementsDialog","sap.ui.rta.ContextMenu"];function s(e,n){if(u.indexOf(e)>-1){return false}if(!n){return false}var i=n.getMetadata();if(i.isAbstract()){return false}return true}t.aKnownOpenUI5Libraries=["sap.f","sap.m","sap.tnt","sap.ui.codeeditor","sap.ui.commons","sap.ui.core","sap.ui.documentation","sap.ui.dt","sap.ui.fl","sap.ui.integration","sap.ui.layout","sap.ui.rta","sap.ui.suite","sap.ui.support","sap.ui.table","sap.ui.unified","sap.ui.ux3","sap.uxap"];t.aKnownRuntimeLayerLibraries=t.aKnownOpenUI5Libraries.concat(["sap.chart","sap.makit","sap.me","sap.ndc","sap.suite.ui.microchart","sap.ui.comp","sap.ui.generic.app","sap.ui.generic.template","sap.ui.mdc","sap.ui.richtexteditor","sap.viz"]);t.isKnownRuntimeLayerLibrary=function(e){return t.aKnownRuntimeLayerLibraries.indexOf(e)>-1};function c(){}function l(){return true}function p(){return false}function d(e){return e.name}function f(n){n=n||l;return a.load().then(function(e){return e.libraries.map(d).filter(n)}).then(function(n){return Promise.all(n.map(function(n){return e.loadLibrary(n,{async:true}).catch(c)}))}).then(function(){var i=e.getLoadedLibraries();for(var a in i){if(!n(a)){delete i[a]}}return i})}function m(e){var n=e.replace(/\./g,"/");return new Promise(function(e,i){sap.ui.require([n],function(n){e(n)},function(e){i(new Error("failed to load class "+n+":"+e))})})}function b(e,n,i){if(e){return function(n){return e.indexOf(n)>=0}}else if(i){return function(e){return n.indexOf(e)<0}}return function(e){return n.indexOf(e)<0&&(i||t.isKnownRuntimeLayerLibrary(e))}}t.loadLibraries=function(e){if(e==="openui5"){e=t.aKnownOpenUI5Libraries}else if(e==="sapui5.runtime"){e=t.aKnownRuntimeLayerLibraries}var n;if(Array.isArray(e)){n=b(e)}else if(typeof e==="function"){n=e}else if(e==null){n=l}else{throw new TypeError("unexpected filter "+e)}return f(n)};function v(e,n){n.test("Should load at least one library and some controls",function(n){n.expect(2);var i=false;for(var a in e){if(e[a]){if(!i){n.ok(e[a],"Should have loaded at least one library");i=true}var t=e[a].controls?e[a].controls.length:0;if(t>0){n.ok(t>0,"Should find at least 10 controls in a library");break}}}})}var h=function(e,n,i,a,t){if(!e||n.length&&n.indexOf(e)<0||i.indexOf(e)>=0){return Promise.resolve(false)}return m(e).then(function(n){var i={name:e,class:n,canBeInstantiated:s(e,n),canBeRendered:o(e,n)};if(!t&&!i.canBeInstantiated){return false}if(!a&&!i.canBeRendered){return false}return i},p)};var x=function(e,n,i,a,t,r){return new Promise(function(o,u){var s=0;var c=function(u){if(u<e.length){var l=e[u];L(l,n,i,a,t,r).then(function(e){if(e){s++}c(u+1)})}else{o(s)}};c(0)})};function L(e,n,i,a,t,r){return h(e,n,i,a,t).then(function(n){if(n){r(e,n.class,{canInstantiate:n.canBeInstantiated,canRender:n.canBeRendered})}return new Promise(function(e){setTimeout(function(){e(!!n)},0)})})}t.run=function(e,n){window.setTimeout(function(){T(e,n)},1)};function T(e,n){if(!n){n={}}var i=n.done||c;var a=n.librariesToTest||undefined;var t=n.excludedLibraries||[];var r=n.controlsToTest||[];var o=n.excludedControls||[];var u=n.includeDistLayer!==undefined?n.includeDistLayer:false;var s=n.includeElements!==undefined?n.includeElements:false;var l=n.includeNonRenderable!==undefined?n.includeNonRenderable:true;var p=n.includeNonInstantiable!==undefined?n.includeNonInstantiable:false;var d=n.qunit;if(d){d.test("Checking the given QUnit object",function(e){e.ok(true,"The given QUnit should be able to assert")})}else{var m={ok:function(e,n){if(!e){throw new Error(n)}},expect:c};d={module:c,test:function(e,n){n(m)}}}d.test("Checking the given options",function(e){e.ok(n.librariesToTest===undefined||Array.isArray(n.librariesToTest),"The given librariesToTest must be undefined or an array, but is: "+n.librariesToTest);e.ok(n.excludedLibraries===undefined||Array.isArray(n.excludedLibraries),"The given excludedLibraries must be undefined or an array, but is: "+n.excludedLibraries);e.ok(n.excludedControls===undefined||Array.isArray(n.excludedControls),"The given excludedControls must be undefined or an array, but is: "+n.excludedControls);e.ok(n.includeDistLayer===undefined||typeof n.includeDistLayer==="boolean","The given includeDistLayer must be undefined or a boolean, but is: "+n.includeDistLayer);e.ok(n.includeElements===undefined||typeof n.includeElements==="boolean","The given includeElements must be undefined or a boolean, but is: "+n.includeElements);e.ok(n.includeNonRenderable===undefined||typeof n.includeNonRenderable==="boolean","The given includeNonRenderable must be undefined or a boolean, but is: "+n.includeNonRenderable);e.ok(n.includeNonInstantiable===undefined||typeof n.includeNonInstantiable==="boolean","The given includeNonInstantiable must be undefined or a boolean, but is: "+n.includeNonInstantiable);e.ok(i===undefined||typeof i==="function","The given done callback must be undefined or a function, but is: "+i)});var h=b(a,t,u);return f(h).then(function(e){v(e,d);return e}).then(function(n){return y(n,s,r,o,l,p,e).then(function(e){i({testedControlCount:e[0],testedLibraryCount:e[1]})})})}function y(e,n,i,a,t,r,o){return new Promise(function(u){var s=Object.keys(e),c=0,l=0;var p=function(d){if(d<s.length){var f=s[d];g(e,f,n,i,a,t,r,o).then(function(e){c+=e[0];if(e[1]){l++}p(d+1)})}else{u([c,l])}};p(0)})}function g(e,n,i,a,t,r,o,u){return new Promise(function(s){var c=e[n];if(!c){s([0,false]);return}var l=c.controls;if(i){l=l.concat(c.elements.slice())}x(l,a,t,r,o,u).then(function(e){s([e,true])})})}return t},true);