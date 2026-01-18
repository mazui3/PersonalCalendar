
import React from 'react';
import { EventIconType } from '../types';

interface EventIconProps {
  icon: EventIconType;
  className?: string;
  colorName?: string;
}

const stickerMap: Record<EventIconType, string> = {
  'birthday': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/bouquet_birthday.png',
  'christmas': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/christmas_dance_tonakai.png',
  'valentine': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/valentinesday_heart_box.png',
  'vacation': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/travel_nidukuri.png',
  'new-year': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/hanabi_bg.png',
  'halloween': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/halloween_pumpkin1.png',
  'deadline': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/shimekiri_owareru_man.png',
  'big-event': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/job_illustrator_pc_woman_tetsuya.png',
  'chinese-new-year': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/eto_inu_shinnen_aisatsu.png',
  'sealphie-birthday': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/otanjoubi_birthday_present_balloon.png',
  'tototo-birthday': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/birthday_party_sunglass.png',
  'anniversary-crayons': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/omocha_kureyon.png',
  'anniversary-rose': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/flower_rose_rainbow.png',
  'anniversary-book': 'https://raw.githubusercontent.com/mazui3/PersonalCalendar/refs/heads/main/image/book_tate.png'
};

const hexColorMap: Record<string, string> = {
  'red': '#ef4444',
  'orange': '#f97316',
  'blue': '#3b82f6',
  'indigo': '#6366f1',
  'pink': '#ec4899',
  'yellow': '#eab308',
  'slate': '#334155',
};

const EventIcon: React.FC<EventIconProps> = ({ icon, className = "w-24 h-24", colorName = "blue" }) => {
  const src = stickerMap[icon];
  const themeHex = hexColorMap[colorName] || '#3b82f6';

  const stickerStyle: React.CSSProperties = {
    filter: `
      drop-shadow(2px 2px 0 white)
      drop-shadow(-2px -2px 0 white)
      drop-shadow(3px 0 0 ${themeHex})
      drop-shadow(-3px 0 0 ${themeHex})
      drop-shadow(0 3px 0 ${themeHex})
      drop-shadow(0 -3px 0 ${themeHex})
    `,
    willChange: 'filter, transform',
  };

  return (
    <div className={`relative flex items-center justify-center ${className} transform-gpu`}>
      <img
        src={src}
        alt={icon}
        style={stickerStyle}
        className="w-full h-full object-contain select-none pointer-events-none"
      />
    </div>
  );
};

export default EventIcon;
