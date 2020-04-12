import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseFilters,
  UsePipes
} from "@nestjs/common";
import { Response } from "express";

import { ValidationException } from "exceptions/validation.exception";
import { TokenService } from "modules/token/token.service";
import { LoginPipe } from "pipes/login.pipe";

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
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

    const [accessToken, refreshToken] = this.tokenService.generateTokens(user);

    res.cookie("access-token", accessToken, { httpOnly: true });
    res.cookie("refresh-token", refreshToken, { httpOnly: true });
    res.status(HttpStatus.OK).send(user);
  }
}
