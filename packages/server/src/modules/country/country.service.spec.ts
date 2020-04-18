import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";
import { LoggerService } from "config/logger/logger.service";
import { loggerServiceMock } from "config/logger/logger.service.mock";
import { countryMock } from "modules/country/country.service.mock";

import { Country } from "./country.entity";
import { CountryService } from "./country.service";

describe("CountryService", () => {
  const mockCountryRepository = jest.fn(() => ({ ...repositoryMock }));
  const mockLoggerService = jest.fn(() => ({ ...loggerServiceMock }));

  let service: CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: getRepositoryToken(Country),
          useClass: mockCountryRepository
        },
        {
          provide: LoggerService,
          useClass: mockLoggerService
        }
      ]
    }).compile();

    service = module.get<CountryService>(CountryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return an paginated result", async () => {
    const countries = [countryMock];
    const total = 1;

    repositoryMock.findAndCount.mockReturnValueOnce([countries, total]);
    const result = await service.getAll();

    expect(result).toBeDefined();
    expect(result.result).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it("should return a country by alpha2code", async () => {
    repositoryMock.findOne.mockReturnValueOnce(countryMock);
    const result = await service.getOne("42");

    expect(result).toBeDefined();
    expect(result?.name).toBe(countryMock.name);
    expect(result?.alpha2Code).toBe(countryMock.alpha2Code);
  });
});
