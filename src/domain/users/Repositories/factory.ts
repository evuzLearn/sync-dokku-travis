import { MongoUsersRepository } from './MongoUsersRepository';
import { generateSingleton } from '../../lib/utils/singleton';

export class UsersRepositoryFactory {
  static mongoUsersRepository = () => {
    return generateSingleton(MongoUsersRepository);
  };
}
