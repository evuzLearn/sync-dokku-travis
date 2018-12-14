import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { getOrmConfig } from './ormconfig';
import { User } from './entity/User';

getOrmConfig()
  .then(ormConfig => createConnection(ormConfig))
  .then(async connection => {
    console.log('Inserting a new user into the database...');
    const user = new User({
      firstName: 'Timber',
      lastName: 'Saw',
      age: 25,
    });
    await connection.manager.save(user);
    console.log(`Saved a new user with id: ${user.id}`);
    console.log('Loading users from the database...');
    const users = await connection.manager.find(User);
    console.log('Loaded users: ', users);
  })
  .catch(error => console.log(error));
