import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";

import { LoggerService } from "config/logger/logger.service";
import { RedisService } from "config/redis/redis.service";
import { TokenService } from "modules/token/token.service";
import { AuthRequest, JwtValue } from "types";

@Injectable()
export class ValidateTokensMiddleware implements NestMiddleware {
  constructor(
    private readonly tokenService: TokenService,
    private readonly redisService: RedisService,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.setContext(ValidateTokensMiddleware.name);
  }

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const accessToken = req.cookies["access-token"];
    const refreshToken = req.cookies["refresh-token"];

    if (!accessToken && !refreshToken) {
      return next();
    }

    let data: JwtValue | undefined;

    try {
      data = this.tokenService.verifyAccessToken(accessToken);

      req.userData = data;

      return next();
    } catch (e) {
      this.loggerService.log("Access token is outdated");
    }

    try {
      data = this.tokenService.verifyRefreshToken(refreshToken);
      const token = await this.redisService.get(refreshToken);

      if (token) {
        this.loggerService.warn(`Token is stolen!
         Request: ${JSON.stringify(req)}`);

        return next();
      }
    } catch (e) {
      return next();
    }

    if (!data) {
      return next();
    }

    const [newAccessToken, newRefreshToken] = this.tokenService.generateTokens(
      data
    );

    req.userData = data;
    res.cookie("access-token", newAccessToken, { httpOnly: true });
    res.cookie("refresh-token", newRefreshToken, { httpOnly: true });

    return next();
  }
}
