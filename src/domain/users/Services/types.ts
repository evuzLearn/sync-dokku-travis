import { UsersRepository } from '../Repositories/UsersRepository';
import { User } from '../Entities/User';

interface IUserService {
  repository: UsersRepository;
}

export interface IGetAllUsersService extends IUserService {}

export interface INewUserService extends IUserService {}

export interface IExecuteNewUserService {
  user: User;
}
