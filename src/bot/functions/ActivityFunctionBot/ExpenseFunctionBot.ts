import { SendMessageOptions, EditMessageTextOptions } from 'node-telegram-bot-api';
import { format } from 'date-fns';

import { ITelegramBotOnText, IAddCallbackQuery, ICallbackQueryFunction } from '../../types';
import { ActivityFunctionBot } from './ActivityFunctionBot';
import { getDomain } from '../../../domain';
import { CallbackQuery, CallbackQueryAddActivity } from './types';
import { CalendarKeyboardBot } from '../CalendarKeyboardBot';

export class ExpenseFunctionBot extends ActivityFunctionBot {
  public regex = /\/expense/;
  public calendarKeyboarBot: CalendarKeyboardBot;

  public execute = ({ msg, botFunctions }: ITelegramBotOnText) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const expense = this.getActivity({ userId, clean: true });

    this.askAmount({ msg, botFunctions })
      .then(({ amount }) => {
        expense.amount = amount;
        return this.askConcept({ msg, botFunctions });
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
    const expense = this.getActivity({ userId: msg.from.id });
    const { amount, concept } = expense;
    const date = +data[0];
    const opts: EditMessageTextOptions = {
      message_id: msg.message_id,
      chat_id: msg.chat.id,
      reply_markup: this.confirmKeyboard(CallbackQuery.AddExpense),
    };
    expense.date = date;
    return botFunctions.editMessageText({
      opts,
      text: `Expense. \nAmount: ${amount}€. \nConcept: ${concept}. \nDate: ${format(date, 'DD MMM YYYY')}\nIs correct?`,
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
    const { amount, concept, date } = this.getActivity({ userId });
    domain.get({ useCase: 'new_expense' }).execute({ activity: { amount, concept, userId, date } });
    return botFunctions.editMessageText({ opts, text: 'Your expense have been added' });
  };
}
