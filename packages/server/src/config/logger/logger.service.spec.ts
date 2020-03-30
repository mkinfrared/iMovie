import { Test, TestingModule } from "@nestjs/testing";

import { LoggerService } from "./logger.service";

describe("LoggerService", () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService]
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should call logger.debug when debug method is invoked", () => {
    service.logger.debug = jest.fn();

    const message = "foo";
    const context = "bar";

    service.debug(message, context);

    expect(service.logger.debug).toHaveBeenCalled();
  });

  it("should call logger.error when debug method is invoked", () => {
    service.logger.error = jest.fn();

    const message = "foo";
    const context = "bar";

    service.error(message, context);

    expect(service.logger.error).toHaveBeenCalled();
  });

  it("should call logger.log when debug method is invoked", () => {
    service.logger.info = jest.fn();

    const message = "foo";
    const context = "bar";

    service.log(message, context);

    expect(service.logger.info).toHaveBeenCalled();
  });

  it("should call logger.verbose when debug method is invoked", () => {
    service.logger.verbose = jest.fn();

    const message = "foo";
    const context = "bar";

    service.verbose(message, context);

    expect(service.logger.verbose).toHaveBeenCalled();
  });

  it("should call logger.warn when debug method is invoked", () => {
    service.logger.warn = jest.fn();

    const message = "foo";
    const context = "bar";

    service.warn(message, context);

    expect(service.logger.warn).toHaveBeenCalled();
  });
});
