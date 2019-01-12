import { format } from 'date-fns';

import { FunctionBot } from './models/FunctionBot';
import { ITelegramBotOnText } from '../types';
import { getDomain } from '../../domain';

export class GetActivitiesFunctionBot extends FunctionBot {
  public regex = /\/get_activities/;

  public execute({ msg, botFunctions }: ITelegramBotOnText) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const domain = getDomain();
    domain
      .get({ useCase: 'get_activities_by_user_id' })
      .execute({ userId })
      .then(activities => {
        const summary = activities.map(
          ({ amount, concept, date }) => `${format(date, 'DD/MM/YYYY')} ${concept} => ${amount}€`,
        );
        const total = activities.reduce((acc, { amount }) => acc + amount, 0);
        const lines = [...summary, `Total: ${total}€`];
        botFunctions.sendMessage({ chatId, text: lines.join('\n') });
      });
  }
}
