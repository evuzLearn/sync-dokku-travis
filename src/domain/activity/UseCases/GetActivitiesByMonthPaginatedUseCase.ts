import { IService, IUseCase } from 'ts-domain';

import { IGetActivitiesByMonthUseCase } from './types';
import { IGetActivitiesByMonth, IGetActivities } from '../Repositories/ActivityRepository';

export class GetActivitiesByMonthPaginatedUseCase implements IUseCase {
  private service: IService;

  constructor({ service }: IGetActivitiesByMonthUseCase) {
    this.service = service;
  }

  execute({ userId, date, take, page }: Required<IGetActivitiesByMonth>): Promise<IGetActivities> {
    return this.service.execute({ userId, date, take, page });
  }
}
