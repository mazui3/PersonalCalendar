import React, { useState, useEffect } from 'react';
import { ImportantEvent } from '../types';

interface SidebarProps {
  nextEvent: ImportantEvent;
  daysRemaining: number;
}

interface AnimationParticle {
  id: string;
  left: string;
  top?: string;
  duration?: string;
  delay: string;
  size?: string;
  sway?: string;
  color?: string;
  angle?: string;
  distanceMid?: string;
  distanceEnd?: string;
  distanceFinal?: string;
  streakLen?: number;
}

interface AnimationBurst {
  id: number;
  type: 'roses' | 'balloons' | 'pumpkin' | 'fireworks';
  particles: AnimationParticle[];
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

const SVGRedFlower = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="32" rx="22" ry="28" fill="#e11d48" />
    <ellipse cx="50" cy="68" rx="22" ry="28" fill="#be123c" />
    <ellipse cx="32" cy="50" rx="28" ry="22" fill="#e11d48" />
    <ellipse cx="68" cy="50" rx="28" ry="22" fill="#be123c" />
    <circle cx="50" cy="50" r="14" fill="#991b1b" />
    <circle cx="50" cy="50" r="7" fill="#facc15" />
  </svg>
);

const SVGBalloon = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 150" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z" fill={color} />
    <path d="M30 25C30 25 15 30 15 50" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
    <path d="M50 100L45 115H55L50 100Z" fill={color} />
    <path d="M50 115C50 115 60 130 40 150" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SVGPumpkin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15C40 15 35 10 35 10L40 25H60L65 10C65 10 60 15 50 15Z" fill="#166534" />
    <ellipse cx="50" cy="55" rx="45" ry="35" fill="#f97316" />
    <ellipse cx="50" cy="55" rx="35" ry="35" fill="#fb923c" />
    <ellipse cx="50" cy="55" rx="20" ry="35" fill="#fdba74" opacity="0.5" />
    <path d="M30 45L35 55L40 45H30Z" fill="#431407" />
    <path d="M60 45L65 55L70 45H60Z" fill="#431407" />
    <path d="M30 70C30 70 40 85 50 85C60 85 70 70 70 70H30Z" fill="#431407" />
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ nextEvent, daysRemaining }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [bursts, setBursts] = useState<AnimationBurst[]>([]);

  useEffect(() => {
    let timer: number;
    if (showDialog) {
      timer = window.setTimeout(() => setShowDialog(false), 6000);
    }
    return () => clearTimeout(timer);
  }, [showDialog]);

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const triggerEventAnimation = () => {
    if (daysRemaining >= 15) return; 

    let type: AnimationBurst['type'] | '' = '';
    
    if (nextEvent.icon === 'new-year' || nextEvent.icon === 'chinese-new-year' || nextEvent.category ===  'travel') type = 'fireworks';
    else if (nextEvent.icon === 'valentine') type = 'roses';
    else if (nextEvent.icon === 'halloween') type = 'pumpkin';
    else if (nextEvent.category === 'birthday' || nextEvent.category === 'anniversary') type = 'balloons';

    if (type) {
      const burstId = Date.now() + Math.random();
      const particles: AnimationParticle[] = [];

      if (type === 'roses') {
        for (let i = 0; i < 24; i++) {
          particles.push({
            id: `rose-${i}`,
            left: `${Math.random() * 100}%`,
            duration: `${3 + Math.random() * 3}s`,
            delay: `${Math.random() * 1}s`,
            size: `${30 + Math.random() * 30}px`,
          });
        }
      } else if (type === 'balloons') {
        const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
        colors.forEach((color, i) => {
          for (let j = 0; j < 4; j++) {
            particles.push({
              id: `balloon-${i}-${j}`,
              left: `${Math.random() * 100}%`,
              duration: `${7 + Math.random() * 4}s`,
              delay: `${Math.random() * 1.2}s`,
              sway: `${(Math.random() - 0.5) * 300}px`,
              size: `${50 + Math.random() * 30}px`,
              color,
            });
          }
        });
      } else if (type === 'fireworks') {
        // Increased number of firework centers
        for (let i = 0; i < 6; i++) {
          particles.push({
            id: `fw-center-${i}`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 60}%`,
            delay: `${i * 0.4}s`,
          });
        }
      }

      const newBurst: AnimationBurst = { id: burstId, type: type as AnimationBurst['type'], particles };
      setBursts(prev => [...prev, newBurst]);
      
      setTimeout(() => {
        setBursts(prev => prev.filter(b => b.id !== burstId));
      }, 12000);
    }
  };

  return (
    <aside className="w-full md:w-96 bg-slate-900 text-white flex flex-col p-6 md:p-12 border-b md:border-b-0 md:border-r border-slate-800 relative z-30 shrink-0">
      <div className="fixed inset-0 pointer-events-none z-[200]">
        {bursts.map(burst => {
          if (burst.type === 'roses') {
            return (
              <div key={burst.id} className="absolute inset-0">
                {burst.particles.map(p => (
                  <div 
                    key={p.id} 
                    className="animate-rose"
                    style={{
                      left: p.left,
                      animationDuration: p.duration,
                      animationDelay: p.delay,
                      width: p.size,
                      height: p.size
                    }}
                  >
                    <SVGRedFlower className="w-full h-full drop-shadow-lg" />
                  </div>
                ))}
              </div>
            );
          }
          if (burst.type === 'balloons') {
            return (
              <div key={burst.id} className="absolute inset-0">
                {burst.particles.map(p => (
                  <div 
                    key={p.id} 
                    className="animate-balloon"
                    style={{
                      left: p.left,
                      animationDuration: p.duration,
                      animationDelay: p.delay,
                      width: p.size || '60px',
                      '--sway': p.sway
                    } as any}
                  >
                    <SVGBalloon color={p.color!} className="w-full h-auto drop-shadow-xl" />
                  </div>
                ))}
              </div>
            );
          }
          if (burst.type === 'pumpkin') {
            return (
              <div key={burst.id} className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="animate-pumpkin flex flex-col items-center">
                  <SVGPumpkin className="w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_50px_rgba(249,115,22,0.5)]" />
                </div>
              </div>
            );
          }
          if (burst.type === 'fireworks') {
            return (
              <div key={burst.id} className="absolute inset-0">
                {burst.particles.map(p => (
                  <div 
                    key={p.id} 
                    className="absolute"
                    style={{ left: p.left, top: p.top }}
                  >
                    {/* Increased particle count to 24 for a full circular explosion */}
                    {[...Array(24)].map((_, j) => {
                      const angle = j * 15; // 360 / 24 = 15
                      const distanceBase = 80 + Math.random() * 40;
                      return (
                        <div 
                          key={j}
                          className="firework-particle"
                          style={{
                            color: ['#fde047', '#f472b6', '#22d3ee', '#fb923c', '#ffffff'][Math.floor(Math.random() * 5)],
                            backgroundColor: 'currentColor',
                            animationDelay: p.delay,
                            // CSS Custom Properties for the complex streak animation
                            '--angle': `${angle}deg`,
                            '--distance-mid': `${distanceBase * 0.4}px`,
                            '--distance-end': `${distanceBase * 0.9}px`,
                            '--distance-final': `${distanceBase}px`,
                            '--streak-len': 10 + Math.random() * 15,
                          } as any}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <header className="mb-4 md:mb-6 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-slate-400 mb-1 md:mb-2 uppercase tracking-widest text-[10px] md:text-xs font-bold">
            <span className="w-6 md:w-8 h-px bg-slate-700 hidden md:block"></span>
            <span>Coming up...</span>
          </div>
          <h1 className="text-xl md:text-4xl font-extrabold tracking-tight leading-tight text-white line-clamp-1">
            {nextEvent.name}
          </h1>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center space-y-4 md:space-y-6 relative">
          <div 
            className={`
              absolute z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-4 w-64 md:w-72
              md:left-[65%] md:translate-x-0
              transition-all duration-500 ease-out origin-bottom
              ${showDialog ? 'opacity-100 scale-100 translate-y-[-10%] md:translate-y-[-15%]' : 'opacity-0 scale-90 pointer-events-none translate-y-0'}
            `}
          >
            <div className="bg-white text-slate-900 p-4 md:p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative text-xs md:text-sm font-medium leading-relaxed border border-slate-100 ring-4 ring-black/5">
              {nextEvent.message || "I'm counting down the days for you!"}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 rounded-sm md:left-6 md:translate-x-0"></div>
            </div>
          </div>

          <div className="relative group cursor-pointer" onClick={toggleDialog}>
            <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
            <img 
              src="https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/DDL.png" 
              alt="Mascot" 
              className={`
                relative w-32 h-32 md:w-56 md:h-56 object-contain drop-shadow-2xl 
                transform transition-all duration-700 
                ${showDialog ? 'scale-110' : 'hover:scale-105'}
              `}
            />
          </div>

          <div className="text-center">
            <div className="flex items-baseline justify-center space-x-1 md:space-x-2">
              <span className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
                {daysRemaining}
              </span>
              <span className="text-base md:text-2xl font-light text-slate-400 italic">days</span>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-8">
          <div 
            onClick={triggerEventAnimation}
            className={`
              p-3 md:p-5 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 
              transition-all duration-300 group/card
              cursor-pointer hover:bg-slate-700/60 md:hover:scale-[1.02] hover:border-blue-500/50
            `}
          >
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className={`
                w-8 h-8 md:w-10 md:h-10 ${bgTailwindMap[nextEvent.themeColor] || 'bg-slate-600'} rounded-lg md:rounded-xl flex items-center justify-center text-sm md:text-lg shadow-inner text-white
                ${daysRemaining === 0 ? 'animate-bounce' : ''}
              `}>
                {nextEvent.category === 'birthday' ? (
                  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 21h16"/><path d="M7 21v-2"/><path d="M12 21v-2"/><path d="M17 21v-2"/><path d="M7 11V7"/><path d="M12 11V7"/><path d="M17 11V7"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m12 13 1.2 2.4 2.8.4-2 2 1 2.8-3-1.6-3 1.6 1-2.8-2-2 2.8-.4Z"/>
                  </svg>
                )}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Scheduled Date</p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm md:text-md font-bold text-slate-100">
                    {new Date(0, nextEvent.month - 1, nextEvent.day).toLocaleString('default', { month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;