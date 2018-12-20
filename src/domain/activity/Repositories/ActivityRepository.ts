import { Activity } from '../Entities/Activity';

export interface ActivityRepository {
  newActivity: (args: { activity: Activity }) => Promise<Activity>;
}
