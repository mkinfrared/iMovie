import { Module } from "@nestjs/common";

import { DatabaseModule } from "config/db/database.module";
import { UserModule } from "modules/user/user.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerModule } from "./config/logger/logger.module";

@Module({
  imports: [DatabaseModule, LoggerModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
