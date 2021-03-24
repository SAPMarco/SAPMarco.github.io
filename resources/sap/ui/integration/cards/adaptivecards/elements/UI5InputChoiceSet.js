/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/thirdparty/adaptivecards"],function(e){"use strict";function t(){e.ChoiceSetInput.apply(this,arguments)}t.prototype=Object.create(e.ChoiceSetInput.prototype);t.prototype.internalRender=function(){if(!this.isMultiSelect){if(this.isCompact){this._selectElement=document.createElement("ui5-select");this._selectElement.id=this.id;this._selectElement.addEventListener("change",function(){this.valueChanged()}.bind(this));for(var e=0;e<this.choices.length;e++){var t=document.createElement("ui5-option");t.value=this.choices[e].value;t.innerHTML=this.choices[e].title;if(this.choices[e].value===this.defaultValue){t.selected=true}this._selectElement.appendChild(t)}return this._selectElement}var i=document.createElement("div");i.classList.add("sapFCardAdaptiveContentChoiceSetWrapper");i.id=this.id;i.addEventListener("select",function(){this.valueChanged()}.bind(this));this._toggleInputs=[];for(var s=0;s<this.choices.length;s++){var n=document.createElement("ui5-radiobutton");n.value=this.choices[s].value;n.text=this.choices[s].title;n.name=this.id;n.wrap=this.wrap;if(this.choices[s].value===this.defaultValue){n.selected=true}this._toggleInputs.push(n);i.appendChild(n)}return i}var l=this.defaultValue?this.defaultValue.split(","):null;var h=document.createElement("div");h.classList.add("sapFCardAdaptiveContentChoiceSetWrapper");h.id=this.id;h.addEventListener("change",function(){this.valueChanged()}.bind(this));this._toggleInputs=[];for(var a=0;a<this.choices.length;a++){var u=document.createElement("ui5-checkbox");u.value=this.choices[a].value;u.text=this.choices[a].title;u.name=this.id;u.wrap=this.wrap;if(l&&l.indexOf(this.choices[a].value)>=0){u.checked=true}this._toggleInputs.push(u);h.appendChild(u)}return h};Object.defineProperty(t.prototype,"value",{get:function e(){var t;if(!this.isMultiSelect){if(this.isCompact){return this._selectElement.selectedOption?this._selectElement.selectedOption.value:null}else{if(!this._toggleInputs||this._toggleInputs.length===0){return null}for(t=0;t<this._toggleInputs.length;t++){if(this._toggleInputs[t].selected){return this._toggleInputs[t].value}}return null}}else{if(!this._toggleInputs||this._toggleInputs.length===0){return null}var i="";for(t=0;t<this._toggleInputs.length;t++){if(this._toggleInputs[t].checked){if(i!==""){i+=this.hostConfig.choiceSetInputValueSeparator}i+=this._toggleInputs[t].value}}return i===""?null:i}}});return t});