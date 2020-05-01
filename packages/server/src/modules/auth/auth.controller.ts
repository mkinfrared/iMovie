import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UseFilters,
  UseInterceptors,
  UsePipes
} from "@nestjs/common";
import { classToPlain } from "class-transformer";
import { Response } from "express";

import { CORS, NODE_ENV } from "config/secrets";
import { ValidationException } from "exceptions/validation.exception";
import { TokenService } from "modules/token/token.service";
import { LoginPipe } from "pipes/login.pipe";
import { JwtValue } from "types";

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  @Post()
  @UsePipes(LoginPipe)
  @UseFilters(ValidationException)
  async login(@Body() authDto: AuthDto, @Res() res: Response) {
    const user = await this.authService.loginUser(authDto);

    if (!user) {
      throw new HttpException(
        {
          username: ["username or password is incorrect"]
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const data = classToPlain(user) as JwtValue;
    const [accessToken, refreshToken] = this.tokenService.generateTokens(data);

    res.cookie("access-token", accessToken, { httpOnly: true });

    res.cookie("refresh-token", refreshToken, { httpOnly: true });

    res.status(HttpStatus.OK).send(data);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(":token")
  async activate(@Param("token") token: string, @Res() res: Response) {
    const data = this.tokenService.verifyEmailToken(token);

    if (!data) {
      throw new HttpException("Token is invalid", HttpStatus.BAD_REQUEST);
    }

    const user = await this.authService.activateUser(data.email);

    if (!user) {
      throw new HttpException("Token is invalid", HttpStatus.BAD_REQUEST);
    }

    const newData = classToPlain(user) as JwtValue;

    const [accessToken, refreshToken] = this.tokenService.generateTokens(
      newData
    );

    res.cookie("access-token", accessToken, { httpOnly: true });

    res.cookie("refresh-token", refreshToken, { httpOnly: true });

    const url = NODE_ENV === "production" ? "/" : CORS[0];

    res.redirect(url);
  }
}
