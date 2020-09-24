/*
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../utils/TableUtils","sap/ui/core/Element"],function(t,i){"use strict";var e=t.Hook.Keys;var n={};var o=i.extend("sap.ui.table.plugins.PluginBase",{metadata:{abstract:true,library:"sap.ui.table"}});o.prototype.init=function(){i.prototype.init.apply(this,arguments);this._bIsActive=false};o.prototype.exit=function(){i.prototype.exit.apply(this,arguments);this._deactivate(this.getTable())};o.prototype.onActivate=function(i){t.Hook.install(i,n,this);var e=i.getBinding("rows");if(e){this.onTableRowsBound(e)}this._bIsActive=true};o.prototype.onDeactivate=function(i){t.Hook.uninstall(i,n,this);this._bIsActive=false};o.prototype.isActive=function(){return this._bIsActive};o.prototype.isApplicable=function(i){return t.isA(i,"sap.ui.table.Table")};o.prototype.setParent=function(t){var e=this.getTable();i.prototype.setParent.apply(this,arguments);var n=this.getTable();if(n){if(!this.isApplicable(n)){throw new Error(this+" is not applicable to "+n)}this._activate(n)}else if(e){this._deactivate(e)}return this};o.prototype.onTableRowsBound=function(t){};n[e.Table.RowsBound]=function(t){this.onTableRowsBound(t)};o.prototype.onTableUnbindRows=function(){};n[e.Table.UnbindRows]=function(){this.onTableUnbindRows()};o.prototype.getTable=function(){var i=this.getParent();return t.isA(i,"sap.ui.table.Table")?i:null};o.prototype.getTableBinding=function(){var t=this.getTable();var i=t?t.getBinding("rows"):null;return i?i:null};o.prototype._activate=function(t){if(!this.isActive()){this.onActivate(t)}};o.prototype._deactivate=function(t){if(this.isActive()){this.onDeactivate(t)}};return o});