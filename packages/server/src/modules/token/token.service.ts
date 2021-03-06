import { Injectable } from "@nestjs/common";
import jwt from "jsonwebtoken";
import omit from "lodash/omit";

import { LoggerService } from "config/logger/logger.service";
import {
  ACCESS_TOKEN_KEY,
  EMAIL_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} from "config/secrets";
import { EmailData, JwtValue } from "types";

@Injectable()
export class TokenService {
  constructor(private readonly loggerService: LoggerService) {
    this.loggerService.setContext(TokenService.name);
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
      this.loggerService.log("Access token is invalid");

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
      this.loggerService.log("Refresh token is invalid");
    }

    return data;
  }

  generateEmailToken(email: string) {
    return jwt.sign({ email }, EMAIL_TOKEN_KEY, { expiresIn: "3 days" });
  }

  verifyEmailToken(emailToken: string) {
    let data: EmailData | undefined;

    try {
      this.loggerService.log("Verifying email token");

      data = jwt.verify(emailToken, EMAIL_TOKEN_KEY) as EmailData;
    } catch (e) {
      this.loggerService.log("Email token is invalid");
    }

    return data;
  }
}
