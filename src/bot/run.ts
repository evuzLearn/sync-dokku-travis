import { Bot } from './Bot';
import { CalendarKeyboardBot } from './functions/CalendarKeyboardBot';
import { FunctionBot } from './functions/models/FunctionBot';
import { EchoFunctionBot } from './functions/EchoFunctionBot';
import { StartFunctionBot } from './functions/StartFunctionBot';
import { ExpenseFunctionBot, IncomeFunctionBot } from './functions/ActivityFunctionBot';
import { GetActivitiesFunctionBot } from './functions/GetActivitiesFunctionBot';
import { GetActivitiesGroupedFunctionBot } from './functions/GetActivitiesFunctionBot/GetActivitiesGroupedFunctionBot';

export function run({ token }: { token: string }) {
  const calendarKeyboardBot = new CalendarKeyboardBot({ regex: /\/date/ });

  const textListeners: FunctionBot[] = [
    new EchoFunctionBot(),
    new StartFunctionBot(),
    new ExpenseFunctionBot({ calendarKeyboardBot }),
    new IncomeFunctionBot({ calendarKeyboardBot }),
    new GetActivitiesFunctionBot(),
    new GetActivitiesGroupedFunctionBot(),
    calendarKeyboardBot,
  ];
  new Bot({ token, textListeners });
}
