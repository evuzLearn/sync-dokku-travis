import { MongoActivityRepository } from './MongoActivityRepository';
import { Singleton } from 'ts-domain';

const mongoActivityRepository = new Singleton(MongoActivityRepository);

export class ActivityRepositoryFactory {
  static mongoActivityRepository = () => mongoActivityRepository.getInstance();
}
