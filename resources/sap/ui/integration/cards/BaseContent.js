/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer","sap/ui/core/Core","sap/ui/core/Control","sap/ui/integration/model/ObservableModel","sap/ui/base/ManagedObjectObserver","sap/ui/integration/util/LoadingProvider"],function(t,e,i,o,n,a){"use strict";var r=i.extend("sap.ui.integration.cards.BaseContent",{metadata:{library:"sap.ui.integration",aggregations:{_content:{multiple:false,visibility:"hidden"},_loadingProvider:{type:"sap.ui.core.Element",multiple:false,visibility:"hidden"}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}},events:{press:{}}},renderer:t});r.prototype.init=function(){this._iWaitingEventsCount=0;this._bReady=false;this._mObservers={};this._awaitEvent("_dataReady");this._awaitEvent("_actionContentReady");this.setAggregation("_loadingProvider",new a)};r.prototype.ontap=function(t){if(!t.isMarked()){this.firePress({})}};r.prototype.exit=function(){this._iWaitingEventsCount=0;if(this._mObservers){Object.keys(this._mObservers).forEach(function(t){this._mObservers[t].disconnect();delete this._mObservers[t]},this)}this._oServiceManager=null;this._oDataProviderFactory=null;this._oIconFormatter=null;if(this._oDataProvider){this._oDataProvider.destroy();this._oDataProvider=null}if(this._oActions){this._oActions.destroy();this._oActions=null}if(this._oLoadingPlaceholder){this._oLoadingPlaceholder.destroy();this._oLoadingPlaceholder=null}this._sContentBindingPath=null};r.prototype.loadDependencies=function(t){return Promise.resolve()};r.prototype.getActions=function(){return this._oActions};r.prototype.setActions=function(t){this._oActions=t};r.prototype._awaitEvent=function(t){this._iWaitingEventsCount++;this.attachEventOnce(t,function(){this._iWaitingEventsCount--;if(this._iWaitingEventsCount===0){this._bReady=true;this.fireEvent("_ready")}}.bind(this))};r.prototype.setConfiguration=function(t,e){this._oConfiguration=t;if(!t){return this}this._oLoadingPlaceholder=this.getAggregation("_loadingProvider").createContentPlaceholder(t,e);this._setDataConfiguration(t.data);return this};r.prototype.getConfiguration=function(){return this._oConfiguration};r.prototype._setDataConfiguration=function(t){var e=this.getCardInstance(),i;if(!t){this._sContentBindingPath=null;this.fireEvent("_dataReady");return}this._sContentBindingPath=t.path||"/";this.bindObject(this._sContentBindingPath);if(this._oDataProvider){this._oDataProvider.destroy()}if(this._oDataProviderFactory){this._oDataProvider=this._oDataProviderFactory.create(t,this._oServiceManager)}this.getAggregation("_loadingProvider").setDataProvider(this._oDataProvider);if(t.name){i=e.getModel(t.name)}else if(this._oDataProvider){i=new o;this.setModel(i)}if(!i){this.fireEvent("_dataReady");return}i.attachEvent("change",function(){this.onDataChanged();this.onDataRequestComplete()}.bind(this));if(this._oDataProvider){this._oDataProvider.attachDataRequested(function(){this.onDataRequested()}.bind(this));this._oDataProvider.attachDataChanged(function(t){i.setData(t.getParameter("data"))});this._oDataProvider.attachError(function(t){this._handleError(t.getParameter("message"));this.onDataRequestComplete()}.bind(this));this._oDataProvider.triggerDataUpdate()}else{this.fireEvent("_dataReady")}};r.prototype.onDataRequested=function(){this.showLoadingPlaceholders()};r.prototype.onDataRequestComplete=function(){this.fireEvent("_dataReady");this.hideLoadingPlaceholders()};r.prototype.showLoadingPlaceholders=function(){var t=this.getAggregation("_loadingProvider");if(t){t.setLoading(true)}this.hideContent()};r.prototype.hideLoadingPlaceholders=function(){var t=this.getAggregation("_loadingProvider");if(t){t.setLoading(false)}this.showContent()};r.prototype.hideContent=function(){var t=this.getAggregation("_content");if(t){t.addStyleClass("sapFCardContentHidden")}};r.prototype.showContent=function(){var t=this.getAggregation("_content");if(t){t.removeStyleClass("sapFCardContentHidden")}};r.prototype.onDataChanged=function(){};r.prototype._bindAggregationToControl=function(t,e,i){var o;if(!i){return}if(!i.path){i.path=this._sContentBindingPath}if(!i.path){o=this.getCardInstance().getBindingContext();i.path=o&&o.getPath()}if(!i.path){return}e.bindAggregation(t,i);this._observeAggregation(t,e)};r.prototype._observeAggregation=function(t,e){var i=this.getCardInstance().getModel("parameters"),o;if(this._mObservers[t]){return}o=new n(function(o){var n;if(o.name!==t){return}if(!(o.mutation==="insert"||o.mutation==="remove")){return}n=e.getAggregation(t)||[];i.setProperty("/visibleItems",n.length)});o.observe(e,{aggregations:[t]});this._mObservers[t]=o};r.prototype.isReady=function(){return this._bReady};r.prototype._handleError=function(t){this.fireEvent("_error",{logMessage:t})};r.prototype.setServiceManager=function(t){this._oServiceManager=t;return this};r.prototype.setDataProviderFactory=function(t){this._oDataProviderFactory=t;return this};r.prototype.setIconFormatter=function(t){this._oIconFormatter=t;return this};r.prototype.isLoading=function(){var t=this.getAggregation("_loadingProvider"),e=this.getCardInstance();return!t.isDataProviderJson()&&(t.getLoading()||e&&e.isLoading())};r.prototype.attachPress=function(){var t=Array.prototype.slice.apply(arguments);t.unshift("press");i.prototype.attachEvent.apply(this,t);this.invalidate();return this};r.prototype.detachPress=function(){var t=Array.prototype.slice.apply(arguments);t.unshift("press");i.prototype.detachEvent.apply(this,t);this.invalidate();return this};r.prototype.onActionSubmitStart=function(t){};r.prototype.onActionSubmitEnd=function(t,e){};r.prototype.getCardInstance=function(){return e.byId(this.getCard())};return r});