import 'reflect-metadata';
import path from 'path';
import { createConnection } from 'typeorm';
import { getOrmConfig } from '../ormconfig';
import { refreshProductsJob } from './jobs/index';
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const app = require('./app').default;

try {
  const port = process.env.HTTP_PORT || 3000;
  const ormConfig = getOrmConfig();
  createConnection(ormConfig).then((connection) => {
    console.log('database started');
    app.listen(port, () => {
      console.info(`api listening on port ${port}`);
      refreshProductsJob();
    });
  });
} catch (err) {
  console.error(`API COULD NOT START: ${JSON.stringify(err)}`);
}
