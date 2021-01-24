/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","sap/ui/dom/units/Rem","sap/ui/Device","./AvatarGroupRenderer","sap/m/Button","sap/m/library","sap/ui/core/ResizeHandler","sap/ui/events/KeyCodes","sap/ui/core/Core"],function(t,e,o,i,r,s,a,n,h,p,u){"use strict";var l=t.AvatarGroupType;var _=n.AvatarColor;var v=n.AvatarSize;var g={XS:2,S:3,M:4,L:5,XL:7};var d={XS:.75,S:1.25,M:1.625,L:2,XL:2.75};var f={XS:.75,S:1.25,M:1.62,L:2,XL:2.75};var y={XS:.0625,S:.125,M:.125,L:.125,XL:.25};var A={XS:.06,S:.12,M:.12,L:.12,XL:.25};var S=e.extend("sap.f.AvatarGroup",{metadata:{library:"sap.f",properties:{groupType:{type:"sap.f.AvatarGroupType",group:"Appearance",defaultValue:l.Group},avatarDisplaySize:{type:"sap.m.AvatarSize",group:"Appearance",defaultValue:v.S}},defaultAggregation:"items",aggregations:{items:{type:"sap.f.AvatarGroupItem",multiple:true}},events:{press:{parameters:{groupType:{type:"string"},overflowButtonPressed:{type:"boolean"},avatarsDisplayed:{type:"int"}}}}}});S.prototype.init=function(){this._oShowMoreButton=new a({});this._oShowMoreButton.addStyleClass("sapFAvatarGroupMoreButton");this._bFirstRendering=true;this._onResizeRef=this._onResize.bind(this);this._iCurrentAvatarColorNumber=1;this._bShowMoreButton=false;this._bIEBrowser=r.browser.internet_explorer};S.prototype.exit=function(){this._detachResizeHandlers();if(this._oItemNavigation){this.removeEventDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null}this._oShowMoreButton.destroy();this._oShowMoreButton=null};S.prototype.onBeforeRendering=function(){if(this._bFirstRendering){this._iAvatarsToShow=this.getItems().length;this._bFirstRendering=false}};S.prototype.onAfterRendering=function(){var t,e=[];if(!this._oItemNavigation){this._oItemNavigation=new o(null,null);this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]});this.addEventDelegate(this._oItemNavigation)}t=this.getDomRef();this._oItemNavigation.setRootDomRef(t);if(this.getGroupType()===l.Individual){this.getItems().forEach(function(t){e.push(t.getDomRef())});this._oItemNavigation.setItemDomRefs(e)}this._detachResizeHandlers();this._attachResizeHandlers();if(u.isThemeApplied()){this._onResize()}if(this._shouldShowMoreButton()){this._oShowMoreButton.$().attr("role","button");if(this.getGroupType()===l.Group){this._oShowMoreButton.$().attr("tabindex","-1")}else{this._oShowMoreButton.$().attr("aria-label",this._getResourceBundle().getText("AVATARGROUP_POPUP"))}}this._updateAccState()};S.prototype.onThemeChanged=function(){if(!this.getDomRef()){return}this._onResize()};S.prototype._getResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.f")};S.prototype._updateAccState=function(){var t=this._getResourceBundle(),e=t.getText("AVATARGROUP_NUMBER_OF_AVATARS",[this._iAvatarsToShow,this.getItems().length-this._iAvatarsToShow]),o=t.getText("AVATARGROUP_POPUP");if(this.getGroupType()===l.Group){this.$().attr("aria-label",o+" "+e)}};S.prototype._attachResizeHandlers=function(){this._iResizeHandlerId=h.register(this,this._onResizeRef)};S.prototype._detachResizeHandlers=function(){if(this._iResizeHandlerId){h.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};S.prototype.setGroupType=function(t){this.getItems().forEach(function(e){e._setGroupType(t)});return this.setProperty("groupType",t)};S.prototype.addItem=function(t){t._setDisplaySize(this.getAvatarDisplaySize());t._setAvatarColor(_["Accent"+this._iCurrentAvatarColorNumber]);t._setGroupType(this.getGroupType());this._iAvatarsToShow=this.getItems().length;this._iCurrentAvatarColorNumber++;if(this._iCurrentAvatarColorNumber>10){this._iCurrentAvatarColorNumber=1}return this.addAggregation("items",t)};S.prototype.setAvatarDisplaySize=function(t){var e=this.getAvatarDisplaySize();this._oShowMoreButton.removeStyleClass("sapFAvatarGroupMoreButton"+e);this._oShowMoreButton.addStyleClass("sapFAvatarGroupMoreButton"+t);if(e===t){return this}this.getItems().forEach(function(e){e._setDisplaySize(t)});return this.setProperty("avatarDisplaySize",t)};S.prototype.ontap=function(t){var e=t.srcControl;this.firePress({groupType:this.getGroupType(),eventSource:e,overflowButtonPressed:e===this._oShowMoreButton,avatarsDisplayed:this._iAvatarsToShow})};S.prototype.onsapspace=function(t){this.ontap(t)};S.prototype.onsapenter=function(t){this.ontap(t)};S.prototype.onkeyup=function(t){if(t.shiftKey&&t.keyCode==p.ENTER||t.shiftKey&&t.keyCode==p.SPACE){t.preventDefault()}};S.prototype._getAvatarMargin=function(t){var e=this.getGroupType(),o;if(e===l.Group){o=this._bIEBrowser?f[t]:d[t]}else{o=this._bIEBrowser?A[t]:y[t]}return o};S.prototype._getAvatarNetWidth=function(t,e){var o=this.getGroupType();if(o===l.Group){return t-e}else{return t+e}};S.prototype._getAvatarsToShow=function(t,e,o){var r=i.toPx(1),s=t-e*r,a=Math.floor(s/(o*r));return a+1};S.prototype._adjustAvatarsToShow=function(t){if(t-this._iAvatarsToShow>99){this._iAvatarsToShow-=2}else{this._iAvatarsToShow--}};S.prototype._getWidth=function(){var t=this.getDomRef(),e;if(this._bIEBrowser&&t){e=parseFloat(t.getBoundingClientRect().width.toFixed(2))}else{e=Math.ceil(this.$().width())}return e};S.prototype._onResize=function(){var t=this._getWidth(),e=this.getItems(),o=e.length,i=this.getAvatarDisplaySize(),r=g[i],s=this._getAvatarMargin(i),a=this._getAvatarNetWidth(r,s),n=this.$().children(".sapFAvatarGroupItem").length;this._iAvatarsToShow=this._getAvatarsToShow(t,r,a);if(o>this._iAvatarsToShow&&o>0){this._bShowMoreButton=true;this._bAutoWidth=false;this._adjustAvatarsToShow(o);if(n!=this._iAvatarsToShow){this._oShowMoreButton.setText("+"+(o-this._iAvatarsToShow));this.invalidate()}}else{this._bAutoWidth=true;this.getDomRef().style.width="auto";if(this._bShowMoreButton){this._bShowMoreButton=false;this.invalidate()}}};S.prototype._shouldShowMoreButton=function(){return this._bShowMoreButton};return S});