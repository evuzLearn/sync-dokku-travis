import { getOrmConfig } from '../ormconfig';

jest.mock('../config.ts');
const mock = require('../config.ts');
mock.config = {
  db_url: 'url',
  db_username: 'user',
  db_password: 'pass',
  db_database: 'db',
  db_host: 'host',
  db_port: 'port',
  bot_token: 'token',
};

describe('ORM Config', () => {
  test('Should have db params', () => {
    expect.assertions(6);
    getOrmConfig().then(config => {
      const configItems = Object.keys(config).map(key => ({ [key]: config[key] }));
      expect(configItems).toContainEqual({ url: 'url' });
      expect(configItems).toContainEqual({ username: 'user' });
      expect(configItems).toContainEqual({ password: 'pass' });
      expect(configItems).toContainEqual({ database: 'db' });
      expect(configItems).toContainEqual({ host: 'host' });
      expect(configItems).toContainEqual({ port: 'port' });
    });
  });

  test('Should have db params', () => {
    expect.assertions(5);
    getOrmConfig().then(config => {
      const configItems = Object.keys(config);
      expect(configItems).toContain('type');
      expect(configItems).toContain('synchronize');
      expect(configItems).toContain('logging');
      expect(configItems).toContain('useNewUrlParser');
      expect(configItems).toContain('entities');
    });
  });
});
