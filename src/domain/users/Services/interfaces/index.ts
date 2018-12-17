import { UsersRepository } from '../../Repositories/UsersRepository';
import { User } from '../../Entities/User';

interface IUserService {
  repository: UsersRepository;
}

export interface IGetAllUsersService extends IUserService {}

export interface ISaveUserService extends IUserService {}

export interface IExecuteSaveUserService {
  user: User;
}
