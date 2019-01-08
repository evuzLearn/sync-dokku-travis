import { MongoUsersRepository } from './MongoUsersRepository';
import { Singleton } from 'ts-domain';

const mongoUsersRepository = new Singleton(MongoUsersRepository);

export class UsersRepositoryFactory {
  static mongoUsersRepository = () => mongoUsersRepository.getInstance();
}
