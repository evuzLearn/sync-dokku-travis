import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

import { Activity } from './domain/activity/Repositories/MongoActivityRepository/Activity.entity';
import { User } from './domain/users/Repositories/MongoUsersRepository/User.entity';

import { config } from './config';

const ormConfig: MongoConnectionOptions = {
  type: 'mongodb',
  synchronize: true,
  logging: false,
  useNewUrlParser: true,
  entities: [Activity, User],
};

export function getOrmConfig(): Promise<MongoConnectionOptions> {
  return Promise.resolve({
    ...ormConfig,
    url: config.db_url,
    username: config.db_username,
    password: config.db_password,
    database: config.db_database,
    host: config.db_host,
    port: config.db_port,
  });
}
