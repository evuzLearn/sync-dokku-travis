import { IService } from 'ts-domain';

import { UsersRepository } from '../Repositories/UsersRepository';
import { IGetAllUsersService } from './types';

export class GetAllUsersService implements IService {
  private repository: UsersRepository;

  constructor({ repository }: IGetAllUsersService) {
    this.repository = repository;
  }

  execute() {
    return this.repository.getAllUsers();
  }
}
