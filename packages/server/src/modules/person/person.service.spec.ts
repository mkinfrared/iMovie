/* eslint-disable @typescript-eslint/camelcase */
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";
import { LoggerService } from "config/logger/logger.service";
import { loggerServiceMock } from "config/logger/logger.service.mock";
import { Person } from "modules/person/person.entity";
import { personResponseMock } from "modules/person/person.service.mock";
import tmdbApi from "utils/tmdbApi";

import { PersonService } from "./person.service";

jest.mock("utils/tmdbApi");

describe("PersonService", () => {
  let service: PersonService;

  const mockPersonRepository = jest.fn(() => ({ ...repositoryMock }));
  const mockLoggerService = jest.fn(() => ({ ...loggerServiceMock }));
  const tmdbMock = tmdbApi as jest.Mocked<typeof tmdbApi>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        { provide: getRepositoryToken(Person), useClass: mockPersonRepository },
        { provide: LoggerService, useClass: mockLoggerService }
      ]
    }).compile();

    service = module.get<PersonService>(PersonService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return an array of failed ids", () => {
    const [, failedResponse] = personResponseMock;

    const result = service.getFailedIds([
      failedResponse as PromiseRejectedResult
    ]);

    expect(result).toHaveLength(1);

    expect(result[0]).toBe(1018001);
  });

  it("should call finByIds from personRepository", () => {
    const id = 42;

    service.getMany([id]);

    expect(repositoryMock.findByIds).toHaveBeenCalledWith([id]);
  });

  it("should return an array with failed response", async () => {
    const id = 42;
    const [, failedResponse] = personResponseMock;

    tmdbMock.get.mockRejectedValue(failedResponse.reason);

    const result = await service.fetchPeople([id]);

    expect(result).toHaveLength(1);

    expect(result[0].status).toBe("rejected");

    expect(loggerServiceMock.warn).toHaveBeenCalled();
  });

  it("should fetch people and save them in database", async () => {
    const id = 42;
    const [fulfilledResponse] = personResponseMock;

    const {
      imdb_id,
      place_of_birth,
      profile_path,
      ...rest
    } = fulfilledResponse.value!.data;

    const expected = {
      imdbId: imdb_id,
      profilePath: profile_path,
      placeOfBirth: place_of_birth,
      ...rest
    };

    repositoryMock.findByIds.mockResolvedValueOnce([]);

    repositoryMock.execute.mockReturnValueOnce({ generatedMaps: [expected] });

    tmdbMock.get.mockResolvedValueOnce(fulfilledResponse.value as any);

    await service.createMany([id]);

    expect(repositoryMock.values).toHaveBeenCalledWith([expected]);
  });
});
