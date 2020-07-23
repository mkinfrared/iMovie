import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuditoriumModule } from "modules/auditorium/auditorium.module";
import { MovieModule } from "modules/movie/movie.module";
import { ScreeningController } from "modules/screening/screening.controller";
import { Screening } from "modules/screening/screening.entity";
import { ScreeningService } from "modules/screening/screening.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Screening]),
    MovieModule,
    AuditoriumModule
  ],
  providers: [ScreeningService],
  controllers: [ScreeningController]
})
export class ScreeningModule {}
