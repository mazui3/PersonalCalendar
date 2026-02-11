import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import CalendarView from './components/CalendarView';
import StickyNote from './components/StickyNote';
import { events } from './data/events';
import { getNextEvent } from './utils/dateHelpers';
import { ImportantEvent } from './types';

const MIN_DATE = new Date(2025, 6, 1); // July 2025
const MAX_DATE = new Date(2027, 5, 1); // June 2027

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeEvent, setActiveEvent] = useState<ImportantEvent | null>(null);

  const nextEventData = useMemo(() => {
    return getNextEvent(events);
  }, []);

  const isAtMinDate = useMemo(() => {
    return currentDate.getFullYear() === MIN_DATE.getFullYear() && currentDate.getMonth() === MIN_DATE.getMonth();
  }, [currentDate]);

  const isAtMaxDate = useMemo(() => {
    return currentDate.getFullYear() === MAX_DATE.getFullYear() && currentDate.getMonth() === MAX_DATE.getMonth();
  }, [currentDate]);

  const handlePrevMonth = () => {
    if (isAtMinDate) return;
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    if (isAtMaxDate) return;
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleGoToToday = () => {
    const today = new Date();
    // Clamp to bounds if today is outside the range
    if (today < MIN_DATE) setCurrentDate(new Date(MIN_DATE));
    else if (today > MAX_DATE) setCurrentDate(new Date(MAX_DATE));
    else setCurrentDate(today);
  };

  const openEventDetails = (event: ImportantEvent) => {
    setActiveEvent(event);
  };

  const closeEventDetails = () => {
    setActiveEvent(null);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen w-full md:overflow-hidden bg-white">
      {/* Left Section: Countdown */}
      <Sidebar 
        nextEvent={nextEventData.event} 
        daysRemaining={nextEventData.days} 
      />

      {/* Right Section: Calendar */}
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 bg-slate-50/30 md:overflow-y-auto custom-scrollbar">
        <header className="flex items-center justify-between mb-4 md:mb-6 shrink-0">
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-slate-800">
              {currentDate.toLocaleString('default', { month: 'long' })} 
              <span className="ml-2 font-light text-slate-400">{currentDate.getFullYear()}</span>
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleGoToToday}
              className="px-2.5 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm active:scale-95"
            >
              Today
            </button>
            <div className="flex bg-slate-200/50 rounded-lg p-1 border border-slate-200">
              <button 
                onClick={handlePrevMonth}
                disabled={isAtMinDate}
                className={`p-1.5 md:p-2 rounded-md transition-all shadow-sm active:scale-95 flex items-center justify-center ${
                  isAtMinDate ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-white text-slate-600'
                }`}
                title={isAtMinDate ? "Reached earliest allowed date" : "Previous Month"}
              >
                <svg className="w-3 h-3 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <button 
                onClick={handleNextMonth}
                disabled={isAtMaxDate}
                className={`p-1.5 md:p-2 rounded-md transition-all shadow-sm active:scale-95 flex items-center justify-center ${
                  isAtMaxDate ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-white text-slate-600'
                }`}
                title={isAtMaxDate ? "Reached latest allowed date" : "Next Month"}
              >
                <svg className="w-3 h-3 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Calendar Wrapper: Constrained height to reduce stretch on large screens */}
        <div className="flex-1 md:max-h-[82vh] lg:max-h-[85vh] w-full mx-auto">
          <CalendarView 
            currentDate={currentDate} 
            events={events} 
            onEventClick={openEventDetails}
          />
        </div>
      </main>

      {/* Sticky Note */}
      {activeEvent && (
        <StickyNote 
          event={activeEvent} 
          onClose={closeEventDetails} 
        />
      )}
    </div>
  );
};

export default App;