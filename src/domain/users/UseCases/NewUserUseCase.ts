import { IService, IUseCase } from 'ts-domain';

import { INewUserUseCase } from './types';
import { User } from '../Entities/User';

export class NewUserUseCase implements IUseCase {
  private service: IService;

  constructor({ service }: INewUserUseCase) {
    this.service = service;
  }

  execute({ user }: { user: User }) {
    return this.service.execute({ user });
  }
}
