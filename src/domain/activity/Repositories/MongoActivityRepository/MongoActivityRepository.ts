import { getRepository, Repository, Between, MoreThan } from 'typeorm';

import { ActivityRepository } from '../ActivityRepository';
import { Activity } from './Activity.entity';
import { startOfMonth, endOfMonth } from 'date-fns';

export class MongoActivityRepository implements ActivityRepository {
  private activityRepository: Repository<Activity>;

  constructor() {
    this.activityRepository = getRepository(Activity);
  }

  newActivity({ activity }: { activity: Activity }) {
    return this.activityRepository.save(activity);
  }

  getActivitiesByUserId({ userId }: { userId: Activity['userId'] }): Promise<Activity[]> {
    return this.activityRepository.find({ where: { userId } });
  }

  async getActivitiesByMonth({ userId, date }: { userId: Activity['userId']; date: number }): Promise<Activity[]> {
    const firsDayOfMonth = startOfMonth(date).getTime();
    const lastDayOfMonth = endOfMonth(date).getTime();
    return this.activityRepository.find({ where: { userId, date: { $gt: firsDayOfMonth, $lt: lastDayOfMonth } } });
  }
}
