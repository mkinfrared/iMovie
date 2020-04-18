import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerModule } from "config/logger/logger.module";
import { CountryController } from "modules/country/country.controller";
import { Country } from "modules/country/country.entity";
import { CountryService } from "modules/country/country.service";

@Module({
  imports: [TypeOrmModule.forFeature([Country]), LoggerModule],
  providers: [CountryService],
  controllers: [CountryController],
  exports: [CountryService]
})
export class CountryModule {}
