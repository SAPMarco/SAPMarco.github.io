(function e(t,r){if(typeof exports==="object"&&typeof module==="object")module.exports=r();else if(typeof sap.ui.define==="function")sap.ui.define([],r);else if(typeof exports==="object")exports["ACData"]=r();else t["ACData"]=r()})(window,function(){return function(e){var t={};function r(n){if(t[n]){return t[n].exports}var i=t[n]={i:n,l:false,exports:{}};e[n].call(i.exports,i,i.exports,r);i.l=true;return i.exports}r.m=e;r.c=t;r.d=function(e,t,n){if(!r.o(e,t)){Object.defineProperty(e,t,{enumerable:true,get:n})}};r.r=function(e){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(e,"__esModule",{value:true})};r.t=function(e,t){if(t&1)e=r(e);if(t&8)return e;if(t&4&&typeof e==="object"&&e&&e.__esModule)return e;var n=Object.create(null);r.r(n);Object.defineProperty(n,"default",{enumerable:true,value:e});if(t&2&&typeof e!="string")for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n};r.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};r.d(t,"a",t);return t};r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};r.p="";return r(r.s="./src/adaptivecards-templating.ts")}({"./src/adaptivecards-templating.ts":function(e,t,r){"use strict";function n(e){for(var r in e)if(!t.hasOwnProperty(r))t[r]=e[r]}Object.defineProperty(t,"__esModule",{value:true});
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
n(r("./src/expression-parser.ts"));n(r("./src/template-engine.ts"))},"./src/expression-parser.ts":function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=function(t,r){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)if(t.hasOwnProperty(r))e[r]=t[r]};return e(t,r)};return function(t,r){e(t,r);function n(){this.constructor=t}t.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:true});var i=["/","*","-","+","==","!=","<","<=",">",">="];var o=["identifier","string","number","boolean"];var a=function(){function e(){}e.init=function(){e.rules.push({tokenType:undefined,regEx:/^\s/},{tokenType:"{",regEx:/^{/},{tokenType:"?#",regEx:/^\?#/},{tokenType:"}",regEx:/^}/},{tokenType:"[",regEx:/^\[/},{tokenType:"]",regEx:/^\]/},{tokenType:"(",regEx:/^\(/},{tokenType:")",regEx:/^\)/},{tokenType:"boolean",regEx:/^true|^false/},{tokenType:"identifier",regEx:/^[$a-z_]+/i},{tokenType:".",regEx:/^\./},{tokenType:",",regEx:/^,/},{tokenType:"+",regEx:/^\+/},{tokenType:"-",regEx:/^-/},{tokenType:"*",regEx:/^\*/},{tokenType:"/",regEx:/^\//},{tokenType:"==",regEx:/^==/},{tokenType:"!=",regEx:/^!=/},{tokenType:"<=",regEx:/^<=/},{tokenType:"<",regEx:/^</},{tokenType:">=",regEx:/^>=/},{tokenType:">",regEx:/^>/},{tokenType:"string",regEx:/^"([^"]*)"/},{tokenType:"string",regEx:/^'([^']*)'/},{tokenType:"number",regEx:/^\d*\.?\d+/})};e.parse=function(t){var r=[];var n=0;while(n<t.length){var i=t.substring(n);var o=false;for(var a=0,s=e.rules;a<s.length;a++){var u=s[a];var p=u.regEx.exec(i);if(p){if(p.length>2){throw new Error("A tokenizer rule matched more than one group.")}if(u.tokenType!=undefined){r.push({type:u.tokenType,value:p[p.length==1?0:1],originalPosition:n})}n+=p[0].length;o=true;break}}if(!o){throw new Error("Unexpected character "+i[0]+" at position "+n)}}return r};e.rules=[];return e}();a.init();function s(e){if(typeof e==="number"||typeof e==="string"||typeof e==="boolean"){return e}throw new Error("Invalid value type: "+typeof e)}var u=function(){function e(){this._functions={};this._stateStack=[]}e.init=function(){e._builtInFunctions["substr"]=function(e,t,r){if(typeof e==="string"&&typeof t==="number"&&typeof r==="number"){return e.substr(t,r)}else{return""}};e._builtInFunctions["JSON.parse"]=function(e){return JSON.parse(e)};e._builtInFunctions["if"]=function(e,t,r){return e?t:r};e._builtInFunctions["toUpper"]=function(e){return typeof e==="string"?e.toUpperCase():e};e._builtInFunctions["toLower"]=function(e){return typeof e==="string"?e.toLowerCase():e};e._builtInFunctions["Date.format"]=function(e,t){var r=["long","short","compact"];var n;if(typeof e==="string"){n=Date.parse(e)}else if(typeof e==="number"){n=e}else{return e}var i=new Date(n);var o="compact";if(typeof t==="string"){o=t.toLowerCase();if(r.indexOf(o)<0){o="compact"}}return o==="compact"?i.toLocaleDateString():i.toLocaleDateString(undefined,{day:"numeric",weekday:o,month:o,year:"numeric"})};e._builtInFunctions["Time.format"]=function(e){var t;if(typeof e==="string"){t=Date.parse(e)}else if(typeof e==="number"){t=e}else{return e}var r=new Date(t);return r.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"})}};e.prototype.registerFunction=function(e,t){this._functions[e]=t};e.prototype.unregisterFunction=function(e){delete this._functions[e]};e.prototype.getFunction=function(t){var r=this._functions[t];if(r==undefined){r=e._builtInFunctions[t]}return r};e.prototype.isReservedField=function(t){return e._reservedFields.indexOf(t)>=0};e.prototype.saveState=function(){this._stateStack.push({$data:this.$data,$index:this.$index})};e.prototype.restoreLastState=function(){if(this._stateStack.length==0){throw new Error("There is no evaluation context state to restore.")}var e=this._stateStack.pop();this.$data=e.$data;this.$index=e.$index};Object.defineProperty(e.prototype,"currentDataContext",{get:function(){return this.$data!=undefined?this.$data:this.$root},enumerable:true,configurable:true});e._reservedFields=["$data","$root","$index"];e._builtInFunctions={};return e}();t.EvaluationContext=u;u.init();var p=function(){function e(){}return e}();var f=function(e){n(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.nodes=[];t.allowNull=true;return t}t.prototype.evaluate=function(e){var t=[["/","*"],["-","+"],["==","!=","<","<=",">",">="]];var r=this.nodes;for(var n=0,i=t;n<i.length;n++){var o=i[n];var a=0;while(a<r.length){var u=r[a];if(u instanceof v&&o.indexOf(u.operator)>=0){var p=s(r[a-1].evaluate(e));var f=s(r[a+1].evaluate(e));if(typeof p!==typeof f){throw new Error("Incompatible operands "+p+" and "+f+" for operator "+u.operator)}var c=void 0;if(typeof p==="number"&&typeof f==="number"){switch(u.operator){case"/":c=p/f;break;case"*":c=p*f;break;case"-":c=p-f;break;case"+":c=p+f;break}}if(typeof p==="string"&&typeof f==="string"){switch(u.operator){case"+":c=p+f;break}}switch(u.operator){case"==":c=p==f;break;case"!=":c=p!=f;break;case"<":c=p<f;break;case"<=":c=p<=f;break;case">":c=p>f;break;case">=":c=p>=f;break;default:}r.splice(a-1,3,new d(c));a--}a++}}return r[0].evaluate(e)};return t}(p);var c=function(e){n(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}t.prototype.evaluate=function(e){return this.identifier};return t}(p);var l=function(e){n(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}t.prototype.evaluate=function(e){return this.index.evaluate(e)};return t}(p);var h=function(e){n(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.functionName=null;t.parameters=[];return t}t.prototype.evaluate=function(e){var t=e.getFunction(this.functionName);if(t!=undefined){var r=[];for(var n=0,i=this.parameters;n<i.length;n++){var o=i[n];r.push(o.evaluate(e))}return t.apply(void 0,r)}throw new Error("Undefined function: "+this.functionName)};return t}(p);var d=function(e){n(t,e);function t(t){var r=e.call(this)||this;r.value=t;return r}t.prototype.evaluate=function(e){return this.value};return t}(p);var v=function(e){n(t,e);function t(t){var r=e.call(this)||this;r.operator=t;return r}t.prototype.evaluate=function(e){throw new Error("An operator cannot be evaluated on its own.")};return t}(p);var y=function(e){n(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.parts=[];return t}t.prototype.evaluate=function(e){var t=undefined;var r=0;while(r<this.parts.length){var n=this.parts[r];try{if(n instanceof c&&r==0){switch(n.identifier){case"$root":t=e.$root;break;case"$data":t=e.currentDataContext;break;case"$index":t=e.$index;break;default:t=e.currentDataContext[n.identifier];break}}else{var i=n.evaluate(e);if(r==0){t=i}else{t=typeof i!=="boolean"?t[i]:t[i.toString()]}}}catch(e){return undefined}r++}return t};return t}(p);var x=function(){function e(e){this._index=0;this._tokens=e}e.prototype.unexpectedToken=function(){throw new Error("Unexpected token "+this.current.value+" at position "+this.current.originalPosition+".")};e.prototype.unexpectedEoe=function(){throw new Error("Unexpected end of expression.")};e.prototype.moveNext=function(){this._index++};e.prototype.parseToken=function(){var e=[];for(var t=0;t<arguments.length;t++){e[t]=arguments[t]}if(this.eoe){this.unexpectedEoe()}var r=this.current;if(e.indexOf(this.current.type)<0){this.unexpectedToken()}this.moveNext();return r};e.prototype.parseOptionalToken=function(){var e=[];for(var t=0;t<arguments.length;t++){e[t]=arguments[t]}if(this.eoe){this.unexpectedEoe()}else if(e.indexOf(this.current.type)<0){return false}else{this.moveNext();return true}};e.prototype.parseFunctionCall=function(e){var t=new h;t.functionName=e;this.parseToken("(");var r=this.parseExpression();var n=false;if(r){t.parameters.push(r);do{n=this.parseOptionalToken(",");if(n){var i=this.parseExpression();t.parameters.push(i)}}while(n)}this.parseToken(")");return t};e.prototype.parseIdentifier=function(){var e=new c;e.identifier=this.current.value;this.moveNext();return e};e.prototype.parseIndexer=function(){var e=new l;this.parseToken("[");e.index=this.parseExpression();this.parseToken("]");return e};e.prototype.parsePath=function(){var e=new y;var t=["identifier","("];while(!this.eoe){if(t.indexOf(this.current.type)<0){return e}switch(this.current.type){case"(":if(e.parts.length==0){this.moveNext();e.parts.push(this.parseExpression());this.parseToken(")")}else{var r="";for(var n=0,i=e.parts;n<i.length;n++){var o=i[n];if(!(o instanceof c)){this.unexpectedToken()}if(r!=""){r+="."}r+=o.identifier}e.parts=[];e.parts.push(this.parseFunctionCall(r))}t=[".","["];break;case"[":e.parts.push(this.parseIndexer());t=[".","(","["];break;case"identifier":e.parts.push(this.parseIdentifier());t=[".","(","["];break;case".":this.moveNext();t=["identifier"];break;default:t=[];break}}};e.prototype.parseExpression=function(){var e=new f;var t=o.concat("(","+","-");while(!this.eoe){if(t.indexOf(this.current.type)<0){if(e.nodes.length==0){this.unexpectedToken()}return e}switch(this.current.type){case"(":case"identifier":e.nodes.push(this.parsePath());t=i;break;case"string":case"number":case"boolean":if(this.current.type=="string"){e.nodes.push(new d(this.current.value))}else if(this.current.type=="number"){e.nodes.push(new d(parseFloat(this.current.value)))}else{e.nodes.push(new d(this.current.value==="true"))}this.moveNext();t=i;break;case"-":if(e.nodes.length==0){e.nodes.push(new d(-1));e.nodes.push(new v("*"));t=["identifier","number","("]}else{e.nodes.push(new v(this.current.type));t=o.concat("(")}this.moveNext();break;case"+":if(e.nodes.length==0){t=o.concat("(")}else{e.nodes.push(new v(this.current.type));t=o.concat("(")}this.moveNext();break;case"*":case"/":case"==":case"!=":case"<":case"<=":case">":case">=":e.nodes.push(new v(this.current.type));this.moveNext();t=o.concat("(");break;default:t=[];break}}};Object.defineProperty(e.prototype,"eoe",{get:function(){return this._index>=this._tokens.length},enumerable:true,configurable:true});Object.defineProperty(e.prototype,"current",{get:function(){return this._tokens[this._index]},enumerable:true,configurable:true});e.parseBinding=function(t){var r=new e(a.parse(t));r.parseToken("{");var n=!r.parseOptionalToken("?#");var i=r.parseExpression();r.parseToken("}");return new g(i,n)};return e}();t.ExpressionParser=x;var g=function(){function e(e,t){if(t===void 0){t=true}this.expression=e;this.allowNull=t}e.prototype.evaluate=function(e){return this.expression.evaluate(e)};return e}();t.Binding=g},"./src/template-engine.ts":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var n=r("./src/expression-parser.ts");var i=function(){function e(){this._parts=[];this._shouldDropOwner=false}e.parse=function(t){var r=new e;var i=0;do{var o=false;var a=i;var s=void 0;do{s=false;a=t.indexOf("{",a);if(a>=0){if(a+1<t.length&&t[a+1]=="{"){a+=2;s=true}}}while(s);if(a>=0){var u=t.indexOf("}",a);if(u>=0){o=true;if(a>i){r._parts.push(t.substring(i,a))}var p=t.substring(a,u+1);var f=void 0;try{f=n.ExpressionParser.parseBinding(p)}catch(e){f=p}r._parts.push(f);i=u+1}}if(!o){r._parts.push(t.substr(i));break}}while(i<t.length);if(r._parts.length==1&&typeof r._parts[0]==="string"){return r._parts[0]}else{return r}};e.prototype.evalExpression=function(e,t){var r=e.evaluate(t);if(r==undefined){this._shouldDropOwner=this._shouldDropOwner||!e.allowNull}return r};e.prototype.internalEvaluate=function(e){if(this._parts.length==0){return undefined}else if(this._parts.length==1){if(typeof this._parts[0]==="string"){return this._parts[0]}else{return this.evalExpression(this._parts[0],e)}}else{var t="";for(var r=0,n=this._parts;r<n.length;r++){var i=n[r];if(typeof i==="string"){t+=i}else{t+=this.evalExpression(i,e)}}return t}};e.prototype.evaluate=function(e){this._shouldDropOwner=false;return this.internalEvaluate(e)};Object.defineProperty(e.prototype,"shouldDropOwner",{get:function(){return this._shouldDropOwner},enumerable:true,configurable:true});return e}();var o=function(){function e(t){this.preparedPayload=e.prepare(t)}e.prepare=function(t){if(typeof t==="string"){return i.parse(t)}else if(typeof t==="object"&&t!=null){if(Array.isArray(t)){var r=[];for(var n=0,o=t;n<o.length;n++){var a=o[n];r.push(e.prepare(a))}return r}else{var s=Object.keys(t);var r={};for(var u=0,p=s;u<p.length;u++){var f=p[u];r[f]=e.prepare(t[f])}return r}}else{return t}};e.prototype.expandSingleObject=function(e){var t={};var r=Object.keys(e);for(var n=0,i=r;n<i.length;n++){var o=i[n];if(!this._context.isReservedField(o)){var a=this.internalExpand(e[o]);if(a!=undefined){t[o]=a}}}return t};e.prototype.internalExpand=function(e){var t;this._context.saveState();if(Array.isArray(e)){var r=[];for(var n=0,o=e;n<o.length;n++){var a=o[n];var s=this.internalExpand(a);if(s!=null){if(Array.isArray(s)){r=r.concat(s)}else{r.push(s)}}}t=r}else if(e instanceof i){t=e.evaluate(this._context);if(e.shouldDropOwner){t=null}}else if(typeof e==="object"&&e!=null){var u=false;var p=e["$when"];if(p instanceof i){var f=p.evaluate(this._context);if(typeof f==="boolean"){u=!f}}if(!u){var c=e["$data"];if(c!=undefined){if(c instanceof i){c=c.evaluate(this._context)}if(Array.isArray(c)){t=[];for(var l=0;l<c.length;l++){this._context.$data=c[l];this._context.$index=l;var h=this.expandSingleObject(e);if(h!=null){t.push(h)}}}else{this._context.$data=c;t=this.expandSingleObject(e)}}else{t=this.expandSingleObject(e)}}else{t=null}}else{t=e}this._context.restoreLastState();return t};e.prototype.expand=function(e){this._context=e;return this.internalExpand(this.preparedPayload)};return e}();t.Template=o}})});