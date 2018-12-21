import { ITelegramBotOnText, IAddTextListener, IAddCallbackQuery } from '../../interfaces';

export abstract class FunctionBot {
  abstract regex: RegExp;
  abstract execute(args: ITelegramBotOnText);

  public add(): IAddTextListener {
    return { regex: this.regex, fn: this.execute };
  }

  public callbackQuery(): IAddCallbackQuery[] {
    return [];
  }
}
