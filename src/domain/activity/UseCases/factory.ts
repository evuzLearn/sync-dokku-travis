import { NewExpenseUseCase } from './NewExpenseUseCase';
import { ActivityServiceFactory } from '../Services/factory';
import { GetActivitiesByUserIdUseCase } from './GetActivitiesByUserIdUseCase';

export class ActivityUseCaseFactory {
  static newExpenseUseCase = () => new NewExpenseUseCase({ service: ActivityServiceFactory.newExpenseService() });
  static getActivitiesByUserIdUseCase = () =>
    new GetActivitiesByUserIdUseCase({ service: ActivityServiceFactory.getActivitiesByUserIdService() });
}
