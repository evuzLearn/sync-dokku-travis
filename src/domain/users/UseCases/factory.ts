import { GetAllUsersUseCase } from './GetAllUsersUseCase';
import { UsersServiceFactory } from '../Services/factory';

export class UsersUseCaseFactory {
  static getAllUsersUseCase = () => new GetAllUsersUseCase({ service: UsersServiceFactory.getAllUsersService() });
}
