/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseListContent","./TimelineContentRenderer","sap/ui/core/Core","sap/ui/integration/util/BindingHelper"],function(e,t,i,n){"use strict";var o,r;var a=e.extend("sap.ui.integration.cards.TimelineContent",{metadata:{library:"sap.ui.integration"},renderer:t});a.prototype.exit=function(){e.prototype.exit.apply(this,arguments);if(this._oTimeLineItemTemplate){this._oTimeLineItemTemplate.destroy();this._oTimeLineItemTemplate=null}};a.prototype.loadDependencies=function(e){return new Promise(function(e,t){i.loadLibrary("sap.suite.ui.commons",{async:true}).then(function(){sap.ui.require(["sap/suite/ui/commons/Timeline","sap/suite/ui/commons/TimelineItem"],function(t,i){o=t;r=i;e()},function(e){t(e)})}).catch(function(){t("Timeline content type is not available with this distribution.")})})};a.prototype._getTimeline=function(){var e=this.getAggregation("_content");if(this._bIsBeingDestroyed){return null}if(!e){e=new o({id:this.getId()+"-Timeline",showHeaderBar:false,enableScroll:false});this.setAggregation("_content",e)}return e};a.prototype.setConfiguration=function(t){e.prototype.setConfiguration.apply(this,arguments);if(!t){return this}if(t.items){this._setStaticItems(t.items);return this}if(t.item){this._setItem(t.item)}return this};a.prototype.onDataChanged=function(){this._checkHiddenNavigationItems(this.getConfiguration().item)};a.prototype._setItem=function(e){var t={userNameClickable:false,title:e.title&&e.title.value,text:e.description&&e.description.value,dateTime:e.dateTime&&e.dateTime.value,userName:e.owner&&e.owner.value,icon:e.icon&&e.icon.src};if(e.ownerImage&&e.ownerImage.value){t.userPicture=n.formattedProperty(e.ownerImage.value,function(e){return this._oIconFormatter.formatSrc(e,this._sAppId)}.bind(this))}this._oTimeLineItemTemplate=new r(t);this._oActions.attach(e,this);var i={template:this._oTimeLineItemTemplate};this._filterHiddenNavigationItems(e,i);this._bindAggregationToControl("content",this._getTimeline(),i);return this};a.prototype._setStaticItems=function(e){var t=this._getTimeline(),i;e.forEach(function(e){i=new r({title:e.title,text:e.description,userPicture:e.ownerImage,dateTime:e.dateTime,userName:e.owner,icon:e.icon});t.addContent(i)})};a.prototype.getInnerList=function(){return this._getTimeline()};return a});