import { Test, TestingModule } from "@nestjs/testing";
import bcrypt from "bcryptjs";

import { AuthService } from "modules/auth/auth.service";
import { authDtoMock } from "modules/auth/auth.service.mock";
import { TokenService } from "modules/token/token.service";
import { tokenServiceMock } from "modules/token/token.service.mock";
import { UserService } from "modules/user/user.service";
import { userServiceMock } from "modules/user/user.service.mock";

describe("AuthService", () => {
  const mockTokenService = jest.fn(() => ({ ...tokenServiceMock }));
  const mockUserService = jest.fn(() => ({ ...userServiceMock }));

  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useClass: mockUserService
        },
        { provide: TokenService, useClass: mockTokenService }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return 'undefined' when user was not found", async () => {
    userServiceMock.findByUsername.mockReturnValueOnce(undefined);

    const result = await service.loginUser(authDtoMock);

    expect(result).toBeUndefined();
  });

  it("should return 'undefined' when passwords do not match", async () => {
    userServiceMock.findByUsername.mockReturnValueOnce({ password: "marklar" });

    const result = await service.loginUser({
      username: "foo",
      password: "bar"
    });

    expect(result).toBeUndefined();
  });

  it("should return 'user' when user exists and passwords match", async () => {
    const password = "foo";
    const hashedPassword = await bcrypt.hash(password, 12);

    userServiceMock.findByUsername.mockReturnValueOnce({
      username: "Towelie",
      password: hashedPassword
    });

    const result = await service.loginUser({
      username: "foo",
      password
    });

    expect(result).toBeDefined();
    expect(result!.username).toBe("Towelie");
  });
});
