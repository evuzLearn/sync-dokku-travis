import { InlineKeyboardMarkup, EditMessageTextOptions } from 'node-telegram-bot-api';
import { format, startOfMonth, addMonths } from 'date-fns';

import { FunctionBot } from '../models/FunctionBot';
import { ITelegramBotOnText, IAddCallbackQuery, ICallbackQueryFunction } from '../../types';
import { CallbackQuery, CallbackQueryDataKeys } from './types';
import { getDomain } from '../../../domain';
import { Activity } from '../../../domain/activity/Entities/Activity';

export class GetActivitiesFunctionBot extends FunctionBot {
  public regex = /\/get_activities/;

  public execute = ({ msg, botFunctions }: ITelegramBotOnText) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const domain = getDomain();
    domain
      .get({ useCase: 'get_activities_by_month' })
      .execute({ userId, date: Date.now() })
      .then(activities => {
        const text = this.activitiesToSummary({ activities });
        const opts = { reply_markup: this.inlineKeyboard({ date: Date.now() }) };
        botFunctions.sendMessage({ chatId, text, opts });
      });
  };

  public callbackQuery = (): IAddCallbackQuery[] => {
    return [
      {
        key: CallbackQuery.Key,
        callbackQueryFunction: this.changeMonth,
      },
    ];
  };

  private changeMonth = async ({ msg, data, botFunctions }: ICallbackQueryFunction) => {
    const options: EditMessageTextOptions = {
      message_id: msg.message_id,
      chat_id: msg.chat.id,
    };

    switch (data[CallbackQueryDataKeys.Option]) {
      case CallbackQuery.NextMonth: {
        const userId = msg.from.id;
        const date = addMonths(+data[CallbackQueryDataKeys.Date], 1).getTime();
        return botFunctions.editMessageText(await this.editMessage({ date, userId, options }));
      }
      case CallbackQuery.PreviousMonth:
        const userId = msg.from.id;
        const date = addMonths(+data[CallbackQueryDataKeys.Date], -1).getTime();
        return botFunctions.editMessageText(await this.editMessage({ date, userId, options }));
      default:
        return Promise.resolve();
    }
  };

  private editMessage = async ({ date, userId, options }: { date: number; userId: string | number; options: any }) => {
    const activities = await getDomain()
      .get({ useCase: 'get_activities_by_month' })
      .execute({ userId, date });
    const text = this.activitiesToSummary({ activities });
    const opts = { ...options, reply_markup: this.inlineKeyboard({ date }) };
    return { text, opts };
  };

  private activitiesToSummary = ({ activities }: { activities: Activity[] }): string => {
    const summary = activities.map(
      ({ amount, concept, date }) => `${format(date, 'DD/MM/YYYY')} ${concept} => ${amount}€`,
    );
    const total = activities.reduce((acc, { amount }) => acc + amount, 0);
    const lines = [...summary, `Total: ${total}€`];
    return lines.join('\n');
  };

  private inlineKeyboard = ({ date }: { date: number }): InlineKeyboardMarkup => {
    const firsDayOfMonth = startOfMonth(date).getTime();
    return {
      inline_keyboard: [
        [
          {
            text: '<',
            callback_data: `${CallbackQuery.Key}.${CallbackQuery.PreviousMonth}.${firsDayOfMonth}`,
          },
          {
            text: format(firsDayOfMonth, 'MMM YYYY'),
            callback_data: `${CallbackQuery.Key}.${CallbackQuery.Empty}`,
          },
          {
            text: '>',
            callback_data: `${CallbackQuery.Key}.${CallbackQuery.NextMonth}.${firsDayOfMonth}`,
          },
        ],
      ],
    };
  };
}
