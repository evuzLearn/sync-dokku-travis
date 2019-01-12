import { CalendarKeyboardBot } from '../CalendarKeyboardBot';

export enum CallbackQuery {
  AddExpense = 'ADD_EXPENSE',
  AddIncome = 'ADD_INCOME',
  DateExpense = 'DATE_EXPENSE',
  DateIncome = 'DATE_INCOME',
}

export enum CallbackQueryAddActivity {
  Y = 'Y',
  N = 'N',
}

export interface IActivityFunctionBot {
  calendarKeyboardBot: CalendarKeyboardBot;
}

export interface IGetActivityActivityFunctionBot {
  userId: number | string;
  clean?: boolean;
}
