import { SendMessageOptions, EditMessageTextOptions } from 'node-telegram-bot-api';
import { startOfDay, format } from 'date-fns';

import { ITelegramBotOnText, IAddCallbackQuery, ICallbackQueryFunction } from '../../types';
import { ActivityFunctionBot } from './ActivityFunctionBot';
import { getDomain } from '../../../domain';
import { CallbackQuery, CallbackQueryAddActivity } from './types';

export class IncomeFunctionBot extends ActivityFunctionBot {
  public regex = /\/income/;

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
          reply_markup: this.calendarKeyboarBot.keyboard({ date: Date.now(), key: CallbackQuery.DateIncome }),
        };
        expense.concept = concept;
        botFunctions.sendMessage({
          chatId,
          opts,
          text: `Select the day you received the money`,
        });
      });
  };

  public callbackQuery = (): IAddCallbackQuery[] => {
    return [
      {
        key: CallbackQuery.AddIncome,
        callbackQueryFunction: this.acceptIncome,
      },
      {
        key: CallbackQuery.DateIncome,
        callbackQueryFunction: this.dateIncome,
      },
    ];
  };

  private dateIncome = ({ msg, data, botFunctions }: ICallbackQueryFunction) => {
    const expense = this.getActivity({ userId: msg.from.id });
    const { amount, concept } = expense;
    const date = +data[0];
    const opts: EditMessageTextOptions = {
      message_id: msg.message_id,
      chat_id: msg.chat.id,
      reply_markup: this.confirmKeyboard(CallbackQuery.AddIncome),
    };
    expense.date = date;
    return botFunctions.editMessageText({
      opts,
      text: `Income. \nAmount: ${amount}€. \nConcept: ${concept}. \nDate: ${format(date, 'DD MMM YYYY')}\nIs correct?`,
    });
  };

  private acceptIncome = ({ msg, data, botFunctions }: ICallbackQueryFunction) => {
    const userId = msg.from.id;
    const opts: EditMessageTextOptions = {
      message_id: msg.message_id,
      chat_id: msg.chat.id,
    };

    if (data[0] === CallbackQueryAddActivity.N) {
      return botFunctions.editMessageText({ opts, text: 'You can introduce a new /income' });
    }
    const domain = getDomain();
    const { amount, concept } = this.getActivity({ userId });
    domain
      .get({ useCase: 'new_income' })
      .execute({ activity: { amount, concept, userId, date: startOfDay(Date.now()).getTime() } });
    return botFunctions.editMessageText({ opts, text: 'Your income have been added' });
  };
}
