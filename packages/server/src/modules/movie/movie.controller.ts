import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post
} from "@nestjs/common";

import { MovieDto } from "modules/movie/dto/movie.dto";
import { MovieService } from "modules/movie/movie.service";

@Controller("movie")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() movieDto: MovieDto) {
    try {
      const result = await this.movieService.createMovie(movieDto.id);

      if (!result) {
        throw new HttpException(
          "Failed to add movie. Try again",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      return result;
    } catch (e) {
      throw new HttpException(
        "The movie already added",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
