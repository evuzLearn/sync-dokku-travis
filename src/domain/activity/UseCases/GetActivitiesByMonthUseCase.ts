import { IUseCase } from 'ts-domain';

import { IGetActivitiesByMonthUseCase } from './types';
import { IGetActivitiesByMonth, IGetActivities } from '../Repositories/ActivityRepository';
import { GetActivitiesByMonthService } from '../Services/GetActivitiesByMonthService';

export class GetActivitiesByMonthUseCase implements IUseCase {
  private service: GetActivitiesByMonthService;

  constructor({ service }: IGetActivitiesByMonthUseCase) {
    this.service = service;
  }

  execute({ userId, date }: IGetActivitiesByMonth) {
    return this.service.execute({ userId, date });
  }
}
