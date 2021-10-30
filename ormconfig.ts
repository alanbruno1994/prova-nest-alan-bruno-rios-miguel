import { join } from 'path';

function srcChoose() {
  switch (process.env.NODE_ENV) {
    case 'test':
      return './config/env/test.env';
    case 'development':
      return './config/env/development.env';
    case 'production':
      return './config/env/production.env';
  }
}

require('dotenv').config({
  path: srcChoose(),
});

export default {
  type: 'mysql',
  host: process.env.HOST_DB,
  port: +process.env.PORT_DB,
  username: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['dis/**/*.entity.js'],
  migrations: [join(__dirname, 'src/db/migrations/**/*.ts')],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
