/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer","sap/ui/core/InvisibleText","sap/ui/unified/library","sap/ui/unified/CalendarLegendRenderer"],function(e,t,a,n){"use strict";var r=a.CalendarDayType;var i=e.extend("sap.ui.integration.cards.CalendarContentRenderer",{apiVersion:2});i.renderContent=function(e,t){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.integration");e.openStart("div","card-group");e.attr("role","group");e.attr("aria-label",a.getText("CARDS_CALENDAR"));e.class("sapFCalCard");e.openEnd();e.openStart("div","card-layout");e.class("sapFCalCardLayout");e.openEnd();e.openStart("div","left-side");e.class("sapFCalCardLeftSide");e.openEnd();e.renderControl(t._oCalendar);e.openStart("div","card-legend");e.attr("aria-label",a.getText("CARDS_CALENDAR_LEGEND"));e.openEnd();e.renderControl(t._oLegend);e.close("div");e.close("div");e.openStart("div","right-side");e.class("sapFCalCardRightSide");e.openEnd();i.renderAppointments(e,t);if(t._bNeedForMoreButton()){e.renderControl(t._getMoreButton())}e.close("div");e.close("div");e.close("div")};i.renderAppointments=function(e,t){var a=t._getVisibleAppointments(),n=t._getCurrentAppointment(),r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.integration");e.openStart("div","appointments-list");e.attr("role","list");e.attr("aria-label",r.getText("CARDS_CALENDAR_APPOINTMENTS"));e.class("sapFCalCardAppList");e.openEnd();if(!a.length){e.openStart("div");e.class("sapFCalCardNoItemsText");e.openEnd();e.text(t.getNoAppointmentsText());e.close("div")}a.forEach(function(a){i.renderAppointment(e,t,a,n==a)});e.close("div")};i.renderAppointment=function(e,t,a,n){var r=t._oCalendar.getSelectedDates()[0].getStartDate();e.openStart("div");e.attr("role","listitem");e.class("sapUiCalendarAppContainer");if(n){e.class("sapUiCalendarAppCurrent")}e.accessibilityState(a,i.getAccProps(a));e.openEnd();e.openStart("div");e.class("sapUiCalendarAppContainerLeft");e.openEnd();e.openStart("div");e.class("sapUiCalendarAppStart");e.openEnd();e.text(a._getDateRangeIntersectionText(r).start);e.close("div");e.openStart("div");e.class("sapUiCalendarAppEnd");e.openEnd();e.text(a._getDateRangeIntersectionText(r).end);e.close("div");e.close("div");e.openStart("div");e.class("sapUiCalendarAppContainerRight");e.openEnd();this._renderAppointment(e,t,a,r);e.close("div");i.renderAdditionalAriaLabel(e,t,a);e.close("div")};i._renderAppointment=function(e,t,a,n){var i=a.getId();var p=a.getTitle();var o=a.getText();var s=a.getType();var d=a.getIcon();var l=!p||!o;e.openStart("div",a);e.class("sapUiCalendarApp");if(s&&s!=r.None){e.class("sapUiCalendarApp"+s)}if(l){e.class("sapUiCalendarAppOneLine")}e.openEnd();e.openStart("div");e.class("sapUiCalendarAppCont");e.openEnd();if(d){var c=["sapUiCalendarAppIcon"];var g={};g["id"]=i+"-Icon";g["title"]=null;e.icon(d,c,g)}e.openStart("div");e.class("sapUiCalendarAppTitleWrapper");e.openEnd();if(p){e.openStart("span",i+"-Title");e.class("sapUiCalendarAppTitle");e.openEnd();e.text(p);e.close("span")}if(o){e.openStart("span",i+"-Text");e.class("sapUiCalendarAppText");e.openEnd();e.text(o);e.close("span")}e.close("div");e.close("div");e.close("div")};i.renderAdditionalAriaLabel=function(e,t,a){var n=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified"),i=t._oFormatAria,p=a.getType(),o=t._oLegend?t._oLegend.getAppointmentItems():[];var s=n.getText("CALENDAR_START_TIME")+": "+i.format(a.getStartDate());s=s+"; "+n.getText("CALENDAR_END_TIME")+": "+i.format(a.getEndDate());if(p&&p!=r.None){s=s+"; "+this.getAriaTextForType(p,o)}e.openStart("span",a.getId()+"-Descr");e.class("sapUiInvisibleText");e.openEnd();e.text(s);e.close("span")};i.getAriaTextForType=function(e,t){var a,r,i,p;if(t&&t.length){for(var p=0;p<t.length;p++){i=t[p];if(i.getType()===e){a=i.getText();break}}}if(!a){r=n.getTypeAriaText(e);if(r){a=r.getText()}}return a};i.getAccProps=function(e){var a=e.getId();var n={labelledby:{value:t.getStaticId("sap.ui.unified","APPOINTMENT")+" "+a+"-Descr",append:true},selected:null};if(e.getTitle()){n["labelledby"].value=n["labelledby"].value+" "+a+"-Title"}if(e.getText()){n["labelledby"].value=n["labelledby"].value+" "+a+"-Text"}return n};return i});