import { Test, TestingModule } from "@nestjs/testing";

import { CountryService } from "modules/country/country.service";
import {
  countryMock,
  countryServiceMock
} from "modules/country/country.service.mock";

import { CountryController } from "./country.controller";

describe("Country Controller", () => {
  const mockCountryService = jest.fn(() => ({ ...countryServiceMock }));

  let controller: CountryController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [{ provide: CountryService, useClass: mockCountryService }]
    }).compile();

    controller = module.get<CountryController>(CountryController);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return call 'getAll' from countryService", async () => {
    const offset = "42";
    const limit = "7";

    await controller.getAll(offset, limit);

    expect(countryServiceMock.getAll).toHaveBeenCalled();

    expect(countryServiceMock.getAll).toHaveBeenCalledWith(+offset, +limit);
  });

  it("should return call 'getOne' from countryService", async () => {
    countryServiceMock.getOne.mockReturnValueOnce(countryMock);

    const result = await controller.get(countryMock.alpha2Code);

    expect(result?.name).toBe(countryMock.name);

    expect(countryServiceMock.getOne).toHaveBeenCalled();

    expect(countryServiceMock.getOne).toHaveBeenCalledWith(
      countryMock.alpha2Code
    );
  });
});
