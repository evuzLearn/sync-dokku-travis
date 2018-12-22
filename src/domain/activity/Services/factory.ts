import { NewExpenseService } from './NewExpenseService';
import { ActivityRepositoryFactory } from '../Repositories/factory';
import { GetActivitiesByUserIdService } from './GetActivitiesByUserIdService';

export class ActivityServiceFactory {
  static newExpenseService = () =>
    new NewExpenseService({ repository: ActivityRepositoryFactory.mongoActivityRepository() });
  static getActivitiesByUserIdService = () =>
    new GetActivitiesByUserIdService({ repository: ActivityRepositoryFactory.mongoActivityRepository() });
}
