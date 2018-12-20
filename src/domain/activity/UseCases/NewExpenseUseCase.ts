import { IService } from '../../lib/models/Service';
import { INewActivityUseCase, IExecuteNewActivityUseCase } from './interfaces';
import { IUseCase } from '../../lib/models/UseCase';

export class NewExpenseUseCase implements IUseCase {
  private service: IService;

  constructor({ service }: INewActivityUseCase) {
    this.service = service;
  }

  execute({ activity }: IExecuteNewActivityUseCase) {
    return this.service.execute({ activity });
  }
}
