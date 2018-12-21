import { IService } from '../../lib/models/Service';
import { INewActivityUseCase } from './interfaces';
import { IUseCase } from '../../lib/models/UseCase';
import { Activity } from '../Entities/Activity';

export class NewExpenseUseCase implements IUseCase {
  private service: IService;

  constructor({ service }: INewActivityUseCase) {
    this.service = service;
  }

  execute({ activity }: { activity: Activity }) {
    return this.service.execute({ activity });
  }
}
