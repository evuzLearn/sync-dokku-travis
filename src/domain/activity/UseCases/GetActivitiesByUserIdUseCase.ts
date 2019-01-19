import { IService, IUseCase } from 'ts-domain';

import { IGetActivitiesByUserIdUseCase } from './types';
import { Activity } from '../Entities/Activity';
import { GetActivitiesByUserIdService } from '../Services/GetActivitiesByUserIdService';

export class GetActivitiesByUserIdUseCase implements IUseCase {
  private service: GetActivitiesByUserIdService;

  constructor({ service }: IGetActivitiesByUserIdUseCase) {
    this.service = service;
  }

  execute({ userId }: { userId: Activity['userId'] }) {
    return this.service.execute({ userId });
  }
}
