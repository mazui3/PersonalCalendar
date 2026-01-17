
import { ImportantEvent, NextEventResult } from '../types';

/**
 * Calculates the next occurrence of a list of events relative to today.
 */
export const getNextEvent = (events: ImportantEvent[]): NextEventResult => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDates = events.map(event => {
    let year = today.getFullYear();
    let date = new Date(year, event.month - 1, event.day);
    
    // If the event has already passed this year, look at next year
    if (date < today) {
      date = new Date(year + 1, event.month - 1, event.day);
    }
    
    return { event, date };
  });

  // Sort by closest date
  eventDates.sort((a, b) => a.date.getTime() - b.date.getTime());

  const next = eventDates[0];
  const diffTime = Math.abs(next.date.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    event: next.event,
    days: diffDays
  };
};

/**
 * Returns an array of days for the specified month and year.
 */
export const getCalendarDays = (year: number, month: number) => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  
  // Previous month padding
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push({
      day: prevMonthLastDay - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, prevMonthLastDay - i)
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(year, month, i)
    });
  }
  
  // Next month padding
  const totalSlots = 42; // 6 weeks * 7 days
  const remainingSlots = totalSlots - days.length;
  for (let i = 1; i <= remainingSlots; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(year, month + 1, i)
    });
  }
  
  return days;
};

export const isSameDay = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};
