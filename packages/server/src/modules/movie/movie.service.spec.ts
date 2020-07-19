import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import axios from "axios";

import { repositoryMock } from "config/db/database.service.mock";
import { LoggerService } from "config/logger/logger.service";
import { loggerServiceMock } from "config/logger/logger.service.mock";
import { CastService } from "modules/cast/cast.service";
import { castServiceMock } from "modules/cast/cast.service.mock";
import { CompanyService } from "modules/company/company.service";
import { companyServiceMock } from "modules/company/company.service.mock";
import { CountryService } from "modules/country/country.service";
import { countryServiceMock } from "modules/country/country.service.mock";
import { CrewService } from "modules/crew/crew.service";
import { crewServiceMock } from "modules/crew/crew.service.mock";
import { GenreService } from "modules/genre/genre.service";
import { genreServiceMock } from "modules/genre/genre.service.mock";
import { Movie } from "modules/movie/movie.entity";
import { movieResponseMock } from "modules/movie/movie.service.mock";
import tmdbApi from "utils/tmdbApi";

import { MovieService } from "./movie.service";

jest.mock("utils/tmdbApi");

jest.mock("axios");

jest.mock("cheerio", () => ({
  load: jest.fn(() =>
    jest.fn(() => ({
      text: jest.fn(() => "$42$43$44")
    }))
  )
}));

describe("MovieService", () => {
  let service: MovieService;

  const tmdbMock = tmdbApi as jest.Mocked<typeof tmdbApi>;
  const axiosMock = axios as jest.Mocked<typeof axios>;
  const mockMovieRepository = jest.fn(() => ({ ...repositoryMock }));
  const mockCompanyService = jest.fn(() => ({ ...companyServiceMock }));
  const mockGenreService = jest.fn(() => ({ ...genreServiceMock }));
  const mockCountryService = jest.fn(() => ({ ...countryServiceMock }));
  const mockCastService = jest.fn(() => ({ ...castServiceMock }));
  const mockCrewService = jest.fn(() => ({ ...crewServiceMock }));
  const mockLoggerService = jest.fn(() => ({ ...loggerServiceMock }));

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        { provide: getRepositoryToken(Movie), useClass: mockMovieRepository },
        { provide: CompanyService, useClass: mockCompanyService },
        { provide: GenreService, useClass: mockGenreService },
        { provide: CountryService, useClass: mockCountryService },
        { provide: CastService, useClass: mockCastService },
        { provide: CrewService, useClass: mockCrewService },
        { provide: LoggerService, useClass: mockLoggerService }
      ]
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should throw an error if movie already exists", () => {
    const id = 42;

    repositoryMock.findOne.mockReturnValueOnce(true);

    try {
      service.createMovie(id);
    } catch (e) {
      expect(service.createMovie).toThrow();

      expect(service.createMovie).toThrowError("Movie already exists");
    }
  });

  it("should save movie in database and call fetchMovieCredits and fetchBoxOfficePerformance", async () => {
    const id = 42;

    repositoryMock.findOne.mockReturnValueOnce(false);

    companyServiceMock.createMany.mockReturnValueOnce(
      movieResponseMock.production_companies
    );

    countryServiceMock.getMany.mockReturnValueOnce(
      movieResponseMock.production_countries
    );

    genreServiceMock.createGenres.mockReturnValueOnce(movieResponseMock.genres);

    const movie = {
      adult: movieResponseMock.adult,
      backdropPath: movieResponseMock.backdrop_path,
      budget: movieResponseMock.budget,
      companies: movieResponseMock.production_companies,
      countries: movieResponseMock.production_countries,
      genres: movieResponseMock.genres,
      homepage: movieResponseMock.homepage,
      id: movieResponseMock.id,
      imdbId: movieResponseMock.imdb_id,
      originalTitle: movieResponseMock.original_title,
      overview: movieResponseMock.overview,
      popularity: movieResponseMock.popularity,
      posterPath: movieResponseMock.poster_path,
      releaseDate: movieResponseMock.release_date,
      runtime: movieResponseMock.runtime,
      tagline: movieResponseMock.tagline,
      title: movieResponseMock.title
    };

    tmdbMock.get.mockReturnValueOnce(
      Promise.resolve({ data: movieResponseMock } as any)
    );

    service.fetchMovieCredits = jest.fn();

    service.fetchBoxOfficePerformance = jest.fn();

    const result = await service.createMovie(id);

    expect(result).toMatchObject(movie);

    expect(repositoryMock.save).toHaveBeenCalledWith(movie);

    expect(service.fetchMovieCredits).toHaveBeenCalledWith(movie);

    expect(service.fetchBoxOfficePerformance).toHaveBeenCalledWith(movie);

    expect(loggerServiceMock.error).not.toHaveBeenCalled();
  });

  it("should call error on loggerService when request is rejected", async () => {
    const id = 42;

    repositoryMock.findOne.mockReturnValueOnce(false);

    tmdbMock.get.mockReturnValueOnce(Promise.reject({ data: "reject" } as any));

    service.fetchMovieCredits = jest.fn();

    service.fetchBoxOfficePerformance = jest.fn();

    await service.createMovie(id);

    expect(repositoryMock.save).not.toHaveBeenCalled();

    expect(service.fetchMovieCredits).not.toHaveBeenCalled();

    expect(service.fetchBoxOfficePerformance).not.toHaveBeenCalled();

    expect(loggerServiceMock.error).toHaveBeenCalled();
  });

  it("should fetch movie credits and call create on cast and crew services", async () => {
    const movie = { id: 42 } as any;

    const data = {
      cast: "cast",
      crew: "crew"
    };

    tmdbMock.get.mockReturnValueOnce(Promise.resolve({ data } as any));

    await service.fetchMovieCredits(movie);

    expect(castServiceMock.create).toHaveBeenCalledWith("cast", movie);

    expect(crewServiceMock.create).toHaveBeenCalledWith("crew", movie);

    expect(loggerServiceMock.error).not.toHaveBeenCalled();
  });

  it("should call error on logger service when request is rejected", async () => {
    const movie = { id: 42 } as any;

    tmdbMock.get.mockReturnValueOnce(
      Promise.reject({ data: "rejected" } as any)
    );

    await service.fetchMovieCredits(movie);

    expect(castServiceMock.create).not.toHaveBeenCalled();

    expect(crewServiceMock.create).not.toHaveBeenCalled();

    expect(loggerServiceMock.error).toHaveBeenCalled();
  });

  it("should fetch box office performance data and save it in database", async () => {
    const movie = { id: 42 } as any;

    const data = {
      ...movie,
      domesticGross: 42,

      internationalGross: 43,

      worldwideGross: 44
    };

    axiosMock.get.mockReturnValueOnce(
      Promise.resolve({ data: movieResponseMock } as any)
    );

    await service.fetchBoxOfficePerformance(movie);

    expect(repositoryMock.save).toHaveBeenCalledWith(data);
  });

  it("should call error on loggerService when request is rejected", async () => {
    const movie = { id: 42 } as any;

    const data = {
      ...movie,
      domesticGross: 42,

      internationalGross: 43,

      worldwideGross: 44
    };

    axiosMock.get.mockReturnValueOnce(
      Promise.reject({ data: "marklar" } as any)
    );

    await service.fetchBoxOfficePerformance(movie);

    expect(repositoryMock.save).not.toHaveBeenCalledWith(data);

    expect(loggerServiceMock.error).toHaveBeenCalled();
  });

  it("should call fetchBoxOfficePerformance", async () => {
    const movie1 = { id: 42 } as any;
    const movie2 = { id: 43 } as any;

    service.fetchBoxOfficePerformance = jest.fn();

    repositoryMock.find.mockReturnValueOnce([movie1, movie2]);

    await service.updateNewReleases();

    expect(service.fetchBoxOfficePerformance).toHaveBeenCalledTimes(2);
  });

  it("should call fetchBoxOfficePerformance", async () => {
    const movie1 = { id: 42 } as any;
    const movie2 = { id: 43 } as any;
    const movie3 = { id: 44 } as any;

    service.fetchBoxOfficePerformance = jest.fn();

    repositoryMock.find.mockReturnValueOnce([movie1, movie2, movie3]);

    await service.updateReleases();

    expect(service.fetchBoxOfficePerformance).toHaveBeenCalledTimes(3);
  });

  it("should call fetchBoxOfficePerformance", async () => {
    const movie1 = { id: 42 } as any;
    const movie2 = { id: 43 } as any;

    service.fetchBoxOfficePerformance = jest.fn();

    repositoryMock.find.mockReturnValueOnce([movie1, movie2]);

    await service.updateNewReleases();

    expect(service.fetchBoxOfficePerformance).toHaveBeenCalledTimes(2);
  });

  it("should call fetchBoxOfficePerformance", async () => {
    const movie1 = { id: 42 } as any;
    const movie2 = { id: 43 } as any;
    const movie3 = { id: 44 } as any;

    service.fetchBoxOfficePerformance = jest.fn();

    repositoryMock.find.mockReturnValueOnce([movie1, movie2, movie3]);

    await service.updateReleases();

    expect(service.fetchBoxOfficePerformance).toHaveBeenCalledTimes(3);
  });

  it("should return movies", async () => {
    const cast = [1];
    const directors = [1];
    const writers = [1];
    const producers = [1];
    const page = 42;

    crewServiceMock.getCrewByByMovie.mockReturnValueOnce([{ id: 12 }]);

    repositoryMock.getManyAndCount.mockReturnValueOnce([
      [movieResponseMock],
      33
    ]);

    const result = await service.getMoviesByCastAndCrew(
      cast,
      directors,
      writers,
      producers,
      page
    );

    const { result: movie, total, page: currentPage } = result;

    expect(crewServiceMock.getCrewByByMovie).toHaveBeenCalled();

    expect(movie[0].id).toBe(movieResponseMock.id);

    expect(total).toBe(33);

    expect(currentPage).toBe(page);
  });
});
