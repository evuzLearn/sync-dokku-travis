import { Bot } from '../Bot';
import { EchoFunctionBot } from './EchoFunctionBot';
import { StartFunctionBot } from './StartFunctionBot';
import { ExpenseFunctionBot } from './ExpenseFunctionBot';

export function addListeners({ bot }: { bot: Bot }) {
  bot.addTextListener(new EchoFunctionBot().add());
  bot.addTextListener(new StartFunctionBot().add());
  bot.addTextListener(new ExpenseFunctionBot().add());
}
