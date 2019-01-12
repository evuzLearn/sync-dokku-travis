import { isNumber } from '../../../utils/isNumber';
import { InlineKeyboardMarkup } from 'node-telegram-bot-api';
import { ITelegramBotOnText } from '../../types';
import { Activity } from '../../../domain/activity/Entities/Activity';
import {
  CallbackQuery,
  CallbackQueryAddActivity,
  IActivityFunctionBot,
  IGetActivityActivityFunctionBot,
} from './types';
import { CalendarKeyboardBot } from '../CalendarKeyboardBot';
import { FunctionBot } from '../models/FunctionBot';

export abstract class ActivityFunctionBot extends FunctionBot {
  private activities: { [e: number]: Partial<Activity> } = {};

  public calendarKeyboarBot: CalendarKeyboardBot;

  constructor({ calendarKeyboardBot }: IActivityFunctionBot) {
    super();
    this.calendarKeyboarBot = calendarKeyboardBot;
  }

  protected getActivity = ({ userId, clean = false }: IGetActivityActivityFunctionBot): Partial<Activity> => {
    if (!this.activities[userId] || clean) {
      this.activities[userId] = {};
    }
    return this.activities[userId];
  };

  protected askAmount = ({ msg, botFunctions }: ITelegramBotOnText): Promise<{ amount: number }> => {
    const chatId = msg.chat.id;
    const opts = { reply_markup: { force_reply: true } };
    return botFunctions
      .sendMessage({ chatId, opts, text: 'Enter the amount' })
      .then(msgReply => {
        return botFunctions.onReplyMessage({ chatId, messageId: msgReply.message_id });
      })
      .then(({ msg: { text } }) => {
        if (!isNumber(text)) {
          return this.errorAmount({ msg, botFunctions });
        }
        return { amount: +text };
      });
  };

  protected askConcept = ({ msg, botFunctions }: ITelegramBotOnText): Promise<{ concept: string }> => {
    const chatId = msg.chat.id;
    const opts = { reply_markup: { force_reply: true } };
    return botFunctions
      .sendMessage({ chatId, opts, text: 'Enter the concept' })
      .then(msgReply => {
        return botFunctions.onReplyMessage({ chatId, messageId: msgReply.message_id });
      })
      .then(({ msg: { text } }) => {
        return { concept: text };
      });
  };

  protected confirmKeyboard = (type: CallbackQuery): InlineKeyboardMarkup => ({
    inline_keyboard: [
      [
        {
          text: 'Yes',
          callback_data: `${type}.${CallbackQueryAddActivity.Y}`,
        },
        {
          text: 'No',
          callback_data: `${type}.${CallbackQueryAddActivity.N}`,
        },
      ],
    ],
  });

  private errorAmount = ({ msg, botFunctions }: ITelegramBotOnText): Promise<{ amount: number }> => {
    const chatId = msg.chat.id;
    const opts = { reply_markup: { force_reply: true } };
    return botFunctions
      .sendMessage({ chatId, opts, text: `You must introduce a number.` })
      .then(msgReply => {
        return botFunctions.onReplyMessage({ chatId, messageId: msgReply.message_id });
      })
      .then(({ msg: { text } }) => {
        if (!isNumber(text)) {
          return this.errorAmount({ msg, botFunctions });
        }
        return { amount: +text };
      });
  };
}
