import { IService, IUseCase } from 'ts-domain';

import { INewIncomeUseCase } from './interfaces';
import { Activity } from '../Entities/Activity';

export class NewIncomeUseCase implements IUseCase {
  private service: IService;

  constructor({ service }: INewIncomeUseCase) {
    this.service = service;
  }

  execute({ activity }: { activity: Activity }) {
    return this.service.execute({ activity });
  }
}
