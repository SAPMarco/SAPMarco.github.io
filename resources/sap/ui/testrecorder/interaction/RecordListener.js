/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/testrecorder/interaction/ContextMenu","sap/ui/testrecorder/interaction/CommandExecutor","sap/ui/testrecorder/interaction/Commands","sap/ui/testrecorder/CommunicationBus","sap/ui/testrecorder/CommunicationChannels"],function(t,e,n,i,o,r){"use strict";var s=null;var c=t.extend("sap.ui.testrecorder.interaction.RecordListener",{constructor:function(){if(!s){Object.apply(this,arguments);this._fnClickListener=this._onClick.bind(this);this._fnContextmenuListener=this._onContextmenu.bind(this)}else{return s}}});c.prototype.init=function(){document.addEventListener("click",this._fnClickListener);document.addEventListener("contextmenu",this._fnContextmenuListener);o.subscribe(r.CONTEXT_MENU_HIGHLIGHT,this._onContextHighlight.bind(this));o.subscribe(r.CONTEXT_MENU_PRESS,this._onContextPress.bind(this));o.subscribe(r.CONTEXT_MENU_ENTER_TEXT,this._onContextEnterText.bind(this))};c.prototype.stop=function(){e.hide();document.removeEventListener("click",this._fnClickListener);document.removeEventListener("contextmenu",this._fnContextmenuListener)};c.prototype._onClick=function(t){t.preventDefault();t.stopPropagation();e.hide()};c.prototype._onContextmenu=function(t){t.preventDefault();var n=u(t.target);e.show({domElementId:n,location:{x:t.pageX,y:t.pageY}})};c.prototype._onContextHighlight=function(t){n.execute(i.HIGHLIGHT,t)};c.prototype._onContextPress=function(t){n.execute(i.PRESS,t)};c.prototype._onContextEnterText=function(t){n.execute(i.ENTER_TEXT,t)};function u(t){if(t.id){return t.id}else if(t.parentElement){return u(t.parentElement)}else{return""}}s=new c;return s},true);