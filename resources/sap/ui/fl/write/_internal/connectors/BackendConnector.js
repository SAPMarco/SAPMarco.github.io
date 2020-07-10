/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/connectors/BaseConnector","sap/ui/fl/apply/_internal/connectors/BackendConnector","sap/ui/fl/apply/_internal/connectors/Utils","sap/ui/fl/write/_internal/connectors/Utils","sap/base/util/restricted/_pick"],function(e,t,n,r,s,a){"use strict";function i(e){var t={};if(e.draft){t.parentVersion=""}if(this.isLanguageInfoRequired){r.addLanguageInfo(t)}var n=r.getUrl(this.ROUTES.CHANGES,e,t);delete e.fileName;delete t["sap-language"];var a=r.getUrl(this.ROUTES.TOKEN,e,t);var i=s.getRequestOptions(this.applyConnector,a,e.flexObjects||e.flexObject,"application/json; charset=utf-8","json");return s.sendRequest(n,e.method,i)}function o(e){e.fileName=e.flexObject.fileName;return i.call(this,e)}var l=e({},t,{xsrfToken:null,reset:function(e){var t=["reference","appVersion","generator"];var n=a(e,t);if(e.selectorIds){n.selector=e.selectorIds}if(e.changeTypes){n.changeType=e.changeTypes}delete e.reference;var i=r.getUrl(this.ROUTES.CHANGES,e,n);var o=r.getUrl(this.ROUTES.TOKEN,e);var l=s.getRequestOptions(this.applyConnector,o);return s.sendRequest(i,"DELETE",l)},write:function(e){e.method="POST";return i.call(this,e)},update:function(e){e.method="PUT";return o.call(this,e)},remove:function(e){var t={namespace:e.flexObject.namespace};e.fileName=e.flexObject.fileName;var n=r.getUrl(this.ROUTES.CHANGES,e,t);delete e.fileName;var a=r.getUrl(this.ROUTES.TOKEN,e);var i=s.getRequestOptions(this.applyConnector,a,undefined,"application/json; charset=utf-8","json");return s.sendRequest(n,"DELETE",i)},loadFeatures:function(e){if(this.applyConnector.settings){return Promise.resolve({response:this.applyConnector.settings})}var t=r.getUrl(this.ROUTES.SETTINGS,e);return r.sendRequest(t).then(function(e){return e.response})}});l.applyConnector=n;return l},true);