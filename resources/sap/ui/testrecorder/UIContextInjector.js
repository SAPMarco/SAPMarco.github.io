/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/Object","sap/ui/testrecorder/CommunicationBus","sap/ui/testrecorder/CommunicationChannels"],function(e,t,i,o){"use strict";var n=null;var r="sap-ui-test-recorder-frame";var s={MIN:"32px",MID:"50%",MAX:"100%"};var d={MIN:"180px",MAX:"100%"};var c=t.extend("sap.ui.testrecorder.UIContextInjector",{constructor:function(){if(!n){this._sIdentifier=a();Object.apply(this,arguments)}else{return n}}});c.prototype.injectFrame=function(e,t){window.communicationWindows=window.communicationWindows||{};this.fnOnClose=t;this._generateTestRecorderUrl();this._isInIframe=e.indexOf("window")===-1;if(this._isInIframe){this._openFrame()}else{this._openWindow()}window.communicationWindows.testRecorder.addEventListener("beforeunload",function(){if(!this._dockStarted&&!this._closeTriggered){this.close()}}.bind(this));i.subscribe(o.HIDE_IFRAME,this.hideFrame.bind(this));i.subscribe(o.SHOW_IFRAME,this.showFrame.bind(this));i.subscribe(o.RESIZE_IFRAME_UP,this.resizeFrameUp.bind(this));i.subscribe(o.RESIZE_IFRAME_DOWN,this.resizeFrameDown.bind(this));i.subscribe(o.CLOSE_IFRAME,this.close.bind(this));i.subscribe(o.DOCK_IFRAME,this.dockFrame.bind(this));i.subscribe(o.OPEN_NEW_WINDOW,this.openNewWindow.bind(this))};c.prototype.hideFrame=function(e){var t=document.getElementById(r).style;this._originalFrameSize={width:t.width,height:t.height};t.width=d.MIN;t.height=s.MIN};c.prototype.showFrame=function(e){var t=document.getElementById(r).style;if(this._originalFrameSize){t.width=this._originalFrameSize.width;t.height=this._originalFrameSize.height;this._originalFrameSize=null}else{t.width=d.MAX;t.height=s.MID}};c.prototype.resizeFrameUp=function(){var e=document.getElementById(r).style;switch(e.height){case s.MIN:e.height=s.MID;break;case s.MID:e.height=s.MAX;break;default:e.height=s.MAX}};c.prototype.resizeFrameDown=function(){var e=document.getElementById(r).style;switch(e.height){case s.MAX:e.height=s.MID;break;case s.MID:e.height=s.MIN;break;default:e.height=s.MIN}};c.prototype.dockFrame=function(){this._dockStarted=true;this.close();this._openFrame()};c.prototype.openNewWindow=function(){this._dockStarted=true;this.close();this._openWindow()};c.prototype._openWindow=function(){window.communicationWindows.testRecorder=window.open(this._sUrl,"sapUiTestRecorder","width=1024,height=700,status=no,toolbar=no,menubar=no,resizable=yes,location=no,directories=no,scrollbars=yes");window.communicationWindows.testRecorder.window.onload=function(){window.communicationWindows.testRecorder.document.title="Test Recorder"};this._isInIframe=false;this._dockStarted=false;this._closeTriggered=false};c.prototype._openFrame=function(){var e=document.createElement("IFRAME");e.id=r;e.src=this._sUrl;e.style.width=d.MAX;e.style.height=s.MID;e.style.position="absolute";e.style.left="0";e.style.bottom="0";e.style.border="none";e.style.borderRadius="1px";e.style.zIndex="1001";e.style.boxShadow="1px -10px 42px -4px #888";document.body.appendChild(e);window.communicationWindows.testRecorder=e.contentWindow;this._dockStarted=false;this._isInIframe=true;this._closeTriggered=false};c.prototype.close=function(){if(this._closeTriggered){return}this._closeTriggered=true;if(this._isInIframe){var t=document.getElementById(r);var i=t&&t.contentWindow;if(i){i.onerror=e.noop;t.src="about:blank";i.document.write("");i.close();if(typeof CollectGarbage=="function"){CollectGarbage()}t.remove()}}else if(window.communicationWindows.testRecorder){window.communicationWindows.testRecorder.close()}if(!this._dockStarted){window.communicationWindows={};this.fnOnClose()}};c.prototype.getCommunicationInfo=function(){return{origin:this._sOrigin,identifier:this._sIdentifier,url:this._sUrl}};c.prototype._generateTestRecorderUrl=function(){this._sUrl=sap.ui.require.toUrl("sap/ui/testrecorder/ui/overlay.html")+"?sap-ui-testrecorder-origin="+window.location.protocol+"//"+window.location.host+"&"+"sap-ui-testrecorder-frame-identifier="+this._sIdentifier;var e=new window.URI(this._sUrl);this._sOrigin=(e.protocol()||window.location.protocol.replace(":",""))+"://"+(e.host()||window.location.host)};function a(){return""+Date.now()}n=new c;return n},true);