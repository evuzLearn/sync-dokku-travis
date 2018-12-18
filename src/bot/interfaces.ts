import { Message, SendMessageOptions } from 'node-telegram-bot-api';

export interface IBot {
  token: string;
}

export interface IAddTextListener {
  regex: RegExp;
  fn: (args: ITelegramBotOnText) => Promise<IBotSendMessage>;
}

export interface IBotSendMessage {
  text: string;
  opts?: SendMessageOptions;
}

export interface ITelegramBotOnText {
  msg: Message;
  match: RegExpExecArray | null;
}
