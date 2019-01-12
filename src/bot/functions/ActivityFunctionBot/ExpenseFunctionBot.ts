import { SendMessageOptions, EditMessageTextOptions } from 'node-telegram-bot-api';
import { startOfDay, format } from 'date-fns';

import { FunctionBot } from '../models/FunctionBot';
import { ITelegramBotOnText, IAddCallbackQuery, ICallbackQueryFunction } from '../../interfaces';
import { expenseFunctionBotMethods } from './methods';
import { getDomain } from '../../../domain';
import { CallbackQuery, CallbackQueryAddActivity, IExpenseFunctionBot } from './types';
import { CalendarKeyboardBot } from '../CalendarKeyboardBot';

export class ExpenseFunctionBot extends FunctionBot {
  public regex = /\/expense/;
  public calendarKeyboarBot: CalendarKeyboardBot;

  constructor({ calendarKeyboardBot }: IExpenseFunctionBot) {
    super();
    this.calendarKeyboarBot = calendarKeyboardBot;
  }

  public execute = ({ msg, botFunctions }: ITelegramBotOnText) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const expense = expenseFunctionBotMethods.getActivity({ userId, clean: true });

    expenseFunctionBotMethods
      .askAmount({ msg, botFunctions })
      .then(({ amount }) => {
        expense.amount = amount;
        return expenseFunctionBotMethods.askConcept({ msg, botFunctions });
      })
      .then(({ concept }) => {
        const opts: SendMessageOptions = {
          reply_markup: this.calendarKeyboarBot.keyboard({ date: Date.now(), key: CallbackQuery.DateExpense }),
        };
        expense.concept = concept;
        botFunctions.sendMessage({
          chatId,
          opts,
          text: `Select the date on which you spent the money`,
        });
      });
  };

  public callbackQuery = (): IAddCallbackQuery[] => {
    return [
      {
        key: CallbackQuery.AddExpense,
        callbackQueryFunction: this.acceptExpense,
      },
      {
        key: CallbackQuery.DateExpense,
        callbackQueryFunction: this.dateExpense,
      },
    ];
  };

  private dateExpense = ({ msg, data, botFunctions }: ICallbackQueryFunction) => {
    const expense = expenseFunctionBotMethods.getActivity({ userId: msg.from.id });
    const { amount, concept } = expense;
    const date = +data[0];
    const opts: EditMessageTextOptions = {
      message_id: msg.message_id,
      chat_id: msg.chat.id,
      reply_markup: expenseFunctionBotMethods.confirmKeyboard(CallbackQuery.AddExpense),
    };
    expense.date = date;
    return botFunctions.editMessageText({
      opts,
      text: `Expense. \nAmount: ${amount}€. \nConcept: ${concept}. \nDate: ${format(date, 'DD/MMM/YYYY')}\nIs correct?`,
    });
  };

  private acceptExpense = ({ msg, data, botFunctions }: ICallbackQueryFunction) => {
    const userId = msg.from.id;
    const opts: EditMessageTextOptions = {
      message_id: msg.message_id,
      chat_id: msg.chat.id,
    };

    if (data[0] === CallbackQueryAddActivity.N) {
      return botFunctions.editMessageText({ opts, text: 'You can introduce a new /expense' });
    }
    const domain = getDomain();
    const { amount, concept, date } = expenseFunctionBotMethods.getActivity({ userId });
    domain.get({ useCase: 'new_expense' }).execute({ activity: { amount, concept, userId, date } });
    return botFunctions.editMessageText({ opts, text: 'Your expense have been added' });
  };
}
