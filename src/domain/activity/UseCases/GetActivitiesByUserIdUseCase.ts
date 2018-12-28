import { IService, IUseCase } from 'ts-domain';

import { IGetActivitiesUseCase } from './interfaces';
import { Activity } from '../Entities/Activity';

export class GetActivitiesByUserIdUseCase implements IUseCase {
  private service: IService;

  constructor({ service }: IGetActivitiesUseCase) {
    this.service = service;
  }

  execute({ userId }: { userId: Activity['userId'] }): Promise<Activity[]> {
    return this.service.execute({ userId });
  }
}
