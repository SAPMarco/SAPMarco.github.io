/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/base/Log","sap/base/util/uid","sap/base/strings/escapeRegExp"],function(e,r,i,t){"use strict";(function(n){var a="_skip",s=/\|id-[0-9]+-[0-9]+/,o=new RegExp(a+"[0-9]*$"),f=[],u=[],h={},l=0,c,p="|",y=[],d=false,g,v=false;e.sap.history=function(r){if(!e.isPlainObject(r)){return}if(!v){var i=e(n),t=n.location.href.split("#")[1]||"";i.bind("hashchange",b);if(e.isArray(r.routes)){var a,s;for(a=0;a<r.routes.length;a++){s=r.routes[a];if(s.path&&s.handler){e.sap.history.addRoute(s.path,s.handler)}}}if(e.isFunction(r.defaultHandler)){g=r.defaultHandler}u.push(t);if(t.length>1){i.trigger("hashchange",[true])}else{c=t}v=true}};e.sap.history.addHistory=function(e,r,i,t){var a,s;if(i===undefined){i=true}if(!t){s=I(e,r);a=x(s);if(a){s+=p+a}s+=p+(i?"1":"0")}else{s=m(c)}y.push(s);h[s]=true;n.location.hash=s;return s};e.sap.history.addVirtualHistory=function(){e.sap.history.addHistory("",undefined,false,true)};e.sap.history.addRoute=function(r,i,t){if(t){i=e.proxy(i,t)}var n={};n.sIdentifier=r;n["action"]=i;f.push(n);return this};e.sap.history.setDefaultHandler=function(e){g=e};e.sap.history.getDefaultHandler=function(){return g};e.sap.history.backToHash=function(i){i=i||"";var t;if(u.length===1){if(e.isFunction(g)){g()}}else{t=k(c,i);if(t<0){n.history.go(t)}else{r.error("jQuery.sap.history.backToHash: "+i+"is not in the history stack or it's after the current hash")}}};e.sap.history.backThroughPath=function(i){i=i||"";i=n.encodeURIComponent(i);var t;if(u.length===1){if(e.isFunction(g)){g()}}else{t=k(c,i,true);if(t<0){n.history.go(t)}else{r.error("jQuery.sap.history.backThroughPath: there's no history state which has the "+i+" identifier in the history stack before the current hash")}}};e.sap.history.back=function(r){if(u.length===1){if(e.isFunction(g)){g(e.sap.history.NavType.Back)}}else{if(!r){r=1}n.history.go(-1*r)}};e.sap.history.NavType={Back:"_back",Forward:"_forward",Bookmark:"_bookmark",Unknown:"_unknown"};function k(r,i,t){var n=e.inArray(r,u),a,s,o;if(n>0){if(t){for(s=n-1;s>=0;s--){o=u[s];if(o.indexOf(i)===0&&!H(o)){return s-n}}}else{a=e.inArray(i,u);if(a===-1&&i.length===0){return-1*n}if(a>-1&&a<n){return a-n}}}return 0}function b(e,r){var i=n.location.href.split("#")[1]||"";i=T(i);if(r||!h[i]){y.push(i)}if(!d){d=true;if(y.length>0){var t=y.shift();if(h[t]){B(t);delete h[t]}else{R(t)}c=t}d=false}}function T(e,r){var i=e,t=e?e.indexOf("#"):-1;if(t===0){i=i.slice(t+1)}if(r){i=i.replace(s,"")}return i}function m(e){var r=e?e:"";if(H(r)){var i=r.lastIndexOf(a);r=r.slice(0,i)}return r+a+l++}function I(e,r){var i=n.encodeURIComponent(e);var t=n.encodeURIComponent(n.JSON.stringify(r));return i+p+t}function x(r){var t=e.inArray(c,u),n,a;if(t>-1){for(n=0;n<t+1;n++){a=u[n];if(a.slice(0,a.length-2)===r){return i()}}}return""}function B(r){var i=e.inArray(c,u);if(!(i===-1||i===u.length-1)){u.splice(i+1,u.length-1-i)}u.push(r)}function H(e){return o.test(e)}function N(r,i){var t=e.inArray(r,u),n;if(t!==-1){if(i){for(n=t;n<u.length;n++){if(!H(u[n])){return n-t}}}else{for(n=t;n>=0;n--){if(!H(u[n])){return n-t}}return-1*(t+1)}}}function R(i){var s,o,f,h,l;if(c===undefined){f=F(i);if(!f||!f.bBookmarkable){if(e.isFunction(g)){g(e.sap.history.NavType.Bookmark)}return}}if(i.length===0){if(e.isFunction(g)){g(e.sap.history.NavType.Back)}}else{h=u.indexOf(i);if(h===0){f=F(i);if(!f||!f.bBookmarkable){if(e.isFunction(g)){g(e.sap.history.NavType.Back)}return}}if(H(i)){if(H(c)){o=N(i,false);n.history.go(o)}else{var p=new RegExp(t(c+a)+"[0-9]*$");if(p.test(i)){o=N(i,true);if(o){n.history.go(o)}else{n.history.back()}}else{o=N(i,false);n.history.go(o)}}}else{if(h===-1){l=e.sap.history.NavType.Unknown;u.push(i)}else{if(u.indexOf(c,h+1)===-1){l=e.sap.history.NavType.Forward}else{l=e.sap.history.NavType.Back}}f=F(i);if(f){s=w(f.sIdentifier);if(s){s.action.apply(null,[f.oStateData,l])}}else{r.error("hash format error! The current Hash: "+i)}}}}function w(e){var r;for(r=0;r<f.length;r++){if(f[r].sIdentifier===e){return f[r]}}}function F(e){if(H(e)){var r=e.lastIndexOf(a);e=e.slice(0,r)}var i=e.split(p),t={};if(i.length===4||i.length===3){t.sIdentifier=n.decodeURIComponent(i[0]);t.oStateData=n.JSON.parse(n.decodeURIComponent(i[1]));if(i.length===4){t.uid=i[2]}t.bBookmarkable=i[i.length-1]==="0"?false:true;return t}else{return null}}})(this);return e});