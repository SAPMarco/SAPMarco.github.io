/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Item","sap/ui/core/Renderer","sap/ui/core/IconPool","sap/ui/core/InvisibleText","sap/ui/core/library","sap/ui/core/Control"],function(e,t,i,r,a,s,o){"use strict";var n=s.TextAlign;var l=s.TextDirection;var p=e.ImageHelper;var d=e.IconTabFilterDesign;var c=s.IconColor;var u=t.extend("sap.m.IconTabFilter",{metadata:{interfaces:["sap.m.IconTab","sap.ui.core.PopupInterface"],library:"sap.m",designtime:"sap/m/designtime/IconTabFilter.designtime",properties:{count:{type:"string",group:"Data",defaultValue:""},showAll:{type:"boolean",group:"Misc",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:""},iconColor:{type:"sap.ui.core.IconColor",group:"Appearance",defaultValue:c.Default},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true},visible:{type:"boolean",group:"Behavior",defaultValue:true},design:{type:"sap.m.IconTabFilterDesign",group:"Appearance",defaultValue:d.Vertical}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}}});u._aAllIconColors=["sapMITBFilterCritical","sapMITBFilterPositive","sapMITBFilterNegative","sapMITBFilterDefault","sapMITBFilterNeutral"];u.prototype._getImageControl=function(e,t,i){var r={src:this.getIcon(),densityAware:this.getIconDensityAware(),useIconTooltip:false};if(r.src){this._oImageControl=p.getImageControl(this.getId()+"-icon",this._oImageControl,t,r,e,i)}else if(this._oImageControl){this._oImageControl.destroy();this._oImageControl=null}return this._oImageControl};u.prototype.exit=function(e){if(this._oImageControl){this._oImageControl.destroy()}if(t.prototype.exit){t.prototype.exit.call(this,e)}if(this._invisibleText){this._invisibleText.destroy();this._invisibleText=null}};u.prototype.invalidate=function(){var e=this.getParent(),t,i;if(!e){return}t=e.getParent();if(!(t instanceof sap.m.IconTabBar)){e.invalidate();return}i=t.getParent();if(i instanceof sap.m.ObjectHeader){i.invalidate()}else{t.invalidate()}};u.prototype.setProperty=function(e,t,i){switch(e){case"enabled":case"textDirection":case"text":case"count":case"showAll":case"icon":case"iconColor":case"iconDensityAware":case"design":if(this.getProperty(e)===t){return this}o.prototype.setProperty.call(this,e,t,true);if(!i){var r=this.getParent();if(r instanceof sap.m.IconTabHeader){r.invalidate()}}break;default:o.prototype.setProperty.apply(this,arguments);break}return this};u.prototype._getNonEmptyKey=function(){var e=this.getKey();if(e){return e}return this.getId()};u.prototype.render=function(e,t,i){var r=this;if(!r.getVisible()){return}var a=this.getParent(),s=a.getParent(),o=s instanceof sap.m.IconTabBar,n=sap.ui.getCore().getLibraryResourceBundle("sap.m"),l='role="tab"',p=r.getId(),c=r.getCount(),g=r.getText(),I=r.getIcon(),f=r.getDesign(),T=r.getIconColor(),C=T==="Positive"||T==="Critical"||T==="Negative",b=f===d.Horizontal,w=o&&s.getUpperCase(),v=a._bTextOnly,h=a._bInLine||a.isInlineMode();if(o){l+=' aria-controls="'+s.sId+'-content" '}if(g.length||c!==""||I){l+='aria-labelledby="';var y=[];if(c!==""){y.push(p+"-count")}if(g.length){y.push(p+"-text")}if(I){y.push(p+"-icon")}if(C){y.push(p+"-iconColor")}l+=y.join(" ");l+='"'}e.write("<div "+l+" ");if(t!==undefined&&i!==undefined){e.writeAccessibilityState({posinset:t+1,setsize:i})}e.writeElementData(r);e.addClass("sapMITBItem");if(!c){e.addClass("sapMITBItemNoCount")}if(b){e.addClass("sapMITBHorizontal")}else{e.addClass("sapMITBVertical")}if(r.getShowAll()){e.addClass("sapMITBAll")}else{e.addClass("sapMITBFilter");e.addClass("sapMITBFilter"+T)}if(!r.getEnabled()){e.addClass("sapMITBDisabled");e.writeAttribute("aria-disabled",true)}e.writeAttribute("aria-selected",false);var x=r.getTooltip_AsString();if(x){e.writeAttributeEscaped("title",x)}e.writeClasses();e.write(">");if(!h){e.write('<div id="'+p+'-tab" class="sapMITBTab">');if(!r.getShowAll()||!I){if(C){e.write('<div id="'+p+'-iconColor" style="display: none;">'+n.getText("ICONTABBAR_ICONCOLOR_"+T.toUpperCase())+"</div>")}e.renderControl(r._getImageControl(["sapMITBFilterIcon","sapMITBFilter"+T],a,u._aAllIconColors))}if(!r.getShowAll()&&!I&&!v){e.write('<span class="sapMITBFilterNoIcon"> </span>')}if(b&&!r.getShowAll()){e.write("</div>");e.write('<div class="sapMITBHorizontalWrapper">')}e.write('<span id="'+p+'-count" ');e.addClass("sapMITBCount");e.writeClasses();e.write(">");if(c===""&&b){e.write("&nbsp;")}else{e.writeEscaped(c)}e.write("</span>");if(!b){e.write("</div>")}}if(g.length){e.write('<div id="'+p+'-text" ');e.addClass("sapMITBText");if(w){e.addClass("sapMITBTextUpperCase")}if(h){e.writeAttribute("dir","ltr")}e.writeClasses();e.write(">");e.writeEscaped(a._getDisplayText(r));e.write("</div>")}if(!h&&b){e.write("</div>")}e.write('<div class="sapMITBContentArrow"></div>');e.write("</div>")};u.prototype.renderInSelectList=function(e,t,i,r){var s=this;if(this._invisibleText){this._invisibleText.destroy();this._invisibleText=null}if(!s.getVisible()){return}var o=true,n,l=t._iconTabHeader,p=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(l){o=l._bTextOnly;n=t._bIconOnly}e.write("<li");e.writeElementData(s);e.writeAttribute("tabindex","-1");e.writeAttribute("role","option");if(i!==undefined&&r!==undefined){e.writeAttribute("aria-posinset",i+1);e.writeAttribute("aria-setsize",r)}var d=s.getTooltip_AsString();if(d){e.writeAttributeEscaped("title",d)}if(!s.getEnabled()){e.addClass("sapMITBDisabled");e.writeAttribute("aria-disabled",true)}e.addClass("sapMITBSelectItem");if(t.getSelectedItem()==s){e.addClass("sapMITBSelectItemSelected");e.writeAttribute("aria-selected",true)}var c=s.getIconColor();e.addClass("sapMITBFilter"+c);e.writeClasses();var u=s.getId(),g=c=="Positive"||c=="Critical"||c=="Negative";var I=' aria-labelledby="';if(!n){I+=u+"-text "}if(!o&&s.getIcon()){I+=u+"-icon "}if(g){this._invisibleText=new a({text:p.getText("ICONTABBAR_ICONCOLOR_"+c.toUpperCase())});I+=this._invisibleText.getId()}I+='"';e.write(I+">");if(this._invisibleText){e.renderControl(this._invisibleText)}if(!o){this._renderIcon(e)}if(!n){this._renderText(e)}e.write("</li>")};u.prototype._renderIcon=function(e){var t=this.getIcon();if(t){var i=r.getIconInfo(t);var a=["sapMITBSelectItemIcon"];if(i&&!i.suppressMirroring){a.push("sapUiIconMirrorInRTL")}e.writeIcon(t,a,{id:this.getId()+"-icon","aria-hidden":true})}else{e.write('<span class="sapUiIcon"></span>')}};u.prototype._renderText=function(e){var t=this.getText(),r=this.getCount(),a=sap.ui.getCore().getConfiguration().getRTL(),s=this.getTextDirection();e.write("<span");e.writeAttribute("id",this.getId()+"-text");e.writeAttribute("dir","ltr");e.addClass("sapMText");e.addClass("sapMTextNoWrap");e.addClass("sapMITBText");e.writeClasses();if(s!==l.Inherit){e.writeAttribute("dir",s.toLowerCase())}var o=i.getTextAlign(n.Begin,s);if(o){e.addStyle("text-align",o);e.writeStyles()}if(r){if(a){t="("+r+") "+t}else{t+=" ("+r+")"}}e.write(">");e.writeEscaped(t);e.write("</span>")};return u});