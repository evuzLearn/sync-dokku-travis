import { isNumber } from '../../../utils/isNumber';
import { InlineKeyboardMarkup } from 'node-telegram-bot-api';
import { ITelegramBotOnText } from '../../interfaces';
import { Activity } from '../../../domain/activity/Entities/Activity';
import { CallbackQuery, CallbackQueryAddActivity } from './interfaces';

function methods() {
  const activities: { [e: number]: Partial<Activity> } = {};
  const getActivity = ({ userId, clean = false }: { userId: number | string; clean?: boolean }): Partial<Activity> => {
    if (!activities[userId] || clean) {
      activities[userId] = {};
    }
    return activities[userId];
  };

  const askAmount = ({ msg, botFunctions }: ITelegramBotOnText): Promise<{ amount: number }> => {
    const chatId = msg.chat.id;
    const opts = { reply_markup: { force_reply: true } };
    return botFunctions
      .sendMessage({ chatId, opts, text: 'Enter the amount' })
      .then(msgReply => {
        return botFunctions.onReplyMessage({ chatId, messageId: msgReply.message_id });
      })
      .then(({ msg: { text } }) => {
        if (!isNumber(text)) {
          return errorAmount({ msg, botFunctions });
        }
        return { amount: +text };
      });
  };

  const errorAmount = ({ msg, botFunctions }: ITelegramBotOnText): Promise<{ amount: number }> => {
    const chatId = msg.chat.id;
    const opts = { reply_markup: { force_reply: true } };
    return botFunctions
      .sendMessage({ chatId, opts, text: `You must introduce a number.` })
      .then(msgReply => {
        return botFunctions.onReplyMessage({ chatId, messageId: msgReply.message_id });
      })
      .then(({ msg: { text } }) => {
        if (!isNumber(text)) {
          return errorAmount({ msg, botFunctions });
        }
        return { amount: +text };
      });
  };

  const askConcept = ({ msg, botFunctions }: ITelegramBotOnText): Promise<{ concept: string }> => {
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

  const confirmKeyboard = (type: CallbackQuery): InlineKeyboardMarkup => ({
    inline_keyboard: [
      [
        {
          text: 'Yes',
          callback_data: `${type}.${CallbackQueryAddActivity.Y}`,
        },
        {
          text: 'No',
          callback_data: `${CallbackQuery}.${CallbackQueryAddActivity.N}`,
        },
      ],
    ],
  });

  return { askAmount, errorAmount, askConcept, getActivity, confirmKeyboard };
}

export const expenseFunctionBotMethods = methods();
