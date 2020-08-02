import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";
import { AuditoriumService } from "modules/auditorium/auditorium.service";
import { auditoriumServiceMock } from "modules/auditorium/auditorium.service.mock";
import { MovieService } from "modules/movie/movie.service";
import { movieServiceMock } from "modules/movie/movie.service.mock";
import { Showtime } from "modules/showtime/showtime.entity";
import { ShowtimeService } from "modules/showtime/showtime.service";

describe("ScreeningService", () => {
  const mockScreeningRepository = jest.fn(() => ({ ...repositoryMock }));
  const mockMovieService = jest.fn(() => ({ ...movieServiceMock }));
  const mockAuditoriumService = jest.fn(() => ({ ...auditoriumServiceMock }));

  let service: ShowtimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowtimeService,
        {
          provide: getRepositoryToken(Showtime),
          useClass: mockScreeningRepository
        },
        { provide: MovieService, useClass: mockMovieService },
        { provide: AuditoriumService, useClass: mockAuditoriumService }
      ]
    }).compile();

    service = module.get<ShowtimeService>(ShowtimeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should throw an error when movie is not found", () => {
    const screeningDto = {
      startDate: "12-12-2020",
      movieId: 42,
      auditoriumId: 7
    };

    movieServiceMock.getOne.mockReturnValueOnce(undefined);

    try {
      service.create(screeningDto);
    } catch (e) {
      expect(service.create).toThrow();

      expect(service.create).toThrowError("Movie was not found");

      expect(repositoryMock.save).not.toHaveBeenCalled();
    }
  });

  it("should throw an error when auditorium is not found", () => {
    const screeningDto = {
      startDate: "12-12-2020",
      movieId: 42,
      auditoriumId: 7
    };

    movieServiceMock.getOne.mockReturnValueOnce(42);

    auditoriumServiceMock.getOne.mockReturnValueOnce(undefined);

    try {
      service.create(screeningDto);
    } catch (e) {
      expect(service.create).toThrow();

      expect(e.message).toBe("Auditorium was not found");
    }

    expect(repositoryMock.save).not.toHaveBeenCalled();
  });

  it("should call save on screeningRepository", async () => {
    const screeningDto = {
      startDate: "12-12-2020",
      movieId: 42,
      auditoriumId: 7
    };

    movieServiceMock.getOne.mockReturnValueOnce(42);

    auditoriumServiceMock.getOne.mockReturnValueOnce(7);

    await service.create(screeningDto);

    expect(repositoryMock.save).toHaveBeenCalled();
  });
});
