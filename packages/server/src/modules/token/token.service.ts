import { Injectable } from "@nestjs/common";
import jwt from "jsonwebtoken";
import omit from "lodash/omit";

import { LoggerService } from "config/logger/logger.service";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "config/secrets";
import { JwtValue } from "types";

@Injectable()
export class TokenService {
  constructor(private readonly loggerService: LoggerService) {
    this.loggerService.setContext("TokenService");
  }

  generateTokens(value: JwtValue): [string, string] {
    this.loggerService.log("Generating tokens");
    const data = omit(value, ["iat", "exp"]);
    const accessToken = jwt.sign(data, ACCESS_TOKEN_KEY, { expiresIn: "1m" });
    const refreshToken = jwt.sign(data, REFRESH_TOKEN_KEY, {
      expiresIn: "7d"
    });

    return [accessToken, refreshToken];
  }

  verifyAccessToken(accessToken: string) {
    let data: JwtValue | undefined;

    try {
      this.loggerService.log("Verifying access token");

      data = jwt.verify(accessToken, ACCESS_TOKEN_KEY) as JwtValue;
    } catch (e) {
      this.loggerService.log("Access token is outdated");
      throw new Error();
    }

    return data;
  }

  verifyRefreshToken(refreshToken: string) {
    let data: JwtValue | undefined;

    try {
      this.loggerService.log("Verifying refresh token");

      data = jwt.verify(refreshToken, REFRESH_TOKEN_KEY) as JwtValue;
    } catch (e) {
      this.loggerService.log("Refresh token is outdated");
    }

    return data;
  }
}
