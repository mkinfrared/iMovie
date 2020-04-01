import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(userDto: UserDto) {
    return this.userRepository.save(userDto);
  }

  getAll() {
    return this.userRepository.find();
  }

  getOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async updateUser(id: string, userDto: UserDto) {
    const user = await this.getOne(id);

    if (!user) {
      return;
    }

    const updatedUser = { ...user, ...userDto };

    this.userRepository.update({ id }, updatedUser);

    return updatedUser;
  }

  removeUser(id: string) {
    return this.userRepository.delete(id);
  }
}
