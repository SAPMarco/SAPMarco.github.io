/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TileRenderer","sap/ui/core/ValueStateSupport","sap/ui/core/Renderer","sap/m/library","sap/ui/core/library"],function(e,t,i,s,a){"use strict";var r=a.ValueState;var d=s.StandardTileType;var l=i.extend(e);l._renderContent=function(e,i){var s=i.getInfoState();e.write("<div");e.addClass("sapMStdTileTopRow");e.writeClasses();e.write(">");if(i.getIcon()){e.write("<div");e.addClass("sapMStdTileIconDiv");switch(i.getType()){case d.Monitor:e.addClass("sapMStdIconMonitor");break;case d.Create:e.addClass("sapMStdIconCreate");break}e.writeClasses();e.write(">");e.renderControl(i._getImage());e.write("</div>")}if(i.getNumber()){e.write("<div");e.addClass("sapMStdTileNumDiv");e.writeClasses();e.write(">");e.write("<div");e.writeAttribute("id",i.getId()+"-number");var a=i.getNumber().length;if(a<5){e.addClass("sapMStdTileNum")}else if(a<8){e.addClass("sapMStdTileNumM")}else{e.addClass("sapMStdTileNumS")}e.writeClasses();e.write(">");e.writeEscaped(i.getNumber());e.write("</div>");if(i.getNumberUnit()){e.write("<div");e.writeAttribute("id",i.getId()+"-numberUnit");e.addClass("sapMStdTileNumUnit");e.writeClasses();e.write(">");e.writeEscaped(i.getNumberUnit());e.write("</div>")}e.write("</div>")}e.write("</div>");e.write("<div");e.addClass("sapMStdTileBottomRow");if(i.getType()===d.Monitor){e.addClass("sapMStdTileMonitorType")}e.writeClasses();e.write(">");e.write("<div");e.writeAttribute("id",i.getId()+"-title");e.addClass("sapMStdTileTitle");e.writeClasses();e.write(">");if(i.getTitle()){e.writeEscaped(i.getTitle())}e.write("</div>");if(i.getInfo()){e.write("<div");e.writeAttribute("id",i.getId()+"-info");e.addClass("sapMStdTileInfo");e.addClass("sapMStdTileInfo"+s);e.writeClasses();if(s!=r.None){e.writeAccessibilityState(i,{ariaDescribedBy:{value:i.getId()+"-sapSRH",append:true}})}e.write(">");if(i.getInfo()){e.writeEscaped(i.getInfo())}e.write("</div>")}if(s!=r.None){e.write("<span");e.writeAttributeEscaped("id",i.getId()+"-sapSRH");e.addClass("sapUiInvisibleText");e.writeClasses();e.writeAccessibilityState({hidden:false});e.write(">");e.writeEscaped(t.getAdditionalText(s));e.write("</span>")}e.write("</div>")};return l},true);