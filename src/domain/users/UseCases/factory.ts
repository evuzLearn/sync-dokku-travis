import { GetAllUsersUseCase } from './GetAllUsersUseCase';
import { NewUserUseCase } from './NewUserUseCase';
import { UsersServiceFactory } from '../Services/factory';

export class UsersUseCaseFactory {
  static getAllUsersUseCase = () => new GetAllUsersUseCase({ service: UsersServiceFactory.getAllUsersService() });
  static newUsersUseCase = () => new NewUserUseCase({ service: UsersServiceFactory.saveUsersService() });
}
