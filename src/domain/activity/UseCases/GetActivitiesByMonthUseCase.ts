import { IService, IUseCase } from 'ts-domain';

import { IGetActivitiesByMonthUseCase } from './interfaces';
import { Activity } from '../Entities/Activity';

export class GetActivitiesByMonthUseCase implements IUseCase {
  private service: IService;

  constructor({ service }: IGetActivitiesByMonthUseCase) {
    this.service = service;
  }

  execute({ userId, date }: { userId: Activity['userId']; date: number }): Promise<Activity[]> {
    return this.service.execute({ userId, date });
  }
}
