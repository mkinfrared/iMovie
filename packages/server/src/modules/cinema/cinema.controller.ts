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
  Query
} from "@nestjs/common";

import { CinemaService } from "./cinema.service";
import { CinemaDto, UpdateCinemaDto } from "./dto/cinema.dto";

@Controller("cinema")
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post()
  create(@Body() cinemaDto: CinemaDto) {
    return this.cinemaService.create(cinemaDto);
  }

  @Get()
  getAll(
    @Query("page") page = "1",
    @Query("limit") limit = "20",
    @Query("zipcodeId") zipcodeId?: string
  ) {
    const zipcode = parseInt(zipcodeId as any, 0) || undefined;

    return this.cinemaService.getAll(+page, +limit, zipcode);
  }

  @Get(":id")
  get(@Param("id") id: number) {
    return this.cinemaService.get(id);
  }

  @Put()
  async update(@Body() updateCinemaDto: UpdateCinemaDto) {
    const { id, ...cinemaDto } = updateCinemaDto;
    const result = await this.cinemaService.update(id, cinemaDto);

    if (!result) {
      throw new HttpException("Cinema not found", HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    const result = await this.cinemaService.delete(id);

    if (!result) {
      throw new HttpException("Cinema not found", HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
