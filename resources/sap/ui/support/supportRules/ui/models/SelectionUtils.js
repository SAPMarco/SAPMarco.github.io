/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/support/supportRules/Constants","sap/ui/support/supportRules/Storage","sap/ui/support/supportRules/ui/models/SharedModel"],function(e,t,n,o){"use strict";var s={model:o,getRulesSelectionState:function(){var e=this.treeTable.getBinding().getModel(),t=e.getData(),n=[];Object.keys(t).forEach(function(e){t[e].nodes.forEach(function(e){n.push({ruleId:e.id,selected:e.selected,libName:e.libName})})});return n},getSelectedRules:function(){var e=this.treeTable.getBinding().getModel(),t=e.getData(),n=[];if(!t){return}Object.keys(t).forEach(function(e){t[e].nodes.forEach(function(e){if(e.selected){n.push({ruleId:e.id,libName:e.libName})}})});this.model.setProperty("/selectedRulesCount",n.length);return n},updateSelectedRulesFromLocalStorage:function(e){var t=n.getSelectedRules();if(!t){return null}if(!e){return null}t.forEach(function(t){Object.keys(e).forEach(function(n){e[n].nodes.forEach(function(o){if(o.id===t.ruleId){o.selected=t.selected;if(!o.selected){e[n].selected=false}}})})});return e},persistSelection:function(){var e=this.getRulesSelectionState();n.setSelectedRules(e)},setSelectedRules:function(e){var o=this.model.getProperty("/treeModel");Object.keys(o).forEach(function(e){o[e].nodes.forEach(function(e){e.selected=false})});e.forEach(function(e){Object.keys(o).forEach(function(t){o[t].nodes.forEach(function(t){if(t.id===e.ruleId){t.selected=true}})})});this.treeTable.syncParentNoteWithChildrenNotes(o);this.treeTable.updateSelectionFromModel();this.getSelectedRules();if(n.readPersistenceCookie(t.COOKIE_NAME)){this.persistSelection()}},_syncSelectionAdditionalRuleSetsMainModel:function(e,t){Object.keys(e).forEach(function(n){Object.keys(t).forEach(function(n){if(e[n].id===t[n].id){e[n]=t[n]}})});return e},_deselectAdditionalRuleSets:function(e,t){if(!t){return}t.forEach(function(t){Object.keys(e).forEach(function(n){if(e[n].name===t){e[n].selected=false;e[n].nodes.forEach(function(e){e.selected=false})}})});return e}};return s});