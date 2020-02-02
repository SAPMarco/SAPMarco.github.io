/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","sap/ui/core/date/UniversalDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/library"],function(t,e,a,r,s){"use strict";var i=s.CalendarIntervalType;var n=t.extend("sap.m.delegate.DateNavigation",{constructor:function(){t.apply(this,arguments);this._unit=i.Day;this._start=new Date;this._step=1}});n.HOURS24=1e3*3600*24;n.prototype.setUnit=function(t){this._unit=t};n.prototype.setStart=function(t){this._start=t};n.prototype.setStep=function(t){this._step=t};n.prototype.setCurrent=function(t){this._current=t};n.prototype.getUnit=function(){return this._unit};n.prototype.getStart=function(){return this._start};n.prototype.getStep=function(){return this._step};n.prototype.getCurrent=function(){return this._current};n.prototype.getEnd=function(){var t=a._createUniversalUTCDate(this.getStart(),undefined,true);switch(this.getUnit()){case i.Day:case i.Week:case i.OneMonth:t.setUTCDate(t.getUTCDate()+this.getStep()-1);break;case i.Hour:t.setUTCHours(t.getUTCHours()+this.getStep()-1);break;case i.Month:t.setUTCMonth(t.getUTCMonth()+this.getStep()-1);break;default:break}return a._createLocalDate(t,true)};n.prototype.next=function(){var t=a._createUniversalUTCDate(this.getStart(),undefined,true);var e=this.getCurrent()?a._createUniversalUTCDate(this.getCurrent(),undefined,true):a._createUniversalUTCDate(this.getStart(),undefined,true);switch(this.getUnit()){case i.Hour:e.setUTCHours(e.getUTCHours()+this.getStep());this.setCurrent(a._createLocalDate(e,true));t.setUTCHours(t.getUTCHours()+this.getStep());this.setStart(a._createLocalDate(t,true));break;case i.Week:case i.Day:e.setUTCDate(e.getUTCDate()+this.getStep());this.setCurrent(a._createLocalDate(e,true));t.setUTCDate(t.getUTCDate()+this.getStep());this.setStart(a._createLocalDate(t,true));break;case i.Month:e.setUTCMonth(e.getUTCMonth()+this.getStep());this.setCurrent(a._createLocalDate(e,true));t.setUTCMonth(t.getUTCMonth()+this.getStep());this.setStart(a._createLocalDate(t,true));break;case i.OneMonth:e.setUTCMonth(e.getUTCMonth()+1,1);this.setCurrent(a._createLocalDate(e,true));t.setUTCMonth(t.getUTCMonth()+1,1);this.setStart(a._createLocalDate(t,true));break;default:break}};n.prototype.previous=function(){var t=a._createUniversalUTCDate(this.getStart(),undefined,true);var e=this.getCurrent()?a._createUniversalUTCDate(this.getCurrent(),undefined,true):a._createUniversalUTCDate(this.getStart(),undefined,true);switch(this.getUnit()){case i.Hour:e.setUTCHours(e.getUTCHours()-this.getStep());this.setCurrent(a._createLocalDate(e,true));t.setUTCHours(t.getUTCHours()-this.getStep());this.setStart(a._createLocalDate(t,true));break;case i.Week:case i.Day:e.setUTCDate(e.getUTCDate()-this.getStep());this.setCurrent(a._createLocalDate(e,true));t.setUTCDate(t.getUTCDate()-this.getStep());this.setStart(a._createLocalDate(t,true));break;case i.Month:e.setUTCMonth(e.getUTCMonth()-this.getStep());this.setCurrent(a._createLocalDate(e,true));t.setUTCMonth(t.getUTCMonth()-this.getStep());this.setStart(a._createLocalDate(t,true));break;case i.OneMonth:e.setUTCMonth(e.getUTCMonth()-1,1);this.setCurrent(a._createLocalDate(e,true));t.setUTCMonth(t.getUTCMonth()-1,1);this.setStart(a._createLocalDate(t,true));break;default:break}};n.prototype.toDate=function(t){var e,r,s,u=a._createUniversalUTCDate(t,undefined,true),o=a._createUTCDate(t,true);this.setCurrent(t);switch(this.getUnit()){case i.OneMonth:if(a.monthsDiffer(this.getStart(),t)){var h=a.getFirstDateOfMonth(o);this.setStart(a._createLocalDate(h,true))}break;case i.Day:r=a._createUniversalUTCDate(this.getStart(),undefined,true);r.setUTCDate(r.getUTCDate()+this.getStep());if(t.valueOf()>=r.valueOf()){s=1+Math.ceil((t.valueOf()-r.valueOf())/n.HOURS24);e=a._createUniversalUTCDate(this.getStart(),undefined,true);e.setUTCDate(e.getUTCDate()+s);this.setStart(a._createLocalDate(e,true))}else if(t.valueOf()<this.getStart().valueOf()){e=a._createUniversalUTCDate(t,undefined,true);this.setStart(a._createLocalDate(e,true))}break;case i.Month:r=a._createUniversalUTCDate(this.getStart());r.setUTCMonth(r.getUTCMonth()+this.getStep());if(u.getTime()>=r.valueOf()){s=1+a._monthsBetween(t,a._createLocalDate(r,true));e=a._createUniversalUTCDate(this.getStart(),undefined,true);e.setUTCMonth(e.getUTCMonth()+s);this.setStart(a._createLocalDate(e,true))}else if(t.valueOf()<this.getStart().valueOf()){e=a._createUniversalUTCDate(t,undefined,true);this.setStart(a._createLocalDate(e,true))}break;case i.Week:var c=a.getFirstDateOfWeek(o);if(this.getStart().valueOf()!==c.valueOf()){this.setStart(a._createLocalDate(c,true))}break;case i.Hour:r=this.getEnd(this.getStart());var U=a._createUniversalUTCDate(r,undefined,true);if(u.getTime()<a._createUniversalUTCDate(this.getStart(),undefined,true).getTime()||u.getTime()>U.getTime()){this.setStart(t)}break;default:break}};return n});