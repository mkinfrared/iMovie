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

    expect(repositoryMock.save).not.toHaveBeenCalledWith(userDtoMock);
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
    repositoryMock.update.mockReturnValueOnce({ affected: 0 });

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

    repositoryMock.update.mockReturnValueOnce({ affected: 1 });

    const result = await service.updateUser("42", userDtoMock);

    expect(result).toBeDefined();

    expect(result!.email).toBe(userDtoMock.email);

    expect(result!.username).toBe(userDtoMock.username);

    expect(result!.firstName).toBe(userDtoMock.firstName);

    expect(result!.lastName).toBe(userDtoMock.lastName);

    expect(result!.email).toBe(userDtoMock.email);
  });

  it("should return a delete result", async () => {
    repositoryMock.delete.mockReturnValueOnce({ affected: 1 });

    const result = await service.removeUser("42");

    expect(result).toBeDefined();

    expect(repositoryMock.delete).toHaveBeenCalled();
  });

  it("should return undefined when user was not found", async () => {
    repositoryMock.delete.mockReturnValueOnce({ affected: 0 });

    const result = await service.removeUser("42");

    expect(result).toBeUndefined();

    expect(repositoryMock.delete).toHaveBeenCalled();
  });

  it("should return undefined when user was not found", async () => {
    repositoryMock.findOne.mockReturnValueOnce(undefined);

    const result = await service.getByUsername("marklar");

    expect(result).toBeUndefined();
  });

  it("should return undefined when user was not found", async () => {
    repositoryMock.findOne.mockReturnValueOnce(userDtoMock);

    const result = await service.getByUsername("marklar");

    expect(result).toBeDefined();

    expect(result?.username).toBe(userDtoMock.username);

    expect(result?.email).toBe(userDtoMock.email);
  });

  it("should return undefined when user was not found", async () => {
    repositoryMock.findOne.mockReturnValueOnce(undefined);

    const result = await service.getByEmail("marklar");

    expect(result).toBeUndefined();
  });

  it("should return undefined when user was not found", async () => {
    repositoryMock.findOne.mockReturnValueOnce(userDtoMock);

    const result = await service.getByEmail("marklar");

    expect(result).toBeDefined();

    expect(result?.username).toBe(userDtoMock.username);

    expect(result?.email).toBe(userDtoMock.email);
  });
});
