/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 *
 * @function
 * @private
 * @experimental
 */
sap.ui.define(function(){"use strict";return function(a,t,e){var s={DataRequestUrl:{tags:a.concat(["data"]),label:"{i18n>CARD_EDITOR.DATA.REQUEST.URL}",type:"string",defaultValue:"",path:t+"data/request/url"},DataRequestMode:{tags:a.concat(["data"]),label:"{i18n>CARD_EDITOR.DATA.REQUEST.MODE}",type:"select",items:[{key:"no-cors"},{key:"same-origin"},{key:"cors"}],defaultValue:"cors",path:t+"data/request/mode",visible:"{= !!${context>"+t+"data/request/url} }"},DataRequestMethod:{tags:a.concat(["data"]),label:"{i18n>CARD_EDITOR.DATA.REQUEST.METHOD}",type:"select",items:[{key:"GET"},{key:"POST"}],defaultValue:"GET",path:t+"data/request/method",visible:"{= !!${context>"+t+"data/request/url} }"},DataRequestParameters:{tags:a.concat(["data"]),label:"{i18n>CARD_EDITOR.DATA.REQUEST.PARAMETERS}",type:"map",path:t+"data/request/parameters",visible:"{= !!${context>"+t+"data/request/url} }"},DataRequestHeaders:{tags:a.concat(["data"]),label:"{i18n>CARD_EDITOR.DATA.REQUEST.HEADERS}",type:"map",path:t+"data/request/headers",visible:"{= !!${context>"+t+"data/request/url} }"},DataRequestWithCredentials:{tags:a.concat(["data"]),label:"{i18n>CARD_EDITOR.DATA.REQUEST.WITHCREDENTIALS}",type:"boolean",defaultValue:false,path:t+"data/request/withCredentials",visible:"{= !!${context>"+t+"data/request/url} }"},DataJson:{tags:a.concat(["data"]),label:"{i18n>CARD_EDITOR.DATA.JSON}",type:"json",path:t+"data/json",visible:"{= !${context>"+t+"data/request/url} }"},DataPath:{tags:a.concat(["data"]),label:"{i18n>CARD_EDITOR.DATA.PATH}",type:"string",path:t+"data/path",validators:{dataPathPattern:{type:"pattern",config:{pattern:"^[a-zA-Z0-9_\\.\\-/|\\@\\#]*$"}}}},DataServiceName:{tags:a.concat(["data"]),label:"{i18n>CARD_EDITOR.DATA.SERVICE.NAME}",type:"string",path:t+"data/service/name",visible:false},DataServiceParameters:{tags:a.concat(["data"]),label:"{i18n>CARD_EDITOR.DATA.SERVICE.PARAMETERS}",type:"map",path:t+"data/service/parameters",visible:false},DataUpdateInterval:{tags:a.concat(["data"]),label:"{i18n>CARD_EDITOR.DATA.UPDATEINTERVAL}",type:"number",path:t+"data/updateInterval"}};var r={};Object.keys(s).forEach(function(a){r[e+a]=s[a]});return r}});