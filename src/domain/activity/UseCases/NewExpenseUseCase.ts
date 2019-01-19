import { IService, IUseCase } from 'ts-domain';

import { INewExpenseUseCase } from './types';
import { Activity } from '../Entities/Activity';
import { NewExpenseService } from '../Services/NewExpenseService';

export class NewExpenseUseCase implements IUseCase {
  private service: NewExpenseService;

  constructor({ service }: INewExpenseUseCase) {
    this.service = service;
  }

  execute({ activity }: { activity: Activity }) {
    return this.service.execute({ activity });
  }
}
