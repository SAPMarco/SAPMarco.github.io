/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
window.sapUiSupportReport=window.sapUiSupportReport||{};window.sapUiSupportReport.filter=function(){"use strict";function e(){var e=document.querySelectorAll("[data-groupName]");for(var t=0;t<e.length;t++){var r=e[t];var i=r.getAttribute("data-expandableElement");var a=r.getAttribute("data-groupName");var l=r.getAttribute("data-groupNumber");var s=document.querySelectorAll("#"+i+" > tr");var n=0;var o=0;for(var c=0;c<s.length;c++){var u=s[c];var d=u.querySelectorAll("tr.filterable:not(.filtered)");var f=d.length;if(f===0){u.classList.add("filtered")}else{o++;n+=f;u.querySelector("span.rule-issue-number").innerText="("+f+" issues)"}}if(o===0){r.classList.add("filtered")}else{r.classList.remove("filtered");r.querySelector("span").innerText=" "+l+". "+a+" ("+o+" rules, "+n+" issues)"}}}function t(e){if(e.classList.contains("filter-active")){return}var t=document.getElementsByClassName("filter-active");for(var r=0;r<t.length;r++){t[r].classList.remove("filter-active")}e.classList.add("filter-active")}function r(){var e=document.querySelectorAll(".filtered");for(var t=0;t<e.length;t++){e[t].classList.remove("filtered")}}function i(e){r();if(e==="Total"){return}var t=document.querySelectorAll('.filterable:not([data-severity="'+e+'"])');for(var i=0;i<t.length;i++){t[i].classList.add("filtered")}}function a(r){t(this);var a=this.getAttribute("data-severity");i(a);e()}function l(){try{var e=document.getElementsByClassName("filter");if(!e){return}for(var t=0;t<e.length;t++){if(e[t].classList.contains("filter-initialized")){continue}e[t].addEventListener("click",a);e[t].classList.add("filter-initialized")}}catch(e){console.log("There was a problem initializing filters.")}}return{init:l}}();