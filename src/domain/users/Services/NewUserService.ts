import { IService } from '../../lib/models/Service';
import { UsersRepository } from '../Repositories/UsersRepository';
import { INewUserService, IExecuteNewUserService } from './interfaces';
import { User } from '../Entities/User';

export class NewUsersService implements IService {
  private repository: UsersRepository;

  constructor({ repository }: INewUserService) {
    this.repository = repository;
  }

  execute({ user }: IExecuteNewUserService) {
    return this.repository.newUser({ user: new User(user) });
  }
}
