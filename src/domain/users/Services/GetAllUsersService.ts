import { IService } from '../../lib/models/Service';
import { UsersRepository } from '../Repositories/UsersRepository';
import { IGetAllUsersService } from './interfaces';

export class GetAllUsersService implements IService {
  private repository: UsersRepository;

  constructor({ repository }: IGetAllUsersService) {
    this.repository = repository;
  }

  execute() {
    return this.repository.getAllUsers();
  }
}
