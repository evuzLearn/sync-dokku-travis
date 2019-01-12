import * as TelegramBot from 'node-telegram-bot-api';

import {
  IBot,
  IAddTextListener,
  IBotTextFunctions,
  IOnReplyMessage,
  ISendMessage,
  IAddCallbackQuery,
  ICallbackQueryFunction,
  IBotCallbackQueryFunctions,
  IEditMessage,
} from './types';

export class Bot {
  private bot: TelegramBot;
  private callbackQuery: { [e: string]: (args: ICallbackQueryFunction) => Promise<any> } = {};
  private get textFunctions(): IBotTextFunctions {
    return {
      sendMessage: this.sendMessage,
      onReplyMessage: this.onReplyMessage,
    };
  }

  private get callbackQueryFunctions(): IBotCallbackQueryFunctions {
    return {
      sendMessage: this.sendMessage,
      editMessageText: this.editMessage,
    };
  }

  constructor({ token }: IBot) {
    this.bot = new TelegramBot(token, { polling: true });
    this.onCallbackQuery();
  }

  public addCallbackQuery = (callbacks: IAddCallbackQuery[]) => {
    callbacks.forEach(({ key, callbackQueryFunction }) => {
      if (this.callbackQuery[key]) {
        throw new Error(`Bot#addCallbackQuery: the key ${key} has already been added.`);
      }
      this.callbackQuery[key] = callbackQueryFunction;
    });
  };

  public addTextListener = ({ regex, fn }: IAddTextListener) => {
    if (regex) {
      this.bot.onText(regex, (msg, match) => {
        fn({ msg, match, botFunctions: this.textFunctions });
      });
    }
  };

  private sendMessage = ({ chatId, text, opts }: ISendMessage): Promise<TelegramBot.Message> => {
    return this.bot.sendMessage(chatId, text, opts);
  };

  private onCallbackQuery = () => {
    this.bot.on('callback_query', callbackQuery => {
      const key = callbackQuery.data.split('.')[0];
      const callbackQueryFunction = this.callbackQuery[key];
      if (!callbackQueryFunction) {
        throw new Error(`Bot#onCallbackQuery: the key ${key} hasn't been added`);
      }
      const data = callbackQuery.data.split('.').slice(1);
      callbackQueryFunction({
        data,
        msg: { ...callbackQuery.message, from: callbackQuery.from },
        botFunctions: this.callbackQueryFunctions,
      }).then(() => {
        this.bot.answerCallbackQuery(callbackQuery.id);
      });
    });
  };

  private onReplyMessage = ({ chatId, messageId }: IOnReplyMessage): Promise<{ msg: TelegramBot.Message }> => {
    return new Promise(res => {
      this.bot.onReplyToMessage(chatId, messageId, msg => {
        res({ msg });
      });
    });
  };

  private editMessage = ({ text, opts }: IEditMessage) => {
    return this.bot.editMessageText(text, opts);
  };
}
