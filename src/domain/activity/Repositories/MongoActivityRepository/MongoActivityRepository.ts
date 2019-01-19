import { getRepository, Repository, Between, MoreThan } from 'typeorm';

import { ActivityRepository, IGetActivitiesByMonth } from '../ActivityRepository';
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

  async getActivitiesByUserId({ userId }: { userId: Activity['userId'] }) {
    const [results, total] = await this.activityRepository.findAndCount({ where: { userId } });
    return { results, total };
  }

  async getActivitiesByMonth({ userId, date, take, page }: IGetActivitiesByMonth) {
    const firsDayOfMonth = startOfMonth(date).getTime();
    const lastDayOfMonth = endOfMonth(date).getTime();
    const skip = take * page;
    const [results, total] = await this.activityRepository.findAndCount({
      take,
      skip,
      where: { userId, date: { $gt: firsDayOfMonth, $lt: lastDayOfMonth } },
      order: {
        date: 'ASC',
      },
    });
    return { results, total };
  }
}
