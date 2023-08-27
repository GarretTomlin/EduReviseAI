import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import entities from '../database/entities';

const logger = new Logger('MikroORM');
const databaseProdConfig: Options = {
  entities: entities,
  dbName: process.env.PROD_DB_NAME,
  type: 'postgresql',
  debug: true,
  clientUrl: process.env.PROD_CLIENT_URL,
  logger: logger.log.bind(logger),
  migrations: {
    path: 'src/database/migrations',
  },
  seeder: {
    path: 'src/database/seeders',
  },
};

export default databaseProdConfig;
