sap.ui.define(["./Base"],function(e){"use strict";return e.extend("sapmarco.projectpages.controller.Home",{onInit:function(){this.initializeViewTheme();this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())},onUI5IconPress:function(){this.getOwnerComponent().openVersionDialog()},onThemeSwap:function(e){this.toggleTheme(e)}})});