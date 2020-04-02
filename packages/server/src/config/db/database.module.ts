import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import createOptions from "config/db/createOptions";

@Module({
  imports: [TypeOrmModule.forRoot(createOptions())]
})
export class DatabaseModule {}
