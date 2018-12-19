import * as TelegramBot from 'node-telegram-bot-api';

import { IBot, IAddTextListener, IBotTextFunctions, IOnReplyMessage, ISendMessage } from './interfaces'

export class Bot {
  private bot: TelegramBot;
  private get textFunctions(): IBotTextFunctions {
    return {
      sendMessage: this.sendMessage,
      onReplyMessage: this.onReplyMessage
    }
  }

  constructor({ token }: IBot) {
    this.bot = new TelegramBot(token, { polling: true });
  }

  public addTextListener = ({ regex, fn }: IAddTextListener) => {
    this.bot.onText(regex, (msg, match) => {
      fn({ msg, match, botFunctions: this.textFunctions });
    });
  }

  public onReplyMessage = ({ chatId, messageId }: IOnReplyMessage): Promise<{ msg: TelegramBot.Message }> => {
    return new Promise(res => {
      this.bot.onReplyToMessage(chatId, messageId, (msg) => {
        res({ msg })
      })
    })
  }

  public sendMessage = ({ chatId, text, opts }: ISendMessage): Promise<TelegramBot.Message> => {
    return this.bot.sendMessage(chatId, text, opts);
  }
}
