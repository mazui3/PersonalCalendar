
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

  const numRows = Math.ceil(days.length / 7);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getEventForDay = (date: Date) => {
    return events.find(e => e.day === date.getDate() && e.month === (date.getMonth() + 1));
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl relative min-h-[500px] md:min-h-0">
      {/* Weekdays Header: Added z-10 and rounded-t to handle overlap and aesthetics */}
      <div className="grid grid-cols-7 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 shrink-0 z-10 rounded-t-3xl">
        {WEEKDAYS.map(day => (
          <div key={day} className="py-3 md:py-4 text-center text-[10px] font-bold text-slate-400 tracking-widest">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid: Removed overflow-hidden to allow stickers to pop out */}
      <div
        className="grid grid-cols-7 flex-1 relative bg-white min-h-0 rounded-b-3xl"
        style={{ gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))` }}
      >
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
                flex flex-col min-h-0
                ${event ? 'z-20 cursor-pointer hover:bg-slate-50/40 hover:z-40' : 'z-0'}
                ${index === days.length - 7 ? 'rounded-bl-3xl' : ''}
                ${index === days.length - 1 ? 'rounded-br-3xl' : ''}
              `}
            >
              {/* Day Number Header */}
              <div className="p-2 md:p-3 flex justify-between items-start relative z-0 pointer-events-none">
                <span className={`
                  text-xs md:text-sm font-bold w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full transition-all
                  ${dayObj.isCurrentMonth ? 'text-slate-700' : 'text-slate-300'}
                  ${isToday ? 'bg-slate-900 text-white shadow-lg ring-2 md:ring-4 ring-slate-100' : ''}
                `}>
                  {dayObj.day}
                </span>

                {event && (
                  <div className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full ${bgTailwindMap[event.themeColor] || 'bg-slate-400'} shadow-sm`}></div>
                )}
              </div>

              {/* Event Sticker: Positioned to allow popping out of cell boundaries */}
              {/* Sticker sizes increased by ~15% from original values */}
              {event && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      willChange: 'transform'
                    }}
                    className={`
                      transition-all duration-300 transform-gpu translate-y-2
                      group-hover:scale-110
                    `}
                  >
                    <EventIcon
                      icon={event.icon}
                      className="w-[52px] h-[52px] sm:w-[70px] sm:h-[70px] md:w-[70px] md:h-[70px] lg:w-[98px] lg:h-[98px] xl:w-[115px] xl:h-[115px]"
                      colorName={event.themeColor}
                    />
                  </div>

                  {/* Name Tooltip: Higher z-index to stay on top of everything */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[110] scale-75 group-hover:scale-100">
                    <div className="bg-slate-900/90 text-white text-[8px] md:text-[10px] font-bold py-1 px-2 rounded-full whitespace-nowrap shadow-lg border border-white/10 relative">
                      <span className="uppercase tracking-widest">{event.name}</span>
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
