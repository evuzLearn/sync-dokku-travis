import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { getOrmConfig } from './ormconfig';
import { instance } from './domain';

getOrmConfig()
  .then(ormConfig => createConnection(ormConfig))
  .then(async () => {
    const domain = instance.init();
    console.log('Inserting a new user into the database...');
    const newUser = {
      firstName: 'Jake',
      lastName: 'Sio',
      age: 25,
    };
    const user = await domain.get({ useCase: 'save_user' }).execute({
      user: newUser,
    });
    console.log(`Saved a new user with id: ${user.id}`);
    const users = await domain.get({ useCase: 'get_all_users' }).execute();
    console.log('Loaded users: ', users.length);
  })
  .catch(error => console.log(error));
