import { IService } from '../../lib/models/Service';
import { INewExpenseUseCase } from './interfaces';
import { IUseCase } from '../../lib/models/UseCase';
import { Activity } from '../Entities/Activity';

export class NewExpenseUseCase implements IUseCase {
  private service: IService;

  constructor({ service }: INewExpenseUseCase) {
    this.service = service;
  }

  execute({ activity }: { activity: Activity }) {
    return this.service.execute({ activity });
  }
}
