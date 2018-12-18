import { IBotSendMessage, ITelegramBotOnText, IAddTextListener } from '../../interfaces';

export abstract class FunctionBot {
  abstract regex: RegExp;
  abstract execute(args: ITelegramBotOnText): Promise<IBotSendMessage>;

  public add(): IAddTextListener {
    return { regex: this.regex, fn: this.execute };
  }
}
