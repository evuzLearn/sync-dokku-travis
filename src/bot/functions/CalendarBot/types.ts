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

export interface IKeyboardCalendarBot {
  date: string | number | Date;
  key: string;
}

export interface IKeyboardButtonDayCalendarBot {
  date: number;
  key: string;
}
