import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";

import { UserService } from "modules/user/user.service";

import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async loginUser(authDto: AuthDto) {
    const user = await this.userService.findByUsername(authDto.username);

    if (!user) {
      return;
    }

    const valid = await bcrypt.compare(authDto.password, user.password);

    if (!valid) {
      return;
    }

    return user;
  }
}
