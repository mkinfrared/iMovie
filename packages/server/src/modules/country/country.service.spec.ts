import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import axios from "axios";

import { repositoryMock } from "config/db/database.service.mock";
import { LoggerService } from "config/logger/logger.service";
import { loggerServiceMock } from "config/logger/logger.service.mock";
import { countryMock } from "modules/country/country.service.mock";

import { Country } from "./country.entity";
import { CountryService } from "./country.service";

jest.mock("axios");

describe("CountryService", () => {
  const axiosMock = axios as jest.Mocked<typeof axios>;
  const mockCountryRepository = jest.fn(() => ({ ...repositoryMock }));
  const mockLoggerService = jest.fn(() => ({ ...loggerServiceMock }));

  let service: CountryService;

  beforeAll(async () => {
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

  it("should fetch countries and create entities", async () => {
    const countryData = {
      ...countryMock,
      callingCodes: [`${countryMock.callingCode}`]
    };
    const data = [countryData];

    axiosMock.get.mockReturnValueOnce(
      new Promise((resolve) => resolve({ data }))
    );

    await service.fetchCountries();

    expect(repositoryMock.values).toHaveBeenCalled();
    expect(repositoryMock.execute).toHaveBeenCalled();
  });

  it("should call 'fetchCountries'", async () => {
    const countryData = {
      ...countryMock,
      callingCodes: [`${countryMock.callingCode}`]
    };
    const data = [countryData];

    axiosMock.get.mockReturnValueOnce(
      new Promise((resolve) => resolve({ data }))
    );

    await service.handleCron();

    expect(repositoryMock.values).toHaveBeenCalled();
    expect(repositoryMock.execute).toHaveBeenCalled();
  });
});
