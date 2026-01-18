
export type EventCategory = 'holiday' | 'birthday' | 'work' | 'personal' | 'travel' | 'anniversary' | 'event';
export type EventIconType = 'birthday' | 'christmas' | 'valentine' | 'vacation' | 'new-year' | 'halloween' | 'deadline' | 'big-event' | 'chinese-new-year';

export interface ImportantEvent {
  id: string;
  name: string;
  month: number; // 1-12
  day: number;
  category: EventCategory;
  icon: EventIconType;
  themeColor: 'red' | 'orange' | 'blue' | 'indigo' | 'pink' | 'yellow' | 'slate';
  message?: string;
  memo?: string;
}

export interface NextEventResult {
  event: ImportantEvent;
  days: number;
}
