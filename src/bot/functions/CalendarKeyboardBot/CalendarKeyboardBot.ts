import {
  startOfMonth,
  getDay,
  getDaysInMonth,
  getDate,
  startOfWeek,
  format,
  addDays,
  addMonths,
  startOfYear,
  getYear,
  addYears,
  startOfDay,
} from 'date-fns';
import { InlineKeyboardMarkup, InlineKeyboardButton, EditMessageTextOptions } from 'node-telegram-bot-api';

import { FunctionBot } from '../models/FunctionBot';
import { IAddCallbackQuery, ICallbackQueryFunction } from '../../interfaces';
import {
  IKeyboardCalendarKeyboardBot,
  CallbackQuery,
  IKeyboardButtonDayCalendarKeyboardBot,
  ICalendarKeyboardBot,
} from './types';
import { sliceArrayIntoGroups } from '../../../utils/sliceArrayIntoGroups';

export class CalendarKeyboardBot extends FunctionBot {
  public regex = null;

  constructor({ regex }: ICalendarKeyboardBot = {}) {
    super();
    this.regex = regex;
  }

  public execute() {}

  public callbackQuery(): IAddCallbackQuery[] {
    return [
      {
        key: CallbackQuery.Key,
        callbackQueryFunction: this.callbackQueryFunction,
      },
    ];
  }

  public keyboard({ date: d, key }: IKeyboardCalendarKeyboardBot): InlineKeyboardMarkup {
    const date = startOfMonth(d).getTime();
    return {
      inline_keyboard: [
        [
          {
            text: format(date, 'MMMM YYYY'),
            callback_data: `${CallbackQuery.Key}.${CallbackQuery.Month}.${key}.${date}`,
          },
        ],
        this.keyboardDaysNameButton(),
        ...this.keyboardButtonsDaysOfMonths({ key, date }),
        [
          {
            text: '<',
            callback_data: `${CallbackQuery.Key}.${CallbackQuery.PreviousMonth}.${key}.${date}`,
          },
          {
            text: 'Today',
            callback_data: `${key}.${startOfDay(Date.now()).getTime()}`,
          },
          {
            text: '>',
            callback_data: `${CallbackQuery.Key}.${CallbackQuery.NextMonth}.${key}.${date}`,
          },
        ],
      ],
    };
  }

  public keyboardOfMonths({ date: d, key }: IKeyboardCalendarKeyboardBot): InlineKeyboardMarkup {
    const date = startOfYear(d).getTime();
    const year = getYear(date);
    return {
      inline_keyboard: [
        [
          {
            text: '<',
            callback_data: `${CallbackQuery.Key}.${CallbackQuery.PreviousYear}.${key}.${date}`,
          },
          {
            text: `${year}`,
            callback_data: `${CallbackQuery.Key}.${CallbackQuery.EmptyButton}`,
          },
          {
            text: '>',
            callback_data: `${CallbackQuery.Key}.${CallbackQuery.NextYear}.${key}.${date}`,
          },
        ],
        ...this.keyboardButtonsMonth({ key, date }),
      ],
    };
  }

  private keyboardDaysNameButton(): InlineKeyboardButton[] {
    const sunday = startOfWeek(Date.now());
    return Array.from({ length: 7 }).map((_, i) => ({
      text: format(addDays(sunday, i), 'dd'),
      callback_data: `${CallbackQuery.Key}.${CallbackQuery.EmptyButton}`,
    }));
  }

  private keyboardButtonsMonth({ date, key }: IKeyboardCalendarKeyboardBot): InlineKeyboardButton[][] {
    const year = startOfYear(date).getTime();
    const arrayOfMonths = Array.from({ length: 12 }).map((_, i) => {
      const month = addMonths(year, i);
      return {
        text: format(month, 'MMM'),
        callback_data: `${CallbackQuery.Key}.${CallbackQuery.SetMonth}.${key}.${month.getTime()}`,
      };
    });
    return sliceArrayIntoGroups(arrayOfMonths, 4);
  }

  private keyboardButtonDay({ date, key }: IKeyboardButtonDayCalendarKeyboardBot = <any>{}): InlineKeyboardButton {
    const text = date ? `${getDate(date)}` : ' ';
    const data = date ? `${key}.${date}` : `${CallbackQuery.Key}.${CallbackQuery.EmptyButton}`;
    return {
      text,
      callback_data: data,
    };
  }

  private keyboardButtonsDaysOfMonths(
    { date, key }: IKeyboardButtonDayCalendarKeyboardBot = <any>{},
  ): InlineKeyboardButton[][] {
    const daysOfWeek = 7;
    const dayOfWeek = getDay(date);
    const days = Array.from(Array(getDaysInMonth(date)), (_, i) =>
      this.keyboardButtonDay({ key, date: addDays(date, i).getTime() }),
    );
    const fillArray = Array(dayOfWeek).fill(this.keyboardButtonDay());
    return sliceArrayIntoGroups([...fillArray, ...days], daysOfWeek);
  }

  private callbackQueryFunction = ({ msg, data, botFunctions }: ICallbackQueryFunction) => {
    const options: EditMessageTextOptions = {
      message_id: msg.message_id,
      chat_id: msg.chat.id,
    };

    switch (data[0]) {
      case CallbackQuery.EmptyButton:
        return Promise.resolve();
      case CallbackQuery.SetMonth: {
        const opts = {
          ...options,
          reply_markup: this.keyboard({ date: +data[2], key: data[1] }),
        };
        return botFunctions.editMessageText({ opts, text: '/date' });
      }
      case CallbackQuery.Month: {
        const opts = {
          ...options,
          reply_markup: this.keyboardOfMonths({ date: +data[2], key: data[1] }),
        };
        return botFunctions.editMessageText({ opts, text: '/date' });
      }
      case CallbackQuery.NextMonth: {
        const opts = {
          ...options,
          reply_markup: this.keyboard({ date: addMonths(+data[2], 1).getTime(), key: data[1] }),
        };
        return botFunctions.editMessageText({ opts, text: '/date' });
      }
      case CallbackQuery.PreviousMonth: {
        const opts = {
          ...options,
          reply_markup: this.keyboard({ date: addMonths(+data[2], -1).getTime(), key: data[1] }),
        };
        return botFunctions.editMessageText({ opts, text: '/date' });
      }
      case CallbackQuery.NextYear: {
        const opts = {
          ...options,
          reply_markup: this.keyboardOfMonths({ date: addYears(+data[2], 1).getTime(), key: data[1] }),
        };
        return botFunctions.editMessageText({ opts, text: '/date' });
      }
      case CallbackQuery.PreviousYear: {
        const opts = {
          ...options,
          reply_markup: this.keyboardOfMonths({ date: addYears(+data[2], -1).getTime(), key: data[1] }),
        };
        return botFunctions.editMessageText({ opts, text: '/date' });
      }
      default:
        return Promise.resolve();
    }
  };
}
