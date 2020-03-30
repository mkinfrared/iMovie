import { NestFactory } from "@nestjs/core";

import { LoggerService } from "config/logger/logger.service";
import { SERVER_PORT } from "config/secrets";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService()
  });

  await app.listen(SERVER_PORT);
}

bootstrap();
