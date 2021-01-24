/*!
* OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./ActionsToolbarRenderer","sap/base/strings/capitalize","sap/ui/core/Control","sap/m/library","sap/m/Button","sap/m/ActionSheet","sap/ui/base/ManagedObjectObserver","sap/ui/core/Core","sap/ui/integration/util/CardActions"],function(t,e,i,n,o,s,r,a,c){"use strict";var u=n.ButtonType;function p(t,e,i,n){return new Promise(function(o){var s;if(typeof i==="function"){s=i(n);if(s instanceof Promise){s.then(function(i){t.setProperty(e,i);o()});return}}else{s=i}t.setProperty(e,s);o()})}var g=i.extend("sap.ui.integration.controls.ActionsToolbar",{metadata:{library:"sap.ui.integration",properties:{},aggregations:{actionDefinitions:{type:"sap.ui.integration.ActionDefinition",multiple:true},_toolbar:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_actionSheet:{type:"sap.m.ActionSheet",multiple:false,visibility:"hidden"}},events:{visibilityChange:{parameters:{visible:{type:"boolean"}}}}},renderer:t});g.prototype.init=function(){this.setAggregation("_actionSheet",new s);this._aActions=[];this._mActionObservers=new Map;this._oObserver=new r(this._observeActionsAggregation.bind(this));this._oObserver.observe(this,{aggregations:["actionDefinitions"]})};g.prototype.exit=function(){this._oCard=null;this._aActions=null;this._oObserver.disconnect();this._oObserver=null;this._mActionObservers.clear();this._mActionObservers=null};g.prototype.onBeforeRendering=function(){this._updateVisibility()};g.prototype.initializeContent=function(t){var e=this,i,n=[],o=[],s=this.getAggregation("_actionSheet"),r=t.getHostInstance(),a=t.getAggregation("_extension");if(r){o=o.concat(r.getActions()||[])}if(a){o=o.concat(a.getActions()||[])}this._aActions=o;o.forEach(function(t){i=e._createActionButton(t,false);n.push(i)});if(this._aButtons){this._aButtons.forEach(function(t){t.destroy()})}n.forEach(s.addButton,s);this._aButtons=n;this._refreshButtons().then(this._updateVisibility.bind(this))};g.prototype.setCard=function(t){this._oCard=t};g.prototype._open=function(){this._refreshButtons().then(function(){this.getAggregation("_actionSheet").openBy(this._getToolbar())}.bind(this))};g.prototype._getToolbar=function(){var t=this.getAggregation("_toolbar");if(!t){t=new o({id:this.getId()+"-overflowButton",icon:"sap-icon://overflow",type:u.Transparent,press:function(t){this._open()}.bind(this)});this.setAggregation("_toolbar",t)}return t};g.prototype._refreshButtons=function(){var t=this._aActions,e=this._oCard,i=this._aButtons,n,o,s,r=[];for(s=0;s<t.length;s++){n=t[s];o=i[s];r.push(p(o,"enabled",n.enabled,e));r.push(p(o,"visible",n.visible,e))}return Promise.all(r)};g.prototype._createActionButton=function(t,e){var i=e?this._getActionConfig(t):t;var n=new o({icon:i.icon,text:i.text,tooltip:i.tooltip,type:i.buttonType,visible:e?i.visible:false,press:function(i){var n=e?this._getActionConfig(t):t;c.fireAction({card:this._oCard,host:this._oCard.getHostInstance(),action:n,parameters:n.parameters,source:i.getSource(),url:n.url})}.bind(this)});if(e){n.setEnabled(i.enabled)}return n};g.prototype._updateVisibility=function(){var t=this.getAggregation("_actionSheet").getButtons().some(function(t){return t.getVisible()});this.fireVisibilityChange({visible:t});this.setVisible(t)};g.prototype._getActionConfig=function(t){var i=["visible","enabled","icon","text","tooltip","parameters","buttonType","type"].reduce(function(i,n){i[n]=t["get"+e(n)]();return i},{});i.action=function(){t.firePress()};return i};g.prototype._observeActionsAggregation=function(t){var e=t.child;if(t.mutation==="insert"){var i=this._createActionButton(e,true);this.getAggregation("_actionSheet").addButton(i);e.setAssociation("_menuButton",i);var n=new r(this._observeSingleAction.bind(this));n.observe(e,{properties:true,aggregations:["tooltip"]});this._mActionObservers.set(e.getId(),n);this._updateVisibility()}else if(t.mutation==="remove"){a.byId(e.getAssociation("_menuButton")).destroy();this._mActionObservers.get(e.getId()).disconnect();this._mActionObservers.delete(e.getId())}};g.prototype._observeSingleAction=function(t){var i=t.object,n=t.name,o=a.byId(i.getAssociation("_menuButton")),s=t.current;if(["type","parameters"].indexOf(n)!==-1){return}if(t.type==="aggregation"){s=t.child}if(n==="buttonType"){n="type"}o["set"+e(n)](s);this._updateVisibility()};return g});