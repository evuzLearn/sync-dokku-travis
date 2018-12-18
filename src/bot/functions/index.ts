import { Bot } from '../Bot';
import { EchoFunctionBot } from './EchoFunctionBot';

export function addListeners({ bot }: { bot: Bot }) {
  bot.addTextListener(new EchoFunctionBot().add());
}
