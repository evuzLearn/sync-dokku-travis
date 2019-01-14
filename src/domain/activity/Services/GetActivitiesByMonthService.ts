import { IService } from 'ts-domain';

import { ActivityRepository } from '../Repositories/ActivityRepository';
import { Activity } from '../Entities/Activity';
import { IGetActivitiesByMonth } from './types';

export class GetActivitiesByMonthService implements IService {
  private repository: ActivityRepository;

  constructor({ repository }: IGetActivitiesByMonth) {
    this.repository = repository;
  }

  execute({ userId, date }: { userId: Activity['userId']; date: number }) {
    return this.repository.getActivitiesByMonth({ userId, date });
  }
}
