import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Seat } from "modules/seat/seat.entity";
import { SeatService } from "modules/seat/seat.service";

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  providers: [SeatService],
  exports: [SeatService]
})
export class SeatModule {}
