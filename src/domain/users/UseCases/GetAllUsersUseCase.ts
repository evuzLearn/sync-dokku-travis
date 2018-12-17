import { IGetAllUsersUseCase } from './interfaces';
import { IUseCase } from '../../lib/models/UseCase';
import { IService } from '../../lib/models/Service';

export class GetAllUsersUseCase implements IUseCase {
  private service: IService;

  constructor({ service }: IGetAllUsersUseCase) {
    this.service = service;
  }

  execute() {
    return this.service.execute();
  }
}
