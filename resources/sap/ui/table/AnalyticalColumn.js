/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Column","./library","sap/ui/core/Element","sap/ui/model/type/Boolean","sap/ui/model/type/DateTime","sap/ui/model/type/Float","sap/ui/model/type/Integer","sap/ui/model/type/Time","./utils/TableUtils","./AnalyticalColumnMenu"],function(e,t,r,i,a,n,o,p,l,s){"use strict";function u(e){return l.isA(e,"sap.ui.table.AnalyticalTable")}var g=e.extend("sap.ui.table.AnalyticalColumn",{metadata:{library:"sap.ui.table",properties:{leadingProperty:{type:"string",group:"Misc",defaultValue:null},summed:{type:"boolean",group:"Misc",defaultValue:false},inResult:{type:"boolean",group:"Misc",defaultValue:false},showIfGrouped:{type:"boolean",group:"Appearance",defaultValue:false},groupHeaderFormatter:{type:"any",group:"Behavior",defaultValue:null}}}});g._DEFAULT_FILTERTYPES={Time:new p({UTC:true}),DateTime:new a({UTC:true}),Float:new n,Integer:new o,Boolean:new i};g.prototype._createMenu=function(){return new s(this.getId()+"-menu")};g.prototype.setGrouped=function(e,t){var r=this.getParent();if(u(r)){if(e){r._addGroupedColumn(this.getId())}else{r._removeGroupedColumn(this.getId())}}var i=this.setProperty("grouped",e,t);this._updateColumns();return i};g.prototype.setSummed=function(e){var t=this.setProperty("summed",e,true);this._updateTableAnalyticalInfo();return t};g.prototype.setVisible=function(t){e.prototype.setVisible.call(this,t);this._updateColumns();return this};g.prototype.getLabel=function(){var e=this.getAggregation("label");if(!e){if(!this._oBindingLabel){var r=this.getParent();if(u(r)){var i=r.getBinding();if(i){this._oBindingLabel=t.TableHelper.createLabel();this.addDependent(this._oBindingLabel);l.Binding.metadataLoaded(r).then(function(){this._oBindingLabel.setText(i.getPropertyLabel(this.getLeadingProperty()))}.bind(this))}}}e=this._oBindingLabel}return e};g.prototype.getFilterProperty=function(){var e=this.getProperty("filterProperty");if(!e){var t=this.getParent();if(u(t)){var r=t.getBinding();var i=this.getLeadingProperty();if(r&&r.getFilterablePropertyNames().indexOf(i)>-1){e=i}}}return e};g.prototype.getSortProperty=function(){var e=this.getProperty("sortProperty");if(!e){var t=this.getParent();if(u(t)){var r=t.getBinding();var i=this.getLeadingProperty();if(r&&r.getSortablePropertyNames().indexOf(i)>-1){e=i}}}return e};g.prototype.getFilterType=function(){var e=this.getProperty("filterType");if(!e){var t=this.getParent();if(u(t)){var r=t.getBinding();var i=this.getLeadingProperty(),a=r&&r.getProperty(i);if(a){switch(a.type){case"Edm.Time":e=g._DEFAULT_FILTERTYPES["Time"];break;case"Edm.DateTime":case"Edm.DateTimeOffset":e=g._DEFAULT_FILTERTYPES["DateTime"];break;case"Edm.Single":case"Edm.Double":case"Edm.Decimal":e=g._DEFAULT_FILTERTYPES["Float"];break;case"Edm.SByte":case"Edm.Int16":case"Edm.Int32":case"Edm.Int64":e=g._DEFAULT_FILTERTYPES["Integer"];break;case"Edm.Boolean":e=g._DEFAULT_FILTERTYPES["Boolean"];break}}}}return e};g.prototype._updateColumns=function(e,t){var r=this.getParent();if(u(r)){r._updateColumns(e,t)}};g.prototype._updateTableAnalyticalInfo=function(e){var t=this.getParent();if(t&&u(t)&&!t._bSuspendUpdateAnalyticalInfo){t.updateAnalyticalInfo(e)}};g.prototype._updateTableColumnDetails=function(){var e=this.getParent();if(e&&u(e)&&!e._bSuspendUpdateAnalyticalInfo){e._updateTableColumnDetails()}};g.prototype.shouldRender=function(){if(!this.getVisible()||!this.getTemplate()){return false}return(!this.getGrouped()||this._bLastGroupAndGrouped||this.getShowIfGrouped())&&(!this._bDependendGrouped||this._bLastGroupAndGrouped)};g.prototype.getTooltip_AsString=function(){if(!this.getTooltip()){return this._getDefaultTooltip()}return r.prototype.getTooltip_AsString.apply(this)};g.prototype.getTooltip_Text=function(){var e=r.prototype.getTooltip_Text.apply(this);if(!this.getTooltip()||!e){e=this._getDefaultTooltip()}return e};g.prototype._getDefaultTooltip=function(){var e=this.getParent();if(u(e)){var t=e.getBinding();if(t&&this.getLeadingProperty()){return t.getPropertyQuickInfo(this.getLeadingProperty())}}return null};g.prototype._menuHasItems=function(){var t=function(){var e=this.getParent();var t=e.getBinding();var r=t&&t.getAnalyticalQueryResult();return e&&r&&r.findMeasureByPropertyName(this.getLeadingProperty())}.bind(this);return e.prototype._menuHasItems.apply(this)||t()};g.prototype.isFilterableByMenu=function(){var e=this.getFilterProperty();if(!e||!this.getShowFilterMenuEntry()){return false}var t=this.getParent();if(u(t)){var r=t.getBinding();if(r){if(r.getFilterablePropertyNames().indexOf(e)>-1&&r.getProperty(e)){return true}}}return false};g.prototype.isGroupable=function(){var e=this.getParent();if(u(e)){var t=e.getBinding();if(t){var r=t.getAnalyticalQueryResult();if(r&&r.findDimensionByPropertyName(this.getLeadingProperty())&&t.getSortablePropertyNames().indexOf(this.getLeadingProperty())>-1&&t.getFilterablePropertyNames().indexOf(this.getLeadingProperty())>-1){return true}}}return false};g.ofCell=e.ofCell;return g});