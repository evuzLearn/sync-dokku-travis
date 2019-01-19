import { Activity } from '../Entities/Activity';

export interface IGetActivitiesByMonth {
  userId: Activity['userId'];
  date: number;
  take?: number;
  page?: number;
}

export interface IGetActivities {
  results: Activity[];
  total: number;
}

export interface ActivityRepository {
  newActivity: (args: { activity: Activity }) => Promise<Activity>;
  getActivitiesByUserId: ({ userId }: { userId: Activity['userId'] }) => Promise<IGetActivities>;
  getActivitiesByMonth: ({ userId, date }: IGetActivitiesByMonth) => Promise<IGetActivities>;
}
