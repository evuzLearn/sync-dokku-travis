import { MongoUsersRepository } from './MongoUsersRepository';
import { generateSingleton } from 'ts-domain';

export class UsersRepositoryFactory {
  static mongoUsersRepository = () => {
    return generateSingleton(MongoUsersRepository);
  };
}
