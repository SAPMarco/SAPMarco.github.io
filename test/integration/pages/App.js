sap.ui.require(["sap/ui/test/Opa5","sap/ui/test/matchers/AggregationLengthEquals"],function(e,a){"use strict";var s="sapmarco.projectpages.view.Shell";var t="idAppControl";e.createPageObjects({onTheAppPage:{assertions:{iShouldSeePageCount:function(r){return this.waitFor({id:t,viewName:s,matchers:[new a({name:"pages",length:r})],success:function(){e.assert.ok(true,"The app contains one page")},errorMessage:"App does not have expected number of pages '"+r+"'."})}}}})});