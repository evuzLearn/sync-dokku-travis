import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { Bot } from './bot/Bot';
import { getOrmConfig } from './ormconfig';
import { instance } from './domain';
import { config } from './config';
import { addListeners } from './bot/functions';

getOrmConfig()
  .then(ormConfig => createConnection(ormConfig))
  .then(async () => {
    console.log('App is running...');
    instance.init();
    addListeners({ bot: new Bot({ token: config.bot_token }) });
  })
  .catch(error => console.log(error));
