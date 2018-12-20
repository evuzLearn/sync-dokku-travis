import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { Bot } from './bot/Bot';
import { getOrmConfig } from './ormconfig';
import { instance } from './domain';
import { config } from './config';
import { addListeners } from './bot/functions';
import { Activity } from './domain/activity/Entities/Activity';

getOrmConfig()
  .then(ormConfig => createConnection(ormConfig))
  .then(async () => {
    console.log('App is running...');
    const domain = instance.init();
    addListeners({ bot: new Bot({ token: config.bot_token }) });
  })
  .catch(error => console.log(error));
