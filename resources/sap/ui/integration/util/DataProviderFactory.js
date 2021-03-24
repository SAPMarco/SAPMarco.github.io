/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/integration/util/ServiceDataProvider","sap/ui/integration/util/RequestDataProvider","sap/ui/integration/util/DataProvider","sap/ui/integration/util/ExtensionDataProvider","sap/ui/integration/util/JSONBindingHelper","sap/ui/integration/util/BindingHelper"],function(i,t,e,s,r,n,o){"use strict";var a=i.extend("sap.ui.integration.util.DataProviderFactory",{constructor:function(t,e,s){i.call(this);this._oDestinations=t;this._oExtension=e;this._oCard=s;this._aDataProviders=[];this._aFiltersProviders=[]}});a.prototype.destroy=function(){i.prototype.destroy.apply(this,arguments);if(this._aDataProviders){this._aDataProviders.forEach(function(i){if(!i.bIsDestroyed){i.destroy()}});this._aDataProviders=null;this._aFiltersProviders=null}this._oCard=null;this._oExtension=null;this._bIsDestroyed=true};a.prototype.isDestroyed=function(){return this._bIsDestroyed};a.prototype.create=function(i,a,u){var d=this._oCard,l,p;if(!i){return null}l={card:d,settingsJson:n.createJsonWithBindingInfos(i,d.getBindingNamespaces())};if(i.request){p=new e(l)}else if(i.service){p=new t(l)}else if(i.json){p=new s(l)}else if(i.extension){p=new r(l,this._oExtension)}else{return null}o.propagateModels(d,p);p.bindObject("/");p.setDestinations(this._oDestinations);if(p.isA("sap.ui.integration.util.IServiceDataProvider")){p.createServiceInstances(a)}this._aDataProviders.push(p);if(u){this._aFiltersProviders.push(p)}else{p.setDependencies(this._aFiltersProviders)}return p};a.prototype.remove=function(i){var t=this._aDataProviders.indexOf(i);if(t>-1){this._aDataProviders.splice(t,1)}if(i&&!i.bDestroyed&&i._bIsDestroyed){i.destroy()}};return a});