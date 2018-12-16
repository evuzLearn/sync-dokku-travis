import { GetAllUsersService } from './GetAllUsersService';
import { UsersRepositoryFactory } from '../Repositories/factory';

export class UsersServiceFactory {
  static getAllUsersService = () =>
    new GetAllUsersService({ repository: UsersRepositoryFactory.mongoUsersRepository() });
}
