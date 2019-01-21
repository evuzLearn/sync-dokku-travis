import { IUseCase } from 'ts-domain';

import { INewIncomeUseCase } from './types';
import { Activity } from '../Entities/Activity';
import { NewIncomeService } from '../Services/NewIncomeService';

export class NewIncomeUseCase implements IUseCase {
  private service: NewIncomeService;

  constructor({ service }: INewIncomeUseCase) {
    this.service = service;
  }

  execute({ activity }: { activity: Activity }) {
    return this.service.execute({ activity });
  }
}
