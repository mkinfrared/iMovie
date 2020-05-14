import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuditoriumController } from "modules/auditorium/auditorium.controller";
import { Auditorium } from "modules/auditorium/auditorium.entity";
import { AuditoriumService } from "modules/auditorium/auditorium.service";
import { SeatModule } from "modules/seat/seat.module";

@Module({
  imports: [TypeOrmModule.forFeature([Auditorium]), SeatModule],
  providers: [AuditoriumService],
  controllers: [AuditoriumController]
})
export class AuditoriumModule {}
