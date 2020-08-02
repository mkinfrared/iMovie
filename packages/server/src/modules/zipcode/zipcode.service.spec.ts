import { Test, TestingModule } from "@nestjs/testing";
import { getConnectionToken, getRepositoryToken } from "@nestjs/typeorm";
import axios from "axios";

import {
  connectionMock,
  queryRunnerMock,
  repositoryMock
} from "config/db/database.service.mock";
import { LoggerService } from "config/logger/logger.service";
import { loggerServiceMock } from "config/logger/logger.service.mock";
import { CityService } from "modules/city/city.service";
import { cityMock, cityServiceMock } from "modules/city/city.service.mock";
import { StateService } from "modules/state/state.service";
import { stateMock, stateServiceMock } from "modules/state/state.service.mock";
import { Zipcode } from "modules/zipcode/zipcode.entity";
import { ZipcodeService } from "modules/zipcode/zipcode.service";
import { zipcodeMock } from "modules/zipcode/zipcode.service.mock";

jest.mock("axios");

describe("ZipcodeService", () => {
  const axiosMock = axios as jest.Mocked<typeof axios>;
  const mockZipcodeRepository = jest.fn(() => ({ ...repositoryMock }));
  const mockZipcodeConnection = jest.fn(() => ({ ...connectionMock }));
  const mockStateService = jest.fn(() => ({ ...stateServiceMock }));
  const mockCitySerivce = jest.fn(() => ({ ...cityServiceMock }));
  const mockLoggerService = jest.fn(() => ({ ...loggerServiceMock }));

  let service: ZipcodeService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZipcodeService,
        {
          provide: getRepositoryToken(Zipcode),
          useClass: mockZipcodeRepository
        },
        {
          provide: getConnectionToken(),
          useClass: mockZipcodeConnection
        },
        {
          provide: StateService,
          useClass: mockStateService
        },
        {
          provide: CityService,
          useClass: mockCitySerivce
        },
        {
          provide: LoggerService,
          useClass: mockLoggerService
        }
      ]
    }).compile();

    service = module.get<ZipcodeService>(ZipcodeService);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create zipcode entry", async () => {
    const {
      countryId,
      cityId,
      code,
      latitude,
      longitude,
      stateId
    } = zipcodeMock;

    repositoryMock.save.mockReturnValueOnce(zipcodeMock);

    const result = await service.create(
      code,
      cityId,
      stateId,
      countryId,
      longitude,
      latitude
    );

    expect(result).toBeDefined();

    expect(result.code).toBe(zipcodeMock.code);

    expect(repositoryMock.create).toHaveBeenCalled();

    expect(repositoryMock.save).toHaveBeenCalled();
  });

  it("should fetch data and create new zipcode entities", async () => {
    const { countryId } = cityMock;

    const data = {
      places: [
        {
          "post code": zipcodeMock.code,
          latitude: zipcodeMock.latitude,
          longitude: zipcodeMock.longitude
        }
      ]
    };

    repositoryMock.create.mockReturnValueOnce(zipcodeMock);

    connectionMock.createQueryRunner.mockReturnValueOnce(queryRunnerMock);

    axiosMock.get.mockReturnValueOnce(
      new Promise((resolve) => resolve({ data }))
    );

    await service.createZipcodesByCity(
      countryId,
      stateMock as any,
      cityMock as any
    );

    expect(queryRunnerMock.manager.transaction).toHaveBeenCalled();

    expect(loggerServiceMock.log).not.toHaveBeenCalled();
  });

  it("should fetch data and exit on empty response", async () => {
    const { countryId } = cityMock;
    const data = {};

    repositoryMock.create.mockReturnValueOnce(zipcodeMock);

    connectionMock.createQueryRunner.mockReturnValueOnce(queryRunnerMock);

    axiosMock.get.mockReturnValueOnce(
      new Promise((resolve) => resolve({ data }))
    );

    await service.createZipcodesByCity(
      countryId,
      stateMock as any,
      cityMock as any
    );

    expect(queryRunnerMock.manager.transaction).not.toHaveBeenCalled();

    expect(loggerServiceMock.log).not.toHaveBeenCalled();
  });

  it("should call 'log' on loggerService", async () => {
    const { countryId } = cityMock;
    const error = "TIMMY";

    repositoryMock.create.mockReturnValueOnce(zipcodeMock);

    connectionMock.createQueryRunner.mockReturnValueOnce(queryRunnerMock);

    axiosMock.get.mockRejectedValueOnce(error);

    await service.createZipcodesByCity(
      countryId,
      stateMock as any,
      cityMock as any
    );

    expect(queryRunnerMock.manager.transaction).not.toHaveBeenCalled();

    expect(loggerServiceMock.log).toHaveBeenCalled();

    expect(loggerServiceMock.log).toHaveBeenCalledWith(error);
  });

  it("should return zipcode without fetching data", async () => {
    const { code, countryId } = zipcodeMock;

    repositoryMock.findOne.mockReturnValueOnce(zipcodeMock);

    const result = await service.getByCodeAndCountry(code, countryId);

    expect(result).toBeDefined();

    expect(result?.code).toBe(zipcodeMock.code);
  });

  it("should return zipcode with fetching data", async () => {
    const { code, countryId, longitude, latitude } = zipcodeMock;

    const data = {
      places: [
        {
          state: stateMock.name,
          "state abbreviation": stateMock.abbreviation,
          "place name": cityMock.name,
          longitude,
          latitude
        }
      ]
    };

    axiosMock.get.mockImplementationOnce(() =>
      Promise.resolve({
        data
      })
    );

    repositoryMock.findOne
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce(zipcodeMock);

    cityServiceMock.upsert.mockReturnValueOnce(cityMock);

    stateServiceMock.upsert.mockReturnValueOnce(stateMock);

    const result = await service.getByCodeAndCountry(code, countryId);

    expect(result).toBeDefined();

    expect(result?.code).toBe(zipcodeMock.code);

    expect(result?.cityId).toBe(cityMock.id);

    expect(stateServiceMock.upsert).toHaveBeenCalled();

    expect(stateServiceMock.upsert).toHaveBeenCalledWith(
      stateMock.name,
      countryId,
      stateMock.abbreviation
    );

    expect(cityServiceMock.upsert).toHaveBeenCalled();

    expect(cityServiceMock.upsert).toHaveBeenCalledWith(
      cityMock.name,
      cityMock.stateId,
      countryId
    );
  });

  it("should call 'error' on logger service", async () => {
    const { code, countryId } = zipcodeMock;
    const error = "timmy";

    repositoryMock.findOne.mockReturnValueOnce(undefined);

    stateServiceMock.upsert.mockReturnValueOnce(stateMock);

    cityServiceMock.upsert.mockReturnValueOnce(cityMock);

    axiosMock.get.mockRejectedValueOnce(error);

    try {
      await service.getByCodeAndCountry(code, countryId);
    } catch (e) {
      expect(stateServiceMock.upsert).not.toHaveBeenCalled();

      expect(cityServiceMock.upsert).not.toHaveBeenCalled();

      expect(service.createZipcodesByCity).not.toHaveBeenCalled();

      expect(loggerServiceMock.error).toHaveBeenCalled();
    }
  });

  it("should return an array of zipcodes", async () => {
    const zipcodes = [zipcodeMock];

    repositoryMock.find.mockReturnValueOnce(zipcodes);

    const result = await service.getAll();

    expect(result).toHaveLength(1);

    expect(result[0]).toBe(zipcodeMock);
  });

  it("should return a zipcode", async () => {
    repositoryMock.findOne.mockReturnValueOnce(zipcodeMock);

    const result = await service.getOne(42);

    expect(result).toBeDefined();

    expect(result?.code).toBe(zipcodeMock.code);

    expect(result?.cityId).toBe(zipcodeMock.cityId);
  });

  it("should call 'find' on zipcodeRepository", async () => {
    await service.getByCity(42);

    expect(repositoryMock.find).toHaveBeenCalled();
  });
});
