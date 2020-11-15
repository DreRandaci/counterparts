import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '../.env') });
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const getOrmConfig = (): MysqlConnectionOptions => {
  return {
    type: 'mysql',
    host: 'localhost',
    username: process.env.ORM_USERNAME,
    password: process.env.ORM_PASSWORD,
    port: Number(process.env.ORM_PORT),
    database: 'counterparts-api',
    synchronize: true,
    logging: true,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    timezone: 'utc',
  };
};
