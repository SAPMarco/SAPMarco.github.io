/*
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../utils/TableUtils","sap/ui/core/Element"],function(t,i){"use strict";var e=t.Hook.Keys;var o={hooks:{}};var n=i.extend("sap.ui.table.plugins.PluginBase",{metadata:{abstract:true,library:"sap.ui.table"}});n.prototype.init=function(){i.prototype.init.apply(this,arguments);this._bIsActive=false};n.prototype.exit=function(){i.prototype.exit.apply(this,arguments);this._deactivate(this.getTable())};n.prototype.onActivate=function(i){t.Hook.install(i,o,this);var e=i.getBinding("rows");if(e){this.onTableRowsBound(e)}this._bIsActive=true};n.prototype.onDeactivate=function(i){t.Hook.uninstall(i,o,this);this._bIsActive=false};n.prototype.isActive=function(){return this._bIsActive};n.prototype.isApplicable=function(i){return t.isA(i,"sap.ui.table.Table")};n.prototype.setParent=function(t){var e=this.getTable();i.prototype.setParent.apply(this,arguments);var o=this.getTable();if(o){if(!this.isApplicable(o)){throw new Error(this+" is not applicable to "+o)}this._activate(o)}else if(e){this._deactivate(e)}return this};n.prototype.onTableRowsBound=function(t){};o.hooks[e.Table.RowsBound]=function(t){this.onTableRowsBound(t)};n.prototype.onTableUnbindRows=function(){};o.hooks[e.Table.UnbindRows]=function(){this.onTableUnbindRows()};n.prototype.getTable=function(){var i=this.getParent();return t.isA(i,"sap.ui.table.Table")?i:null};n.prototype.getTableBinding=function(){var t=this.getTable();var i=t?t.getBinding("rows"):null;return i?i:null};n.prototype._activate=function(t){if(!this.isActive()){this.onActivate(t)}};n.prototype._deactivate=function(t){if(this.isActive()){this.onDeactivate(t)}};return n});