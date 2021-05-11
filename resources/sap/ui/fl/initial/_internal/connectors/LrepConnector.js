/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/connectors/Utils","sap/ui/fl/Utils","sap/ui/dom/includeScript"],function(e,i,t){"use strict";var n={DATA:"/flex/data/",MODULES:"/flex/modules/"};return{layers:["ALL"],xsrfToken:undefined,settings:undefined,_loadModules:function(e){return new Promise(function(i,n){t(e,undefined,i,n)})},_addClientInfo:function(e){var t=i.getUrlParameter("sap-client");if(!e&&t){e={}}if(t){e["sap-client"]=t}},loadFlexData:function(i){if(i.cacheKey==="<NO CHANGES>"){return Promise.resolve()}var t={};this._addClientInfo(t);e.addLanguageInfo(t);var s;if(i.appDescriptor&&i.appDescriptor["sap.app"]){s=i.appDescriptor["sap.app"].id}var a=e.getUrl(n.DATA,i,t);return e.sendRequest(a,"GET",{xsrfToken:this.xsrfToken,siteId:i.siteId,sAppDescriptorId:s}).then(function(s){var a=s.response;if(s.xsrfToken){this.xsrfToken=s.xsrfToken}if(s.etag){a.cacheKey=s.etag}else if(i.cacheKey){a.cacheKey=i.cacheKey}a.changes=a.changes.concat(a.compVariants||[]);if(a.settings){this.settings=a.settings;this.settings.isVariantAdaptationEnabled=!!this.settings.isPublicLayerAvailable}if(!a.loadModules){return a}var r=e.getUrl(n.MODULES,i,t);return this._loadModules(r).then(function(){return a})}.bind(this))}}});