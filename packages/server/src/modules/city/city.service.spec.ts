import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";

import { City } from "./city.entity";
import { CityService } from "./city.service";

describe("CityService", () => {
  const mockCityRepository = jest.fn(() => ({ ...repositoryMock }));

  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        { provide: getRepositoryToken(City), useClass: mockCityRepository }
      ]
    }).compile();

    service = module.get<CityService>(CityService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a city and return it", async () => {
    const name = "South Park";
    const stateId = 42;
    const countryId = "US";

    repositoryMock.execute.mockReturnValueOnce({
      generatedMaps: [{ name, stateId, countryId }]
    });
    const result = await service.upsert(name, stateId, countryId);

    expect(result).toBeDefined();
  });
});
