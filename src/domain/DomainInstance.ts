import { Domain } from 'ts-domain';

import { UsersUseCaseFactory } from './users/UseCases/factory';
import { ActivityUseCaseFactory } from './activity/UseCases/factory';

export class DomainInstance {
  static useCases() {
    return {
      get_all_users: UsersUseCaseFactory.getAllUsersUseCase(),
      new_user: UsersUseCaseFactory.newUsersUseCase(),
      new_expense: ActivityUseCaseFactory.newExpenseUseCase(),
      new_income: ActivityUseCaseFactory.newIncomeUseCase(),
      get_activities_by_month: ActivityUseCaseFactory.getActivitiesByMonthUseCase(),
    };
  }

  private internalDomain: Domain<ReturnType<typeof DomainInstance.useCases>>;
  public get domain() {
    return this.internalDomain;
  }

  public init() {
    if (this.domain) {
      throw new Error('Domain has already been initiated');
    }
    this.internalDomain = new Domain({ useCases: DomainInstance.useCases() });
    return this.domain;
  }
}
