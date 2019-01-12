import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { getOrmConfig } from './ormconfig';
import { instance } from './domain';
import { config } from './config';
import { run } from './bot/run';

getOrmConfig()
  .then(ormConfig => createConnection(ormConfig))
  .then(async () => {
    console.log('App is running...');
    instance.init();
    run({ token: config.bot_token });
  })
  .catch(error => console.log(error));
