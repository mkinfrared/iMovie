/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import cheerio from "cheerio";
import dayjs from "dayjs";
import { MoreThan, Repository } from "typeorm";

import { LoggerService } from "config/logger/logger.service";
import { Cast } from "modules/cast/cast.entity";
import { CastService } from "modules/cast/cast.service";
import { CompanyService } from "modules/company/company.service";
import { CountryService } from "modules/country/country.service";
import { Crew } from "modules/crew/crew.entity";
import { CrewService } from "modules/crew/crew.service";
import { GenreService } from "modules/genre/genre.service";
import {
  MovieCredits,
  MovieDetailsResponse
} from "modules/movie/dto/movie.dto";
import { Movie } from "modules/movie/movie.entity";
import Pagination from "utils/pagination";
import tmdbApi from "utils/tmdbApi";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly companyService: CompanyService,
    private readonly genreService: GenreService,
    private readonly countryService: CountryService,
    private readonly castService: CastService,
    private readonly crewService: CrewService,
    private readonly loggerService: LoggerService
  ) {}

  async createMovie(movieId: number) {
    const exists = await this.movieRepository.findOne(movieId);

    if (exists) {
      throw new Error("Movie already exists");
    }

    try {
      const movieDetailsResponse = await tmdbApi.get<MovieDetailsResponse>(
        `/movie/${movieId}`
      );

      const {
        production_companies,
        genres: movieGenres,
        production_countries,
        ...movieInfo
      } = movieDetailsResponse.data;

      const companyIds = production_companies.map(({ id }) => id);
      const companies = await this.companyService.createMany(companyIds);

      const countryIds = production_countries.map(
        ({ iso_3166_1 }) => iso_3166_1
      );

      const countries = await this.countryService.getMany(countryIds);
      const genres = await this.genreService.createGenres(movieGenres);

      const movie = this.movieRepository.create({
        adult: movieInfo.adult,
        backdropPath: movieInfo.backdrop_path,
        budget: movieInfo.budget,
        companies,
        countries,
        genres,
        homepage: movieInfo.homepage,
        id: movieInfo.id,
        imdbId: movieInfo.imdb_id,
        originalTitle: movieInfo.original_title,
        overview: movieInfo.overview,
        popularity: movieInfo.popularity,
        posterPath: movieInfo.poster_path,
        releaseDate: movieInfo.release_date,
        runtime: movieInfo.runtime,
        tagline: movieInfo.tagline,
        title: movieInfo.title
      });

      await this.movieRepository.save(movie);

      this.fetchMovieCredits(movie);

      this.fetchBoxOfficePerformance(movie);

      return movie;
    } catch (e) {
      return this.loggerService.error(e);
    }
  }

  async fetchMovieCredits(movie: Movie) {
    try {
      const response = await tmdbApi.get<MovieCredits>(
        `/movie/${movie.id}/credits`
      );

      const { crew, cast } = response.data;

      this.castService.create(cast, movie);

      this.crewService.create(crew, movie);
    } catch (e) {
      this.loggerService.error(e);
    }
  }

  async fetchBoxOfficePerformance(movie: Movie) {
    try {
      const response = await axios.get(
        `https://www.boxofficemojo.com/title/${movie.imdbId}/`
      );

      const $ = cheerio.load(response.data);
      const performance = $(".mojo-performance-summary-table span.money");

      const [, domestic, international, worldwide] = performance
        .text()
        .split("$");

      const regex = /,/g;

      movie.domesticGross = +domestic.replace(regex, "");

      movie.internationalGross = +international.replace(regex, "");

      movie.worldwideGross = +worldwide.replace(regex, "");

      this.movieRepository.save(movie);
    } catch (e) {
      this.loggerService.error(e);
    }
  }

  async getMoviesByCastAndCrew(
    actors = [-1],
    directors = [-1],
    writers = [-1],
    producers = [-1],
    page: number
  ) {
    const limit = 10;

    const result = await this.movieRepository
      .createQueryBuilder("movie")
      .innerJoin(Cast, "cast", '"movie"."id" = "cast"."movieId"')
      .innerJoin(Crew, "crew", '"movie"."id" = "crew"."movieId"')
      .select()
      .distinct(true)
      .where('"cast"."personId" in (:...actors)', { actors })
      .orWhere(
        '"crew"."personId" in (:...directors) and "crew"."job" LIKE :job',
        { directors, job: "Director" }
      )
      .orWhere(
        '"crew"."personId" in (:...writers) and "crew"."department" IN (:...department)',
        { writers, department: ["Writing"] }
      )
      .orWhere(
        '"crew"."personId" in (:...producers) and "crew"."job" LIKE :job',
        { producers, job: "Producer" }
      )
      .offset(limit * (page - 1))
      .limit(limit)
      .getManyAndCount();

    const [movies, total] = result;

    for (const movie of movies) {
      const crew = await this.crewService.getCrewByByMovie(movie, "Director");

      movie.crew = crew;
    }

    return new Pagination(movies, total, page);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateNewReleases() {
    const sixMothsAgo = dayjs().subtract(6, "month").toDate();

    const movies = await this.movieRepository.find({
      where: { releaseDate: MoreThan(sixMothsAgo) }
    });

    movies.forEach((movie) => this.fetchBoxOfficePerformance(movie));
  }

  @Cron(CronExpression.EVERY_2ND_MONTH)
  async updateReleases() {
    const twoYearsAgo = dayjs().subtract(2, "year").toDate();

    const movies = await this.movieRepository.find({
      where: { releaseDate: MoreThan(twoYearsAgo) }
    });

    movies.forEach((movie) => this.fetchBoxOfficePerformance(movie));
  }

  getOne(movieId: number) {
    return this.movieRepository.findOne(movieId);
  }
}
