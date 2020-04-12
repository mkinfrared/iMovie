import { Injectable, Logger } from "@nestjs/common";
import winston from "winston";

import createWinstonLogger from "./createWinstonLogger";

@Injectable()
export class LoggerService extends Logger {
  logger: winston.Logger;

  constructor() {
    super();

    this.logger = createWinstonLogger();
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
    this.logger.debug(message, { context });
  }

  // _ = trace
  error(message: any, _?: string, context?: string) {
    super.error(message, context);
    this.logger.error(message, { context });
  }

  log(message: any, context?: string) {
    super.log(message, context);
    this.logger.info(message, { context });
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
    this.logger.verbose(message, { context });
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
    this.logger.warn(message, { context });
  }
}
