/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexObjects/CompVariant","sap/base/Log"],function(e,t){"use strict";var n={addFavorite:function(e){e.setFavorite(true)},removeFavorite:function(e){e.setFavorite(false)}};function a(e){var t={};e.changes.forEach(function(e){var n=e.getContent().key;if(!t[n]){t[n]=[]}t[n].push(e)});return t}function r(e,n){t.error("No change handler for change with the ID '"+n.getId()+"' and type '"+n.getChangeType()+"' defined.\n"+"The variant '"+e.getId()+"'was not modified'")}function i(t,n){var a={fileName:n.id||"*standard*",content:n.content||{},texts:{variantName:{value:n.name||""}},selector:{persistencyKey:t}};if(n.favorite!==undefined){a.content.favorite=n.favorite}if(n.executeOnSelection!==undefined){a.content.executeOnSelection=n.executeOnSelection}return new e(a)}function o(e,t){var a=t.getId();if(e[a]){e[a].forEach(function(e){var a=n[e.getChangeType()]||r;a(t,e)})}}return{merge:function(e,t,n,r){r=r||[];r=r.map(i.bind(undefined,e));r=r.concat(t.variants);var c=a(t);r.forEach(o.bind(undefined,c));var f;r.forEach(function(e){if(e.getContent().standardvariant){f=e}});if(!f){n.content=n.content||{};f=i(e,n);o(c,f)}else{r=r.filter(function(e){return!e.getContent().standardvariant})}f.setFavorite(true);if(t.standardVariant){var d=t.standardVariant.getContent().executeOnSelect;f.setExecuteOnSelection(d);f.getContent().executeOnSelect=d}return{standardVariant:f,variants:r}}}});