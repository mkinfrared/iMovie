import { Test, TestingModule } from "@nestjs/testing";

import { LoggerService } from "config/logger/logger.service";
import { loggerServiceMock } from "config/logger/logger.service.mock";
import { RedisService } from "config/redis/redis.service";
import { redisServiceMock } from "config/redis/redis.service.mock";
import { ValidateTokensMiddleware } from "middleware/validate-tokens.middleware";
import { TokenService } from "modules/token/token.service";
import { tokenServiceMock } from "modules/token/token.service.mock";

describe("ValidateTokensMiddleware", () => {
  const mockTokenService = jest.fn(() => ({ ...tokenServiceMock }));
  const mockLoggerService = jest.fn(() => ({ ...loggerServiceMock }));
  const mockRedisService = jest.fn(() => ({ ...redisServiceMock }));

  let middleware: ValidateTokensMiddleware;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateTokensMiddleware,
        { provide: TokenService, useClass: mockTokenService },
        { provide: RedisService, useClass: mockRedisService },
        { provide: LoggerService, useClass: mockLoggerService }
      ]
    }).compile();

    middleware = module.get(ValidateTokensMiddleware);
  });

  it("should be defined", () => {
    expect(middleware).toBeDefined();
  });

  it("should call next function when tokens are not provided", async () => {
    const request = { cookies: {} } as any;
    const response = {} as any;
    const next = jest.fn();

    await middleware.use(request, response, next);

    expect(next).toHaveBeenCalled();

    expect(tokenServiceMock.verifyAccessToken).not.toHaveBeenCalled();
  });

  it("should call verifyAccessToken, put data to req object and call next function when access token is provided", async () => {
    const accessToken = "marklar";

    const request = {
      cookies: {
        "access-token": accessToken
      }
    } as any;

    const response = {} as any;
    const next = jest.fn();
    const data = { foo: "bar" };

    tokenServiceMock.verifyAccessToken.mockReturnValueOnce(data);

    await middleware.use(request, response, next);

    expect(tokenServiceMock.verifyAccessToken).toHaveBeenCalled();

    expect(tokenServiceMock.verifyAccessToken).toHaveBeenCalledWith(
      accessToken
    );

    expect(request.userData).toBeDefined();

    expect(request.userData).toMatchObject(data);

    expect(next).toHaveBeenCalled();
  });

  it("should call log, verifyRefreshToken, get, next when access token is outdated", async () => {
    const accessToken = "marklar";
    const refreshToken = "foobar";

    const request = {
      cookies: {
        "access-token": accessToken,
        "refresh-token": refreshToken
      }
    } as any;

    const response = {} as any;
    const next = jest.fn();

    tokenServiceMock.verifyAccessToken.mockImplementationOnce(() => {
      throw new Error();
    });

    redisServiceMock.get.mockImplementationOnce(() => {
      throw new Error();
    });

    await middleware.use(request, response, next);

    expect(tokenServiceMock.verifyAccessToken).toHaveBeenCalled();

    expect(tokenServiceMock.verifyAccessToken).toHaveBeenCalledWith(
      accessToken
    );

    expect(request.userData).toBeUndefined();

    expect(loggerServiceMock.log).toHaveBeenCalled();

    expect(tokenServiceMock.verifyRefreshToken).toHaveBeenCalled();

    expect(tokenServiceMock.verifyRefreshToken).toHaveBeenCalledWith(
      refreshToken
    );

    expect(redisServiceMock.get).toHaveBeenCalled();

    expect(redisServiceMock.get).toHaveBeenCalledWith(refreshToken);

    expect(next).toHaveBeenCalled();
  });

  it("should call verifyRefreshToken, get, warn, next when access token is returned rom redis", async () => {
    const accessToken = "marklar";
    const refreshToken = "foobar";

    const request = {
      cookies: {
        "access-token": accessToken,
        "refresh-token": refreshToken
      }
    } as any;

    const response = {} as any;
    const next = jest.fn();
    const data = { foo: "bar" };

    tokenServiceMock.verifyAccessToken.mockImplementationOnce(() => {
      throw new Error();
    });

    tokenServiceMock.verifyRefreshToken.mockImplementationOnce(() => data);

    redisServiceMock.get.mockImplementationOnce(() => data);

    await middleware.use(request, response, next);

    expect(tokenServiceMock.verifyAccessToken).toHaveBeenCalled();

    expect(tokenServiceMock.verifyAccessToken).toHaveBeenCalledWith(
      accessToken
    );

    expect(request.userData).toBeUndefined();

    expect(loggerServiceMock.log).toHaveBeenCalled();

    expect(tokenServiceMock.verifyRefreshToken).toHaveBeenCalled();

    expect(tokenServiceMock.verifyRefreshToken).toHaveBeenCalledWith(
      refreshToken
    );

    expect(redisServiceMock.get).toHaveBeenCalled();

    expect(redisServiceMock.get).toHaveBeenCalledWith(refreshToken);

    expect(loggerServiceMock.warn).toHaveBeenCalled();

    expect(next).toHaveBeenCalled();
  });

  it("should set new tokens on cookies of request object", async () => {
    expect(loggerServiceMock.warn).not.toHaveBeenCalled();

    const accessToken = "marklar";
    const refreshToken = "foobar";

    const request = {
      cookies: {
        "access-token": accessToken,
        "refresh-token": refreshToken
      }
    } as any;

    const response = {
      cookie: jest.fn()
    } as any;

    const next = jest.fn();
    const data = ["foo", "bar"];

    tokenServiceMock.verifyAccessToken.mockImplementationOnce(() => {
      throw new Error();
    });

    tokenServiceMock.verifyRefreshToken.mockReturnValueOnce(data);

    redisServiceMock.get.mockReturnValueOnce(null);

    tokenServiceMock.generateTokens.mockReturnValueOnce(data);

    await middleware.use(request, response, next);

    expect(tokenServiceMock.verifyAccessToken).toHaveBeenCalled();

    expect(tokenServiceMock.verifyAccessToken).toHaveBeenCalledWith(
      accessToken
    );

    expect(loggerServiceMock.log).toHaveBeenCalled();

    expect(tokenServiceMock.verifyRefreshToken).toHaveBeenCalled();

    expect(tokenServiceMock.verifyRefreshToken).toHaveBeenCalledWith(
      refreshToken
    );

    expect(redisServiceMock.get).toHaveBeenCalled();

    expect(redisServiceMock.get).toHaveBeenCalledWith(refreshToken);

    expect(loggerServiceMock.warn).not.toHaveBeenCalled();

    expect(tokenServiceMock.generateTokens).toHaveBeenCalled();

    expect(request.userData).toBeDefined();

    expect(response.cookie).toHaveBeenCalledTimes(2);
  });
});
