import { SendMessageOptions, EditMessageTextOptions } from 'node-telegram-bot-api';
import { startOfDay } from 'date-fns';

import { FunctionBot } from '../models/FunctionBot';
import { ITelegramBotOnText, IAddCallbackQuery, ICallbackQueryFunction } from '../../interfaces';
import { expenseFunctionBotMethods } from './methods';
import { getDomain } from '../../../domain';
import { CallbackQuery, CallbackQueryAddExpense } from './interfaces';

export class ExpenseFunctionBot extends FunctionBot {
  public regex = /\/expense/;

  public execute({ msg, botFunctions }: ITelegramBotOnText) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const expense = expenseFunctionBotMethods.getExpense({ userId, clean: true });

    expenseFunctionBotMethods
      .askAmount({ msg, botFunctions })
      .then(({ amount }) => {
        expense.amount = amount;
        return expenseFunctionBotMethods.askConcept({ msg, botFunctions });
      })
      .then(({ concept }) => {
        expense.concept = concept;
        return { expense };
      })
      // TODO: Add interface Expense from domain
      .then(({ expense: { amount, concept } }) => {
        const opts: SendMessageOptions = {
          reply_markup: expenseFunctionBotMethods.confirmKeyboard,
        };
        botFunctions.sendMessage({
          chatId,
          opts,
          text: `Summary. \nAmount: ${amount}€. \nConcept: ${concept}.\nIs correct?`,
        });
      });
  }

  public callbackQuery(): IAddCallbackQuery[] {
    return [
      {
        key: CallbackQuery.AddExpense,
        callbackQueryFunction: this.acceptExpense,
      },
    ];
  }

  private acceptExpense({ msg, data, botFunctions }: ICallbackQueryFunction) {
    const userId = msg.from.id;
    const opts: EditMessageTextOptions = {
      message_id: msg.message_id,
      chat_id: msg.chat.id,
    };

    if (data[0] === CallbackQueryAddExpense.N) {
      return botFunctions.editMessageText({ opts, text: 'You can introduce a new /expense' });
    }
    const domain = getDomain();
    const { amount, concept } = expenseFunctionBotMethods.getExpense({ userId });
    domain
      .get({ useCase: 'new_expense' })
      .execute({ activity: { amount, concept, userId, date: startOfDay(Date.now()).getTime() } });
    return botFunctions.editMessageText({ opts, text: 'Your expense have been added' });
  }
}
