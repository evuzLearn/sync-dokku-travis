import { Activity } from '../Entities/Activity';

export interface ActivityRepository {
  newActivity: (args: { activity: Activity }) => Promise<Activity>;
  getActivitiesByUserId: ({ userId }: { userId: Activity['userId'] }) => Promise<Activity[]>;
  getActivitiesByMonth: ({ userId, date }: { userId: Activity['userId']; date: number }) => Promise<Activity[]>;
}
