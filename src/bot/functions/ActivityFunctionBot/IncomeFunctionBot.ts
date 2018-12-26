import { SendMessageOptions, EditMessageTextOptions } from 'node-telegram-bot-api';
import { startOfDay } from 'date-fns';

import { FunctionBot } from '../models/FunctionBot';
import { ITelegramBotOnText, IAddCallbackQuery, ICallbackQueryFunction } from '../../interfaces';
import { expenseFunctionBotMethods } from './methods';
import { getDomain } from '../../../domain';
import { CallbackQuery, CallbackQueryAddActivity } from './interfaces';
import { Activity } from '../../../domain/activity/Entities/Activity';

export class IncomeFunctionBot extends FunctionBot {
  public regex = /\/income/;

  public execute({ msg, botFunctions }: ITelegramBotOnText) {
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
        expense.concept = concept;
        return { expense };
      })
      .then(({ expense: { amount, concept } }: { expense: Activity }) => {
        const opts: SendMessageOptions = {
          reply_markup: expenseFunctionBotMethods.confirmKeyboard(CallbackQuery.AddIncome),
        };
        botFunctions.sendMessage({
          chatId,
          opts,
          text: `Income. \nAmount: ${amount}€. \nConcept: ${concept}.\nIs correct?`,
        });
      });
  }

  public callbackQuery(): IAddCallbackQuery[] {
    return [
      {
        key: CallbackQuery.AddIncome,
        callbackQueryFunction: this.acceptIncome,
      },
    ];
  }

  private acceptIncome({ msg, data, botFunctions }: ICallbackQueryFunction) {
    const userId = msg.from.id;
    const opts: EditMessageTextOptions = {
      message_id: msg.message_id,
      chat_id: msg.chat.id,
    };

    if (data[0] === CallbackQueryAddActivity.N) {
      return botFunctions.editMessageText({ opts, text: 'You can introduce a new /income' });
    }
    const domain = getDomain();
    const { amount, concept } = expenseFunctionBotMethods.getActivity({ userId });
    domain
      .get({ useCase: 'new_income' })
      .execute({ activity: { amount, concept, userId, date: startOfDay(Date.now()).getTime() } });
    return botFunctions.editMessageText({ opts, text: 'Your expense have been added' });
  }
}
