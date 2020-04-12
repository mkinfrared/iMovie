import { Module } from "@nestjs/common";

import { AuthController } from "modules/auth/auth.controller";
import { AuthService } from "modules/auth/auth.service";
import { TokenModule } from "modules/token/token.module";
import { UserModule } from "modules/user/user.module";

@Module({
  imports: [UserModule, TokenModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
