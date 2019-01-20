import { GetActivitiesFunctionBot } from './GetActivitiesFunctionBot';
import { Activity } from '../../../domain/activity/Repositories/MongoActivityRepository/Activity.entity';
import { CallbackQuery } from './types';

export class GetActivitiesGroupedFunctionBot extends GetActivitiesFunctionBot {
  public regex = /\/get_activities_grouped/;
  protected callbackQueryKey: CallbackQuery = CallbackQuery.GroupedKey;

  protected activitiesToSummary = ({ activities }: { activities: Activity[] }): string => {
    const conceptsGrouped = activities.reduce((acc, { amount, concept }) => {
      const key = concept.toLowerCase().replace(' ', '_');
      const el = acc[key];
      if (!el) {
        acc[key] = { concept, amount: 0 };
      }
      acc[key].amount = acc[key].amount + amount;
      return acc;
    }, {});
    const summary = Object.keys(conceptsGrouped).map(key => {
      const { amount, concept } = conceptsGrouped[key];
      return `${concept} => ${amount}€`;
    });
    const total = activities.reduce((acc, { amount }) => acc + amount, 0);
    const lines = [...summary, `Total: ${total}€`];
    return lines.join('\n');
  };
}
