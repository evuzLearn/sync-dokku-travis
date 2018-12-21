import { Bot } from '../Bot';
import { EchoFunctionBot } from './EchoFunctionBot';
import { StartFunctionBot } from './StartFunctionBot';
import { ExpenseFunctionBot } from './ExpenseFunctionBot';
import { FunctionBot } from './models/FunctionBot';

export function addListeners({ bot }: { bot: Bot }) {
  const botFunctions: FunctionBot[] = [new EchoFunctionBot(), new StartFunctionBot(), new ExpenseFunctionBot()];

  botFunctions.forEach(botFunction => {
    bot.addTextListener(botFunction.add());
    bot.addCallbackQuery(botFunction.callbackQuery());
  });
}
