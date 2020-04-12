import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  NODE_ENV
} from "config/secrets";

const createOptions = (): TypeOrmModuleOptions => {
  switch (NODE_ENV) {
    case "test":
      return {
        type: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
        dropSchema: true
      };
    case "production":
      return {
        type: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
        dropSchema: false
      };
    default:
      return {
        type: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        dropSchema: true
      };
  }
};

export default createOptions;
