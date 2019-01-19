import { IUseCase } from 'ts-domain';

import { IGetActivitiesByMonthUseCase } from './types';
import { IGetActivitiesByMonth } from '../Repositories/ActivityRepository';
import { GetActivitiesByMonthService } from '../Services/GetActivitiesByMonthService';

export class GetActivitiesByMonthPaginatedUseCase implements IUseCase {
  private service: GetActivitiesByMonthService;

  constructor({ service }: IGetActivitiesByMonthUseCase) {
    this.service = service;
  }

  execute({ userId, date, take, page }: Required<IGetActivitiesByMonth>) {
    return this.service.execute({ userId, date, take, page });
  }
}
