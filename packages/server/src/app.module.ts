import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { DatabaseModule } from "config/db/database.module";
import { LoggerModule } from "config/logger/logger.module";
import { ValidateTokensMiddleware } from "middleware/validate-tokens.middleware";
import { AuthModule } from "modules/auth/auth.module";
import { TokenModule } from "modules/token/token.module";
import { UserModule } from "modules/user/user.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [DatabaseModule, LoggerModule, UserModule, AuthModule, TokenModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateTokensMiddleware);
  }
}
