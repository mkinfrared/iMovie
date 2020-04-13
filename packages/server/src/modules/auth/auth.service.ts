import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";
import omit from "lodash/omit";

import { UserService } from "modules/user/user.service";

import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async loginUser(authDto: AuthDto) {
    const user = await this.userService.getByUsername(authDto.username);

    if (!user) {
      return;
    }

    const valid = await bcrypt.compare(authDto.password, user.password);

    if (!valid) {
      return;
    }

    return omit(user, "password");
  }

  async activateUser(email: string) {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      return;
    }

    user.isActive = true;

    this.userService.updateUser(user.id, user);

    return user;
  }
}
