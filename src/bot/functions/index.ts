import { Bot } from '../Bot';
import { EchoFunctionBot } from './EchoFunctionBot';
import { StartFunctionBot } from './StartFunctionBot';
import { ExpenseFunctionBot, IncomeFunctionBot } from './ActivityFunctionBot';
import { FunctionBot } from './models/FunctionBot';
import { GetActivitiesFunctionBot } from './GetActivitiesFunctionBot';
import { CalendarKeyboardBot } from './CalendarKeyboardBot';

export function addListeners({ bot }: { bot: Bot }) {
  const calendarKeyboardBot = new CalendarKeyboardBot();

  const botFunctions: FunctionBot[] = [
    new EchoFunctionBot(),
    new StartFunctionBot(),
    new ExpenseFunctionBot({ calendarKeyboardBot }),
    new IncomeFunctionBot({ calendarKeyboardBot }),
    new GetActivitiesFunctionBot(),
    calendarKeyboardBot,
  ];

  botFunctions.forEach(botFunction => {
    bot.addTextListener(botFunction.add());
    bot.addCallbackQuery(botFunction.callbackQuery());
  });
}
