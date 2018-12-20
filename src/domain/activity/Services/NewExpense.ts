import { IService } from '../../lib/models/Service';
import { ActivityRepository } from '../Repositories/ActivityRepository';
import { Activity } from '../Entities/Activity';
import { INewExpense, IExecuteNewExpense } from './interfaces';

export class NewExpenseService implements IService {
  private repository: ActivityRepository;

  constructor({ repository }: INewExpense) {
    this.repository = repository;
  }

  execute({ activity: { amount, ...rest } }: IExecuteNewExpense) {
    const activity = {
      ...rest,
      amount: -amount,
    };
    return this.repository.newActivity({ activity: new Activity(activity) });
  }
}
