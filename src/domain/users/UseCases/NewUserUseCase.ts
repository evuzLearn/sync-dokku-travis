import { IService } from '../../lib/models/Service';
import { INewUserUseCase } from './interfaces';
import { IUseCase } from '../../lib/models/UseCase';
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
