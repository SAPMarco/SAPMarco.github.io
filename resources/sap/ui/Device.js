/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
if(typeof window.sap!=="object"&&typeof window.sap!=="function"){window.sap={}}if(typeof window.sap.ui!=="object"){window.sap.ui={}}(function(){"use strict";if(typeof window.sap.ui.Device==="object"||typeof window.sap.ui.Device==="function"){var e="1.89.0";window.sap.ui.Device._checkAPIVersion(e);return}var n={};var i=0,t=1,r=2,o=3,a=4,s=5;var u=function(){function e(e,n){return("000"+String(e)).slice(-n)}this.defaultComponent="DEVICE";this.sWindowName=window.top==window?"":"["+window.location.pathname.split("/").slice(-1)[0]+"] ";this.log=function(n,u,d){d=d||this.defaultComponent||"";var l=new Date,f={time:e(l.getHours(),2)+":"+e(l.getMinutes(),2)+":"+e(l.getSeconds(),2),date:e(l.getFullYear(),4)+"-"+e(l.getMonth()+1,2)+"-"+e(l.getDate(),2),timestamp:l.getTime(),level:n,message:u||"",component:d||""};if(window.console){var c=f.date+" "+f.time+" "+this.sWindowName+f.message+" - "+f.component;switch(n){case i:case t:console.error(c);break;case r:console.warn(c);break;case o:console.info?console.info(c):console.log(c);break;case a:console.debug(c);break;case s:console.trace(c);break}}return f}};var d=new u;d.log(o,"Device API logging initialized");n._checkAPIVersion=function(e){var n="1.89.0";if(n!=e){d.log(r,"Device API version differs: "+n+" <-> "+e)}};var l={};function f(e,n,i){if(!l[e]){l[e]=[]}l[e].push({oListener:i,fFunction:n})}function c(e,n,i){var t=l[e];if(!t){return this}for(var r=0,o=t.length;r<o;r++){if(t[r].fFunction===n&&t[r].oListener===i){t.splice(r,1);break}}if(t.length==0){delete l[e]}}function m(e,n){var i=l[e];var t;if(i){i=i.slice();for(var r=0,o=i.length;r<o;r++){t=i[r];t.fFunction.call(t.oListener||window,n)}}}var v={WINDOWS:"win",MACINTOSH:"mac",LINUX:"linux",IOS:"iOS",ANDROID:"Android",BLACKBERRY:"bb",WINDOWS_PHONE:"winphone"};function w(e,n){e=e||navigator.userAgent;var i,t;function r(){var i=n||navigator.platform;if(i.indexOf("Win")!=-1){var t=/Windows NT (\d+).(\d)/i;var r=e.match(t);var a="";if(r[1]=="6"){if(r[2]==1){a="7"}else if(r[2]>1){a="8"}}else{a=r[1]}return{name:v.WINDOWS,versionStr:a}}else if(i.indexOf("Mac")!=-1){return{name:v.MACINTOSH,versionStr:""}}else if(i.indexOf("Linux")!=-1){return{name:v.LINUX,versionStr:""}}d.log(o,"OS detection returned no result");return null}i=/Windows Phone (?:OS )?([\d.]*)/;t=e.match(i);if(t){return{name:v.WINDOWS_PHONE,versionStr:t[1]}}if(e.indexOf("(BB10;")>0){i=/\sVersion\/([\d.]+)\s/;t=e.match(i);if(t){return{name:v.BLACKBERRY,versionStr:t[1]}}else{return{name:v.BLACKBERRY,versionStr:"10"}}}i=/\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[\)][^\d]*)([\d.]*)\s/;t=e.match(i);if(t){var a=/iPhone|iPad|iPod/;var s=/PlayBook|BlackBerry/;if(t[0].match(a)){t[3]=t[3].replace(/_/g,".");return{name:v.IOS,versionStr:t[3]}}else if(t[2].match(/Android/)){t[2]=t[2].replace(/\s/g,"");return{name:v.ANDROID,versionStr:t[3]}}else if(t[0].match(s)){return{name:v.BLACKBERRY,versionStr:t[4]}}}i=/\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;t=e.match(i);if(t){return{name:v.ANDROID,versionStr:t.length==3?t[2]:""}}return r()}function p(e,i){n.os=w(e,i)||{};n.os.OS=v;n.os.version=n.os.versionStr?parseFloat(n.os.versionStr):-1;if(n.os.name){for(var t in v){if(v[t]===n.os.name){n.os[t.toLowerCase()]=true}}}}p();n._setOS=p;var h={FIREFOX:"ff",CHROME:"cr",SAFARI:"sf",ANDROID:"an"};var S=navigator.userAgent;function g(e,n){
/*!
		 * Taken from jQuery JavaScript Library v1.7.1
		 * http://jquery.com/
		 *
		 * Copyright 2011, John Resig
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://jquery.org/license
		 *
		 * Includes Sizzle.js
		 * http://sizzlejs.com/
		 * Copyright 2011, The Dojo Foundation
		 * Released under the MIT, BSD, and GPL Licenses.
		 *
		 * Date: Mon Nov 21 21:11:03 2011 -0500
		 */
function i(e){var n=(e||S).toLowerCase();var i=/(webkit)[ \/]([\w.]+)/;var t=/(opera)(?:.*version)?[ \/]([\w.]+)/;var r=/(mozilla)(?:.*? rv:([\w.]+))?/;var o=i.exec(n)||t.exec(n)||n.indexOf("compatible")<0&&r.exec(n)||[];var a={browser:o[1]||"",version:o[2]||"0"};a[a.browser]=true;return a}var t=i(e);var r=e||S;var o=n||window.navigator;var a;var s;if(t.mozilla){a=/Mobile/;if(r.match(/Firefox\/(\d+\.\d+)/)){var u=parseFloat(RegExp.$1);s={name:h.FIREFOX,versionStr:""+u,version:u,mozilla:true,mobile:a.test(r)}}else{s={mobile:a.test(r),mozilla:true,version:-1}}}else if(t.webkit){var d=r.toLowerCase().match(/webkit[\/]([\d.]+)/);var l;if(d){l=d[1]}a=/Mobile/;var f=r.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/);var c=r.match(/FxiOS\/(\d+\.\d+)/);var m=r.match(/Android .+ Version\/(\d+\.\d+)/);if(f||c||m){var v,w,p;if(f){v=h.CHROME;p=a.test(r);w=parseFloat(f[2])}else if(c){v=h.FIREFOX;p=true;w=parseFloat(c[1])}else if(m){v=h.ANDROID;p=a.test(r);w=parseFloat(m[1])}s={name:v,mobile:p,versionStr:""+w,version:w,webkit:true,webkitVersion:l}}else{var g=/Version\/(\d+\.\d+).*Safari/;var E=o.standalone;if(g.test(r)){var A=g.exec(r);var u=parseFloat(A[1]);s={name:h.SAFARI,versionStr:""+u,fullscreen:false,webview:false,version:u,mobile:a.test(r),webkit:true,webkitVersion:l}}else if(/iPhone|iPad|iPod/.test(r)&&!/CriOS/.test(r)&&!/FxiOS/.test(r)&&(E===true||E===false)){s={name:h.SAFARI,version:-1,fullscreen:E,webview:!E,mobile:a.test(r),webkit:true,webkitVersion:l}}else{s={mobile:a.test(r),webkit:true,webkitVersion:l,version:-1}}}}else{s={name:"",versionStr:"",version:-1,mobile:false}}if((t.chrome||window.Intl&&window.Intl.v8BreakIterator)&&"CSS"in window){s.blink=true}return s}n._testUserAgent=g;function E(){n.browser=g();n.browser.BROWSER=h;if(n.browser.name){for(var e in h){if(h[e]===n.browser.name){n.browser[e.toLowerCase()]=true}}}}E();n.support={};n.support.touch=!!("ontouchstart"in window||navigator.maxTouchPoints>0||window.DocumentTouch&&document instanceof window.DocumentTouch||window.TouchEvent&&n.browser.firefox);n.support.pointer=!!window.PointerEvent;n.support.matchmedia=true;n.support.matchmedialistener=true;n.support.orientation=!!("orientation"in window&&"onorientationchange"in window);n.support.retina=window.retina||window.devicePixelRatio>=2;n.support.websocket="WebSocket"in window;n.support.input={};n.support.input.placeholder="placeholder"in document.createElement("input");n.media={};var A={SAP_3STEPS:"3Step",SAP_4STEPS:"4Step",SAP_6STEPS:"6Step",SAP_STANDARD:"Std",SAP_STANDARD_EXTENDED:"StdExt"};n.media.RANGESETS=A;n.media._predefinedRangeSets={};n.media._predefinedRangeSets[A.SAP_3STEPS]={points:[520,960],unit:"px",name:A.SAP_3STEPS,names:["S","M","L"]};n.media._predefinedRangeSets[A.SAP_4STEPS]={points:[520,760,960],unit:"px",name:A.SAP_4STEPS,names:["S","M","L","XL"]};n.media._predefinedRangeSets[A.SAP_6STEPS]={points:[241,400,541,768,960],unit:"px",name:A.SAP_6STEPS,names:["XS","S","M","L","XL","XXL"]};n.media._predefinedRangeSets[A.SAP_STANDARD]={points:[600,1024],unit:"px",name:A.SAP_STANDARD,names:["Phone","Tablet","Desktop"]};n.media._predefinedRangeSets[A.SAP_STANDARD_EXTENDED]={points:[600,1024,1440],unit:"px",name:A.SAP_STANDARD_EXTENDED,names:["Phone","Tablet","Desktop","LargeDesktop"]};var b=A.SAP_STANDARD;var D=n.support.matchmedialistener?0:100;var R={};var T=null;function P(e,n,i){i=i||"px";var t="all";if(e>0){t=t+" and (min-width:"+e+i+")"}if(n>0){t=t+" and (max-width:"+n+i+")"}return t}function _(e){if(!n.support.matchmedialistener&&T==x()[0]){return}if(R[e].timer){clearTimeout(R[e].timer);R[e].timer=null}R[e].timer=setTimeout(function(){var n=N(e,false);if(n){m("media_"+e,n)}},D)}function N(e,i,t){function o(e,n){var i=R[e].queries[n];var t={from:i.from,unit:R[e].unit};if(i.to>=0){t.to=i.to}if(R[e].names){t.name=R[e].names[n]}return t}t=t||n.media.matches;if(R[e]){var a=R[e].queries;var s=null;for(var u=0,l=a.length;u<l;u++){var f=a[u];if((f!=R[e].currentquery||i)&&t(f.from,f.to,R[e].unit)){if(!i){R[e].currentquery=f}if(!R[e].noClasses&&R[e].names&&!i){O(e,R[e].names[u])}s=o(e,u)}}return s}d.log(r,"No queryset with name "+e+" found","DEVICE.MEDIA");return null}function O(e,n,i){var t="sapUiMedia-"+e+"-";I(t+n,i,t)}function I(e,n,i){var t=document.documentElement;if(t.className.length==0){if(!n){t.className=e}}else{var r=t.className.split(" ");var o="";for(var a=0;a<r.length;a++){if(i&&r[a].indexOf(i)!=0||!i&&r[a]!=e){o=o+r[a]+" "}}if(!n){o=o+e}t.className=o}}function x(){return[window.innerWidth,window.innerHeight]}function k(e,n,i,t){function r(e,n){if(n==="em"||n==="rem"){var i=window.getComputedStyle||function(e){return e.currentStyle};var t=i(document.documentElement).fontSize;var r=t&&t.indexOf("px")>=0?parseFloat(t,10):16;return e*r}return e}e=r(e,i);n=r(n,i);var o=t[0];var a=e<0||e<=o;var s=n<0||o<=n;return a&&s}function C(e,n,i){return k(e,n,i,x())}function L(e,n,i){var t=P(e,n,i);var r=window.matchMedia(t);return r&&r.matches}n.media.matches=n.support.matchmedia?L:C;n.media.attachHandler=function(e,n,i){var t=i||b;f("media_"+t,e,n)};n.media.detachHandler=function(e,n,i){var t=i||b;c("media_"+t,e,n)};n.media.initRangeSet=function(e,i,t,r,a){var s;if(!e){s=n.media._predefinedRangeSets[b]}else if(e&&n.media._predefinedRangeSets[e]){s=n.media._predefinedRangeSets[e]}else{s={name:e,unit:(t||"px").toLowerCase(),points:i||[],names:r,noClasses:!!a}}if(n.media.hasRangeSet(s.name)){d.log(o,"Range set "+s.name+" has already been initialized","DEVICE.MEDIA");return}e=s.name;s.queries=[];s.timer=null;s.currentquery=null;s.listener=function(){return _(e)};var u,l,f;var c=s.points;for(var m=0,v=c.length;m<=v;m++){u=m==0?0:c[m-1];l=m==c.length?-1:c[m];f=P(u,l,s.unit);s.queries.push({query:f,from:u,to:l})}if(s.names&&s.names.length!=s.queries.length){s.names=null}R[s.name]=s;s.queries.forEach(function(e){e.media=window.matchMedia(e.query);e.media.addEventListener("change",s.listener)});s.listener()};n.media.getCurrentRange=function(e,i){if(!n.media.hasRangeSet(e)){return null}return N(e,true,isNaN(i)?null:function(e,n,t){return k(e,n,t,[i,0])})};n.media.hasRangeSet=function(e){return e&&!!R[e]};n.media.removeRangeSet=function(e){if(!n.media.hasRangeSet(e)){d.log(o,"RangeSet "+e+" not found, thus could not be removed.","DEVICE.MEDIA");return}for(var i in A){if(e===A[i]){d.log(r,"Cannot remove default rangeset - no action taken.","DEVICE.MEDIA");return}}var t=R[e];if(n.support.matchmedialistener){var a=t.queries;for(var s=0;s<a.length;s++){a[s].media.removeListener(t.listener)}}else{window.removeEventListener("resize",t.listener,false);window.removeEventListener("orientationchange",t.listener,false)}O(e,"",true);delete l["media_"+e];delete R[e]};var y={TABLET:"tablet",PHONE:"phone",DESKTOP:"desktop",COMBI:"combi"};n.system={};function F(e,i){var t=M(i);var r=n.os.windows&&n.os.version>=8;var o=n.os.windows&&n.os.version===7;var a={};a.tablet=!!((n.support.touch&&!o||r||!!e)&&t);a.phone=!!((n.support.touch&&!o||!!e)&&!t);a.desktop=!!(!a.tablet&&!a.phone||r||o||n.os.linux||n.os.macintosh);a.combi=a.desktop&&a.tablet;a.SYSTEMTYPE=y;for(var s in y){I("sap-"+y[s],!a[y[s]])}return a}function M(e){var i=e||navigator.userAgent;if(n.os.ios){return/ipad/i.test(i)}else if(n.os.macintosh||n.os.linux){return n.support.touch}else{if(n.support.touch){if(n.os.windows&&n.os.version>=8){return true}if(n.browser.chrome&&n.os.android&&n.os.version>=4.4){return!/Mobile Safari\/[.0-9]+/.test(i)}else{var t=window.devicePixelRatio?window.devicePixelRatio:1;if(n.os.android&&n.browser.webkit&&parseFloat(n.browser.webkitVersion)>537.1){t=1}var r=Math.min(window.screen.width/t,window.screen.height/t)>=600;if(ie()&&(window.screen.height===552||window.screen.height===553)&&/Nexus 7/i.test(i)){r=true}return r}}else{var o=/(?=android)(?=.*mobile)/i.test(i);return n.os.android&&!o}}}function z(e,i){n.system=F(e,i);if(n.system.tablet||n.system.phone){n.browser.mobile=true}}z();n._getSystem=F;n.orientation={};n.resize={};n.orientation.attachHandler=function(e,n){f("orientation",e,n)};n.resize.attachHandler=function(e,n){f("resize",e,n)};n.orientation.detachHandler=function(e,n){c("orientation",e,n)};n.resize.detachHandler=function(e,n){c("resize",e,n)};function B(e){e.landscape=ie(true);e.portrait=!e.landscape}function V(){B(n.orientation);m("orientation",{landscape:n.orientation.landscape})}var W=n.resize._update=function(){H(n.resize);m("resize",{height:n.resize.height,width:n.resize.width})};function H(e){e.width=x()[0];e.height=x()[1]}function X(){var e=n.orientation.landscape;var i=ie();if(e!=i){V()}if(!j){j=window.setTimeout(q,150)}}function q(){W();j=null}var U=false;var Y=false;var K;var j;var G;var Z=x()[1];var $=x()[0];var J=false;var Q;var ee=/INPUT|TEXTAREA|SELECT/;var ne=n.os.ios&&n.browser.name==="sf"&&(n.system.phone&&n.os.version>=7&&n.os.version<7.1||n.system.tablet&&n.os.version>=7);function ie(e){if(n.support.touch&&n.support.orientation&&n.os.android){if(J&&e){return!n.orientation.landscape}if(J){return n.orientation.landscape}}else if(n.support.matchmedia&&n.support.orientation){return!!window.matchMedia("(orientation: landscape)").matches}var i=x();return i[0]>i[1]}function te(e){if(e.type=="resize"){if(ne&&ee.test(document.activeElement.tagName)&&!U){return}var n=x()[1];var i=x()[0];var t=(new Date).getTime();if(n===Z&&i===$){return}Y=true;if(Z!=n&&$==i){if(!Q||t-Q>300){J=n<Z}W()}else{$=i}Q=t;Z=n;if(G){window.clearTimeout(G);G=null}G=window.setTimeout(oe,1200)}else if(e.type=="orientationchange"){U=true}if(K){clearTimeout(K);K=null}K=window.setTimeout(re,50)}function re(){if(Y&&(U||n.system.tablet&&n.os.ios&&n.os.version>=9)){V();W();U=false;Y=false;if(G){window.clearTimeout(G);G=null}}K=null}function oe(){U=false;Y=false;G=null}n._update=function(e){S=navigator.userAgent;d.log(r,"Device API values manipulated: NOT PRODUCTIVE FEATURE!!! This should be only used for test purposes. Only use if you know what you are doing.");E();p();z(e)};H(n.resize);B(n.orientation);window.sap.ui.Device=n;if(n.support.touch&&n.support.orientation){window.addEventListener("resize",te,false);window.addEventListener("orientationchange",te,false)}else{window.addEventListener("resize",X,false)}n.media.initRangeSet();n.media.initRangeSet(A["SAP_STANDARD_EXTENDED"]);if(sap.ui.define){sap.ui.define("sap/ui/Device",[],function(){return n})}})();