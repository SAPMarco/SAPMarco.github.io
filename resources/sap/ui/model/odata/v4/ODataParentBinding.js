/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ODataBinding","./SubmitMode","./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/ChangeReason"],function(e,t,n,r,o,i){"use strict";function s(){e.call(this);this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.aChildCanUseCachePromises=[];this.iPatchCounter=0;this.bPatchSuccess=true;this.oReadGroupLock=undefined;this.oRefreshPromise=null;this.oResumePromise=undefined}e(s.prototype);var a="sap.ui.model.odata.v4.ODataParentBinding";s.prototype.attachPatchCompleted=function(e,t){this.attachEvent("patchCompleted",e,t)};s.prototype.detachPatchCompleted=function(e,t){this.detachEvent("patchCompleted",e,t)};s.prototype.firePatchCompleted=function(e){if(this.iPatchCounter===0){throw new Error("Completed more PATCH requests than sent")}this.iPatchCounter-=1;this.bPatchSuccess=this.bPatchSuccess&&e;if(this.iPatchCounter===0){this.fireEvent("patchCompleted",{success:this.bPatchSuccess});this.bPatchSuccess=true}};s.prototype.attachPatchSent=function(e,t){this.attachEvent("patchSent",e,t)};s.prototype.detachPatchSent=function(e,t){this.detachEvent("patchSent",e,t)};s.prototype.firePatchSent=function(){this.iPatchCounter+=1;if(this.iPatchCounter===1){this.fireEvent("patchSent")}};s.prototype._findEmptyPathParentContext=function(e){if(this.sPath===""&&this.oContext.getBinding){return this.oContext.getBinding()._findEmptyPathParentContext(this.oContext)}return e};s.prototype.aggregateQueryOptions=function(e,t,r){var o=n.merge({},this.mAggregatedQueryOptions,this.mLateQueryOptions),i=false,s=this;function a(e,t,n,o,h){function u(o){var h=!e.$expand[o],u=n+"/"+o;if(h){e.$expand[o]={};if(r&&s.oModel.getMetaModel().fetchObject(u).getResult().$isCollection){return false}i=true}return a(e.$expand[o],t.$expand[o],u,true,h)}function c(t){if(e.$select.indexOf(t)<0){i=true;e.$select.push(t)}return true}return(!o||Object.keys(e).every(function(e){return e in t||e==="$count"||e==="$expand"||e==="$select"}))&&Object.keys(t).every(function(n){switch(n){case"$count":if(t.$count){e.$count=true}return true;case"$expand":e.$expand=e.$expand||{};return Object.keys(t.$expand).every(u);case"$select":e.$select=e.$select||[];return t.$select.every(c);default:if(h){e[n]=t[n];return true}return t[n]===e[n]}})}if(a(o,e,t)){if(!r){this.mAggregatedQueryOptions=o}else if(i){this.mLateQueryOptions=o}return true}return false};s.prototype.changeParameters=function(e){var t=Object.assign({},this.mParameters),r,o,s=this;function a(t){if(s.oModel.bAutoExpandSelect&&t in e){throw new Error("Cannot change $expand or $select parameter in "+"auto-$expand/$select mode: "+t+"="+JSON.stringify(e[t]))}}function h(e){if(e==="$filter"||e==="$search"){r=i.Filter}else if(e==="$orderby"&&r!==i.Filter){r=i.Sort}else if(!r){r=i.Change}}if(!e){throw new Error("Missing map of binding parameters")}a("$expand");a("$select");if(this.hasPendingChanges()){throw new Error("Cannot change parameters due to pending changes")}for(o in e){if(o.startsWith("$$")){throw new Error("Unsupported parameter: "+o)}if(e[o]===undefined&&t[o]!==undefined){h(o);delete t[o]}else if(t[o]!==e[o]){h(o);if(typeof e[o]==="object"){t[o]=n.clone(e[o])}else{t[o]=e[o]}}}if(r){this.applyParameters(t,r)}};s.prototype.checkUpdateInternal=function(e){var t=this;function n(){return o.all(t.getDependentBindings().map(function(e){return e.checkUpdateInternal()}))}if(e!==undefined){throw new Error("Unsupported operation: "+a+"#checkUpdateInternal must not"+" be called with parameters")}return this.oCachePromise.then(function(e){if(e&&t.bRelative){return t.fetchResourcePath(t.oContext).then(function(r){if(e.$resourcePath===r){return n()}return t.refreshInternal("")})}return n()})};s.prototype.createInCache=function(e,t,r,o,i,s,a){var h=this;return this.oCachePromise.then(function(u){if(u){return u.create(e,t,r,o,i,s,a).then(function(e){if(u.$resourcePath){delete h.mCacheByResourcePath[u.$resourcePath]}return e})}return h.oContext.getBinding().createInCache(e,t,n.buildPath(h.oContext.iIndex,h.sPath,r),o,i,s,a)})};s.prototype.createReadGroupLock=function(e,t,n){var o,i=this;function s(){i.oModel.addPrerenderingTask(function(){n-=1;if(n>0){Promise.resolve().then(s)}else if(i.oReadGroupLock===o){r.debug("Timeout: unlocked "+o,null,a);i.removeReadGroupLock()}})}this.removeReadGroupLock();this.oReadGroupLock=o=this.lockGroup(e,t);if(t){n=2+(n||0);s()}};s.prototype.createRefreshPromise=function(){var e,t;e=new Promise(function(e){t=e});e.$resolve=t;this.oRefreshPromise=e;return e};s.prototype.deleteFromCache=function(e,t,r,o,i){var s;if(this.oCache===undefined){throw new Error("DELETE request not allowed")}if(this.oCache){s=e.getGroupId();if(!this.oModel.isAutoGroup(s)&&!this.oModel.isDirectGroup(s)){throw new Error("Illegal update group ID: "+s)}return this.oCache._delete(e,t,r,o,i)}return this.oContext.getBinding().deleteFromCache(e,t,n.buildPath(this.oContext.iIndex,this.sPath,r),o,i)};s.prototype.destroy=function(){this.aChildCanUseCachePromises=[];this.removeReadGroupLock();this.oResumePromise=undefined;e.prototype.destroy.call(this)};s.prototype.fetchIfChildCanUseCache=function(e,t,i){var s=this.getBaseForPathReduction(),h,u,c,d,p=t[0]==="#",f=this.oModel.getMetaModel(),g,l=this.oModel.resolve(t,e),P=e.iReturnValueContextId?e.getPath():this.oModel.resolve(this.sPath,this.oContext),y=P.indexOf("(...)")>=0,m=this;function C(){if(p){return f.fetchObject(d.slice(0,d.lastIndexOf("/")+1))}return n.fetchPropertyAndType(m.oModel.oInterface.fetchMetadata,d)}if(y&&!l.includes("/$Parameter/")||this.getRootBinding().isSuspended()||this.mParameters&&this.mParameters.$$aggregation){return o.resolve(l)}u=this.oCachePromise.isRejected()||this.oCache===null||this.oCache&&this.oCache.bSentRequest;h=f.getMetaPath(e.getPath());d=f.getMetaPath(l);g=[this.doFetchQueryOptions(this.oContext),C(),i];c=o.all(g).then(function(e){var c,g=e[2],C,v=e[0],R=e[1],O;if(Array.isArray(R)){return undefined}O=f.getReducedPath(l,s);if(t==="$count"||t.endsWith("/$count")||t[0]==="@"){return o.resolve(O)}if(n.getRelativePath(O,P)===undefined){return m.oContext.getBinding().fetchIfChildCanUseCache(m.oContext,n.getRelativePath(l,m.oContext.getPath()),i)}if(y){return o.resolve(O)}c=n.getRelativePath(n.getMetaPath(O),h);if(m.bAggregatedQueryOptionsInitial){m.selectKeyProperties(v,h);m.mAggregatedQueryOptions=n.clone(v);m.bAggregatedQueryOptionsInitial=false}if(p){C={$select:[c.slice(1)]};return m.aggregateQueryOptions(C,h,u)?O:undefined}if(c===""||R&&(R.$kind==="Property"||R.$kind==="NavigationProperty")){C=n.wrapChildQueryOptions(h,c,g,m.oModel.oInterface.fetchMetadata);if(C){return m.aggregateQueryOptions(C,h,u)?O:undefined}return undefined}if(c==="value"){return m.aggregateQueryOptions(g,h,u)?O:undefined}r.error("Failed to enhance query options for auto-$expand/$select as the path '"+d+"' does not point to a property",JSON.stringify(R),a);return undefined}).then(function(e){if(m.mLateQueryOptions){if(m.oCache){m.oCache.setLateQueryOptions(m.mLateQueryOptions)}else{return m.oContext.getBinding().fetchIfChildCanUseCache(m.oContext,m.sPath,o.resolve(m.mLateQueryOptions)).then(function(t){return t&&e})}}return e});this.aChildCanUseCachePromises.push(c);this.oCachePromise=o.all([this.oCachePromise,c]).then(function(t){var r=t[0];if(r&&!r.bSentRequest&&!m.oOperation){if(r.bSharedRequest){r.setActive(false);r=m.createAndSetCache(m.mAggregatedQueryOptions,r.sResourcePath,e)}else{r.setQueryOptions(n.merge({},m.oModel.mUriParameters,m.mAggregatedQueryOptions))}}return r});this.oCachePromise.catch(function(e){m.oModel.reportError(m+": Failed to enhance query options for "+"auto-$expand/$select for child "+t,a,e)});return c};s.prototype.fetchResolvedQueryOptions=function(e){var t,r,i,s=this.oModel,a=this.getQueryOptionsFromParameters();if(!(s.bAutoExpandSelect&&a.$select)){return o.resolve(a)}t=s.oInterface.fetchMetadata;i=n.getMetaPath(s.resolve(this.sPath,e));r=Object.assign({},a,{$select:[]});return o.all(a.$select.map(function(e){return n.fetchPropertyAndType(t,i+"/"+e).then(function(){var o=n.wrapChildQueryOptions(i,e,{},t);if(o){n.aggregateQueryOptions(r,o)}else{n.addToSelect(r,[e])}})})).then(function(){return r})};s.prototype.getBaseForPathReduction=function(){var e,n;if(!this.isRoot()){e=this.oContext.getBinding();n=e.getUpdateGroupId();if(n===this.getUpdateGroupId()||this.oModel.getGroupProperty(n,"submit")!==t.API){return e.getBaseForPathReduction()}}return this.oModel.resolve(this.sPath,this.oContext)};s.prototype.getCacheQueryOptions=function(){return this.mCacheQueryOptions||n.getQueryOptionsForPath(this.oContext.getBinding().getCacheQueryOptions(),this.sPath)};s.prototype.getQueryOptionsForPath=function(e,t){if(Object.keys(this.mParameters).length){return n.getQueryOptionsForPath(this.getQueryOptionsFromParameters(),e)}t=t||this.oContext;if(!this.bRelative||!t.getQueryOptionsForPath){return{}}return t.getQueryOptionsForPath(n.buildPath(this.sPath,e))};s.prototype.getResumePromise=function(){return this.oResumePromise};s.prototype.hasPendingChangesInDependents=function(){var e=this.getDependentBindings();return e.some(function(e){var t=e.oCache,n;if(t!==undefined){if(t&&t.hasPendingChangesForPath("")){return true}}else if(e.hasPendingChangesForPath("")){return true}if(e.mCacheByResourcePath){n=Object.keys(e.mCacheByResourcePath).some(function(t){return e.mCacheByResourcePath[t].hasPendingChangesForPath("")});if(n){return true}}return e.hasPendingChangesInDependents()})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.oModel.resolve(this.sPath,this.oContext).slice(1))};s.prototype.isPatchWithoutSideEffects=function(){return this.mParameters.$$patchWithoutSideEffects||!this.isRoot()&&this.oContext&&this.oContext.getBinding().isPatchWithoutSideEffects()};s.prototype.isMeta=function(){return false};s.prototype.refreshDependentBindings=function(e,t,n,r){return o.all(this.getDependentBindings().map(function(o){return o.refreshInternal(e,t,n,r)}))};s.prototype.removeReadGroupLock=function(){if(this.oReadGroupLock){this.oReadGroupLock.unlock(true);this.oReadGroupLock=undefined}};s.prototype.refreshSuspended=function(e){if(e&&e!==this.getGroupId()){throw new Error(this+": Cannot refresh a suspended binding with group ID '"+e+"' (own group ID is '"+this.getGroupId()+"')")}this.setResumeChangeReason(i.Refresh)};s.prototype.resetChangesInDependents=function(e){this.getDependentBindings().forEach(function(t){e.push(t.oCachePromise.then(function(e){if(e){e.resetChangesForPath("")}t.resetInvalidDataState()}).unwrap());if(t.mCacheByResourcePath){Object.keys(t.mCacheByResourcePath).forEach(function(e){t.mCacheByResourcePath[e].resetChangesForPath("")})}t.resetChangesInDependents(e)})};s.prototype.resolveRefreshPromise=function(e){if(this.oRefreshPromise){this.oRefreshPromise.$resolve(e);this.oRefreshPromise=null}return e};s.prototype._resume=function(e){var t=this;function n(){t.bSuspended=false;if(t.oResumePromise){t.resumeInternal(true);t.oResumePromise.$resolve();t.oResumePromise=undefined}}if(this.oOperation){throw new Error("Cannot resume an operation binding: "+this)}if(!this.isRoot()){throw new Error("Cannot resume a relative binding: "+this)}if(!this.bSuspended){throw new Error("Cannot resume a not suspended binding: "+this)}if(e){this.createReadGroupLock(this.getGroupId(),true,1);this.oModel.addPrerenderingTask(n)}else{this.createReadGroupLock(this.getGroupId(),true);n()}};s.prototype.resume=function(){this._resume(false)};s.prototype.resumeAsync=function(){this._resume(true);return Promise.resolve(this.oResumePromise)};s.prototype.selectKeyProperties=function(e,t){n.selectKeyProperties(e,this.oModel.getMetaModel().getObject(t+"/"))};s.prototype.suspend=function(){var e;if(this.oOperation){throw new Error("Cannot suspend an operation binding: "+this)}if(!this.isRoot()){throw new Error("Cannot suspend a relative binding: "+this)}if(this.bSuspended){throw new Error("Cannot suspend a suspended binding: "+this)}if(this.hasPendingChanges()){throw new Error("Cannot suspend a binding with pending changes: "+this)}this.bSuspended=true;this.oResumePromise=new o(function(t,n){e=t});this.oResumePromise.$resolve=e;this.removeReadGroupLock();this.suspendInternal()};s.prototype.suspendInternal=function(){this.sResumeChangeReason=this.oCache===undefined||this.oCache&&(!this.oCache.bSentRequest||this.oCache.bSharedRequest)?i.Change:undefined;this.getDependentBindings().forEach(function(e){e.suspendInternal()})};s.prototype.updateAggregatedQueryOptions=function(e){var t=Object.keys(e),n=this;if(this.mAggregatedQueryOptions){t=t.concat(Object.keys(this.mAggregatedQueryOptions));t.forEach(function(t){if(n.bAggregatedQueryOptionsInitial||t!=="$select"&&t!=="$expand"){if(e[t]===undefined){delete n.mAggregatedQueryOptions[t]}else{n.mAggregatedQueryOptions[t]=e[t]}}})}};s.prototype.visitSideEffects=function(e,t,r,o,i,s){var a=r?this.oModel.getDependentBindings(r):this.getDependentBindings();a.forEach(function(r){var a=n.buildPath(s,n.getMetaPath(r.getPath())),h;if(r.oCache){h=n.stripPathPrefix(a,t);if(h.length){i.push(r.requestSideEffects(e,h))}}else if(o[a]){i.push(r.refreshInternal("",e))}else{r.visitSideEffects(e,t,null,o,i,a)}})};function h(e){if(this){s.apply(this,arguments)}else{Object.assign(e,s.prototype)}}h.prototype.doDeregisterChangeListener=s.prototype.doDeregisterChangeListener;h.prototype.doSetProperty=s.prototype.doSetProperty;h.prototype.destroy=s.prototype.destroy;h.prototype.hasPendingChangesForPath=s.prototype.hasPendingChangesForPath;return h},false);