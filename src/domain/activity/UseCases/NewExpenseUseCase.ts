import { IService, IUseCase } from 'ts-domain';

import { INewExpenseUseCase } from './types';
import { Activity } from '../Entities/Activity';

export class NewExpenseUseCase implements IUseCase {
  private service: IService;

  constructor({ service }: INewExpenseUseCase) {
    this.service = service;
  }

  execute({ activity }: { activity: Partial<Activity> }) {
    return this.service.execute({ activity });
  }
}
