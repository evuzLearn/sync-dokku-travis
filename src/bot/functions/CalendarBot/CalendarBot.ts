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
import { IKeyboardCalendarBot, CallbackQuery, IKeyboardButtonDayCalendarBot } from './types';
import { sliceArrayIntoGroups } from '../../../utils/sliceArrayIntoGroups';

export class CalendarBot extends FunctionBot {
  public regex = null;

  static keyboard({ date: d, key }: IKeyboardCalendarBot): InlineKeyboardMarkup {
    const date = startOfMonth(d).getTime();
    return {
      inline_keyboard: [
        [
          {
            text: format(date, 'MMMM YYYY'),
            callback_data: `${CallbackQuery.Key}.${CallbackQuery.Month}.${key}.${date}`,
          },
        ],
        CalendarBot.keyboardDaysNameButton(),
        ...CalendarBot.keyboardButtonsDaysOfMonths({ key, date }),
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

  static keyboardOfMonths({ date: d, key }: IKeyboardCalendarBot): InlineKeyboardMarkup {
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
        ...CalendarBot.keyboardButtonsMonth({ key, date }),
      ],
    };
  }

  static keyboardDaysNameButton(): InlineKeyboardButton[] {
    const sunday = startOfWeek(Date.now());
    return Array.from({ length: 7 }).map((_, i) => ({
      text: format(addDays(sunday, i), 'dd'),
      callback_data: `${CallbackQuery.Key}.${CallbackQuery.EmptyButton}`,
    }));
  }

  static keyboardButtonsMonth({ date, key }: IKeyboardCalendarBot): InlineKeyboardButton[][] {
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

  static keyboardButtonDay({ date, key }: IKeyboardButtonDayCalendarBot = <any>{}): InlineKeyboardButton {
    const text = date ? `${getDate(date)}` : ' ';
    const data = date ? `${key}.${date}` : `${CallbackQuery.Key}.${CallbackQuery.EmptyButton}`;
    return {
      text,
      callback_data: data,
    };
  }

  static keyboardButtonsDaysOfMonths({ date, key }: IKeyboardButtonDayCalendarBot = <any>{}): InlineKeyboardButton[][] {
    const daysOfWeek = 7;
    const dayOfWeek = getDay(date);
    const days = Array.from(Array(getDaysInMonth(date)), (_, i) =>
      CalendarBot.keyboardButtonDay({ key, date: addDays(date, i).getTime() }),
    );
    const fillArray = Array(dayOfWeek).fill(CalendarBot.keyboardButtonDay());
    return sliceArrayIntoGroups([...fillArray, ...days], daysOfWeek);
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
          reply_markup: CalendarBot.keyboard({ date: +data[2], key: data[1] }),
        };
        return botFunctions.editMessageText({ opts, text: '/date' });
      }
      case CallbackQuery.Month: {
        const opts = {
          ...options,
          reply_markup: CalendarBot.keyboardOfMonths({ date: +data[2], key: data[1] }),
        };
        return botFunctions.editMessageText({ opts, text: '/date' });
      }
      case CallbackQuery.NextMonth: {
        const opts = {
          ...options,
          reply_markup: CalendarBot.keyboard({ date: addMonths(+data[2], 1).getTime(), key: data[1] }),
        };
        return botFunctions.editMessageText({ opts, text: '/date' });
      }
      case CallbackQuery.PreviousMonth: {
        const opts = {
          ...options,
          reply_markup: CalendarBot.keyboard({ date: addMonths(+data[2], -1).getTime(), key: data[1] }),
        };
        return botFunctions.editMessageText({ opts, text: '/date' });
      }
      case CallbackQuery.NextYear: {
        const opts = {
          ...options,
          reply_markup: CalendarBot.keyboardOfMonths({ date: addYears(+data[2], 1).getTime(), key: data[1] }),
        };
        return botFunctions.editMessageText({ opts, text: '/date' });
      }
      case CallbackQuery.PreviousYear: {
        const opts = {
          ...options,
          reply_markup: CalendarBot.keyboardOfMonths({ date: addYears(+data[2], -1).getTime(), key: data[1] }),
        };
        return botFunctions.editMessageText({ opts, text: '/date' });
      }
      default:
        return Promise.resolve();
      // throw Error('Calendar#callbackQueryFunction type unknown');
    }
  };
}
