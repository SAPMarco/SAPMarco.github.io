/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/semantic/SemanticControl","sap/m/Button","sap/m/semantic/SemanticOverflowToolbarButton","sap/ui/thirdparty/jquery"],function(t,e,n,r){"use strict";var a=t.extend("sap.m.semantic.SemanticButton",{metadata:{library:"sap.m",abstract:true,properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true}},events:{press:{}}}});a.prototype._getControl=function(){var t,e,n,r=this._getConfiguration();if(!r){return null}t=this.getAggregation("_control");if(!t){e=this._getClass(r);n=this._createInstance(e);n.applySettings(r.getSettings());if(typeof r.getEventDelegates==="function"){n.addEventDelegate(r.getEventDelegates(n))}this.setAggregation("_control",n,true);t=this.getAggregation("_control")}return t};a.prototype._getClass=function(t){return t&&t.constraints==="IconOnly"?n:e};a.prototype._createInstance=function(t){return new t({id:this.getId()+"-button",press:r.proxy(this.firePress,this)})};return a});