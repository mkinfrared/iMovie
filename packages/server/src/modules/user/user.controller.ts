import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
  UsePipes
} from "@nestjs/common";

import { DatabaseException } from "exceptions/database.exception";
import { ValidationException } from "exceptions/validation.exception";
import { RegisterPipe } from "pipes/register.pipe";

import { UpdateUserDto, UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new RegisterPipe())
  @UseFilters(DatabaseException, ValidationException)
  async create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(":id")
  async getOne(@Param("id") id: string) {
    const user = await this.userService.getOne(id);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() userDto: UpdateUserDto) {
    const user = await this.userService.updateUser(id, userDto);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    const result = await this.userService.removeUser(id);

    if (!result.affected) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
