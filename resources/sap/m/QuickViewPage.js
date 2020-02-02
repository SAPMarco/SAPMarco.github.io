/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/layout/form/SimpleForm","sap/ui/layout/VerticalLayout","sap/ui/layout/HorizontalLayout","./Page","./Button","./Bar","./Title","./Image","./Link","./Text","./Label","./HBox","sap/ui/core/Icon","sap/ui/core/Title","sap/ui/core/CustomData","sap/ui/core/library","sap/ui/layout/library","sap/ui/Device","sap/ui/layout/form/ResponsiveGridLayout","./QuickViewPageRenderer","sap/base/security/encodeURL","sap/ui/dom/jquery/Focusable"],function(e,t,a,i,o,n,r,s,g,u,l,p,c,d,h,f,v,C,y,m,_,P,w,k){"use strict";var b=e.URLHelper;var V=m.form.SimpleFormLayout;var A=y.TitleLevel;var I=e.QuickViewGroupElementType;var x=e.ButtonType;var N=t.extend("sap.m.QuickViewPage",{metadata:{library:"sap.m",properties:{pageId:{type:"string",group:"Misc",defaultValue:""},header:{type:"string",group:"Misc",defaultValue:""},title:{type:"string",group:"Misc",defaultValue:""},titleUrl:{type:"string",group:"Misc",defaultValue:""},crossAppNavCallback:{type:"object",group:"Misc"},description:{type:"string",group:"Misc",defaultValue:""},icon:{type:"string",group:"Misc",defaultValue:""},fallbackIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null}},defaultAggregation:"groups",aggregations:{groups:{type:"sap.m.QuickViewGroup",multiple:true,singularName:"group",bindable:"bindable"}}}});N.prototype.init=function(){this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");var e=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService;if(e){this.oCrossAppNavigator=e("CrossApplicationNavigation")}};N.prototype.onBeforeRendering=function(){this._destroyPageContent();this._createPageContent()};N.prototype.getPageContent=function(){return this._mPageContent};N.prototype.setNavContext=function(e){this._mNavContext=e};N.prototype.getNavContext=function(){return this._mNavContext};N.prototype.setPageTitleControl=function(e){this._oPageTitle=e};N.prototype.getPageTitleControl=function(){return this._oPageTitle};N.prototype._createPage=function(){var e=this._createPageContent();var t=this.getNavContext();var i;if(this._oPage){i=this._oPage;i.destroyContent();i.setCustomHeader(new g)}else{i=this._oPage=new r(t.quickViewId+"-"+this.getPageId(),{customHeader:new g});i.addEventDelegate({onAfterRendering:this.onAfterRenderingPage},this)}if(this.getHeader()===""&&t.quickView.getPages().length===1&&!_.system.phone){i.setShowHeader(false);i.addStyleClass("sapMQuickViewPageWithoutHeader")}if(e.header){i.addContent(e.header)}i.addContent(e.form);var o=i.getCustomHeader();o.addContentMiddle(new u({text:this.getHeader()}).addStyleClass("sapMQuickViewTitle"));if(t.hasBackButton){o.addContentLeft(new s({type:x.Back,tooltip:this._oResourceBundle.getText("PAGE_NAVBUTTON_TEXT"),press:function(){if(t.navContainer){t.quickView._setNavOrigin(null);t.navContainer.back()}}}))}if(t.popover&&_.system.phone){o.addContentRight(new s({icon:a.getIconURI("decline"),press:function(){t.popover.close()}}))}i.addStyleClass("sapMQuickViewPage");return i};N.prototype.onAfterRenderingPage=function(){var e=this.getParent(),a=e instanceof t&&e.isA("sap.m.QuickView");if(a&&!this._oPage.$().firstFocusableDomRef()){this._oPage.$("cont").attr("tabindex",0)}if(this._bItemsChanged){var i=this.getNavContext();if(i){i.quickView._restoreFocus()}this._bItemsChanged=false}};N.prototype._createPageContent=function(){var e=this._createForm();var t=this._getPageHeaderContent();var a=this.getPageTitleControl();if(t&&a){e.addAriaLabelledBy(a)}this._mPageContent={form:e,header:t};return this._mPageContent};N.prototype._createForm=function(){var e=this.getAggregation("groups"),t=new i({maxContainerCols:1,editable:false,layout:V.ResponsiveGridLayout});if(e){for(var a=0;a<e.length;a++){if(e[a].getVisible()){this._renderGroup(e[a],t)}}}return t};N.prototype._getPageHeaderContent=function(){var e,t,i=this.getFallbackIcon(),r=new o,s=new n,g=this.getIcon(),d=this.getTitle(),h=this.getDescription(),f=this.getTitleUrl();if(!g&&!d&&!h){return null}if(g){if(this.getIcon().indexOf("sap-icon")==0){e=this._createIcon(g,!f,d)}else{e=new l({src:g,decorative:false,tooltip:d}).addStyleClass("sapUiIcon sapMQuickViewPageImage");if(a.isIconURI(i)){t=this._createIcon(i,!f,d);t.addStyleClass("sapMQuickViewThumbnail sapMQuickViewPageFallbackIconHidden");e.attachError(this._onImageLoadError.bind(this));s.addContent(t)}}e.addStyleClass("sapMQuickViewThumbnail");if(f){e.attachPress(this._crossApplicationNavigation(this));if(t){t.attachPress(this._crossApplicationNavigation(this))}}s.addContent(e)}var v;if(f){v=new p({text:d,href:f,target:"_blank"})}else if(this.getCrossAppNavCallback()){v=new p({text:d});v.attachPress(this._crossApplicationNavigation(this))}else{v=new u({text:d,level:A.H1})}this.setPageTitleControl(v);var C=new c({text:h});r.addContent(v);r.addContent(C);s.addContent(r);return s};N.prototype._createIcon=function(e,t,a){return new f({src:e,decorative:t,useIconTooltip:false,tooltip:a})};N.prototype._renderGroup=function(e,t){var i=e.getAggregation("elements");var o,n,r;if(e.getHeading()){t.addContent(new v({text:e.getHeading(),level:A.H2}))}if(!i){return}var s=this.getNavContext();for(var g=0;g<i.length;g++){o=i[g];if(!o.getVisible()){continue}r=new d({text:o.getLabel()});var u;if(s){u=s.quickViewId}n=o._getGroupElementValue(u);t.addContent(r);if(!n){t.addContent(new c({text:""}));continue}r.setLabelFor(n.getId());if(o.getType()==I.pageLink){n.attachPress(this._attachPressLink(this))}if(o.getType()==I.mobile&&!_.system.desktop){var l=new f({src:a.getIconURI("post"),tooltip:this._oResourceBundle.getText("QUICKVIEW_SEND_SMS"),decorative:false,customData:[new C({key:"phoneNumber",value:o.getValue()})],press:this._mobilePress});var p=new h({items:[n,l]});t.addContent(p)}else{t.addContent(n)}}};N.prototype._crossApplicationNavigation=function(e){return function(){if(e.getCrossAppNavCallback()&&e.oCrossAppNavigator){var t=e.getCrossAppNavCallback();if(typeof t=="function"){var a=t();var i=e.oCrossAppNavigator.hrefForExternal({target:{semanticObject:a.target.semanticObject,action:a.target.action},params:a.params});b.redirect(i)}}else if(e.getTitleUrl()){window.open(e.getTitleUrl(),"_blank")}}};N.prototype._destroyPageContent=function(){if(!this._mPageContent){return}if(this._mPageContent.form){this._mPageContent.form.destroy()}if(this._mPageContent.header){this._mPageContent.header.destroy()}this._mPageContent=null};N.prototype.exit=function(){this._oResourceBundle=null;if(this._oPage){this._oPage.destroy();this._oPage=null}else{this._destroyPageContent()}this._mNavContext=null};N.prototype._attachPressLink=function(e){var t=e.getNavContext();return function(e){e.preventDefault();var a=this.getCustomData()[0].getValue();if(t.navContainer&&a){t.quickView._setNavOrigin(this);t.navContainer.to(a)}}};N.prototype._mobilePress=function(){var e="sms://"+k(this.getCustomData()[0].getValue());window.location.replace(e)};N.prototype._updatePage=function(){var e=this.getNavContext();if(e&&e.quickView._bRendered){this._bItemsChanged=true;e.popover.focus();if(e.quickView.indexOfPage(this)==0){e.quickView._clearContainerHeight()}this._createPage();e.popover.$().css("display","block");e.quickView._adjustContainerHeight();e.quickView._restoreFocus()}};["setModel","bindAggregation","setAggregation","insertAggregation","addAggregation","removeAggregation","removeAllAggregation","destroyAggregation"].forEach(function(e){N.prototype["_"+e+"Old"]=N.prototype[e];N.prototype[e]=function(){var t=N.prototype["_"+e+"Old"].apply(this,arguments);this._updatePage();if(["removeAggregation","removeAllAggregation"].indexOf(e)!==-1){return t}return this}});N.prototype.setProperty=function(e,a){var i=this.getQuickViewBase(),o=false;if(i&&i.isA("sap.m.QuickView")){o=true}t.prototype.setProperty.call(this,e,a,o);this._updatePage();return this};N.prototype.getQuickViewBase=function(){var e=this.getParent();if(e&&e.isA("sap.m.QuickViewBase")){return e}return null};N.prototype._onImageLoadError=function(e){var t=0,a=this._mPageContent.header.getContent()[t],i=e.getSource(),o=document.activeElement===i.getDomRef();a.$().removeClass("sapMQuickViewPageFallbackIconHidden");i.$().addClass("sapMQuickViewPageFailedImage");if(o){a.focus()}};return N});