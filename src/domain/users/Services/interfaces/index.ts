import { UsersRepository } from '../../Repositories/UsersRepository';

export interface IGetAllUsersService {
  repository: UsersRepository;
}
