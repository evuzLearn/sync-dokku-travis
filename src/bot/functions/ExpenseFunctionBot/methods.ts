import { isNumber } from '../../../utils/isNumber';
import { InlineKeyboardMarkup } from 'node-telegram-bot-api';
import { ITelegramBotOnText } from '../../interfaces';

function methods() {
  // TODO: Add interface Expense from domain
  const expenses: { [e: number]: any } = {};
  const confirmKeyboard: InlineKeyboardMarkup = {
    inline_keyboard: [
      [
        {
          text: 'Yes',
          callback_data: 'ADD_EXPENSE.YES',
        },
        {
          text: 'No',
          callback_data: 'ADD_EXPENSE.NO',
        },
      ],
    ],
  };

  // TODO: Add interface Expense from domain
  const getExpense = ({ userId, clean = false }: { userId: number | string, clean?: boolean }) => {
    const expense = expenses[userId];
    if (!expense || clean) {
      expenses[userId] = {};
    }
    return expense || expenses[userId];
  }

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
  }

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
  }

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
  }

  return { askAmount, errorAmount, askConcept, getExpense, confirmKeyboard }
}

export const expenseFunctionBotMethods = methods();
