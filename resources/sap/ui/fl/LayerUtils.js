/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/UriParameters","sap/ui/thirdparty/hasher","sap/ui/fl/Layer","sap/ui/fl/Utils"],function(e,r,t,a){"use strict";var n=[t.BASE,t.VENDOR,t.PARTNER,t.CUSTOMER_BASE,t.CUSTOMER,t.USER];var i={};n.forEach(function(e,r){i[e]=r});var s={_mLayersIndex:i,_sTopLayer:n[n.length-1],FL_MAX_LAYER_PARAM:"sap-ui-fl-max-layer",isVendorLayer:function(){return this.getCurrentLayer(false)===t.VENDOR},isCustomerDependentLayer:function(e){return[t.CUSTOMER,t.CUSTOMER_BASE].indexOf(e)>-1},doesCurrentLayerRequirePackage:function(){var e=this.getCurrentLayer(false);return e===t.VENDOR||e===t.PARTNER||e===t.CUSTOMER_BASE},getMaxLayer:function(){var e=s.getMaxLayerTechnicalParameter(r.getHash());return e||s.getUrlParameter(this.FL_MAX_LAYER_PARAM)||s._sTopLayer},getLayerIndex:function(e){return this._mLayersIndex[e]},isOverMaxLayer:function(e){return this.getLayerIndex(e)>this.getLayerIndex(this.getMaxLayer())},compareAgainstCurrentLayer:function(e,r){var t=r||s.getCurrentLayer(false);if(this.getLayerIndex(t)>this.getLayerIndex(e)||!e){return-1}else if(this.getLayerIndex(t)===this.getLayerIndex(e)){return 0}return 1},isLayerFilteringRequired:function(){return!(this._sTopLayer===this.getMaxLayer())},getCurrentLayer:function(e){if(e){return t.USER}var r=this.getUrlParameter("sap-ui-layer")||"";r=r.toUpperCase();return r||t.CUSTOMER},filterChangeDefinitionsByMaxLayer:function(e){return e.filter(function(e){if(e.layer&&s.isOverMaxLayer(e.layer)){return false}return true})},getUrlParameter:function(r){return e.fromQuery(window.location.search).get(r)},getMaxLayerTechnicalParameter:function(e){return a.ifUShellContainerThen(function(r){var t=r[0].parseShellHash(e)||{};if(t.params&&t.params.hasOwnProperty(this.FL_MAX_LAYER_PARAM)){return t.params[this.FL_MAX_LAYER_PARAM][0]}}.bind(this),["URLParsing"])}};return s},true);