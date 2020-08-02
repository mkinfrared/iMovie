import { Test, TestingModule } from "@nestjs/testing";

import { CityController } from "modules/city/city.controller";
import { CityService } from "modules/city/city.service";
import { cityServiceMock } from "modules/city/city.service.mock";

describe("City Controller", () => {
  const mockCityService = jest.fn(() => ({ ...cityServiceMock }));

  let controller: CityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [{ provide: CityService, useClass: mockCityService }]
    }).compile();

    controller = module.get<CityController>(CityController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
