import { Bot } from '../Bot';
import { EchoFunctionBot } from './EchoFunctionBot';
import { StartFunctionBot } from './StartFunctionBot';
import { ExpenseFunctionBot, IncomeFunctionBot } from './ActivityFunctionBot';
import { FunctionBot } from './models/FunctionBot';
import { GetActivitiesFunctionBot } from './GetActivitiesFunctionBot';
import { CalendarBot } from './CalendarBot';

export function addListeners({ bot }: { bot: Bot }) {
  const botFunctions: FunctionBot[] = [
    new EchoFunctionBot(),
    new StartFunctionBot(),
    new ExpenseFunctionBot(),
    new IncomeFunctionBot(),
    new GetActivitiesFunctionBot(),
    new CalendarBot(),
  ];

  botFunctions.forEach(botFunction => {
    bot.addTextListener(botFunction.add());
    bot.addCallbackQuery(botFunction.callbackQuery());
  });
}
