import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query
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

  @Get()
  getMovies(
    @Query("page") page = "1",
    @Query("title") title?: string,
    @Query("cast") cast?: string,
    @Query("directors") directors?: string,
    @Query("writers") writers?: string,
    @Query("producers") producers?: string
  ) {
    const castArr = cast?.split(",").map((value) => parseInt(value, 0));

    const directorsArr = directors
      ?.split(",")
      .map((value) => parseInt(value, 0));

    const writersArr = writers?.split(",").map((value) => parseInt(value, 0));

    const producersArr = producers
      ?.split(",")
      .map((value) => parseInt(value, 0));

    const currentPage = parseInt(page, 0);

    return this.movieService.getMovies(
      currentPage,
      title,
      castArr,
      directorsArr,
      writersArr,
      producersArr
    );
  }
}
