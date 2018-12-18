import * as TelegramBot from 'node-telegram-bot-api';

import { IBot, IAddTextListener } from './interfaces'

export class Bot {
  private bot: TelegramBot;

  constructor({ token }: IBot) {
    this.bot = new TelegramBot(token, { polling: true });
  }

  public addTextListener({ regex, fn }: IAddTextListener) {
    this.bot.onText(regex, (msg, match) => {
      const chatId = msg.chat.id;
      fn({ msg, match }).then(({ text, opts }) => {
        this.bot.sendMessage(chatId, text, opts);
      });
    });
  }
}
