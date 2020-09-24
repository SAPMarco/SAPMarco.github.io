/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/ManagedObject","sap/ui/base/Object","sap/ui/base/ObjectPool","./Control","./IntervalTrigger","./RenderManager","./Element","./ResizeHandler","./library","sap/base/assert","sap/base/Log","sap/base/util/Version","sap/base/util/uid","sap/base/util/extend","sap/base/util/deepExtend","sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery","sap/ui/events/F6Navigation","sap/ui/events/isMouseEventDelayed","sap/ui/base/EventProvider","sap/ui/dom/jquery/control","sap/ui/dom/jquery/Focusable","sap/ui/dom/jquery/rect"],function(t,e,i,o,s,n,r,a,l,u,f,h,p,d,c,_,g,y,m,v,b){"use strict";var C=u.CSSSize;var S=u.OpenState;var E;function I(){if(E){return E}var t,e;try{t=sap.ui.getCore().getStaticAreaRef();E=sap.ui.getCore().getUIArea(t)}catch(t){h.error(t);throw new Error("Popup cannot be opened because static UIArea cannot be determined.")}e=new s;E.addDependent(e);E=e.getUIArea();e.destroy();return E}var O=e.extend("sap.ui.core.Popup",{constructor:function(t,i,o,s){f(arguments.length==0||t&&typeof t==="object","oContent must be an object or there may be no arguments at all");f(i===undefined||i===true||i===false,"bModal must be true, false, or undefined");f(o===undefined||o===true||o===false,"bShadow must be true, false, or undefined");f(s===undefined||s===true||s===false,"bAutoClose must be true, false, or undefined");e.apply(this);this._popupUID=d();this.bOpen=false;this.eOpenState=S.CLOSED;this._mEvents={};this._mEvents["sap.ui.core.Popup.addFocusableContent-"+this._popupUID]=this._addFocusableArea;this._mEvents["sap.ui.core.Popup.removeFocusableContent-"+this._popupUID]=this._removeFocusableArea;this._mEvents["sap.ui.core.Popup.closePopup-"+this._popupUID]=this._closePopup;this._mEvents["sap.ui.core.Popup.onFocusEvent-"+this._popupUID]=this.onFocusEvent;this._mEvents["sap.ui.core.Popup.increaseZIndex-"+this._popupUID]=this._increaseMyZIndex;this._mEvents["sap.ui.core.Popup.contains-"+this._popupUID]=this._containsEventBusWrapper;if(t){this.setContent(t)}this._oDefaultPosition={my:O.Dock.CenterCenter,at:O.Dock.CenterCenter,of:document,offset:"0 0",collision:"flip"};this._oPosition=Object.assign({},this._oDefaultPosition);this._bModal=!!i;this._oPreviousFocus=null;this._sInitialFocusId=null;this._bShadow=typeof o==="boolean"?o:true;this._bAutoClose=!!s;this._animations={open:null,close:null};this._durations={open:"fast",close:"fast"};this._iZIndex=-1;this._oBlindLayer=null;this.setNavigationMode();if(this.touchEnabled){this._fAutoCloseHandler=function(t){if(t.isMarked("delayedMouseEvent")||t.isMarked("cancelAutoClose")){return}if(this.eOpenState===S.CLOSING||this.eOpenState===S.CLOSED){return}if(!this._contains(t.target)){this.close()}}}this._F6NavigationHandler=function(t){var e={},i=this._sF6NavMode,o;if(i=="DOCK"){if(this._bModal){i="NONE"}else if(this._oLastPosition&&this._oLastPosition.of){o=this._getOfDom(this._oLastPosition.of);if(!o||o===document){o=null;i="NONE"}}}switch(i){case"SCOPE":e.scope=this._$()[0];break;case"DOCK":e.target=o;var s=y(o).parents("[data-sap-ui-popup]");e.scope=s.length?s[0]:null;break;default:e.skip=true}m.handleF6GroupNavigation(t,e)}},metadata:{library:"sap.ui.core",publicMethods:["open","close","setContent","getContent","setPosition","setShadow","setModal","getModal","setAutoClose","setAutoCloseAreas","setExtraContent","isOpen","getAutoClose","getOpenState","setAnimations","setDurations","attachOpened","attachClosed","detachOpened","detachClosed"],associations:{childPopups:{type:"sap.ui.core.Popup",multiple:true,visibility:"hidden"}},events:{opened:{},closed:{}}}});O.prototype.getChildPopups=function(){return this.getAssociation("childPopups",[])};O.prototype.addChildPopup=function(t){return this.addAssociation("childPopups",t)};O.prototype.removeChildPopup=function(t){return this.removeAssociation("childPopups",t)};O._activateBlindLayer=true;O.blStack=[];O.Dock={BeginTop:"begin top",BeginCenter:"begin center",BeginBottom:"begin bottom",LeftTop:"left top",LeftCenter:"left center",LeftBottom:"left bottom",CenterTop:"center top",CenterCenter:"center center",CenterBottom:"center bottom",RightTop:"right top",RightCenter:"right center",RightBottom:"right bottom",EndTop:"end top",EndCenter:"end center",EndBottom:"end bottom"};O.prototype.touchEnabled=t.support.touch&&(t.browser.safari||!t.system.combi);O.prototype.preventBrowserFocus=t.support.touch&&!t.system.combi;i.extend("sap.ui.core.Popup.Layer",{constructor:function(){var t=this.getDomString();this._$Ref=y(t).appendTo(sap.ui.getCore().getStaticAreaRef())}});O.Layer.prototype.init=function(t,e){this._$Ref.css({visibility:"visible","z-index":e});this.update(t,e);this._$Ref.insertAfter(t).show()};O.Layer.prototype.update=function(t,e){if(t.length){var i=t.rect();this._$Ref.css({left:i.left,top:i.top});if(t.css("right")!="auto"&&t.css("right")!="inherit"){this._$Ref.css({right:t.css("right"),width:"auto"})}else{this._$Ref.css({width:i.width,right:"auto"})}if(t.css("bottom")!="auto"&&t.css("bottom")!="inherit"){this._$Ref.css({bottom:t.css("bottom"),height:"auto"})}else{this._$Ref.css({height:i.height,bottom:"auto"})}if(typeof e==="number"){this._$Ref.css("z-index",e)}}};O.Layer.prototype.reset=function(){if(this._$Ref.length){this._$Ref[0].style.display="none";this._$Ref[0].style.visibility="hidden";this._$Ref.appendTo(sap.ui.getCore().getStaticAreaRef())}};O.Layer.prototype.getDomString=function(){h.error("sap.ui.core.Popup.Layer: getDomString function must be overwritten!");return""};O.Layer.extend("sap.ui.core.Popup.BlindLayer",{constructor:function(){O.Layer.apply(this)}});O.BlindLayer.prototype.getDomString=function(){return'<div class="sapUiBliLy" id="sap-ui-blindlayer-'+d()+'"><iframe scrolling="no" tabIndex="-1"></iframe></div>'};O.prototype.oBlindLayerPool=new o(O.BlindLayer);O.Layer.extend("sap.ui.core.Popup.ShieldLayer",{constructor:function(){O.Layer.apply(this)}});O.ShieldLayer.prototype.getDomString=function(){return'<div class="sapUiPopupShield" id="sap-ui-shieldlayer-'+d()+'"></div>'};O.prototype.oShieldLayerPool=new o(O.ShieldLayer);(function(){var t=0;var e=Math.pow(2,32)-1;O.setInitialZIndex=function(i){if(i>=e){throw new Error("Z-index can't be higher than Number.MAX_SAFE_INTEGER")}t=Math.max(i,this.getLastZIndex())};O.getLastZIndex=function(){return t};O.prototype.getLastZIndex=function(){return O.getLastZIndex()};O.getNextZIndex=function(){t+=10;if(t>=e){throw new Error("Z-index can't be higher than Number.MAX_SAFE_INTEGER")}return t};O.prototype.getNextZIndex=function(){return O.getNextZIndex()}})();var P=function(t,e){if(!t&&e||t&&!e){return false}if(!t&&!e){return true}var i=3;var o=Math.abs(t.left-e.left);var s=Math.abs(t.top-e.top);var n=Math.abs(t.width-e.width);var r=Math.abs(t.height-e.height);if(o>i||s>i||n>i||r>i){return false}return true};O.prototype.open=function(t,e,i,o,n,r,l){f(this.oContent,"Popup content must have been set by now");if(this.eOpenState!=S.CLOSED){return}this.eOpenState=S.OPENING;var u=I(),p;this._bContentAddedToStatic=false;this._bUIAreaPatched=false;if(this.oContent instanceof s){if(!this.oContent.getParent()){u.addContent(this.oContent,true);this._bContentAddedToStatic=true}else if(!this.oContent.getUIArea()){this.oContent.getUIArea=function(){return u};this._bUIAreaPatched=true}p=this.oContent.getUIArea();if(O._bEnableUIAreaCheck&&p.getRootNode().id!==u.getRootNode().id){h.warning("The Popup content is NOT connected with the static-UIArea and may not work properly!")}}if(typeof t=="string"){l=r;r=n;n=o;o=i;i=e;e=t;t=-1}if(t===undefined){t=-1}f(t===-1||typeof t==="number"&&t%1==0,"iDuration must be an integer (or omitted)");f(e===undefined||typeof e==="string","my must be a string or empty");f(i===undefined||typeof i==="string","at must be a string or empty");f(!o||typeof o==="object"||typeof o==="function","of must be empty or an object");f(!n||typeof n==="string","offset must be empty or a string");f(!r||typeof r==="string","collision must be empty or a string");this._oPreviousFocus=O.getCurrentFocusInfo();if(this.isInPopup(o)||this.isInPopup(this._oPosition.of)){var d=this.getParentPopupId(o)||this.getParentPopupId(this._oPosition.of);var c="";var _=this.getContent();if(_ instanceof a){c=_.getId()}else if(typeof _==="object"){c=_.id}this.addChildToPopup(d,c);this.addChildToPopup(d,this._popupUID)}var g=this._$(true);var y="fast";if(t===0||t>0){y=t}else if(this._durations.open===0||this._durations.open>0){y=this._durations.open}var m;if(e||i||o||n||r){m=this._createPosition(e,i,o,n,r);this._oPosition=m}else{m=this._oPosition}if(!m.of){m.of=this._oPosition.of||document}this._iZIndex=this._iZIndex===this.getLastZIndex()?this._iZIndex:this.getNextZIndex();var v=sap.ui.getCore().getStaticAreaRef();g.css({position:"absolute",visibility:"hidden"});if(!(g[0].parentNode==v)){g.appendTo(v)}g.css("z-index",this._iZIndex);h.debug("position popup content "+g.attr("id")+" at "+(window.JSON?JSON.stringify(m.at):String(m.at)));this._applyPosition(m);if(l!==undefined){this.setFollowOf(l)}g.toggleClass("sapUiShd",this._bShadow);var b=g[0];if(b){b.style.display="none";b.style.visibility="visible"}var C=y==0;this._duringOpen(!C);if(C){this._opened()}else if(this._animations.open){this._animations.open.call(null,g,y,this._opened.bind(this))}else{g.fadeIn(y,this._opened.bind(this))}};O.prototype._getDomRefToFocus=function(){var t=this._$(false,true),e,i;if(this._shouldGetFocusAfterOpen()){if(this._sInitialFocusId){i=sap.ui.getCore().byId(this._sInitialFocusId);if(i){e=i.getFocusDomRef()}e=e||window.document.getElementById(this._sInitialFocusId)}e=e||t.firstFocusableDomRef()}return e};O.prototype._opened=function(){if(this.eOpenState!==S.OPENING){return}this.bOpen=true;var t=this._$(false,true);if(t[0]&&t[0].style){t[0].style.display="block"}if(this._shouldGetFocusAfterOpen()){var e=this._getDomRefToFocus();if(e){e.focus()}var i=this._getOfDom(this._oLastPosition.of);var o=y(i).rect();if(this._oLastOfRect&&o&&!P(this._oLastOfRect,o)){this._applyPosition(this._oLastPosition)}}this.eOpenState=S.OPEN;if(this.getFollowOf()){O.DockTrigger.addListener(O.checkDocking,this)}this._updateBlindLayer();this.fireOpened()};O.prototype._duringOpen=function(e){var i=this._$(false,true),o=sap.ui.getCore().getStaticAreaRef(),s=document.getElementById(o.id+"-firstfe");O._clearSelection();this._setupUserSelection();if(v()){if(this._oTopShieldLayer){clearTimeout(this._iTopShieldRemoveTimer);this._iTopShieldRemoveTimer=null}else{this._oTopShieldLayer=this.oShieldLayerPool.borrowObject(i,this._iZIndex+1)}this._iTopShieldRemoveTimer=setTimeout(function(){this.oShieldLayerPool.returnObject(this._oTopShieldLayer);this._oTopShieldLayer=null;this._iTopShieldRemoveTimer=null}.bind(this),500)}if(!!t.browser.msie&&!t.os.windows_phone&&O._activateBlindLayer){this._oBlindLayer=this.oBlindLayerPool.borrowObject(i,this._iZIndex-1)}if(this._bModal){this._showBlockLayer()}if(e&&s&&this._shouldGetFocusAfterOpen()&&!this.isInPopup(document.activeElement)&&this._getDomRefToFocus()!==document.activeElement){s.focus({preventScroll:true})}if(this.oContent instanceof a){this.oContent.addDelegate(this)}this.bOpen=true;this._activateFocusHandle();this._$(false,true).on("keydown",y.proxy(this._F6NavigationHandler,this));if(this._oBlindLayer){this._resizeListenerId=l.register(this._$().get(0),y.proxy(this.onresize,this))}};O.prototype._shouldGetFocusAfterOpen=function(){return this._bModal||this._bAutoClose||this._sInitialFocusId};O.prototype._contains=function(t){var e=this._$().get(0);if(!e){return false}var i=g(e,t);var o;if(!i){o=this.getChildPopups();i=o.some(function(e){var i=e?window.document.getElementById(e):null;var o=g(i,t);if(!o){var s="sap.ui.core.Popup.contains-"+e;var n={domRef:t};sap.ui.getCore().getEventBus().publish("sap.ui",s,n);o=n.contains}return o})}if(!i){w.forEach(function(e){i=i||y(t).closest(e).length>0})}return i};O.prototype._containsEventBusWrapper=function(t,e,i){i.contains=this._contains(i.domRef)};O.prototype.onFocusEvent=function(e){var i=y.event.fix(e);if(arguments.length>1&&arguments[1]==="sap.ui.core.Popup.onFocusEvent-"+this._popupUID){i=y.event.fix(arguments[2])}var o=i.type=="focus"||i.type=="activate"?"focus":"blur";var s=false;if(o=="focus"){var n=this._$().get(0);if(n){s=this._contains(i.target);h.debug("focus event on "+i.target.id+", contains: "+s);if(this._bModal&&!s){var r=O.blStack.length>0&&O.blStack[O.blStack.length-1].popup===this;if(r){if(t.system.desktop||y(i.target).is(":input")){if(this.oLastBlurredElement){setTimeout(function(){if(this.oLastBlurredElement){this.oLastBlurredElement.focus()}}.bind(this),0)}else{n.focus()}}}}else if(this._bAutoClose&&s&&this._sTimeoutId){clearTimeout(this._sTimeoutId);this._sTimeoutId=null}}}else if(o=="blur"){h.debug("blur event on "+i.target.id);if(this._bModal){this.oLastBlurredElement=i.target}else if(this._bAutoClose){if(!this.touchEnabled&&!this._sTimeoutId){if(i.target===document.activeElement){return}var a=typeof this._durations.close==="string"?0:this._durations.close;this._sTimeoutId=setTimeout(function(){this.close(a,"autocloseBlur");var t=this._oLastPosition&&this._oLastPosition.of;if(t){var e=this.getParentPopupId(t);if(e){var o="sap.ui.core.Popup.onFocusEvent-"+e;sap.ui.getCore().getEventBus().publish("sap.ui",o,i)}}}.bind(this),a)}}}};O.prototype.setInitialFocusId=function(t){f(!t||typeof t==="string","sId must be a string or empty");this._sInitialFocusId=t};O.prototype.close=function(t){if(O._autoCloseDebug){return}if(this._sTimeoutId){clearTimeout(this._sTimeoutId);this._sTimeoutId=null;if(arguments.length>1){var e=arguments[1];if(typeof e=="string"&&e=="autocloseBlur"&&this._isFocusInsidePopup()){return}}}f(t===undefined||typeof t==="number"&&t%1==0,"iDuration must be empty or an integer");if(this.eOpenState==S.CLOSED||this.eOpenState==S.CLOSING){return}var i="fast";if(t===0||t>0){i=t}else if(this._durations.close===0||this._durations.close>0){i=this._durations.close}this.eOpenState=S.CLOSING;if(this.getFollowOf()){O.DockTrigger.removeListener(O.checkDocking,this)}if(this.oContent){if(this._bContentAddedToStatic){sap.ui.getCore().getEventBus().publish("sap.ui","__beforePopupClose",{domNode:this._$().get(0)});var o=sap.ui.getCore().getStaticAreaRef();o=sap.ui.getCore().getUIArea(o);o.removeContent(o.indexOfContent(this.oContent),true)}else if(this._bUIAreaPatched){delete this.oContent.getUIArea}}this._bContentAddedToStatic=false;this._bUIAreaPatched=false;this._sTimeoutId=null;this._deactivateFocusHandle();this._$(false,true).off("keydown",this._F6NavigationHandler);if(this.oContent instanceof a){this.oContent.removeDelegate(this)}var s=this._$();if(this._bEventBusEventsRegistered){this._unregisterEventBusEvents()}if(this._oBlindLayer){this.oBlindLayerPool.returnObject(this._oBlindLayer)}this._oBlindLayer=null;if(v()){if(this._oBottomShieldLayer){clearTimeout(this._iBottomShieldRemoveTimer);this._iBottomShieldRemoveTimer=null}else{this._oBottomShieldLayer=this.oShieldLayerPool.borrowObject(s,this._iZIndex-3)}this._iBottomShieldRemoveTimer=setTimeout(function(){this.oShieldLayerPool.returnObject(this._oBottomShieldLayer);this._oBottomShieldLayer=null;this._iBottomShieldRemoveTimer=null}.bind(this),500)}if(this.isInPopup(this._oLastPosition.of)){var n=this.getParentPopupId(this._oLastPosition.of);var r="";var l=this.getContent();if(l instanceof a){r=l.getId()}else if(typeof l==="object"){r=l.id}this.removeChildFromPopup(n,r);this.removeChildFromPopup(n,this._popupUID)}if(this._bModal&&this.preventBrowserFocus){s.one("mousedown",function(t){t.preventDefault()})}this._duringClose();if(i==0){this._closed()}else if(this._animations.close){this._animations.close.call(null,s,i,this._closed.bind(this))}else{s.fadeOut(i,this._closed.bind(this))}};O.prototype._closed=function(){var t=this._$(false,true);if(this._bModal){this._hideBlockLayer()}O._clearSelection();this._restoreUserSelection();if(t.length){var e=t.get(0);if(e){e.style.display="none";e.style.visibility="hidden";e.style.left="0px";e.style.top="0px";e.style.right=""}t=this._$(false,true);e=t.length?t[0]:null;if(e){e.style.display="none";e.style.visibility="hidden";e.style.left="0px";e.style.top="0px";e.style.right=""}}if(this._bModal){O.applyFocusInfo(this._oPreviousFocus);this._oPreviousFocus=null;this.oLastBlurredElement=null}this.bOpen=false;this.eOpenState=S.CLOSED;var i=this.getChildPopups();for(var o=0,s=i.length;o<s;o++){this.closePopup(i[o])}this.fireClosed()};O.prototype._duringClose=function(){if(this._resizeListenerId){l.deregister(this._resizeListenerId);this._resizeListenerId=null}};O.getCurrentFocusInfo=function(){var t=null;var e=sap.ui.getCore().getCurrentFocusedControlId();if(e){var i=sap.ui.getCore().byId(e);t={sFocusId:e,oFocusInfo:i?i.getFocusInfo():{}}}else{try{var o=document.activeElement;if(o&&o.nodeName){t={sFocusId:o.id,oFocusedElement:o,oFocusInfo:{}}}}catch(e){t=null}}if(t){t.popup=this}return t};O.applyFocusInfo=function(t){var e={preventScroll:true};if(t){var i=sap.ui.getCore().byId(t.sFocusId);if(i){i.applyFocusInfo(Object.assign(e,t.oFocusInfo))}else{var o=(t.sFocusId?window.document.getElementById(t.sFocusId):null)||t.oFocusedElement;if(o){o.focus(e)}}}};O.prototype.setContent=function(t){f(typeof t==="object","oContent must be an object");this.oContent=t;return this};O.prototype.getContent=function(){return this.oContent};O.prototype.setPosition=function(t,e,i,o,s){f(typeof t==="string","my must be a string");f(typeof e==="string"||typeof e==="object"&&typeof e.left==="number"&&typeof e.top==="number","my must be a string or an object with 'left' and 'top' properties");f(!i||typeof i==="object"||typeof i==="function","of must be empty or an object");f(!o||typeof o==="string","offset must be empty or a string");f(!s||typeof s==="string","collision must be empty or a string");this._oPosition=this._createPosition(t,e,i,o,s);if(this.eOpenState!=S.CLOSED){this._applyPosition(this._oPosition);this._oBlindLayer&&this._oBlindLayer.update(this._$())}return this};O.prototype._createPosition=function(t,e,i,o,s){var n=false;if(t&&(t.indexOf("+")>=0||t.indexOf("-")>=0)){n=true;if(o&&o!="0 0"){h.warning("offset used in my and in offset, the offset value will be ignored","sap.ui.core.Popup","setPosition")}o=null}var r=c({},this._oDefaultPosition,{my:t||this._oDefaultPosition.my,at:e||this._oDefaultPosition.at,of:i,offset:o,collision:s});if(!y.ui.version){if(O._bNewOffset==null){O._bNewOffset=true;var a=y(document.createElement("div"));a.position({of:window,using:function(t,e){O._bNewOffset=e!==undefined}})}}var l=[];var u=[];if(O._bNewOffset||p(y.ui.version).compareTo("1.8.23")>0){if(o&&o!="0 0"){l=r.my.split(" ");u=o.split(" ");var f=[parseInt(u[0])<0?"":"+",parseInt(u[1])<0?"":"+"];r.my=l[0]+f[0]+u[0]+" "+l[1]+f[1]+u[1];r.offset=null}}else if(n){l=r.my.split(" ");u=["",""];var d=l[0].indexOf("+");if(d<0){d=l[0].indexOf("-")}if(d>=0){u[0]=l[0].slice(d);l[0]=l[0].slice(0,d)}d=l[1].indexOf("+");if(d<0){d=l[1].indexOf("-")}if(d>=0){u[1]=l[1].slice(d);l[1]=l[1].slice(0,d)}r.my=l[0]+" "+l[1];r.offset=u[0]+" "+u[1]}return r};O.prototype._getPositionOffset=function(){var t=[];if(this._oPosition.my&&(this._oPosition.my.indexOf("+")>=0||this._oPosition.my.indexOf("-")>=0)){var e=this._oPosition.my.split(" ");var i=e[0].indexOf("+");if(i<0){i=e[0].indexOf("-")}if(i>=0){t[0]=e[0].slice(i)}i=e[1].indexOf("+");if(i<0){i=e[1].indexOf("-")}if(i>=0){t[1]=e[1].slice(i)}}else if(this._oPosition.offset){t=this._oPosition.offset.split(" ")}return t};O.prototype._applyPosition=function(t){var e=sap.ui.getCore().getConfiguration().getRTL();var i=this._$();if(i.length){var o=t.at;var s=i.get(0);if(typeof o==="string"){s.style.display="block";s.style.left="";s.style.right="";i.position(this._resolveReference(this._convertPositionRTL(t,e)));this._fixPositioning(t,e)}else if(C.isValid(o.left)&&C.isValid(o.top)){i.css({left:o.left,top:o.top})}else if(C.isValid(o.right)&&C.isValid(o.top)){i.css({right:o.right,top:o.top})}else if(typeof o.left==="number"&&typeof o.top==="number"){var n=i[0];if(n&&n.style.right){var r=i.outerWidth();i.css({right:document.documentElement.clientWidth-(o.left+r)+"px",top:o.top+"px"})}else{i.css({left:o.left+"px",top:o.top+"px"})}}this._oLastPosition=t;this._oLastOfRect=this._calcOfRect(t.of)}};O.prototype._calcOfRect=function(t){var e=this._getOfDom(t);if(e){return y(e).rect()}return null};O.prototype._getOfDom=function(t){if(t instanceof y.Event){return null}var e;if(typeof t==="string"){e=y(document.getElementById(t))}else if(t instanceof y){e=t}else{e=y(t instanceof a?t.getDomRef():t)}return e[0]};O.prototype._convertPositionRTL=function(t,e){var i=Object.assign({},t);if(e){var o=false;if(i.my&&(i.my.indexOf("+")>=0||i.my.indexOf("-")>=0)){o=true}if((i.offset||o)&&(i.my.indexOf("begin")>-1||i.my.indexOf("end")>-1)&&(i.at.indexOf("begin")>-1||i.at.indexOf("end")>-1)){if(o){var s=i.my.split(" ");if(s.length==2){i.my="";if(s[0]){if(s[0].indexOf("begin")>-1||s[0].indexOf("end")>-1){if(s[0].indexOf("+")>-1){s[0]=s[0].replace("+","-")}else if(s[0].indexOf("-")>-1){s[0]=s[0].replace("-","+")}}i.my=s[0]}if(s[1]){if(s[1].indexOf("begin")>-1||s[1].indexOf("end")>-1){if(s[1].indexOf("+")>-1){s[1]=s[1].replace("+","-")}else if(s[1].indexOf("-")>-1){s[1]=s[1].replace("-","+")}}if(s[0]){i.my=i.my+" "}i.my=i.my+s[1]}}}else{i.offset=this._mirrorOffset(i.offset)}}i.my=i.my.replace("begin","right").replace("end","left");i.at=i.at.replace("begin","right").replace("end","left")}else{i.my=i.my.replace("end","right").replace("begin","left");i.at=i.at.replace("end","right").replace("begin","left")}return i};O.prototype._mirrorOffset=function(t){var e=y.trim(t).split(/\s/);var i=parseInt(e[0]);return-i+" "+e[e.length-1]};O.prototype._fixPositioning=function(t,e){var i=t.my;var o=this._$();var s=0;if(typeof i==="string"){if(e&&(i.indexOf("right")>-1||i.indexOf("begin")>-1||i.indexOf("center")>-1)){o=this._$();s=y(window).width()-o.outerWidth()-o.offset().left;o.css({right:s+"px",left:""})}else if(i.indexOf("right")>-1||i.indexOf("end")>-1){o=this._$();s=y(window).width()-o.outerWidth()-o.offset().left;o.css({right:s+"px",left:""})}}};O.prototype._resolveReference=function(t){var e=t;if(t.of instanceof a){e=Object.assign({},t,{of:t.of.getDomRef()})}return e};O.prototype.setShadow=function(t){f(typeof t==="boolean","bShowShadow must be boolean");this._bShadow=t;if(this.eOpenState!=S.CLOSED){this._$().toggleClass("sapUiShd",t)}return this};O.prototype.setModal=function(t,e){f(typeof t==="boolean","bModal must be boolean");f(!e||typeof e==="string","sModalCSSClass must be empty or a string");var i=this._bModal;this._bModal=t;this._sModalCSSClass=e;if(this.isOpen()){if(i!==t){O._clearSelection();if(t){this._setupUserSelection();this._showBlockLayer()}else{this._hideBlockLayer();this._restoreUserSelection()}if(this.touchEnabled&&this._bAutoClose){if(!t){y(document).on("touchstart mousedown",y.proxy(this._fAutoCloseHandler,this))}else{y(document).off("touchstart mousedown",this._fAutoCloseHandler)}}}}return this};O.prototype.getModal=function(){return this._bModal};O.prototype.setNavigationMode=function(t){if(t!="NONE"&&t!="DOCK"&&t!="SCOPE"){this._sF6NavMode="NONE"}this._sF6NavMode=t};O.prototype.setAutoClose=function(t){f(typeof t==="boolean","bAutoClose must be boolean");if(this.touchEnabled&&this.isOpen()&&this._bAutoClose!==t){if(!this._bModal){if(t){y(document).on("touchstart mousedown",y.proxy(this._fAutoCloseHandler,this))}else{y(document).off("touchstart mousedown",this._fAutoCloseHandler)}}}this._bAutoClose=t;return this};O.prototype.setExtraContent=function(e){f(Array.isArray(e),"Extra popup content must be an array which contains either sap.ui.core.Element, DOM Element or an ID");if(!this._aExtraContent){this._aExtraContent=[]}var i=function(e){return{onBeforeRendering:function(){var i=e.getDomRef();if(i&&this.isOpen()){if(t.browser.msie){y(i).off("deactivate."+this._popupUID,this.fEventHandler)}else{i.removeEventListener("blur",this.fEventHandler,true)}}},onAfterRendering:function(){var i=e.getDomRef();if(i&&this.isOpen()){if(t.browser.msie){y(i).on("deactivate."+this._popupUID,this.fEventHandler)}else{i.addEventListener("blur",this.fEventHandler,true)}}}}};var o,s,n,r;for(var l=0,u=e.length;l<u;l++){s=e[l];if(s instanceof a){o=s.getId()}else if(typeof s==="object"){o=s.id}else if(typeof s==="string"){o=s}if(this.getChildPopups().indexOf(o)===-1){this.addChildPopup(o);r={id:o};if(s instanceof a){n=i(s);s.addEventDelegate(n,this);r.delegate=n}this._aExtraContent.push(r)}}return this};O.prototype.setAutoCloseAreas=O.prototype.setExtraContent;O.prototype.setAnimations=function(t,e){f(t===null||typeof t==="function","fnOpen must be a function");f(e===null||typeof e==="function","fnClose must be a function");if(t&&typeof t=="function"){this._animations.open=t}if(e&&typeof e=="function"){this._animations.close=e}return this};O.prototype.setDurations=function(t,e){f(t===null||typeof t==="number"&&t%1==0,"iOpenDuration must be null or an integer");f(!e||typeof e==="number"&&e%1==0,"iOpenDuration must be undefined or an integer");if(t>0||t===0){this._durations.open=t}if(e>0||e===0){this._durations.close=e}return this};O.CLOSE_ON_SCROLL="close_Popup_if_of_is_moved";O.prototype._fnCloseOnScroll=function(t){this.close()};O.prototype.setFollowOf=function(t){O.DockTrigger.removeListener(O.checkDocking,this);var e=false;this._bFollowOf=true;this._followOfHandler=null;if(typeof t==="function"){this._followOfHandler=t;e=true}else if(typeof t==="boolean"){e=t}else if(t===O.CLOSE_ON_SCROLL){this._followOfHandler=this._fnCloseOnScroll;e=true}else{this._bFollowOf=false;if(t!==null){h.error("Trying to set an invalid type to 'followOf: "+t)}}if(e&&this._oLastPosition){this._oLastOfRect=this._calcOfRect(this._oLastPosition.of)}if(this._bFollowOf&&this.getOpenState()===S.OPEN){O.DockTrigger.addListener(O.checkDocking,this)}};O.prototype.getAutoClose=function(){return this._bAutoClose};O.prototype.getFollowOf=function(){if(this._bFollowOf){return typeof this._followOfHandler==="function"?this._followOfHandler:true}return false};O.prototype.isOpen=function(){return this.bOpen};O.prototype.getOpenState=function(){return this.eOpenState};O.prototype.destroy=function(){if(this._resizeListenerId){l.deregister(this._resizeListenerId);this._resizeListenerId=null}this.close(0);this.oContent=null;if(this._bFollowOf){this.setFollowOf(null)}if(this._bEventBusEventsRegistered){this._unregisterEventBusEvents()}if(this._iTopShieldRemoveTimer){clearTimeout(this._iTopShieldRemoveTimer);this.oShieldLayerPool.returnObject(this._oTopShieldLayer);this._oTopShieldLayer=null;this._iTopShieldRemoveTimer=null}if(this._iBottomShieldRemoveTimer){clearTimeout(this._iBottomShieldRemoveTimer);this.oShieldLayerPool.returnObject(this._oBottomShieldLayer);this._oBottomShieldLayer=null;this._iBottomShieldRemoveTimer=null}if(this._aExtraContent){var t;this._aExtraContent.forEach(function(e){if(e.delegate){t=y(document.getElementById(e.id)).control(0);if(t){t.removeEventDelegate(e.delegate)}}})}e.prototype.destroy.apply(this,arguments)};O.prototype.exit=function(){delete this._mEvents};O.prototype._addFocusEventListeners=function(e,i,o){if(!this.fEventHandler){this.fEventHandler=y.proxy(this.onFocusEvent,this)}var s=this._$();var n=this.getChildPopups();var r={};var a=0,l=0;if(s.length){if(document.addEventListener&&!t.browser.msie){document.addEventListener("focus",this.fEventHandler,true);s.get(0).addEventListener("blur",this.fEventHandler,true);for(a=0,l=n.length;a<l;a++){r=n[a]?window.document.getElementById(n[a]):null;if(r){r.addEventListener("blur",this.fEventHandler,true)}}}else{y(document).on("activate."+this._popupUID,this.fEventHandler);s.on("deactivate."+this._popupUID,this.fEventHandler);for(a=0,l=n.length;a<l;a++){r=n[a]?window.document.getElementById(n[a]):null;if(r){y(r).on("deactivate."+this._popupUID,this.fEventHandler)}}}}};O.prototype._removeFocusEventListeners=function(e,i,o){var s=this._$(false,true);if(!s.length){return}var n=this.getChildPopups();var r={};var a=0,l=0;if(document.removeEventListener&&!t.browser.msie){document.removeEventListener("focus",this.fEventHandler,true);s.get(0).removeEventListener("blur",this.fEventHandler,true);for(a=0,l=n.length;a<l;a++){r=n[a]?window.document.getElementById(n[a]):null;if(r){r.removeEventListener("blur",this.fEventHandler,true)}this.closePopup(n[a])}}else{y(document).off("activate."+this._popupUID,this.fEventHandler);s.off("deactivate."+this._popupUID,this.fEventHandler);for(a=0,l=n.length;a<l;a++){r=n[a]?window.document.getElementById(n[a]):null;if(r){y(r).off("deactivate."+this._popupUID,this.fEventHandler)}}}this.fEventHandler=null};O.prototype._activateFocusHandle=function(){if(this._bModal||this._bAutoClose){this._addFocusEventListeners()}if(this.touchEnabled&&!this._bModal&&this._bAutoClose){y(document).on("touchstart mousedown",y.proxy(this._fAutoCloseHandler,this))}};O.prototype._deactivateFocusHandle=function(){if(this.fEventHandler){this._removeFocusEventListeners()}if(this.touchEnabled&&!this._bModal&&this._bAutoClose){y(document).off("touchstart mousedown",this._fAutoCloseHandler)}};O.prototype._registerEventBusEvents=function(t,e,i){var o=this;y.each(o._mEvents,function(t,e){sap.ui.getCore().getEventBus().subscribe("sap.ui",t,e,o)});this._bEventBusEventsRegistered=true};O.prototype._unregisterEventBusEvents=function(t,e,i){var o=this;y.each(o._mEvents,function(t,e){sap.ui.getCore().getEventBus().unsubscribe("sap.ui",t,e,o)});delete this._bEventBusEventsRegistered};O.prototype._addFocusableArea=function(t,e,i){if(this.getChildPopups().indexOf(i.id)===-1){this.addChildPopup(i.id)}};O.prototype._removeFocusableArea=function(t,e,i){this.removeChildPopup(i.id)};O.prototype._closePopup=function(t,e,i){this.close(typeof this._durations.close==="string"?0:this._durations.close)};O.prototype._setIdentity=function(t){if(typeof t==="object"){t.attr("data-sap-ui-popup",this._popupUID)}else{h.warning("Incorrect DomRef-type for 'setIdentity': "+t,this);return}if(!this._bEventBusEventsRegistered){this._registerEventBusEvents()}};O.prototype._$=function(t,e){var i;if(this.oContent instanceof s){i=this.oContent.$();if(t||i.length===0&&!e){h.info("Rendering of popup content: "+this.oContent.getId());if(i.length>0){r.preserveContent(i[0],true,false)}sap.ui.getCore().getRenderManager().render(this.oContent,sap.ui.getCore().getStaticAreaRef());i=this.oContent.$()}}else if(this.oContent instanceof a){i=this.oContent.$()}else{i=y(this.oContent)}this._setIdentity(i);return i};function L(t){if(O._blockLayerStateProvider){O._blockLayerStateProvider.fireEvent("blockLayerStateChange",t)}}O.attachBlockLayerStateChange=function(t,e,i){if(!O._blockLayerStateProvider){O._blockLayerStateProvider=new b}O._blockLayerStateProvider.attachEvent("blockLayerStateChange",t,e,i)};O.detachBlockLayerStateChange=function(t,e){if(O._blockLayerStateProvider){O._blockLayerStateProvider.detachEvent("blockLayerStateChange",t,e)}};O.prototype._showBlockLayer=function(){var t=y("#sap-ui-blocklayer-popup"),e="sapUiBLy"+(this._sModalCSSClass?" "+this._sModalCSSClass:"");if(t.length===0){t=y('<div id="sap-ui-blocklayer-popup" tabindex="0" class="'+e+'"></div>');t.appendTo(sap.ui.getCore().getStaticAreaRef())}else{t.removeClass().addClass(e)}O.blStack.push({zIndex:this._iZIndex-2,popup:this});t.css({"z-index":this._iZIndex-2,visibility:"visible"}).show();y("html").addClass("sapUiBLyBack");if(O.blStack.length===1){L({visible:true,zIndex:O.blStack[0].zIndex})}};O.prototype._hideBlockLayer=function(){var t=O.blStack.pop();var e=y("#sap-ui-blocklayer-popup");if(e.length){var i=e.get(0);if(O.blStack.length>0){i.style.zIndex=O.blStack[O.blStack.length-1].zIndex;i.style.visibility="visible";i.style.display="block"}else{i.style.visibility="hidden";i.style.display="none";window.setTimeout(function(){y("html").removeClass("sapUiBLyBack")},0);L({visible:false,zIndex:t.zIndex})}}};O.prototype._isFocusInsidePopup=function(){var t=this._$(false).get(0);if(t&&g(t,document.activeElement)){return true}return false};O.DockTrigger=n;O.checkDocking=function(){if(this.getOpenState()===S.OPEN){var t=this._getOfDom(this._oLastPosition.of),e;if(t){if(t===window||t===window.document||g(document.documentElement,t)){e=y(t).rect()}else if(t.id){var i=window.document.getElementById(t.id);var o=y(i).rect();if(o&&!P(e,o)){e=o;this._oLastPosition.of=i}}}if(!e){this.close();return}else if(e.left===0&&e.top===0&&e.height===0&&e.height===0&&this._oLastPosition.of.id){this._oLastPosition.of=window.document.getElementById(this._oLastPosition.of.id);t=this._getOfDom(this._oLastPosition.of);e=y(t).rect();if(!e){this.close();return}}if(this._oLastOfRect){if(!P(this._oLastOfRect,e)){if(this._followOfHandler){var s=_({},this._oLastPosition),n=_({},this._oLastOfRect);this._followOfHandler({lastPosition:s,lastOfRect:n,currentOfRect:e})}else{this._applyPosition(this._oLastPosition)}}}}};O.prototype.ontouchstart=function(t){this.onmousedown(t,true);this._bMousedownCalled=true};O.prototype.onmousedown=function(t,e){if(this._bMousedownCalled&&!e){this._bMousedownCalled=false;return}if(this._iZIndex===this.getLastZIndex()||this.getModal()){return}this._increaseMyZIndex("","mousedown",t)};O.prototype._increaseMyZIndex=function(t,e,i){var o=this.getParentPopup(this._oLastPosition.of);if(i&&i.type==="mousedown"||i&&i.isFromParentPopup||o.length===0){this._iZIndex=this.getNextZIndex();var s=this._$(false,true);s.css("z-index",this._iZIndex);if(this._oBlindLayer){this._oBlindLayer.update(s,this._iZIndex-1)}if(i&&!i.type||i&&i.type!="mousedown"||e==="mousedown"){var n=this.getChildPopups();for(var r=0,a=n.length;r<a;r++){this.increaseZIndex(n[r],true)}}}else if(o.length>0){var l=y(o.get(0)).attr("data-sap-ui-popup");this.increaseZIndex(l,false)}};O.prototype.onAfterRendering=function(t){var e=this.getContent();var i=e instanceof a?e.$():y(e);i.toggleClass("sapUiShd",this._bShadow);O._clearSelection();this._setupUserSelection();i.css("position","absolute");this._setIdentity(i);var o=i[0];var s=o.style.left;var n=o.style.right;var r=o.style.top;var u=o.style.bottom;if(!(s&&s!="auto"||n&&n!="auto"||r&&r!="auto"||u&&u!="auto")){h.debug("reposition popup content "+i.attr("id")+" at "+(window.JSON?JSON.stringify(this._oLastPosition.at):String(this._oLastPosition.at)));this._applyPosition(this._oLastPosition)}i.show().css({visibility:"visible","z-index":this._iZIndex});if(this._oBlindLayer){this._resizeListenerId=l.register(this._$().get(0),y.proxy(this.onresize,this))}if(this.isOpen()&&(this.getModal()||this.getAutoClose())){this._addFocusEventListeners()}this._$(false,true).on("keydown",y.proxy(this._F6NavigationHandler,this))};O.prototype.onBeforeRendering=function(t){if(this._resizeListenerId){l.deregister(this._resizeListenerId);this._resizeListenerId=null}if(this.isOpen()&&(this.getModal()||this.getAutoClose())){this._removeFocusEventListeners()}this._$(false,true).off("keydown",this._F6NavigationHandler)};O.prototype.onresize=function(t){if(this.eOpenState!=S.CLOSED&&this._oBlindLayer){var e=this;setTimeout(function(){e._updateBlindLayer()},0)}};O.prototype._updateBlindLayer=function(){if(this.eOpenState!=S.CLOSED&&this._oBlindLayer){this._oBlindLayer.update(this._$(false,true))}};O.prototype.isInPopup=function(t){var e=this.getParentPopup(t);return e&&e.length>0};O.prototype.getParentPopup=function(t){var e=t?t:this;var i=y(e instanceof a?e.getDomRef():e);return i.closest("[data-sap-ui-popup]")};O.prototype.getParentPopupId=function(t){var e=this.getParentPopup(t);return e.attr("data-sap-ui-popup")};O.prototype.addChildToPopup=function(t,e){var i="sap.ui.core.Popup.addFocusableContent-"+t;sap.ui.getCore().getEventBus().publish("sap.ui",i,{id:e})};O.prototype.removeChildFromPopup=function(t,e){var i="sap.ui.core.Popup.removeFocusableContent-"+t;sap.ui.getCore().getEventBus().publish("sap.ui",i,{id:e})};O.prototype.closePopup=function(t){var e="sap.ui.core.Popup.closePopup-"+t;sap.ui.getCore().getEventBus().publish("sap.ui",e)};O.prototype.increaseZIndex=function(t,e){var i="sap.ui.core.Popup.increaseZIndex-"+t;sap.ui.getCore().getEventBus().publish("sap.ui",i,{isFromParentPopup:e?e:false})};O.prototype.focusTabChain=function(t){var e=t.event.target,i=t.that.getMetadata().getName(),o;if(!t.$FocusablesContent||!t.$FocusablesFooter||!t.$FocusablesContent.length&&!t.$FocusablesFooter.length){return}if(e.id===t.firstFocusable){h.debug("First dummy focus element was focused","",i);if(t.$FocusablesFooter.length>0){h.debug("Last footer element will be focused","",i);o=t.$FocusablesFooter[t.$FocusablesFooter.length-1]}else{h.debug("Last content element will be focused","",i);o=t.$FocusablesContent[t.$FocusablesContent.length-1]}}else if(e.id===t.lastFocusable){h.debug("Last dummy focus element was focues","",i);if(t.$FocusablesContent.length>0){h.debug("First content element will be focused","",i);o=t.$FocusablesContent[0]}else{h.debug("First footer element will be focused","",i);o=t.$FocusablesFooter[0]}}if(o){setTimeout(function(){var t=sap.ui.getCore().byId(o.id);if(t instanceof s){h.debug("Focus will be handled by "+t.getMetadata().getName(),"",i)}else{h.debug("oFocusDomRef will be focused","",i)}if(t){t.focus()}else if(o){o.focus()}return t?t.getId():o.id},0)}};O.prototype._setupUserSelection=function(){var t=this._$(false,true);O._markAsUserSelectable(t,this._bModal||O.blStack.length>0);if(this._bModal){if(O.blStack.length>0){var e=O.blStack[O.blStack.length-1];var i=function(t){return t.popup.getId()};if(O.blStack.map(i).indexOf(this.getId())===-1){O._markAsNotUserSelectable(e.popup._$(false,true),true)}else if(e.popup.getId()!==this.getId()){O._markAsNotUserSelectable(t,true)}}else{O._markAsNotUserSelectable(y("html"),true);O._markExternalContentAsUserSelectable(true)}}};O.prototype._restoreUserSelection=function(){var t=this._$(false,true);O._markAsNotUserSelectable(t,false);if(O.blStack.length>0){O._markAsUserSelectable(O.blStack[O.blStack.length-1].popup._$(false,true),true)}else{O._markAsUserSelectable(y("html"),false);O._markExternalContentAsNotUserSelectable(false)}};O._clearSelection=function(){var t=document.getSelection();if(!t.isCollapsed){t.removeAllRanges()}};O._markAsUserSelectable=function(e,i){if(!(t.browser.msie||t.browser.edge)){e.removeClass("sapUiNotUserSelectable");if(i){e.addClass("sapUiUserSelectable")}}};O._markAsNotUserSelectable=function(e,i){if(!(t.browser.msie||t.browser.edge)){e.removeClass("sapUiUserSelectable");if(i){e.addClass("sapUiNotUserSelectable")}}};var w=new Set,x="[data-sap-ui-integration-popup-content]";w.add(x);O.addExternalContent=function(t,e){if(!Array.isArray(t)){t=[t]}t.forEach(Set.prototype.add.bind(w));if(e){O.markExternalContentAsSelectable()}};O.removeExternalContent=function(t,e){if(!Array.isArray(t)){t=[t]}if(e){O.markExternalContentAsNotSelectable()}t.forEach(function(t){if(t!==x){w.delete(t)}})};O.markExternalContentAsSelectable=function(){O._clearSelection();if(O.blStack.length>0){O._markExternalContentAsUserSelectable(true)}};O.markExternalContentAsNotSelectable=function(){O._clearSelection();if(O.blStack.length>0){O._markExternalContentAsNotUserSelectable(false)}};O._getExternalContent=function(){var t=[];if(w.size>0){w.forEach(function(e){var i=y(e);if(i.length>0){t.push(i)}})}return t};O._markExternalContentAsUserSelectable=function(t){var e=O._getExternalContent();e.forEach(function(e){O._markAsUserSelectable(e,t)})};O._markExternalContentAsNotUserSelectable=function(t){var e=O._getExternalContent();e.forEach(function(e){O._markAsNotUserSelectable(e,t)})};return O});