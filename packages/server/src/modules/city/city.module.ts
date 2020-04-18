import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CityController } from "modules/city/city.controller";
import { City } from "modules/city/city.entity";
import { CityService } from "modules/city/city.service";

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CityService],
  controllers: [CityController],
  exports: [CityService]
})
export class CityModule {}
