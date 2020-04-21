import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import cookieParser from "cookie-parser";

import { DatabaseModule } from "config/db/database.module";
import { LoggerModule } from "config/logger/logger.module";
import { RedisModule } from "config/redis/redis.module";
import { ValidateTokensMiddleware } from "middleware/validate-tokens.middleware";
import { AuthModule } from "modules/auth/auth.module";
import { TokenModule } from "modules/token/token.module";
import { UserModule } from "modules/user/user.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuditoriumModule } from "./modules/auditorium/auditorium.module";
import { CinemaModule } from "./modules/cinema/cinema.module";
import { CityModule } from "./modules/city/city.module";
import { CountryModule } from "./modules/country/country.module";
import { StateModule } from "./modules/state/state.module";
import { ZipcodeModule } from "./modules/zipcode/zipcode.module";
import { MailerModule } from "./utils/mailer/mailer.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    LoggerModule,
    UserModule,
    AuthModule,
    TokenModule,
    RedisModule,
    MailerModule,
    CountryModule,
    StateModule,
    CityModule,
    ZipcodeModule,
    CinemaModule,
    AuditoriumModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser(), ValidateTokensMiddleware).forRoutes("*");
  }
}
