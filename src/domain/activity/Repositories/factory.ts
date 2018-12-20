import { MongoActivityRepository } from './MongoActivityRepository';

let mongoActivityRepository: MongoActivityRepository;

function getMongoRepository() {
  if (!mongoActivityRepository) {
    mongoActivityRepository = new MongoActivityRepository();
  }
  return mongoActivityRepository;
}

export class ActivityRepositoryFactory {
  static mongoActivityRepository = () => {
    return getMongoRepository();
  };
}
