/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/core/Core"],function(t,e){"use strict";var i=t.extend("sap.ui.integration.util.DataProvider",{metadata:{library:"sap.ui.integration",properties:{settingsJson:{type:"string"}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}},events:{dataRequested:{parameters:{}},dataChanged:{parameters:{data:{type:"object"}}},error:{parameters:{message:{type:"string"}}}}}});i.prototype.setDestinations=function(t){this._oDestinations=t};i.prototype.setDependencies=function(t){this._aDependencies=t};i.prototype.setSettingsJson=function(t){this.setProperty("settingsJson",t);this.setSettings(JSON.parse(t));if(this._bActive){this._scheduleDataUpdate()}};i.prototype.setSettings=function(t){this._oSettings=t};i.prototype.getSettings=function(){return this._oSettings};i.prototype.triggerDataUpdate=function(){var t,e;this.fireDataRequested();t=this._waitDependencies();e=t.then(this._triggerDataUpdate.bind(this));if(!this._pInitialRequestPromise){this._pInitialRequestPromise=e}return e};i.prototype.getCardInstance=function(){return e.byId(this.getCard())};i.prototype._triggerDataUpdate=function(){this._bActive=true;return this.getData().then(function(t){this.fireDataChanged({data:t});this.onDataRequestComplete()}.bind(this)).catch(function(t){this.fireError({message:t});this.onDataRequestComplete()}.bind(this))};i.prototype.getData=function(){var t=this.getSettings();return new Promise(function(e,i){if(t.json){e(t.json)}else{i("Could not get card data.")}})};i.prototype.destroy=function(){if(this._iIntervalId){clearInterval(this._iIntervalId);this._iIntervalId=null}if(this._iDataUpdateCallId){clearTimeout(this._iDataUpdateCallId);this._iDataUpdateCallId=null}this._oSettings=null;t.prototype.destroy.apply(this,arguments)};i.prototype.getInitialRequestPromise=function(){return this._pInitialRequestPromise};i.prototype.onDataRequestComplete=function(){var t;if(!this._oSettings||!this._oSettings.updateInterval){return}t=parseInt(this._oSettings.updateInterval);if(isNaN(t)){return}setTimeout(function(){this.triggerDataUpdate()}.bind(this),t*1e3)};i.prototype._scheduleDataUpdate=function(){if(this._iDataUpdateCallId){clearTimeout(this._iDataUpdateCallId)}this._iDataUpdateCallId=setTimeout(this.triggerDataUpdate.bind(this),0)};i.prototype._waitDependencies=function(){var t=this._aDependencies||[],e=[];t.forEach(function(t){e.push(t.getInitialRequestPromise())});return Promise.all(e)};return i});