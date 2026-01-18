
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`
          relative w-full max-w-sm aspect-square bg-[#fff9c4] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] p-8
          rotate-[10deg] animate-note-fly-in
          border-l-[12px] border-yellow-200/50
          pointer-events-auto
        `}
        style={{
          willChange: 'transform, opacity',
          transformStyle: 'preserve-3d',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 ${bgTailwindMap[event.themeColor]} rounded-full shadow-md z-10 border-4 ${borderTailwindMap[event.themeColor]}`}></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors p-2 rounded-full hover:bg-yellow-100/50"
          aria-label="Close memo"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="h-full flex flex-col pointer-events-none">
          <div className="flex items-center space-x-2 mb-6 border-b border-yellow-600/10 pb-2">
            <span className={`w-3 h-3 rounded-full ${bgTailwindMap[event.themeColor]}`}></span>
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">{event.name}</h3>
          </div>

          <div className="flex-1 text-slate-700 text-lg font-medium leading-relaxed overflow-y-auto pr-2 custom-scrollbar font-handwriting pointer-events-auto">
            {event.memo || "No memo for this event yet. Time to plan something fun!"}
          </div>

          <div className="mt-6 flex justify-between items-end border-t border-yellow-600/10 pt-4">
            <div className="text-xs font-bold text-yellow-700/60 uppercase tracking-widest">
              {new Date(0, event.month - 1, event.day).toLocaleString('default', { month: 'short', day: 'numeric' })}
            </div>
            <div className="text-[10px] text-yellow-800/40 font-bold">
              #{event.category.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent via-black/5 to-black/10 rounded-tl-3xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default StickyNote;
