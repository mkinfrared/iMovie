import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";
import { Genre } from "modules/genre/genre.entity";

import { GenreService } from "./genre.service";

describe("GenreService", () => {
  let service: GenreService;

  const mockGenreRepository = jest.fn(() => ({ ...repositoryMock }));

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenreService,
        { provide: getRepositoryToken(Genre), useClass: mockGenreRepository }
      ]
    }).compile();

    service = module.get<GenreService>(GenreService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create genres and save in database", async () => {
    const genre = {
      id: 42,
      name: "Thriller"
    };

    const result = await service.createGenres([genre]);

    expect(result).toHaveLength(1);

    expect(result[0]).toMatchObject(genre);

    expect(repositoryMock.save).toHaveBeenCalledWith([genre]);
  });
});
