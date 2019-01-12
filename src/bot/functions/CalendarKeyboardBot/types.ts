export enum CallbackQuery {
  Key = 'CALENDAR_BOT',
  Month = 'MONTH',
  SetMonth = 'SET_MONTH',
  NextMonth = 'NEXT_MONTH',
  PreviousMonth = 'PREVIOUS_MONTH',
  EmptyButton = 'EMPTY_BUTTON',
  NextYear = 'NEXT_YEAR',
  PreviousYear = 'PREVIOUS_YEAR',
}

export interface ICalendarKeyboardBot {
  regex?: RegExp | string;
}

export interface IKeyboardCalendarKeyboardBot {
  date: string | number | Date;
  key: string;
}

export interface IKeyboardButtonDayCalendarKeyboardBot {
  date: number;
  key: string;
}
