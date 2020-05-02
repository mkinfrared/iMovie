import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
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

  app.enableCors({ origin: CORS, credentials: true });

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 60 // limit each IP to 60 requests per windowMs
    })
  );

  app.enableShutdownHooks();

  const options = new DocumentBuilder()
    .setTitle("iMovie Example")
    .setDescription("The iMovie API description")
    .setVersion("0.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup("api", app, document);

  await app.listen(SERVER_PORT);
}

bootstrap();
