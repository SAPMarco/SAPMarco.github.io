/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/base/EventProvider","sap/ui/base/ManagedObjectObserver","sap/ui/Device","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,a,i,n,o){"use strict";var r=new t,s,d;var g=e.extend("HeaderAdapter",{constructor:function(e,t){if(!e||!t){n.error("Cannot initialize: Invalid arguments.");return}this._oHeader=e;this._oStyledPage=null;this._oTitleInfo=null;this._oSubTitleInfo=null;this._oBackButtonInfo=null;this._oAdaptOptions=t}});g.prototype.adapt=function(){var e=this._oAdaptOptions.bStylePage,t=this._oAdaptOptions.bCollapseHeader;if(e){this._toggleStyle("sapF2Adapted",true,true)}this._adaptTitle();this._adaptBackButton();if(t){this._collapseHeader()}return this.getAdaptedContent()};g.prototype.getAdaptedContent=function(){return{oTitleInfo:this._oTitleInfo,oSubTitleInfo:this._oSubTitleInfo,oBackButtonInfo:this._oBackButtonInfo,oStyledPage:this._oStyledPage}};g.prototype._adaptTitle=function(){if(!g._isAdaptableHeader(this._oHeader)||this._oAdaptOptions.bMoveTitle!==true){return false}this._oTitleInfo=this._detectTitle();this._oSubTitleInfo=this._detectSubTitle();var e=!!this._oTitleInfo||!!this._oSubTitleInfo;if(this._oTitleInfo){this._oTitleInfo.oControl.toggleStyleClass("sapF2AdaptedTitle",true)}return e};g.prototype._adaptBackButton=function(){if(!g._isAdaptableHeader(this._oHeader)||this._oAdaptOptions.bHideBackButton!==true){return false}var e,t=false;this._oBackButtonInfo=this._detectBackButton();if(this._oBackButtonInfo){e=this._oBackButtonInfo.oControl.getVisible();this._oBackButtonInfo.oControl.toggleStyleClass("sapF2AdaptedNavigation",e);t=true}return t};g.prototype._toggleStyle=function(e,t,a){var i=this._oHeader.getParent();if(!i){return}this._oStyledPage=i;if(t===true){i.addStyleClass(e,a)}else if(t===false){i.removeStyleClass(e,a)}else if(t===undefined){i.hasStyleClass(e)?i.removeStyleClass(e,a):i.addStyleClass(e,a)}};g._isAdaptableHeader=function(e){if(!e||!h(e,"sap/m/Bar")){return false}var t=e.getParent();return t&&(h(t,"sap/m/Page")||h(t,"sap/m/MessagePage")||h(t,"sap/uxap/ObjectPageHeader"))};g.prototype._detectTitle=function(){var e;if(g._isAdaptableHeader(this._oHeader)){var t=this._oHeader.getContentMiddle();if(t.length===1&&l(t[0])){var a=t[0];e={id:a.getId(),text:a.getText(),oControl:a,sChangeEventId:"_change",sPropertyName:"text"}}}return e};g.prototype._detectSubTitle=function(e){if(h(e,"sap/uxap/ObjectPageHeader")){var t=e.getHeaderTitle();if(t){return{id:t.getId(),text:t.getObjectTitle(),oControl:t,sChangeEventId:"_titleChange",sPropertyName:"objectTitle"}}}};g.prototype._detectBackButton=function(){var e,t;if(g._isAdaptableHeader(this._oHeader)){e=this._oHeader.getContentLeft();if(e.length>0&&h(e[0],"sap/m/Button")&&(e[0].getType()==="Back"||e[0].getType()==="Up"||e[0].getIcon()==="sap-icon://nav-back")){t=e[0];return{id:t.getId(),oControl:t,sChangeEventId:"_change",sPropertyName:"visible"}}}};g.prototype._collapseHeader=function(){var e=this._oTitleInfo,t=this._oBackButtonInfo,a,i,n,o,r,s,d;if(g._isAdaptableHeader(this._oHeader)){a=this._oHeader.getContentLeft();i=this._oHeader.getContentMiddle();n=this._oHeader.getContentRight();o=a.length===1&&(_(a[0])||t);r=i.length===1&&(_(i[0])||e);s=n.length===1&&_(n[0]);d=(a.length===0||o)&&(i.length===0||r)&&(n.length===0||s);this._toggleStyle("sapF2CollapsedHeader",d,true)}};var u=e.extend("sap.m.Fiori20Adapter",{});u.attachViewChange=function(e,t){r.attachEvent("adaptedViewChange",e,t)};u.detachViewChange=function(e,t){r.detachEvent("adaptedViewChange",e,t)};u.traverse=function(e,t){s={aViewTitles:{},aViewSubTitles:{},aViewBackButtons:{},aChangeListeners:{}};d=null;this._doBFS([{oNode:e,oAdaptOptions:t}]);if(this._getCurrentlyAdaptedTopViewId()){this._fireViewChange(this._getCurrentlyAdaptedTopViewId(),t)}};u._doBFS=function(e){var t=e.shift();if(!t){return}var a=t.oNode,i=t.oAdaptOptions,n=i.iSearchDepth;i=this._applyRules(i,a);if(!this._isAdaptationRequired(a,i)||n<=0){return}var r=this._isTopNavigableView(a);if(r){this._setAsCurrentlyAdaptedTopViewId(a.getId())}var s=this._processNode(a,i);var d=this._getNodeChildren(a),g=o.extend({},i,{iSearchDepth:this._updateSearchDepth(n,a)});if(s){var u=!!s.oTitleInfo,l=!!s.oBackButton,p=!!s.oStyledPage;g=o.extend(g,{bMoveTitle:i.bMoveTitle&&!u,bHideBackButton:i.bHideBackButton&&!l,bStylePage:i.bStylePage&&!p})}d.forEach(function(t){if(t){e.push({oNode:t,oAdaptOptions:g})}});this._doBFS(e)};u._processNode=function(e,t){this._attachDefferedAdaptationListeners(e,t);if(g._isAdaptableHeader(e)){return this._adaptHeader(e,t)}if(e.getParent()&&h(e.getParent(),"sap/m/NavContainer")){return this._getCachedViewInfoToMerge(e.getId())}};u._attachDefferedAdaptationListeners=function(e,t){this._attachAdaptableContentChange(e,t);this._attachNavigablePageChange(e,t);if(h(e,"sap/m/Page")||h(e,"sap/ui/core/mvc/XMLView")){this._attachModifyAggregation(e,"content",t)}if(t.bLateAdaptation===true&&h(e,"sap/m/Bar")){this._attachModifyAggregation(e,"contentLeft",t,e);this._attachModifyAggregation(e,"contentMiddle",t,e);this._attachModifyAggregation(e,"contentRight",t,e)}if(h(e,"sap/ui/core/ComponentContainer")){var a=e.getComponentInstance();if(!a&&e.getName()&&!e.getDomRef()){var i=this;var n={onBeforeRendering:function(){e.removeEventDelegate(n);i._doBFS([{oNode:e.getComponentInstance(),oAdaptOptions:t}]);if(i._getCurrentlyAdaptedTopViewId()){i._fireViewChange(i._getCurrentlyAdaptedTopViewId(),t)}}};e.addEventDelegate(n,this)}}};u._checkHasListener=function(e){return s.aChangeListeners[e]};u._setHasListener=function(e,t){s.aChangeListeners[e]=t};u._attachAdaptableContentChange=function(e,t){if(!e._getAdaptableContent||!o.isFunction(e._getAdaptableContent)){return}var a=e.getId()+"_adaptableContentChange";if(this._checkHasListener(a)){return}var i=this._getCurrentlyAdaptedTopViewId();var n=function(e){var a=e.getParameter("adaptableContent");this._setAsCurrentlyAdaptedTopViewId(i);this._doBFS([{oNode:a,oAdaptOptions:t}]);if(this._getCurrentlyAdaptedTopViewId()){this._fireViewChange(this._getCurrentlyAdaptedTopViewId(),t)}}.bind(this);e.attachEvent("_adaptableContentChange",n);this._setHasListener(a,n)};u._attachNavigablePageChange=function(e,t){if(!h(e,"sap/m/NavContainer")){return}var a=e.getId()+"navigate";if(this._checkHasListener(a)){return}var i=function(e){var a=e.getParameter("to");t=this._applyRules(t,a);this._doBFS([{oNode:a,oAdaptOptions:t}]);if(this._getCurrentlyAdaptedTopViewId()){this._fireViewChange(this._getCurrentlyAdaptedTopViewId(),t)}}.bind(this);e.attachNavigate(i);this._setHasListener(a,i)};u._attachModifyAggregation=function(e,t,i,n){var o=e.getId()+t;if(this._checkHasListener(o)){return}var r=this._getCurrentlyAdaptedTopViewId(),s=function(e){var t=e.mutation,a=e.object;if(t==="add"||t==="insert"){this._setAsCurrentlyAdaptedTopViewId(r);this._doBFS([{oNode:n?n:a,oAdaptOptions:i}]);if(this._getCurrentlyAdaptedTopViewId()){this._fireViewChange(this._getCurrentlyAdaptedTopViewId(),i)}}}.bind(this),d=new a(s);d.observe(e,{aggregations:[t]});this._setHasListener(o,d)};u._getNodeChildren=function(e){if(e._getAdaptableContent&&o.isFunction(e._getAdaptableContent)){var t=[e._getAdaptableContent()];if(h(e,"sap/m/Page")){t=t.concat(e.getContent())}return t}if(h(e,"sap/m/SplitContainer")){return[].concat(e.getAggregation("_navMaster"),e.getAggregation("_navDetail"))}if(h(e,"sap/uxap/ObjectPageLayout")){return[e.getHeaderTitle()]}if(h(e,"sap/ui/core/ComponentContainer")){return[e.getComponentInstance()]}if(h(e,"sap/ui/core/UIComponent")){return[e.getAggregation("rootControl")]}return e.findAggregatedObjects(false,c)};u._updateSearchDepth=function(e,t){if(h(t,"sap/ui/core/mvc/View")||h(t,"sap/ui/core/Component")||h(t,"sap/ui/core/ComponentContainer")){return e}return e-1};u._getTotalCachedInfoToMerge=function(e){var t=sap.ui.getCore().byId(e),a=this._getCachedViewInfoToMerge(e),n,o,r,s,d,g,u;if(!i.system.phone&&this._isTopSplitContainerSubView(t)){g=t.getParent();d=g&&g.getParent();if(d){n=d._oMasterNav&&d._oMasterNav.getId()===g.getId();o=d._oDetailNav&&d._oDetailNav.getId()===g.getId()}}if(n){r=d.getCurrentDetailPage();s=r&&r.getId();u=this._getCachedViewInfoToMerge(s);a=this._mergeSplitViewInfos(a,u)}if(o){r=d.getCurrentMasterPage();s=r&&r.getId();u=this._getCachedViewInfoToMerge(s);a=this._mergeSplitViewInfos(u,a)}a.sViewId=n||o?d.getId():e;return a};u._isTopSplitContainerSubView=function(e){var t=e&&e.getParent();return this._isTopmostNavContainer(t)&&h(t.getParent(),"sap/m/SplitContainer")};u._mergeSplitViewInfos=function(e,t){o.each(e,function(a,i){e[a]=i||t[a]});return e};u._getCachedViewInfoToMerge=function(e){var t=s.aViewBackButtons[e]?s.aViewBackButtons[e].oControl:undefined;return{oTitleInfo:s.aViewTitles[e],oSubTitleInfo:s.aViewSubTitles[e],oBackButton:t}};u._applyRules=function(e,t){var a=t.getParent();if(h(a,"sap/m/SplitContainer")){var n=i.system.phone,r=e.bMoveTitle,s=e.bHideBackButton;if(r){r=n}if(s&&!i.system.phone){s="initialPage"}return o.extend({},e,{bMoveTitle:r,bHideBackButton:s})}if(h(a,"sap/m/NavContainer")){if(e.bHideBackButton==="initialPage"){var d=a._getActualInitialPage()&&a._getActualInitialPage().getId()===t.getId();return o.extend({},e,{bHideBackButton:d})}}if(e.bMoveTitle===false||e.bHideBackButton===false){return o.extend({},e,{bCollapseHeader:false})}return e};u._getCurrentlyAdaptedTopViewId=function(){return d};u._setAsCurrentlyAdaptedTopViewId=function(e){d=e};u._isTopNavigableView=function(e){var t=e.getParent();return t&&this._isTopmostNavContainer(t)};u._isTopmostNavContainer=function(e){var t,a=e;while(a){if(h(a,"sap/m/NavContainer")){t=a}a=a.getParent()}return t&&t.getId()===e.getId()};u._adaptHeader=function(e,t){if(!e||!t){return}var a=new g(e,t),i=a.adapt();var n=this._getCurrentlyAdaptedTopViewId();if(i.oTitleInfo){s.aViewTitles[n]=i.oTitleInfo;this._registerTextChangeListener(s.aViewTitles,n,t)}if(i.oSubTitleInfo){s.aViewSubTitles[n]=i.oSubTitleInfo;this._registerTextChangeListener(s.aViewSubTitles,n,t)}if(i.oBackButtonInfo){if(i.oBackButtonInfo.oControl.getVisible()){s.aViewBackButtons[n]=i.oBackButtonInfo}this._registerVisibilityChangeListener(i.oBackButtonInfo,s.aViewBackButtons,n,t)}return i};u._registerTextChangeListener=function(e,t,a){var i=e[t];if(i&&i.oControl&&i.sChangeEventId&&!s.aChangeListeners[i.id]){var n=function(i){var n=e[t];if(i.getParameter("name")!==n.sPropertyName){return}n.text=i.getParameter("newValue");this._fireViewChange(t,a)}.bind(this);i.oControl.attachEvent(i.sChangeEventId,n);s.aChangeListeners[i.id]=n}};u._registerVisibilityChangeListener=function(e,t,a,i){var n;if(e&&e.oControl&&e.sChangeEventId&&!s.aChangeListeners[e.id]){var r=function(r){if(r.getParameter("name")!==e.sPropertyName){return}n=r.getParameter("newValue");if(!n){o.each(t,function(a,i){if(i.oControl.getId()===e.oControl.getId()){delete t[a]}})}var s=e.oControl.getParent();if(g._isAdaptableHeader(s)){u._adaptHeader(s,i);this._fireViewChange(a,i)}}.bind(this);e.oControl.attachEvent(e.sChangeEventId,r);s.aChangeListeners[e.id]=r}};u._fireViewChange=function(e,t){var a=this._getTotalCachedInfoToMerge(e);a.oAdaptOptions=t;r.fireEvent("adaptedViewChange",a)};u._isAdaptationRequired=function(e,t){if(!e||this._isNonAdaptableControl(e)){return false}for(var a in t){if(t.hasOwnProperty(a)&&(t[a]===true||t[a]==="initialPage")){return true}}return false};u._isNonAdaptableControl=function(e){return p(e)};function l(e){return f(e,["sap/m/Label","sap/m/Text","sap/m/Title"])}function p(e){return f(e,["sap/m/List","sap/m/Table","sap/ui/table/Table","sap/ui/table/TreeTable"])}function f(e,t){if(!e||!t){return}return t.some(function(t){return h(e,t)})}function h(e,t){var a=sap.ui.require(t);return a&&e instanceof a}function c(e){return e&&e.sParentAggregationName!=="dependents"}function _(e){return e&&typeof e.getVisible==="function"&&e.getVisible()===false}return u});