
export interface ImportantEvent {
  id: string;
  name: string;
  month: number; // 1-12
  day: number;
  type: 'birthday' | 'holiday' | 'anniversary' | 'other' | 'vacation' | 'deadline';
  color?: string;
  message?: string; // Message the mascot says when clicked
  memo?: string; // Extra information shown in a sticky note
  iconKey?: 'christmas' | 'halloween' | 'new-year' | 'valentine' | 'birthday' | 'vacation' | 'deadline';
}

export interface NextEventResult {
  event: ImportantEvent;
  days: number;
}
