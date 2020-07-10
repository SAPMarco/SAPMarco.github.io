/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/ui/thirdparty/jquery"],function(e,t){"use strict";var n={};n.sContentPathPrefix="/sap/bc/lrep/content";n.sGetXcsrfTokenUrl="/sap/bc/lrep/actions/getcsrftoken/";n._sXcsrfToken=undefined;n.getContent=function(e,t,r,i,s){var o=this;var u=new Promise(function(u,f){t=encodeURI(t);var a=o._getLayerSuffix(e);var c=o._getContextSuffix(a,i,r);var d=n.sContentPathPrefix+(t?"":"/")+t+a+c;o._sendContentRequest(d,u,f,s)});return u};n.saveFile=function(e,t,r,i,s,o,u){return new Promise(function(f,a){if(!e||t===undefined||!r||!i){a()}var c=t+r+"."+i;c=encodeURI(c);var d=this._getLayerSuffix(e);var _=this._getChangeListSuffix(o);var p=this._getPackageSuffix(u);var g=n.sContentPathPrefix+c+d+_+p;this._getTokenAndSendPutRequest(g,s,f,a)}.bind(this))};n.deleteFile=function(e,t,r,i,s){return new Promise(function(o,u){if(!e||t===undefined||!r||!i){u()}var f=t+r+"."+i;f=encodeURI(f);var a=this._getLayerSuffix(e);var c=this._getChangeListSuffix(s);var d=n.sContentPathPrefix+f+a+c;this._getTokenAndSendDeletionRequest(d,o,u)}.bind(this))};n._getXcsrfToken=function(){var r=this;return new Promise(function(i,s){if(r._sXcsrfToken){i(r._sXcsrfToken)}t.ajax({url:n.sGetXcsrfTokenUrl,type:"HEAD",beforeSend:function(t){t.setRequestHeader("X-CSRF-Token","fetch");var n=e.getClient();if(n){t.setRequestHeader("sap-client",n)}},success:function(e,t,n){r._sXcsrfToken=n.getResponseHeader("x-csrf-token");i(r._sXcsrfToken)},error:function(e,t,r){n._reportError(e,t,r);s(r)}})})};n._getLayerSuffix=function(e){if(e==="All"){return""}return"?layer="+e};n._getChangeListSuffix=function(e){return e?"&changelist="+e:""};n._getPackageSuffix=function(e){return e?"&package="+e:""};n._getContextSuffix=function(e,t,n){var r="";if(!t){r+=e?"&":"?";r+="dt=true"}if(n){r+=e||r?"&":"?";r+="metadata=true"}return r};n._reportError=function(e,t,n){sap.ui.require(["sap/ui/fl/support/apps/contentbrowser/utils/ErrorUtils"],function(r){r.displayError("Error",e.status,t+": "+n)})};n._sendContentRequest=function(e,r,i,s){var o={url:e,type:"GET",success:function(e){r(e)},error:function(e,t,r){n._reportError(e,t,r);i(r)}};if(s){o.dataType="text"}t.ajax(o)};n._getTokenAndSendPutRequest=function(e,t,r,i){var s=this;n._getXcsrfToken().then(function(n){s._sendPutRequest(n,e,t,r,i)})};n._sendPutRequest=function(e,r,i,s,o){t.ajax({url:r,contentType:"text/plain",dataType:"text",data:i,beforeSend:function(t){t.setRequestHeader("X-CSRF-Token",e)},type:"PUT",success:function(){s()},error:function(e,t,r){n._reportError(e,t,r);o(r)}})};n._getTokenAndSendDeletionRequest=function(e,t,n){var r=this;this._getXcsrfToken().then(function(i){r._sendDeletionRequest(i,e,t,n)})};n._sendDeletionRequest=function(e,r,i,s){t.ajax({url:r,beforeSend:function(t){t.setRequestHeader("X-CSRF-Token",e)},type:"DELETE",success:function(e){i(e)},error:function(e,t,r){n._reportError(e,t,r);s(r)}})};return n});