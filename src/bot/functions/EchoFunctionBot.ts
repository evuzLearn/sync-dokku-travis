import { FunctionBot } from './models/FunctionBot';
import { IBotSendMessage, ITelegramBotOnText } from '../interfaces';

export class EchoFunctionBot extends FunctionBot {
  public regex = /\/echo (.+)/;

  public execute({ match }: ITelegramBotOnText): Promise<IBotSendMessage> {
    return new Promise(resolve => {
      resolve({ text: match[1] });
    });
  }
}
