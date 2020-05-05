import { Test, TestingModule } from "@nestjs/testing";

import {
  zipcodeMock,
  zipcodeServiceMock
} from "modules/zipcode/zipcode.service.mock";

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

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should call 'getAll' on zipcodeService and return the response", async () => {
    zipcodeServiceMock.getAll.mockReturnValueOnce([zipcodeMock]);

    const result = await controller.getAll();

    expect(zipcodeServiceMock.getAll).toHaveBeenCalled();

    expect(result).toHaveLength(1);

    expect(result[0].code).toBe(zipcodeMock.code);
  });

  it("should call 'getOne' on zipcodeService and return the response", async () => {
    const id = 42;

    zipcodeServiceMock.getOne.mockReturnValueOnce(zipcodeMock);

    const result = await controller.getOne(id);

    expect(zipcodeServiceMock.getOne).toHaveBeenCalled();

    expect(zipcodeServiceMock.getOne).toHaveBeenCalledWith(id);

    expect(result).toBeDefined();

    expect(result?.code).toBe(zipcodeMock.code);
  });

  it("should call 'getByCodeAndCountry' on zipcodeService and return the response", async () => {
    const code = zipcodeMock.code;
    const countryId = zipcodeMock.countryId;

    zipcodeServiceMock.getByCodeAndCountry.mockReturnValueOnce(zipcodeMock);

    const result = await controller.getByCodeAndCountry(countryId, code);

    expect(zipcodeServiceMock.getByCodeAndCountry).toHaveBeenCalled();

    expect(zipcodeServiceMock.getByCodeAndCountry).toHaveBeenCalledWith(
      code,
      countryId
    );

    expect(result).toBeDefined();

    expect(result?.code).toBe(zipcodeMock.code);
  });

  it("should call 'getByCodeAndCountry' on zipcodeService and return 'bad request'", async () => {
    const code = zipcodeMock.code;
    const countryId = zipcodeMock.countryId;

    zipcodeServiceMock.getByCodeAndCountry.mockReturnValueOnce(undefined);

    try {
      await controller.getByCodeAndCountry(countryId, code);
    } catch (e) {
      expect(zipcodeServiceMock.getByCodeAndCountry).toHaveBeenCalled();

      expect(zipcodeServiceMock.getByCodeAndCountry).toHaveBeenCalledWith(
        code,
        countryId
      );

      expect(e.response).toBeDefined();

      expect(e.status).toBe(400);
    }
  });
});
