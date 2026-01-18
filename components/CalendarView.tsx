
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

const bgTailwindMap: Record<string, string> = {
  'red': 'bg-red-500',
  'orange': 'bg-orange-500',
  'blue': 'bg-blue-500',
  'indigo': 'bg-indigo-500',
  'pink': 'bg-pink-500',
  'yellow': 'bg-yellow-500',
  'slate': 'bg-slate-700',
};

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
    <div className="h-full flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
      {/* Weekdays Header */}
      <div className="grid grid-cols-7 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 shrink-0 z-10">
        {WEEKDAYS.map(day => (
          <div key={day} className="py-4 text-center text-[10px] font-bold text-slate-400 tracking-widest">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 auto-rows-fr flex-1 relative bg-white">
        {days.map((dayObj, index) => {
          const event = getEventForDay(dayObj.date);
          const isToday = isSameDay(dayObj.date, today);
          const rotation = event ? (dayObj.day % 12 - 6) : 0;
          
          return (
            <div 
              key={`${currentDate.getMonth()}-${index}`} 
              onClick={() => event && onEventClick(event)}
              className={`
                relative border-b border-r border-slate-100 transition-all group
                ${!dayObj.isCurrentMonth ? 'bg-slate-50/10' : 'bg-white'}
                ${index % 7 === 6 ? 'border-r-0' : ''}
                ${index >= days.length - 7 ? 'border-b-0' : ''}
                flex flex-col
                ${event ? 'z-30 cursor-pointer hover:bg-slate-50/40' : 'z-0'} 
              `}
              style={{ overflow: 'visible' }}
            >
              {/* Day Number Header */}
              <div className="p-3 flex justify-between items-start relative z-0 pointer-events-none">
                <span className={`
                  text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full transition-all
                  ${dayObj.isCurrentMonth ? 'text-slate-700' : 'text-slate-300'}
                  ${isToday ? 'bg-slate-900 text-white shadow-lg ring-4 ring-slate-100' : ''}
                `}>
                  {dayObj.day}
                </span>
                
                {event && (
                  <div className={`w-1.5 h-1.5 rounded-full ${bgTailwindMap[event.themeColor] || 'bg-slate-400'} shadow-sm`}></div>
                )}
              </div>

              {/* Event Sticker */}
              {event && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                  <div 
                    style={{ 
                      transform: `rotate(${rotation}deg)`,
                      willChange: 'transform'
                    }}
                    className={`
                      transition-all duration-300 transform-gpu translate-y-1
                      group-hover:scale-105 group-hover:z-[100]
                    `}
                  >
                    <EventIcon 
                      icon={event.icon} 
                      className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px]" 
                      colorName={event.themeColor}
                    />
                  </div>

                  {/* Name Tooltip */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-10 transition-all duration-300 pointer-events-none z-[110] scale-90 group-hover:scale-100">
                    <div className="bg-slate-900/90 text-white text-[10px] font-bold py-1 px-3 rounded-full whitespace-nowrap shadow-lg border border-white/10 flex flex-col items-center">
                      <span className="uppercase tracking-widest">{event.name}</span>
                      <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                    </div>
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
