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
  UseFilters
} from "@nestjs/common";

import { DatabaseException } from "exceptions/database.exception";
import { AuditoriumService } from "modules/auditorium/auditorium.service";
import {
  AuditoriumDto,
  UpdateAuditoriumDto
} from "modules/auditorium/dto/auditorium.dto";

@Controller("auditorium")
export class AuditoriumController {
  constructor(private readonly auditoriumService: AuditoriumService) {}

  @Post()
  @UseFilters(DatabaseException)
  create(@Body() auditoriumDto: AuditoriumDto) {
    return this.auditoriumService.create(auditoriumDto);
  }

  @Get(":id")
  getOne(@Param("id") id: number) {
    return this.auditoriumService.getOne(id);
  }

  @Put()
  async update(auditoriumDto: UpdateAuditoriumDto) {
    const result = await this.auditoriumService.update(auditoriumDto);

    if (!result) {
      throw new HttpException("Auditorium not found", HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    const result = await this.auditoriumService.delete(id);

    if (!result) {
      throw new HttpException("Auditorium not found", HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
