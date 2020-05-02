import { Test, TestingModule } from "@nestjs/testing";

import { AuthController } from "modules/auth/auth.controller";
import { AuthService } from "modules/auth/auth.service";
import { authDtoMock, authServiceMock } from "modules/auth/auth.service.mock";
import { TokenService } from "modules/token/token.service";
import { tokenServiceMock } from "modules/token/token.service.mock";
import { userDtoMock } from "modules/user/user.service.mock";

describe("Auth Controller", () => {
  const mockTokesService = jest.fn(() => ({ ...tokenServiceMock }));
  const mockAuthService = jest.fn(() => ({ ...authServiceMock }));

  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: TokenService, useClass: mockTokesService },
        { provide: AuthService, useClass: mockAuthService }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return 'bad request' when user was not found", async () => {
    authServiceMock.loginUser.mockReturnValueOnce(undefined);

    const response = {
      cookie: jest.fn(),
      status: jest.fn(),
      send: jest.fn()
    } as any;

    try {
      await controller.login(authDtoMock, response);
    } catch (e) {
      expect(e.response).toBeDefined();

      expect(e.response.username).toHaveLength(1);

      expect(e.status).toBe(400);
    }
  });

  it("should create new tokens and put them in cookies", async () => {
    authServiceMock.loginUser.mockReturnValueOnce(userDtoMock);

    tokenServiceMock.generateTokens.mockReturnValueOnce(["foo", "bar"]);

    const response = {
      cookie: jest.fn(),
      status: jest.fn(() => ({ send: jest.fn() }))
    } as any;

    await controller.login(authDtoMock, response);

    expect(response.cookie).toHaveBeenCalledTimes(2);

    expect(response.status).toHaveBeenCalled();

    expect(response.status).toHaveBeenCalledWith(200);
  });

  it("should create new tokens and put them in cookies and redirect", async () => {
    const token = "marklar";
    const data = { email: "marklar@foo.bar" };

    tokenServiceMock.verifyEmailToken.mockReturnValueOnce(data);

    tokenServiceMock.generateTokens.mockReturnValueOnce(["foo", "bar"]);

    authServiceMock.activateUser.mockReturnValueOnce(userDtoMock);

    const response = {
      cookie: jest.fn(),
      redirect: jest.fn(),
      status: jest.fn(() => ({ send: jest.fn() }))
    } as any;

    await controller.activate(token, response);

    expect(response.cookie).toHaveBeenCalledTimes(2);

    expect(response.redirect).toHaveBeenCalled();
  });

  it("should return 'bad request' when token is invalid", async () => {
    const token = "marklar";

    tokenServiceMock.verifyEmailToken.mockReturnValueOnce(undefined);

    const response = {
      cookie: jest.fn(),
      redirect: jest.fn(),
      status: jest.fn(() => ({ send: jest.fn() }))
    } as any;

    try {
      await controller.activate(token, response);
    } catch (e) {
      expect(e.response).toBeDefined();

      expect(e.status).toBe(400);

      expect(response.cookie).not.toHaveBeenCalled();

      expect(response.redirect).not.toHaveBeenCalled();
    }
  });

  it("should return 'bad request' when user was not found", async () => {
    const token = "marklar";
    const data = { email: "marklar@foo.bar" };

    tokenServiceMock.verifyEmailToken.mockReturnValueOnce(data);

    authServiceMock.activateUser.mockReturnValueOnce(undefined);

    const response = {
      cookie: jest.fn(),
      redirect: jest.fn(),
      status: jest.fn(() => ({ send: jest.fn() }))
    } as any;

    try {
      await controller.activate(token, response);
    } catch (e) {
      expect(e.response).toBeDefined();

      expect(e.status).toBe(400);

      expect(response.cookie).not.toHaveBeenCalled();

      expect(response.redirect).not.toHaveBeenCalled();
    }
  });

  it("should clear tokens", async () => {
    const response = {
      clearCookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any;

    await controller.logout(response);

    expect(response.clearCookie).toHaveBeenCalledTimes(2);

    expect(response.clearCookie).toHaveBeenCalledWith("access-token");

    expect(response.clearCookie).toHaveBeenCalledWith("refresh-token");

    expect(response.status).toHaveBeenCalledWith(200);
  });
});
