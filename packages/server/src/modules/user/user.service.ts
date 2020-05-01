import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcryptjs";
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

    const user = this.userRepository.create({
      ...userDto,
      password: hashedPassword
    });

    return this.userRepository.save(user);
  }

  getAll() {
    return this.userRepository.find();
  }

  async getOne(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      return;
    }

    return user;
  }

  async updateUser(id: string, userDto: UpdateUserDto) {
    const result = await this.userRepository.update({ id }, { ...userDto });

    if (!result.affected) {
      return;
    }

    return this.getOne(id);
  }

  async getByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    return user;
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async removeUser(id: string) {
    const result = await this.userRepository.delete(id);

    if (!result.affected) {
      return;
    }

    return result;
  }

  onApplicationBootstrap() {
    if (NODE_ENV !== "test") {
      const user = createDefaultUser();

      this.create(user);
    }
  }
}
