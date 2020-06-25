import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerModule } from "config/logger/logger.module";
import { Person } from "modules/person/person.entity";
import { PersonService } from "modules/person/person.service";

@Module({
  imports: [TypeOrmModule.forFeature([Person]), LoggerModule],
  providers: [PersonService],
  exports: [PersonService]
})
export class PersonModule {}
