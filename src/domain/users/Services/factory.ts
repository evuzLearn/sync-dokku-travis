import { GetAllUsersService } from './GetAllUsersService';
import { NewUsersService } from './NewUserService';
import { UsersRepositoryFactory } from '../Repositories/factory';

export class UsersServiceFactory {
  static getAllUsersService = () =>
    new GetAllUsersService({ repository: UsersRepositoryFactory.mongoUsersRepository() });
  static saveUsersService = () => new NewUsersService({ repository: UsersRepositoryFactory.mongoUsersRepository() });
}
