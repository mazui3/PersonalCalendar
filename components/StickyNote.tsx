
import React from 'react';
import { ImportantEvent } from '../types';

interface StickyNoteProps {
  event: ImportantEvent;
  onClose: () => void;
}

const StickyNote: React.FC<StickyNoteProps> = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/30 animate-in fade-in duration-300">
      <div 
        className={`
          relative w-full max-w-sm aspect-square bg-[#fff9c4] shadow-2xl p-8 
          rotate-[10deg] animate-note-fly-in
          border-l-[12px] border-yellow-200/50
        `}
        style={{
          boxShadow: '15px 15px 30px rgba(0,0,0,0.2), inset 0px 0px 50px rgba(255,255,255,0.4)'
        }}
      >
        {/* Sticky Note Pin Head Effect */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full shadow-md z-10 border-4 border-red-600"></div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors p-2 rounded-full hover:bg-yellow-100"
          aria-label="Close memo"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="h-full flex flex-col">
          <div className="flex items-center space-x-2 mb-6 border-b border-yellow-600/10 pb-2">
            <span className={`w-3 h-3 rounded-full ${event.color || 'bg-slate-400'}`}></span>
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">{event.name}</h3>
          </div>
          
          <div className="flex-1 text-slate-700 text-lg font-medium leading-relaxed italic overflow-y-auto pr-2 custom-scrollbar">
            {event.memo || "No memo for this event yet. Time to plan something fun!"}
          </div>

          <div className="mt-6 flex justify-between items-end border-t border-yellow-600/10 pt-4">
            <div className="text-xs font-bold text-yellow-700/60 uppercase tracking-widest">
              {new Date(0, event.month - 1, event.day).toLocaleString('default', { month: 'short', day: 'numeric' })}
            </div>
            <div className="text-[10px] text-yellow-800/40 font-bold">
              #PERSONAL_MEMO
            </div>
          </div>
        </div>

        {/* Note Fold Effect */}
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent via-black/5 to-black/10 rounded-tl-3xl pointer-events-none"></div>
      </div>
      
      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
};

export default StickyNote;
