sap.ui.define([],()=>{"use strict";return{getSelectedContent(t){return fetch(`https://raw.githubusercontent.com/wiki/SAPMarco/SAPMarco.github.io/${t.replace(/[-*?]/g,"%20")}.md`).then(t=>t.text())},getWikiIndex(){return fetch(`https://raw.githubusercontent.com/wiki/SAPMarco/SAPMarco.github.io/_Sidebar.md`).then(t=>t.text())}}});