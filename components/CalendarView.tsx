
import React, { useMemo } from 'react';
import { ImportantEvent } from '../types';
import { getCalendarDays, isSameDay } from '../utils/dateHelpers';
import EventIcon from './EventIcon';

interface CalendarViewProps {
  currentDate: Date;
  events: ImportantEvent[];
  onEventClick: (event: ImportantEvent) => void;
}

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const CalendarView: React.FC<CalendarViewProps> = ({ currentDate, events, onEventClick }) => {
  const days = useMemo(() => {
    return getCalendarDays(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getEventForDay = (date: Date) => {
    return events.find(e => e.day === date.getDate() && e.month === (date.getMonth() + 1));
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
      {/* Weekdays Header */}
      <div className="calendar-grid bg-slate-50/50 border-b border-slate-200">
        {WEEKDAYS.map(day => (
          <div key={day} className="py-4 text-center text-[10px] font-bold text-slate-400 tracking-widest">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="calendar-grid flex-1">
        {days.map((dayObj, index) => {
          const event = getEventForDay(dayObj.date);
          const isToday = isSameDay(dayObj.date, today);
          
          return (
            <div 
              key={index} 
              className={`
                relative p-4 border-b border-r border-slate-100 min-h-[100px] transition-all group
                ${!dayObj.isCurrentMonth ? 'bg-slate-50/5' : 'bg-white'}
                ${index % 7 === 6 ? 'border-r-0' : ''}
                ${event ? 'cursor-pointer hover:bg-slate-50/50' : ''}
                ${index >= days.length - 7 ? 'border-b-0' : ''}
              `}
              onClick={() => event && onEventClick(event)}
            >
              {/* Day Number Header */}
              <div className="flex justify-between items-start mb-1">
                <span className={`
                  text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full transition-colors shrink-0
                  ${dayObj.isCurrentMonth ? 'text-slate-700' : 'text-slate-300'}
                  ${isToday ? 'bg-slate-900 text-white shadow-md ring-2 ring-slate-100 ring-offset-1' : ''}
                `}>
                  {dayObj.day}
                </span>
                
                {event && (
                  <div className={`w-2 h-2 rounded-full ${event.color || 'bg-slate-400'} animate-pulse shrink-0`}></div>
                )}
              </div>

              {event && (
                <div className="relative flex justify-center items-center h-16 mt-1">
                  {/* Floating Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none z-50 scale-90 group-hover:scale-100">
                    <div className="bg-slate-900/95 backdrop-blur-md text-white text-[10px] font-bold py-1.5 px-3 rounded-lg whitespace-nowrap shadow-xl border border-white/10 flex flex-col items-center">
                      <span>{event.name}</span>
                      {/* Small Triangle Arrow */}
                      <div className="w-2 h-2 bg-slate-900/95 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-white/10"></div>
                    </div>
                  </div>

                  {/* Icon Container */}
                  <div 
                    className={`
                      flex justify-center items-center p-2 rounded-xl transition-all duration-500
                      ${event.color || 'bg-slate-100'} bg-opacity-10 
                      ${event.color?.replace('bg-', 'text-') || 'text-slate-600'}
                      group-hover:scale-110 group-hover:bg-opacity-20
                    `}
                  >
                    <EventIcon icon={event.iconKey} className="w-10 h-10 md:w-12 md:h-12 drop-shadow-sm" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
