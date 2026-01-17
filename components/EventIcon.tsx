import React from 'react';

interface EventIconProps {
  icon?: string;
  className?: string;
}

const EventIcon: React.FC<EventIconProps> = ({ icon, className = "w-8 h-8" }) => {
  switch (icon) {
    case 'christmas':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" opacity="0.4" />
          <path d="M12 5L7 17H17L12 5Z" />
          <circle cx="12" cy="11" r="1.5" fill="white" />
        </svg>
      );
    case 'halloween':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 2C7.58 2 4 5.58 4 10V22L8 20L12 22L16 20L20 22V10C20 5.58 16.42 2 12 2ZM9 11C8.17 11 7.5 10.33 7.5 9.5C7.5 8.67 8.17 8 9 8C9.83 8 10.5 8.67 10.5 9.5C10.5 10.33 9.83 11 9 11ZM15 11C14.17 11 13.5 10.33 13.5 9.5C13.5 8.67 14.17 8 15 8C15.83 8 16.5 8.67 16.5 9.5C16.5 10.33 15.83 11 15 11Z" />
        </svg>
      );
    case 'new-year':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          {/* Central Burst */}
          <circle cx="12" cy="12" r="1.5" />
          {/* Radiating Sparks */}
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Outer Glitters */}
          <circle cx="12" cy="7" r="0.8" opacity="0.6" />
          <circle cx="12" cy="17" r="0.8" opacity="0.6" />
          <circle cx="7" cy="12" r="0.8" opacity="0.6" />
          <circle cx="17" cy="12" r="0.8" opacity="0.6" />
          <circle cx="8" cy="8" r="0.6" opacity="0.4" />
          <circle cx="16" cy="16" r="0.6" opacity="0.4" />
          <circle cx="8" cy="16" r="0.6" opacity="0.4" />
          <circle cx="16" cy="8" r="0.6" opacity="0.4" />
        </svg>
      );
    case 'valentine':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" />
        </svg>
      );
    case 'birthday':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <rect x="4" y="14" width="16" height="8" rx="2" />
          <rect x="7" y="10" width="10" height="4" rx="1" opacity="0.6" />
          <path d="M12 4V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="2.5" r="1.5" />
        </svg>
      );
    case 'vacation':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 2C10.34 2 9 3.34 9 5C9 6.66 10.34 8 12 8C13.66 8 15 6.66 15 5C15 3.34 13.66 2 12 2Z" opacity="0.5" />
          <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" opacity="0.2" />
          <path d="M13 10V22M11 22V10M12 10C8 10 5 13 5 17M12 10C16 10 19 13 19 17" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'deadline':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9V13L14 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 3H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="3" r="1" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
};

export default EventIcon;