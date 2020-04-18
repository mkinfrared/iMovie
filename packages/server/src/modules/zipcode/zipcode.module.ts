import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerModule } from "config/logger/logger.module";
import { CityModule } from "modules/city/city.module";
import { StateModule } from "modules/state/state.module";
import { ZipcodeController } from "modules/zipcode/zipcode.controller";
import { Zipcode } from "modules/zipcode/zipcode.entity";
import { ZipcodeService } from "modules/zipcode/zipcode.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Zipcode]),
    StateModule,
    CityModule,
    LoggerModule
  ],
  providers: [ZipcodeService],
  controllers: [ZipcodeController]
})
export class ZipcodeModule {}
