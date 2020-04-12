import { Module } from "@nestjs/common";

import { LoggerModule } from "config/logger/logger.module";
import { TokenService } from "modules/token/token.service";

@Module({
  imports: [LoggerModule],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
