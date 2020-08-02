import { Test, TestingModule } from "@nestjs/testing";

import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { movieResponseMock, movieServiceMock } from "./movie.service.mock";

describe("City Controller", () => {
  const mockMovieService = jest.fn(() => movieServiceMock);
  const movieDtoMock = { ...movieResponseMock };

  let controller: MovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [{ provide: MovieService, useClass: mockMovieService }]
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should call createMovie on movieService and throw", async () => {
    movieServiceMock.createMovie.mockReturnValueOnce(new Error());

    try {
      await controller.create(movieDtoMock);
    } catch (e) {
      expect(controller.create).toThrow();
    }
  });

  it("should call createMovie on movieService and catch an error", async () => {
    movieServiceMock.createMovie.mockReturnValueOnce(new Error());

    try {
      await controller.create(movieDtoMock);
    } catch (e) {
      expect(controller.create).toThrow();
    }
  });

  it("should call createMovie on movieService and return a result", async () => {
    movieServiceMock.createMovie.mockReturnValueOnce(movieDtoMock);

    const result = await controller.create(movieDtoMock);

    expect(movieServiceMock.createMovie).toHaveBeenCalledWith(movieDtoMock.id);

    expect(result).toMatchObject(movieDtoMock);
  });

  it("should call getMovies on movieService", async () => {
    const title = "Cartman";
    const cast = "1,2,3";
    const directors = "4,5,6";
    const writers = "7,8,9";
    const producers = "10,11,12";
    const page = "42";
    const castArray = [1, 2, 3];
    const directorsArray = [4, 5, 6];
    const writersArray = [7, 8, 9];
    const producersArray = [10, 11, 12];

    await controller.getMovies(
      page,
      title,
      cast,
      directors,
      writers,
      producers
    );

    expect(movieServiceMock.getMovies).toHaveBeenCalledWith(
      42,
      title,
      castArray,
      directorsArray,
      writersArray,
      producersArray
    );
  });

  it("should call getMovies on movieService", async () => {
    const title = undefined;
    const cast = undefined;
    const directors = undefined;
    const writers = undefined;
    const producers = undefined;
    const page = undefined;

    await controller.getMovies(
      page,
      title,
      cast,
      directors,
      writers,
      producers
    );

    expect(movieServiceMock.getMovies).toHaveBeenCalledWith(
      1,
      title,
      cast,
      directors,
      writers,
      producers
    );
  });
});
