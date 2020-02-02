//@ui5-bundle sapmarco/projectpages/Component-preload.js
sap.ui.require.preload({
	"sapmarco/projectpages/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","sapmarco/projectpages/model/models","./controller/VersionDialog"],function(e,t,i,s){"use strict";return e.extend("sapmarco.projectpages.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this._VersionDialog=new s(this.getRootControl());this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")},openVersionDialog:function(){this._VersionDialog.open()},getContentDensityClass:function(){if(!this._sContentDensityClass){if(!t.support.touch){this._sContentDensityClass="sapUiSizeCompact"}else{this._sContentDensityClass="sapUiSizeCozy"}}return this._sContentDensityClass},exit:function(){this._VersionDialog.destroy();delete this._VersionDialog}})});
},
	"sapmarco/projectpages/controller/Main.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("sapmarco.projectpages.controller.Main",{onInit:function(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches){sap.ui.getCore().applyTheme("sap_fiori_3_dark");this.byId("cVRow").removeStyleClass("cV")}},onUI5IconPress:function(){this.getOwnerComponent().openVersionDialog()},onThemeSwap:function(e){if(sap.ui.getCore().getConfiguration().getTheme()==="sap_belize"){sap.ui.getCore().applyTheme(e);this.byId("cVRow").removeStyleClass("cV")}else{sap.ui.getCore().applyTheme("sap_belize");this.byId("cVRow").addStyleClass("cV")}}})});
},
	"sapmarco/projectpages/controller/VersionDialog.js":function(){sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/core/Fragment","sap/ui/core/syncStyleClass"],function(e,o,n){"use strict";return e.extend("sapmarco.projectpages.controller.VersionDialog",{constructor:function(e){this._oView=e},exit:function(){delete this._oView},open:function(){var e=this._oView;if(!e.byId("VersionDialog")){var t={onCloseDialog:function(e){e.getSource().getParent().close();e.getSource().getParent().getModel("versionInfo").destroy()}};o.load({type:"XML",id:e.getId(),name:"sapmarco.projectpages.view.VersionDialog",controller:t}).then(function(o){e.addDependent(o);sap.ui.require(["sap/ui/VersionInfo"],function(e){e.load().then(function(e){var n=new sap.ui.model.json.JSONModel(e);o.setModel(n,"versionInfo")})});n(e.getController().getOwnerComponent().getContentDensityClass(),e,o);o.open()})}else{e.byId("VersionDialog").open()}}})});
},
	"sapmarco/projectpages/i18n/i18n.properties":'title=projectpages\nappTitle=projectpages\nappDescription=App Description\n',
	"sapmarco/projectpages/i18n/i18n_de_DE.properties":'title=projectpages\nappTitle=projectpages\nappDescription=App Description\nsectionSkills=Womit arbeite ich?\nVersionname=Projektname: \nUI5Ver=Version:  \nfooterText=Ich bin nur ein Demo-Projekt.\nthemeToggleTooltip=Switch Theme\nversionInfoTooltip=Version\nintroText=Engagierter ABAP-Entwickler, der auch gerne mal ueber den SAP-Rand hinausblickt um neues zu lernen und entdecken. \nmainText=Hey! Mein Name ist Marco und dies ist eine Demo-Seite, auf der ich einige UI5/WebDev-spezifische Dinge uebe. Hier und da gibt es ein paar Informationen ueber mich. Um mehr zu erfahren, folge mir einfach auf einen der oben verlinkten Social-Media-Seiten. \\n Jegliche Art von Feedback wird ist sehr geschaetzt, da ich in meiner derzeitigen Position auf Arbeit nicht wirklich mit UI5 arbeite, lerne ich hauptsaechlich in meiner Freizeit. Darueber hinaus interessieren mich weitere Themen wie: CAP (bzw. alles rund um die Cloud), CDS, OData und so weiter... \\n\\n Muesste ich mich in einem Satz beschreiben waere das wohl: \'Jack of all trades - and master of none\'.',
	"sapmarco/projectpages/i18n/i18n_en.properties":'title=projectpages\nappTitle=projectpages\nappDescription=App Description\nsectionSkills=What am I working with?\nVersionname=Projectname: \nUI5Ver=Version: \nfooterText=I\'m just a little demo project, don\'t hurt me. Kill me. Now.\nthemeToggleTooltip=Toggle Theme\nversionInfoTooltip=Check Version\nintroText=Dedicated ABAP developer that also takes great interest in exploring things beyond my known field of work.\nmainText=Hey there! My name is Marco and this is a demo page where I practice a few UI5/Web Development specific things. It has a bit of information about me here and there. To learn more just follow me on one of the social media sites linked above. \\n Any feedback is very much appreciated as I\'m not a \'real\' UI5 developer in my current working position but mostly learn about it in my spare time. There are other topics like CAP (Cloud in general), CDS, OData and so forth that also highly interest me. \\n\\n A Short description of myself would be: \'Jack of all trades - but master of none\'.',
	"sapmarco/projectpages/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"sapmarco.projectpages","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","dataSources":{"cv":{"uri":"model/cv.json","type":"JSON"}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_belize","sap_fiori_3"]},"sap.ui5":{"rootView":{"viewName":"sapmarco.projectpages.view.Main","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.60.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"sapmarco.projectpages.i18n.i18n"}},"cv":{"type":"sap.ui.model.json.JSONModel","dataSource":"cv"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"sapmarco.projectpages.view","controlId":"app","controlAggregation":"pages","async":true},"routes":[{"name":"RouteMain","pattern":"RouteMain","target":["TargetMain"]}],"targets":{"TargetMain":{"viewType":"XML","viewLevel":1,"viewName":"Main"}}}}}',
	"sapmarco/projectpages/model/cv.json":'[{"companie":"SALT Solutions AG","website":"https://www.salt-solutions.de/","nodes":[{"description":"Role: ","position":"SAP ABAP Developer","nodes":[{"textFrom":"From: ","textTo":"To: ","from":"01.07.2017","to":"Now"}]},{"description":"Role: ","position":"Training as Application Developer","nodes":[{"textFrom":"From: ","textTo":"To: ","from":"01.09.2014","to":"01.07.2017"}]}]},{"companie":"Vogel Business Media GmbH & Co. KG","website":"https://www.vogel.de/","nodes":[{"description":"Role: ","position":"Intern in Media Design","nodes":[{"textFrom":"From: ","textTo":"To: ","from":"04.03.2013","to":"15.03.2013"}]}]}]',
	"sapmarco/projectpages/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"sapmarco/projectpages/view/Main.view.xml":' <mvc:View controllerName="sapmarco.projectpages.controller.Main"\n\tdisplayBlock="true"\n\txmlns:html="http://www.w3.org/1999/xhtml"\n\txmlns="sap.m"\n\txmlns:l="sap.ui.layout"\n\txmlns:core="sap.ui.core"\n\txmlns:mvc="sap.ui.core.mvc"><App id="idAppControl"><pages><Page showHeader="false"><content><l:BlockLayout><l:BlockLayoutRow><l:BlockLayoutCell class="headerBar" width="100%" backgroundColorSet="ColorSet5" backgroundColorShade="ShadeC"><FlexBox alignItems="Center" \n\t\t\t\t\t\t\t\t \t\t alignContent="Center" \n\t\t\t\t\t\t\t\t\t\t justifyContent="Center"\n\t\t\t\t\t\t\t\t\t\t backgroundDesign="Transparent"\n\t\t\t\t\t\t\t\t\t\t direction="Column"><Avatar class="Avatar" showBorder="true" displaySize="L" src="./resources/img/myself.jpg" fallbackIcon="sap-icon://person-placeholder"/></FlexBox><FlexBox class="sapUiTinyMarginTop" direction="Row" justifyContent="Center"><html:a class="setOpacity"  href="https://linkedin.com/in/dev-marco-beier" target="_blank"><Image class="setMinSeperator" src="./resources/img/Logo_LinkedIn.svg" alt="Linkedin Logo" width="5vw" height="5vh"/></html:a><html:a class="setOpacity" href="https://xing.com/profile/Marco_Beier8/cv" target="_blank"><Image class="setMinSeperator" src="./resources/img/Logo_Xing.svg" alt="Xing Logo" width="5vw" height="5vh"/></html:a><html:a class="setOpacity" href="https://github.com/SAPMarco" target="_blank"><Image class="setMinSeperator" src="./resources/img/Logo_Github.svg" alt="Github Logo" width="5vw" height="5vh"/></html:a><html:a class="setOpacity" href="https://twitter.com/Wridgeu" target="_blank"><Image class="setMinSeperator" src="./resources/img/Logo_Twitter.svg" alt="Twitter Logo" width="5vw" height="5vh"/></html:a></FlexBox></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow><l:BlockLayoutCell><FlexBox class="setMiddle" width="100%" direction="Row"><Text class="text" text="{i18n>introText}"/></FlexBox></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow class="cV setMiddle" id="cVRow"><l:BlockLayoutCell><FlexBox  width="100%" direction="Row"><Text class="text" text="{i18n>mainText}"/></FlexBox></l:BlockLayoutCell><l:BlockLayoutCell><FlexBox direction="Column"><FlexBox justifyContent="Center"><Tree id="cvTree" items="{path: \'cv>/\', parameters:{arrayNames: [\'nodes\']}}"><CustomTreeItem><Text renderWhitespace="true" text="{cv>description}"/><Link href="{cv>website}" text="{cv>companie}" target="_blank"/><Label text="{cv>position}"/><FlexBox direction="Column"><FlexBox direction="Row"><Text renderWhitespace="true" text="{cv>textTo}"/><Label text="{cv>to}"/></FlexBox><FlexBox direction="Row"><Text renderWhitespace="true" text="{cv>textFrom}"/><Label text="{cv>from}"/></FlexBox></FlexBox></CustomTreeItem></Tree></FlexBox></FlexBox></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow><l:BlockLayoutCell class="sapUiNoContentPadding"><FlexBox class="sapUiTinyMarginTop setMiddle" width="100%" direction="Row"><Text class="title" text="{i18n>sectionSkills}"/></FlexBox></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow><l:BlockLayoutCell><FlexBox class="sapUiTinyMarginTop" wrap="Wrap" direction="Row" justifyContent="Center" alignItems="Center"><Image class="setOpacity bioImage" width="100px" src="./resources/img/Logo_SAP.svg" alt="SAP Logo" tooltip="SAP EWM, ERP, Solution Manager ..."/><Image class="setOpacity bioImage" width="100px" src="./resources/img/Logo_ABAP.svg" alt="ABAP Logo" tooltip="ABAP, CTS, Customizing ..."/><Image class="setOpacity bioImage" width="100px" src="./resources/img/Logo_UI5.png" alt="UI5 Phoenix Logo" tooltip="SAPUI5 / OpenUI5"/><Image class="setOpacity bioImage" width="100px" src="./resources/img/Logo_JS.svg" alt="JavaScript Logo" tooltip="Javascript"/><Image class="setOpacity bioImage borderRadius" width="100px" src="./resources/img/Logo_HTML5.svg" alt="HTML5 Logo" tooltip="HTML5"/><Image class="setOpacity bioImage borderRadius" width="100px" height="100px" src="./resources/img/Logo_CSS.svg" alt="CSS Logo" tooltip="CSS"/><Image class="setOpacity bioImage borderRadius" width="100px" src="./resources/img/Logo_Github.svg" alt="Github Logo" tooltip="Github / GIT"/></FlexBox></l:BlockLayoutCell></l:BlockLayoutRow></l:BlockLayout></content><footer><Toolbar class="toolbar" design="Info"><core:Icon src="sap-icon://lightbulb" class="size2"\tcolor="#ffffff"\tpress=".onThemeSwap(\'sap_fiori_3_dark\')" alt="Toggle Theme" tooltip="{i18n>themeToggleTooltip}"/><ToolbarSpacer/><Text text="{i18n>footerText}" ><layoutData><ToolbarLayoutData shrinkable="true"/></layoutData></Text><ToolbarSpacer/><core:Icon src="sap-icon://sap-ui5"\tclass="size2" color="#ffffff" press="onUI5IconPress" alt="UI5 Version" tooltip="{i18n>versionInfoTooltip}"/></Toolbar></footer></Page></pages></App></mvc:View>',
	"sapmarco/projectpages/view/VersionDialog.fragment.xml":'<core:FragmentDefinition\n   xmlns="sap.m"\n   xmlns:core="sap.ui.core" ><Dialog\n      title="Info"\n      titleAlignment="Center"\n      verticalScrolling="false"\n      horizontalScrolling="false"><FlexBox direction="Row" justifyContent="Center"><FlexBox direction="Column"><FlexBox direction="Row" justifyContent="Start"><Label text="{i18n>UI5Ver}"/><Text renderWhitespace="true" text=" {versionInfo>/version}"/></FlexBox><FlexBox direction="Row" justifyContent="Start"><Label text="{i18n>Versionname}"/><Text renderWhitespace="true" text=" {versionInfo>/name}"/></FlexBox></FlexBox></FlexBox><beginButton><Button text="close" press="onCloseDialog"/></beginButton></Dialog></core:FragmentDefinition>'
});
