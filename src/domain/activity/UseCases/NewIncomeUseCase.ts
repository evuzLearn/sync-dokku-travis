import { IUseCase } from 'ts-domain';

import { INewIncomeUseCase } from './types';
import { Activity } from '../Entities/Activity';
import { NewExpenseService } from '../Services/NewExpenseService';

export class NewIncomeUseCase implements IUseCase {
  private service: NewExpenseService;

  constructor({ service }: INewIncomeUseCase) {
    this.service = service;
  }

  execute({ activity }: { activity: Activity }) {
    return this.service.execute({ activity });
  }
}
