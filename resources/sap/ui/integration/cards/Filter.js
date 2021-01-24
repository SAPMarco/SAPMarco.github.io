/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Core","sap/base/Log","sap/ui/core/Icon","sap/m/HBox","sap/m/Text","sap/m/Select","sap/ui/core/ListItem","sap/ui/model/json/JSONModel","sap/ui/integration/util/LoadingProvider"],function(e,t,i,a,r,o,s,n,d,l){"use strict";var p=e.extend("sap.ui.integration.cards.Filter",{metadata:{properties:{key:{type:"string",defaultValue:""},config:{type:"object",defaultValue:"null"},value:{type:"string",defaultValue:""}},aggregations:{_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}},renderer:{apiVersion:2,render:function(e,t){var i=t.isLoading();e.openStart("div",t).class("sapFCardFilter");if(i){e.class("sapFCardFilterLoading")}e.openEnd();if(t._hasError()){e.renderControl(t._getErrorMessage())}else{e.renderControl(t._getSelect())}e.close("div")}}});p.prototype.init=function(){this._oLoadingProvider=new l;this.attachEventOnce("_dataReady",function(){this.fireEvent("_ready")})};p.prototype.exit=function(){if(this._oDataProvider){this._oDataProvider.destroy();this._oDataProvider=null}if(this._oLoadingProvider){this._oLoadingProvider.destroy();this._oLoadingProvider=null}};p.prototype.isLoading=function(){return!this._oLoadingProvider.getDataProviderJSON()&&this._oLoadingProvider.getLoadingState()};p.prototype._getSelect=function(){var e=this.getAggregation("_select");if(!e){e=this._createSelect();this.setAggregation("_select",e)}return e};p.prototype._hasError=function(){return!!this._bError};p.prototype._getErrorMessage=function(){var e="Unable to load the filter.";return new r({justifyContent:"Center",alignItems:"Center",items:[new a({src:"sap-icon://message-error",size:"1rem"}).addStyleClass("sapUiTinyMargin"),new o({text:e})]})};p.prototype._handleError=function(e){i.error(e);this._bError=true;this.invalidate()};p.prototype._onDataRequestComplete=function(){this.fireEvent("_dataReady");this._oLoadingProvider.setLoading(false);this.invalidate()};p.prototype._onDataRequested=function(){this._oLoadingProvider.createLoadingState(this._oDataProvider)};p.prototype._updateModel=function(e){var t=this._getSelect(),i=this.getModel();i.setData(e);t.setSelectedKey(this.getValue());this._updateSelected(t.getSelectedItem())};p.prototype._setDataConfiguration=function(e){if(!e){this.fireEvent("_dataReady");return}if(this._oDataProvider){this._oDataProvider.destroy()}var i=t.byId(this.getCard());this._oDataProvider=i._oDataProviderFactory.create(e,null,true);this.setModel(new d);this._oDataProvider.attachDataRequested(function(){this._onDataRequested()}.bind(this));this._oDataProvider.attachDataChanged(function(e){this._updateModel(e.getParameter("data"));this._onDataRequestComplete()}.bind(this));this._oDataProvider.attachError(function(e){this._handleError(e.getParameter("message"));this._onDataRequestComplete()}.bind(this));this._oDataProvider.triggerDataUpdate()};p.prototype._updateSelected=function(e){var t=this.getModel("filters"),i=this.getKey();t.setProperty("/"+i,{value:e.getKey(),selectedItem:{title:e.getText(),key:e.getKey()}})};p.prototype._createSelect=function(){var e=new s,t,i,a="/",r=this.getConfig();e.attachChange(function(e){var t=e.getParameter("selectedItem").getKey();this.setValue(t);this._updateSelected(e.getParameter("selectedItem"))}.bind(this));if(r&&r.item){a=r.item.path||a}if(r&&r.item&&r.item.template){t=r.item.template.key;i=r.item.template.title}if(r&&r.items){t="{key}";i="{title}";this.setModel(new d(r.items))}e.bindItems({path:a,template:new n({key:t,text:i})});e.setSelectedKey(this.getValue());return e};return p});