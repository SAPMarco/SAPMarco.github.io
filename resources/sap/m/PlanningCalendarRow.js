/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/m/CustomListItem"],function(e,t){"use strict";var a=e.extend("sap.m.PlanningCalendarRow",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Data"},text:{type:"string",group:"Data"},icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},nonWorkingDays:{type:"int[]",group:"Misc",defaultValue:null},nonWorkingHours:{type:"int[]",group:"Misc",defaultValue:null},selected:{type:"boolean",group:"Data",defaultValue:false},key:{type:"string",group:"Data",defaultValue:null},enableAppointmentsDragAndDrop:{type:"boolean",group:"Misc",defaultValue:false},enableAppointmentsResize:{type:"boolean",group:"Misc",defaultValue:false},enableAppointmentsCreate:{type:"boolean",group:"Misc",defaultValue:false},noAppointmentsText:{type:"string",group:"Misc",defaultValue:null}},aggregations:{appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment",dnd:{draggable:true}},intervalHeaders:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"intervalHeader"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"},headerContent:{type:"sap.ui.core.Control",multiple:true,singularName:"headerContent",forwarding:{getter:"_getPlanningCalendarCustomRowHeader",aggregation:"content"},forwardBinding:true}},events:{appointmentDrop:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},startDate:{type:"object"},endDate:{type:"object"},calendarRow:{type:"sap.m.PlanningCalendarRow"},copy:{type:"boolean"}}},appointmentDragEnter:{allowPreventDefault:true,parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},startDate:{type:"object"},endDate:{type:"object"},calendarRow:{type:"sap.m.PlanningCalendarRow"}}},appointmentResize:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},startDate:{type:"object"},endDate:{type:"object"}}},appointmentCreate:{parameters:{startDate:{type:"object"},endDate:{type:"object"},calendarRow:{type:"sap.m.PlanningCalendarRow"}}}}}});a.prototype.exit=function(){if(this.oRowHeader){this.oRowHeader.destroy()}};a.prototype._getPlanningCalendarCustomRowHeader=function(){if(!this.oRowHeader){this.oRowHeader=new t(this.getId()+"-CustomHead")}return this.oRowHeader};return a});