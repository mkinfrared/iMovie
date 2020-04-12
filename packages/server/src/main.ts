import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { LoggerService } from "config/logger/logger.service";
import { CORS, SERVER_PORT } from "config/secrets";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new LoggerService()
  });

  app.set("trust proxy", 1);
  app.enableCors({ origin: CORS });
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 60 // limit each IP to 60 requests per windowMs
    })
  );

  await app.listen(SERVER_PORT);
}

bootstrap();
