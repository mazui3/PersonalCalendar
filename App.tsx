
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import CalendarView from './components/CalendarView';
import StickyNote from './components/StickyNote';
import { events } from './data/events';
import { getNextEvent } from './utils/dateHelpers';
import { ImportantEvent } from './types';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeEvent, setActiveEvent] = useState<ImportantEvent | null>(null);

  const nextEventData = useMemo(() => {
    return getNextEvent(events);
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleGoToToday = () => {
    setCurrentDate(new Date());
  };

  const openEventDetails = (event: ImportantEvent) => {
    setActiveEvent(event);
  };

  const closeEventDetails = () => {
    setActiveEvent(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white">
      {/* Sticky Note Overlay */}
      {activeEvent && (
        <StickyNote 
          event={activeEvent} 
          onClose={closeEventDetails} 
        />
      )}

      {/* Left Section: Countdown */}
      <Sidebar 
        nextEvent={nextEventData.event} 
        daysRemaining={nextEventData.days} 
      />

      {/* Right Section: Calendar */}
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              {currentDate.toLocaleString('default', { month: 'long' })} 
              <span className="ml-2 font-light text-slate-400">{currentDate.getFullYear()}</span>
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleGoToToday}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Today
            </button>
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button 
                onClick={handlePrevMonth}
                className="p-2 hover:bg-white rounded-md transition-all text-slate-600 shadow-sm hover:shadow-none"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                onClick={handleNextMonth}
                className="p-2 hover:bg-white rounded-md transition-all text-slate-600 shadow-sm hover:shadow-none"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </header>

        <CalendarView 
          currentDate={currentDate} 
          events={events} 
          onEventClick={openEventDetails}
        />
      </main>
    </div>
  );
};

export default App;
