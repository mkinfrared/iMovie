import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuditoriumModule } from "modules/auditorium/auditorium.module";
import { MovieModule } from "modules/movie/movie.module";
import { ShowtimeController } from "modules/showtime/showtime.controller";
import { Showtime } from "modules/showtime/showtime.entity";
import { ShowtimeService } from "modules/showtime/showtime.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Showtime]),
    MovieModule,
    AuditoriumModule
  ],
  providers: [ShowtimeService],
  controllers: [ShowtimeController]
})
export class ShowtimeModule {}
