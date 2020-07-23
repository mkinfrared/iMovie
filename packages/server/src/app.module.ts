import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import cookieParser from "cookie-parser";

import { DatabaseModule } from "config/db/database.module";
import { LoggerModule } from "config/logger/logger.module";
import { RedisModule } from "config/redis/redis.module";
import { ValidateTokensMiddleware } from "middleware/validate-tokens.middleware";
import { AuditoriumModule } from "modules/auditorium/auditorium.module";
import { AuthModule } from "modules/auth/auth.module";
import { CastModule } from "modules/cast/cast.module";
import { CinemaModule } from "modules/cinema/cinema.module";
import { CityModule } from "modules/city/city.module";
import { CompanyModule } from "modules/company/company.module";
import { CountryModule } from "modules/country/country.module";
import { CrewModule } from "modules/crew/crew.module";
import { GenreModule } from "modules/genre/genre.module";
import { MovieModule } from "modules/movie/movie.module";
import { PersonModule } from "modules/person/person.module";
import { SeatModule } from "modules/seat/seat.module";
import { StateModule } from "modules/state/state.module";
import { TokenModule } from "modules/token/token.module";
import { UserModule } from "modules/user/user.module";
import { ZipcodeModule } from "modules/zipcode/zipcode.module";
import { MailerModule } from "utils/mailer/mailer.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ScreeningModule } from "./modules/screening/screening.module";

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
    AuditoriumModule,
    SeatModule,
    MovieModule,
    PersonModule,
    CompanyModule,
    CastModule,
    CrewModule,
    GenreModule,
    ScreeningModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser(), ValidateTokensMiddleware).forRoutes("*");
  }
}
