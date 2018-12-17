import { GetAllUsersUseCase } from './GetAllUsersUseCase';
import { SaveUserUseCase } from './SaveUserUseCase';
import { UsersServiceFactory } from '../Services/factory';

export class UsersUseCaseFactory {
  static getAllUsersUseCase = () => new GetAllUsersUseCase({ service: UsersServiceFactory.getAllUsersService() });
  static saveUsersUseCase = () => new SaveUserUseCase({ service: UsersServiceFactory.saveUsersService() });
}
