/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/ColorPalettePopover","sap/m/Button","sap/ui/core/Core","sap/base/util/merge","sap/ui/core/theming/Parameters"],function(e,t,o,n,a,r){"use strict";var l=e.extend("sap.ui.integration.designtime.editor.fields.viz.ColorSelect",{metadata:{properties:{enumValue:{type:"string",defaultValue:""},colorValue:{type:"string",defaultValue:""},editable:{type:"boolean",defaultValue:true},colorEnum:{type:"string",defaultValue:"sap.m.AvatarColor"},background:{type:"boolean",defaultValue:true},allowCustomColors:{type:"boolean",defaultValue:false}},aggregations:{_colorpalette:{type:"sap.m.ColorPalettePopover",multiple:false,visibility:"hidden"},_button:{type:"sap.m.Button",multiple:false,visibility:"hidden"}}},renderer:function(e,t){var o=t.getAggregation("_button");e.openStart("div");e.addClass("sapUiIntegrationColorSelect");e.writeClasses();e.writeStyles();e.writeElementData(t);e.openEnd();e.renderControl(o);e.close("div")}});var s={};function i(){s={"sap.m.AvatarColor":{Accent1:r.get("sapUiAccent1"),Accent2:r.get("sapUiAccent2"),Accent3:r.get("sapUiAccent3"),Accent4:r.get("sapUiAccent4"),Accent5:r.get("sapUiAccent5"),Accent6:r.get("sapUiAccent6"),Accent7:r.get("sapUiAccent7"),Accent8:r.get("sapUiAccent8"),Accent9:r.get("sapUiAccent9"),Accent10:r.get("sapUiAccent10"),TileIcon:r.get("sapUiTileIconColor"),Transparent:"transparent",Placeholder:r.get("sapUiContentImagePlaceholderBackground")}}}i();n.attachThemeChanged(i);var p,c=new t("oColorPalettePopoverFull",{colorSelect:function(e){var t=e.getParameter("value"),o=s[p.getColorEnum()],n=Object.values(o).indexOf(t);p.setEnumValue(Object.keys(o)[n]);p.setColorValue(t);p._colorValue=t}});l.prototype.init=function(){this._oButton=new o({icon:"sap-icon://color-fill",press:function(){this._openPalette()}.bind(this)});this._colorValue="transparent";this.setAggregation("_button",this._oButton)};l.prototype.onBeforeRendering=function(){if(!this._oStyle){this._oStyle=document.createElement("style");this._oStyle.innerHTML="#"+this.getId()+" .sapUiIcon::before { color: "+this._colorValue+" !important}";document.body.appendChild(this._oStyle)}var e=this._oStyle.sheet.rules[0];if(!this._colorValue||this._colorValue==="transparent"){e.style.opacity="0.5";e.style.color="transparent";e.style.backgroundSize="10px 10px";e.style.backgroundPosition="0px 0px, 0px 10px, 10px -10px, -10px 10px";e.style.border="1px dashed #808080";e.style.padding="0px 0px";e.style.backgroundImage="linear-gradient(45deg, #ddd 25%, transparent 25%), linear-gradient(-45deg, #ddd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ddd 75%), linear-gradient(-45deg, transparent 75%, #ddd 75%)"}else{e.style.textShadow="unset";e.style.opacity="unset";e.style.backgroundSize="unset";e.style.backgroundPosition="unset";e.style.border="unset";e.style.padding="unset";e.style.backgroundImage="unset";e.style.color=this._colorValue}};l.prototype._openPalette=function(){p=this;c.setShowDefaultColorButton(true);c.setShowMoreColorsButton(false);c.setDefaultColor("");var e=s[this.getColorEnum()];if(e){var t=[];for(var o in e){t.push(e[o])}c.setColors(t)}c.openBy(this._oButton)};l.prototype.setEnumValue=function(e){this.setProperty("enumValue",e,true);this._colorValue=s[this.getColorEnum()][e];this.rerender()};l.prototype.bindProperty=function(t,o){e.prototype.bindProperty.apply(this,arguments);if(t==="editable"){var n=a({},o);this._oButton.bindProperty("enabled",n)}return this};return l});