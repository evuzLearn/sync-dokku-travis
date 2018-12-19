import { FunctionBot } from './models/FunctionBot';
import { ITelegramBotOnText } from '../interfaces';
import { getDomain } from '../../domain';
import { User } from '../../domain/users/Entities/User';
import { User as TelegramUser } from 'node-telegram-bot-api';

export class StartFunctionBot extends FunctionBot {
  public regex = /\/start/;

  // If it is a function class, throw error_polling
  static saveUser({ user }: { user: TelegramUser }): Promise<User> {
    const domain = getDomain();
    const newUser: User = {
      userId: user.id,
      username: user.username,
      firstName: user.first_name,
    };
    return domain.get({ useCase: 'save_user' }).execute({ user: newUser });
  }

  public execute({ msg: { from, chat }, botFunctions }: ITelegramBotOnText) {
    const chatId = chat.id;
    const name = from.first_name || from.username;
    StartFunctionBot.saveUser({ user: from }).then(() => {
      const text = `Hi ${name}`;
      botFunctions.sendMessage({chatId, text});
    })
  }
}
