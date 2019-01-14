import { IUseCase, IService } from 'ts-domain';

import { IGetAllUsersUseCase } from './types';

export class GetAllUsersUseCase implements IUseCase {
  private service: IService;

  constructor({ service }: IGetAllUsersUseCase) {
    this.service = service;
  }

  execute() {
    return this.service.execute();
  }
}
