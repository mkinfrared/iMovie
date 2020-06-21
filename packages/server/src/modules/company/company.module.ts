import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Company } from "modules/company/company.entity";
import { CompanyService } from "modules/company/company.service";
import { CountryModule } from "modules/country/country.module";

@Module({
  imports: [TypeOrmModule.forFeature([Company]), CountryModule],
  providers: [CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}
