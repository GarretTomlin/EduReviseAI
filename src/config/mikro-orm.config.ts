import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import entities from '../database/entities';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: entities,
  dbName: process.env.DB_NAME,
  type: 'postgresql',
  debug: true,
  clientUrl: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  logger: logger.log.bind(logger),
  migrations: {
    path: 'src/database/migrations',
  },
  seeder: {
    path: 'src/database/seeders',
  },
};

export default config;
