import { NewExpenseUseCase } from './NewExpenseUseCase';
import { NewIncomeUseCase } from './NewIncomeUseCase';
import { ActivityServiceFactory } from '../Services/factory';
import { GetActivitiesByUserIdUseCase } from './GetActivitiesByUserIdUseCase';
import { GetActivitiesByMonthUseCase } from './GetActivitiesByMonthUseCase';
import { GetActivitiesByMonthPaginatedUseCase } from './GetActivitiesByMonthPaginatedUseCase';

export class ActivityUseCaseFactory {
  static newExpenseUseCase = () => new NewExpenseUseCase({ service: ActivityServiceFactory.newExpenseService() });
  static newIncomeUseCase = () => new NewIncomeUseCase({ service: ActivityServiceFactory.newIncomeService() });
  static getActivitiesByUserIdUseCase = () =>
    new GetActivitiesByUserIdUseCase({ service: ActivityServiceFactory.getActivitiesByUserIdService() });
  static getActivitiesByMonthUseCase = () =>
    new GetActivitiesByMonthUseCase({ service: ActivityServiceFactory.getActivitiesByMonthService() });
  static getActivitiesByMonthPaginatedUseCase = () =>
    new GetActivitiesByMonthPaginatedUseCase({ service: ActivityServiceFactory.getActivitiesByMonthService() });
}
