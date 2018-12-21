import { Message, SendMessageOptions, EditMessageTextOptions } from 'node-telegram-bot-api';

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

export interface IBotCallbackQueryFunctions {
  sendMessage(args: ISendMessage): Promise<Message>;
  editMessageText(args: IEditMessage): Promise<Message | boolean>;
}

export interface IAddTextListener {
  regex: RegExp;
  fn: (args: ITelegramBotOnText) => void;
}

export interface IOnReplyMessage {
  chatId: number | string;
  messageId: number | string;
}

export interface IAddCallbackQuery {
  key: string;
  callbackQueryFunction: (args: ICallbackQueryFunction) => Promise<any>;
}

export interface ICallbackQueryFunction {
  msg: Message;
  data: string[];
  botFunctions: IBotCallbackQueryFunctions;
}

export interface ISendMessage {
  chatId: number | string;
  text: string;
  opts?: SendMessageOptions;
}

export interface IEditMessage {
  text: string;
  opts: EditMessageTextOptions;
}
