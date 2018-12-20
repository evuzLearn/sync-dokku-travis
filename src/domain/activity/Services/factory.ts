import { NewExpenseService } from './NewExpense';
import { ActivityRepositoryFactory } from '../Repositories/factory';

export class ActivityServiceFactory {
  static newExpenseService = () =>
    new NewExpenseService({ repository: ActivityRepositoryFactory.mongoActivityRepository() });
}
