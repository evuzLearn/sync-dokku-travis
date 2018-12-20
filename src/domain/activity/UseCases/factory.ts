import { NewExpenseUseCase } from './NewExpenseUseCase';
import { ActivityServiceFactory } from '../Services/factory';

export class ActivityUseCaseFactory {
  static newExpenseUseCase = () => new NewExpenseUseCase({ service: ActivityServiceFactory.newExpenseService() });
}
