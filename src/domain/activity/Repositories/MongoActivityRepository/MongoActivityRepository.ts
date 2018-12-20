import { getRepository, Repository } from 'typeorm';

import { ActivityRepository } from '../ActivityRepository';
import { Activity } from './Activity.entity';

export class MongoActivityRepository implements ActivityRepository {
  private activityRepository: Repository<Activity>;

  constructor() {
    this.activityRepository = getRepository(Activity);
  }

  newActivity({ activity }) {
    return this.activityRepository.save(activity);
  }
}
