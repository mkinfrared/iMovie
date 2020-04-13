import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcryptjs";
import omit from "lodash/omit";
import { Repository } from "typeorm";

import { NODE_ENV } from "config/secrets";
import createDefaultUser from "utils/createDefaultUser";

import { UpdateUserDto, UserDto } from "./dto/user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(userDto: UserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 12);
    const user = await this.userRepository.save({
      ...userDto,
      password: hashedPassword
    });

    return omit(user, "password");
  }

  getAll() {
    return this.userRepository.find({
      select: [
        "id",
        "email",
        "username",
        "firstName",
        "lastName",
        "isActive",
        "role"
      ]
    });
  }

  async getOne(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      return;
    }

    return omit(user, "password");
  }

  async updateUser(id: string, userDto: UpdateUserDto) {
    const user = await this.getOne(id);
    const updateInfo = omit(userDto, "id");

    if (!user) {
      return;
    }

    const updatedUser = { ...user, ...updateInfo };

    this.userRepository.update({ id }, { ...updatedUser });

    return omit(updatedUser, "password");
  }

  async getByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return;
    }

    return omit(user, "password");
  }

  removeUser(id: string) {
    return this.userRepository.delete(id);
  }

  onApplicationBootstrap() {
    if (NODE_ENV !== "test") {
      const user = createDefaultUser();

      this.create(user);
    }
  }
}
