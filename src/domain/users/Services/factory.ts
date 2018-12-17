import { GetAllUsersService } from './GetAllUsersService';
import { SaveUsersService } from './SaveUserService';
import { UsersRepositoryFactory } from '../Repositories/factory';

export class UsersServiceFactory {
  static getAllUsersService = () =>
    new GetAllUsersService({ repository: UsersRepositoryFactory.mongoUsersRepository() });

  static saveUsersService = () => new SaveUsersService({ repository: UsersRepositoryFactory.mongoUsersRepository() });
}
