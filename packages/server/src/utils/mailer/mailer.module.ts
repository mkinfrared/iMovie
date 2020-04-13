import { Module } from "@nestjs/common";

import { TokenModule } from "modules/token/token.module";
import { MailerService } from "utils/mailer/mailer.service";

@Module({
  imports: [TokenModule],
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerModule {}
