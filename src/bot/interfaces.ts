import { Message, SendMessageOptions } from 'node-telegram-bot-api';

export interface ITelegramBotOnText {
  msg: Message;
  botFunctions: IBotTextFunctions;
  match?: RegExpExecArray | null;
}

export interface IBot {
  token: string;
}

export interface IBotTextFunctions {
  sendMessage(args: ISendMessage): Promise<Message>;
  onReplyMessage(args: IOnReplyMessage): Promise<{ msg: Message }>;
}

export interface IAddTextListener {
  regex: RegExp;
  fn: (args: ITelegramBotOnText) => void;
}

export interface IOnReplyMessage {
  chatId: number | string;
  messageId: number | string;
}

export interface ISendMessage {
  chatId: number | string;
  text: string;
  opts?: SendMessageOptions;
}
