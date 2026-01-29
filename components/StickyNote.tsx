
import React from 'react';
import { ImportantEvent } from '../types';

interface StickyNoteProps {
  event: ImportantEvent;
  onClose: () => void;
}

const bgTailwindMap: Record<string, string> = {
  'red': 'bg-red-500',
  'orange': 'bg-orange-500',
  'blue': 'bg-blue-500',
  'indigo': 'bg-indigo-500',
  'pink': 'bg-pink-500',
  'yellow': 'bg-yellow-500',
  'slate': 'bg-slate-700',
};

const borderTailwindMap: Record<string, string> = {
  'red': 'border-red-600',
  'orange': 'border-orange-600',
  'blue': 'border-blue-600',
  'indigo': 'border-indigo-600',
  'pink': 'border-pink-600',
  'yellow': 'border-yellow-600',
  'slate': 'border-slate-800',
};

const StickyNote: React.FC<StickyNoteProps> = ({ event, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className={`
          relative w-full max-w-sm aspect-square bg-personal-50 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] p-8
          rotate-[2deg] animate-note-fly-in
          border-l-[12px] border-personal-200/40
          pointer-events-auto rounded-sm
        `}
        style={{
          willChange: 'transform, opacity',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Washi Tape Aesthetic */}
        <div className="washi-tape"></div>

        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 ${bgTailwindMap[event.themeColor]} rounded-full shadow-md z-10 border-4 ${borderTailwindMap[event.themeColor]}`}></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-300 hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-personal-100"
          aria-label="Close memo"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="h-full flex flex-col pointer-events-none">
          <div className="flex items-center space-x-2 mb-6 border-b border-personal-200 pb-3">
            <span className={`w-3 h-3 rounded-full ${bgTailwindMap[event.themeColor]}`}></span>
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">{event.name}</h3>
          </div>

          <div className="flex-1 text-slate-600 text-xl font-medium leading-relaxed overflow-y-auto pr-2 custom-scrollbar font-handwriting pointer-events-auto">
            {event.memo || "No special plans recorded yet. Let's make this day unforgettable!"}
          </div>

          <div className="mt-6 flex justify-between items-end border-t border-personal-200 pt-5">
            <div className="text-[10px] font-bold text-personal-600/60 uppercase tracking-[0.2em]">
              {new Date(0, event.month - 1, event.day).toLocaleString('default', { month: 'long', day: 'numeric' })}
            </div>
            <div className="px-2 py-0.5 bg-white border border-personal-200 rounded text-[9px] text-personal-800/40 font-bold uppercase tracking-widest">
              {event.category}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent via-black/[0.02] to-black/[0.05] rounded-tl-[40px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default StickyNote;
