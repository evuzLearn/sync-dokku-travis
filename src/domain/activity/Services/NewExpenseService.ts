import { IService } from 'ts-domain';

import { ActivityRepository } from '../Repositories/ActivityRepository';
import { Activity } from '../Entities/Activity';
import { INewExpenseService } from './types';

export class NewExpenseService implements IService {
  private repository: ActivityRepository;

  constructor({ repository }: INewExpenseService) {
    this.repository = repository;
  }

  execute({ activity: { amount, ...rest } }: { activity: Activity }) {
    const activity = {
      ...rest,
      amount: amount > 0 ? -amount : amount,
    };
    return this.repository.newActivity({ activity });
  }
}
