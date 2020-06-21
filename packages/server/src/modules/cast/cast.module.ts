import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Cast } from "modules/cast/cast.entity";
import { CastService } from "modules/cast/cast.service";
import { PersonModule } from "modules/person/person.module";

@Module({
  imports: [TypeOrmModule.forFeature([Cast]), PersonModule],
  providers: [CastService],
  exports: [CastService]
})
export class CastModule {}
