import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";
import { userDtoMock } from "modules/user/user.service.mock";

import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

describe("UserService", () => {
  const mockUserRepository = jest.fn(() => ({ ...repositoryMock }));

  let service: UserService;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useClass: mockUserRepository }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a new saved user", async () => {
    repositoryMock.save.mockReturnValueOnce(userDtoMock);

    const result = await service.create(userDtoMock);

    expect(result).toBeDefined();
    expect(result.username).toBe(userDtoMock.username);
    expect(result.email).toBe(userDtoMock.email);
    expect(result.firstName).toBe(userDtoMock.firstName);
    expect(result.lastName).toBe(userDtoMock.lastName);
  });

  it("should return all users", async () => {
    repositoryMock.find.mockReturnValueOnce([userDtoMock]);

    const result = await service.getAll();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
  });

  it("should return a user by id", async () => {
    repositoryMock.findOne.mockReturnValueOnce(userDtoMock);

    const result = await service.getOne("42");

    expect(result).toBeDefined();
    expect(result!.email).toBe(userDtoMock.email);
    expect(result!.username).toBe(userDtoMock.username);
  });

  it("should return undefined when user was not found", async () => {
    repositoryMock.findOne.mockReturnValueOnce(undefined);

    const updatedUser: UserDto = {
      email: "marklar",
      username: "towelie",
      password: "gethigh",
      passwordConfirm: "gethigh",
      firstName: "Steven",
      lastName: "McTowelie"
    };
    const result = await service.updateUser("42", updatedUser);

    expect(result).toBeUndefined();
  });

  it("should return an updated user by id", async () => {
    repositoryMock.findOne.mockReturnValueOnce(userDtoMock);
    repositoryMock.update.mockImplementationOnce(
      (_: string, newValue: any) => ({ ...userDtoMock, ...newValue })
    );

    const updatedUser: UserDto = {
      email: "marklar",
      username: "towelie",
      password: "gethigh",
      passwordConfirm: "gethigh",
      firstName: "Steven",
      lastName: "McTowelie"
    };
    const result = await service.updateUser("42", updatedUser);

    expect(result).toBeDefined();
    expect(result!.email).toBe(updatedUser.email);
    expect(result!.username).toBe(updatedUser.username);
    expect(result!.firstName).toBe(updatedUser.firstName);
    expect(result!.lastName).toBe(updatedUser.lastName);
    expect(result!.email).toBe(updatedUser.email);
  });

  it("should remove a user", async () => {
    const result = await service.removeUser("42");

    expect(result).toBeDefined();
    expect(result).toBe("deleted");
  });
});
