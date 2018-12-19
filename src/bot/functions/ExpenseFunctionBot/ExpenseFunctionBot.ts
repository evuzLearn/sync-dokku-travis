import { FunctionBot } from '../models/FunctionBot';
import { ITelegramBotOnText } from '../../interfaces';

function isNumber(value: string) {
  return value.match(/^[0-9]+(\.[0-9]*){0,1}$/g);
}

const expenses = {};

export class ExpenseFunctionBot extends FunctionBot {
  public regex = /\/expense/;

  static askAmount({ msg, botFunctions }) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const opts = { reply_markup: { force_reply: true } };
    return botFunctions
      .sendMessage({ chatId, opts, text: 'Enter the amount' })
      .then(msgReply => {
        return botFunctions.onReplyMessage({ chatId, messageId: msgReply.message_id });
      })
      .then(({ msg: { text } }) => {
        if (!isNumber(text)) {
          return ExpenseFunctionBot.errorAmount({ msg, botFunctions });
        }
        expenses[userId].amount = +text;
        return ExpenseFunctionBot.askConcept({ msg, botFunctions });
      });
  }

  static errorAmount({ msg, botFunctions }) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const opts = { reply_markup: { force_reply: true } };
    return botFunctions
      .sendMessage({ chatId, opts, text: `You must introduce a number.` })
      .then(msgReply => {
        return botFunctions.onReplyMessage({ chatId, messageId: msgReply.message_id });
      })
      .then(({ msg: { text } }) => {
        if (!isNumber(text)) {
          return ExpenseFunctionBot.errorAmount({ msg, botFunctions });
        }
        expenses[userId].amount = +text;
        return ExpenseFunctionBot.askConcept({ msg, botFunctions });
      });
  }

  static askConcept({ msg, botFunctions }) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const opts = { reply_markup: { force_reply: true } };
    return botFunctions
      .sendMessage({ chatId, opts, text: 'Enter the concept' })
      .then(msgReply => {
        return botFunctions.onReplyMessage({ chatId, messageId: msgReply.message_id });
      })
      .then(({ msg: { text } }) => {
        expenses[userId].concept = text;
      });
  }

  public execute({ msg, botFunctions }: ITelegramBotOnText) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    expenses[userId] = {};

    ExpenseFunctionBot.askAmount({ msg, botFunctions }).then(() => {
      const { amount, concept } = expenses[userId];
      const opts = {
        reply_markup: {
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
        },
      };
      botFunctions.sendMessage({
        chatId,
        opts,
        text: `Summary. \nAmount: ${amount}€. \nConcept: ${concept}.\nIs correct?`,
      });
    });
  }
}
