import { NestFactory } from "@nestjs/core";
import { SERVER_PORT } from "config/secrets";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(SERVER_PORT);
}

bootstrap();
