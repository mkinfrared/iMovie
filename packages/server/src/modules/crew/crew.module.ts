import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Crew } from "modules/crew/crew.entity";
import { CrewService } from "modules/crew/crew.service";
import { PersonModule } from "modules/person/person.module";

@Module({
  imports: [TypeOrmModule.forFeature([Crew]), PersonModule],
  providers: [CrewService],
  exports: [CrewService]
})
export class CrewModule {}
