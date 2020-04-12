import { Test, TestingModule } from "@nestjs/testing";

import { LoggerService } from "config/logger/logger.service";
import { loggerServiceMock } from "config/logger/logger.service.mock";
import { TokenService } from "modules/token/token.service";
import { Role } from "modules/user/user.entity";
import { userDtoMock } from "modules/user/user.service.mock";

describe("TokenService", () => {
  const mockLoggerService = jest.fn(() => ({ ...loggerServiceMock }));

  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        { provide: LoggerService, useClass: mockLoggerService }
      ]
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return an array of two JWT tokens", () => {
    const user = {
      ...userDtoMock,
      id: "42",
      isActive: false,
      role: "user" as Role
    };
    const result = service.generateTokens(user);

    expect(result).toBeDefined();
    expect(result).toHaveLength(2);
  });

  it("should return a decrypted data from access token", () => {
    const user = {
      ...userDtoMock,
      id: "42",
      isActive: false,
      role: "user" as Role
    };
    const [accessToken] = service.generateTokens(user);
    const result = service.verifyAccessToken(accessToken);

    expect(result).toBeDefined();
    expect(result).toMatchObject(user);
  });

  it("should return undefined when access token is invalid", () => {
    const result = service.verifyAccessToken("marklar");

    expect(result).toBeUndefined();
  });

  it("should return a decrypted data from refresh token", () => {
    const user = {
      ...userDtoMock,
      id: "42",
      isActive: false,
      role: "user" as Role
    };
    const [, refreshToken] = service.generateTokens(user);
    const result = service.verifyRefreshToken(refreshToken);

    expect(result).toBeDefined();
    expect(result).toMatchObject(user);
  });

  it("should return undefined when refresh token is invalid", () => {
    const result = service.verifyRefreshToken("marklar");

    expect(result).toBeUndefined();
  });
});
