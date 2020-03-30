import { Module } from "@nestjs/common";

import { LoggerService } from "config/logger/logger.service";

@Module({
  providers: [LoggerService]
})
export class LoggerModule {}
