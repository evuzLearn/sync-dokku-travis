import { IService } from '../../lib/models/Service';
import { IGetActivitiesUseCase } from './interfaces';
import { IUseCase } from '../../lib/models/UseCase';
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
