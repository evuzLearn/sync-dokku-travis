import { MongoUsersRepository } from './MongoUsersRepository';

let mongoUsersRepository: MongoUsersRepository;

function getMongoRepository() {
  if (!mongoUsersRepository) {
    mongoUsersRepository = new MongoUsersRepository();
  }
  return mongoUsersRepository;
}

export class UsersRepositoryFactory {
  static mongoUsersRepository = () => {
    return getMongoRepository();
  };
}
