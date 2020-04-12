import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

import { REDIS_HOST } from "config/secrets";

@Injectable()
export class RedisService extends Redis {
  constructor() {
    super({
      host: REDIS_HOST,
      port: 6379
    });
  }
}
