import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from "config/secrets";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: DB_HOST,
      port: 5432,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
