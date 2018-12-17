import { IService } from '../../lib/models/Service';
import { UsersRepository } from '../Repositories/UsersRepository';
import { ISaveUserService, IExecuteSaveUserService } from './interfaces';
import { User } from '../Entities/User';

export class SaveUsersService implements IService {
  private repository: UsersRepository;

  constructor({ repository }: ISaveUserService) {
    this.repository = repository;
  }

  execute({ user }: IExecuteSaveUserService) {
    return this.repository.saveUser({ user: new User(user) });
  }
}
