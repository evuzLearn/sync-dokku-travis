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
      const configItems = Object.keys(config);
      expect(configItems).toContain('url');
      expect(configItems).toContain('username');
      expect(configItems).toContain('password');
      expect(configItems).toContain('database');
      expect(configItems).toContain('host');
      expect(configItems).toContain('port');
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
