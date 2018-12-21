import { IService } from '../../lib/models/Service';
import { ISaveUserUseCase } from './interfaces';
import { IUseCase } from '../../lib/models/UseCase';
import { User } from '../Entities/User';

export class SaveUserUseCase implements IUseCase {
  private service: IService;

  constructor({ service }: ISaveUserUseCase) {
    this.service = service;
  }

  execute({ user }: { user: User }) {
    return this.service.execute({ user });
  }
}
