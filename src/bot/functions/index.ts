import { Bot } from '../Bot';
import { EchoFunctionBot } from './EchoFunctionBot';
import { StartFunctionBot } from './StartFunctionBot';

export function addListeners({ bot }: { bot: Bot }) {
  bot.addTextListener(new EchoFunctionBot().add());
  bot.addTextListener(new StartFunctionBot().add());
}
