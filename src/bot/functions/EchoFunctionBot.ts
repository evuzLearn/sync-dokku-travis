import { FunctionBot } from './models/FunctionBot';
import { ITelegramBotOnText } from '../interfaces';

export class EchoFunctionBot extends FunctionBot {
  public regex = /\/echo (.+)/;

  public execute({ msg, match, botFunctions }: ITelegramBotOnText) {
    const chatId = msg.chat.id;
    botFunctions
      .sendMessage({ chatId, text: match[1], opts: { reply_markup: { force_reply: true } } })
      .then(msgReply => botFunctions.onReplyMessage({ chatId: msgReply.chat.id, messageId: msgReply.message_id }))
      .then(msg => {
        console.log(msg);
      });
  }
}
