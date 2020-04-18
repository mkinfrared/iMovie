import { Test, TestingModule } from "@nestjs/testing";

import { zipcodeServiceMock } from "modules/zipcode/zipcode.service.mock";

import { ZipcodeController } from "./zipcode.controller";
import { ZipcodeService } from "./zipcode.service";

describe("Zipcode Controller", () => {
  const mockZipcodeService = jest.fn(() => ({ ...zipcodeServiceMock }));

  let controller: ZipcodeController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZipcodeController],
      providers: [{ provide: ZipcodeService, useClass: mockZipcodeService }]
    }).compile();

    controller = module.get<ZipcodeController>(ZipcodeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
