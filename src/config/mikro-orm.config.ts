import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import entities from '../database/entities';

const logger = new Logger('MikroORM');
const databaseDevConfig: Options = {
  entities: entities,
  dbName: process.env.DB_NAME,
  type: 'postgresql',
  debug: true,
  clientUrl: process.env.CLIENT_URL,
  logger: logger.log.bind(logger),
  migrations: {
    path: 'src/database/migrations',
  },
  seeder: {
    path: 'src/database/seeders',
  },
};

export default databaseDevConfig;
