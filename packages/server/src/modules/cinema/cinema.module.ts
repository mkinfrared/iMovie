import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CinemaController } from "modules/cinema/cinema.controller";
import { Cinema } from "modules/cinema/cinema.entity";
import { CinemaService } from "modules/cinema/cinema.service";

@Module({
  imports: [TypeOrmModule.forFeature([Cinema])],
  providers: [CinemaService],
  controllers: [CinemaController]
})
export class CinemaModule {}
