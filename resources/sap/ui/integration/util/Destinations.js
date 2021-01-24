/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/base/Log","sap/ui/integration/util/Utils"],function(t,e,r){"use strict";var i=/\{\{destinations.([^\}]+)/;var n=t.extend("sap.ui.integration.util.Destinations",{metadata:{library:"sap.ui.integration"},constructor:function(e,r){t.call(this);this._oHost=e;this._oConfiguration=r;this._mResolved=new Map}});n.prototype.setHost=function(t){this._oHost=t;this._mResolved.clear()};n.prototype.process=function(t){var e=t.url,r;if(!e||typeof e!=="string"){return Promise.resolve(t)}if(!this.hasDestination(e)){return Promise.resolve(t)}r=jQuery.extend(true,{},t);return this.processString(e).then(function(t){r.url=t;return r})};n.prototype.getUrl=function(t){var e;if(this._mResolved.has(t)){return this._mResolved.get(t)}e=this._resolveUrl(t);this._mResolved.set(t,e);return e};n.prototype._resolveUrl=function(t){var i=this._oConfiguration?this._oConfiguration[t]:null,n,o,s;if(!i){return Promise.reject("Configuration for destination '"+t+"' was not found in the manifest.")}n=i.name;o=i.defaultUrl;if(!n&&!o){return Promise.reject("Can not resolve destination '"+t+"'. Neither 'name' nor 'defaultUrl' is configured.")}if(!n&&o){return Promise.resolve(o)}if(!this._oHost&&!o){return Promise.reject("Can not resolve destination '"+t+"'. There is no 'host' and no defaultUrl specified.")}if(!this._oHost&&o){return Promise.resolve(o)}s=r.timeoutPromise(this._oHost.getDestination(n));if(o){return s.catch(function(t){e.error(t+" Fallback to default url.");return o})}return s};n.prototype.hasDestination=function(t){return!!t.match(i)};n.prototype.processString=function(t){var e=t.match(i),r;if(!e){return Promise.resolve(t)}r=e[1];return this.getUrl(r).then(function(e){return this._replaceUrl(t,r,e)}.bind(this))};n.prototype._replaceUrl=function(t,e,r){var i=r.trim().replace(/\/$/,"");return t.replace("{{destinations."+e+"}}",i)};return n});