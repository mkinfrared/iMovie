import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { StateController } from "modules/state/state.controller";
import { State } from "modules/state/state.entity";
import { StateService } from "modules/state/state.service";

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StateService],
  controllers: [StateController],
  exports: [StateService]
})
export class StateModule {}
