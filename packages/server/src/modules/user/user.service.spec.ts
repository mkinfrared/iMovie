import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

export const user: UserDto = {
  username: "marklar",
  password: "foobar",
  email: "marklar@foo.bar",
  firstName: "Randy",
  lastName: "Marsh"
};

describe("UserService", () => {
  const save = jest.fn((userDto: UserDto) => userDto);
  const find = jest.fn(() => [user]);
  const findOne = jest.fn((id: string): UserDto | undefined => user);
  const update = jest.fn((id: string, userDto: UserDto) => ({
    ...user,
    ...userDto
  }));
  const deleteUser = jest.fn(() => "deleted");
  const mockUserRepository = jest.fn(() => ({
    save,
    find,
    findOne,
    update,
    delete: deleteUser
  }));

  let service: UserService;

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
    const result = await service.create(user);

    expect(result).toBeDefined();
    expect(result.username).toBe(user.username);
    expect(result.password).toBe(user.password);
    expect(result.email).toBe(user.email);
    expect(result.firstName).toBe(user.firstName);
    expect(result.lastName).toBe(user.lastName);
  });

  it("should return all users", async () => {
    const result = await service.getAll();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
  });

  it("should return a user by id", async () => {
    const result = await service.getOne("42");

    expect(result).toBeDefined();
    expect(result).toMatchObject(user);
  });

  it("should return undefined when user was not found", async () => {
    const updatedUser: UserDto = {
      email: "marklar",
      username: "towelie",
      password: "gethigh",
      firstName: "Steven",
      lastName: "McTowelie"
    };

    findOne.mockImplementationOnce(() => undefined);
    const result = await service.updateUser("42", updatedUser);

    expect(result).toBeUndefined();
  });

  it("should return an updated user by id", async () => {
    const updatedUser: UserDto = {
      email: "marklar",
      username: "towelie",
      password: "gethigh",
      firstName: "Steven",
      lastName: "McTowelie"
    };
    const result = await service.updateUser("42", updatedUser);

    expect(result).toBeDefined();
    expect(result).toMatchObject(updatedUser);
  });

  it("should remove a user", async () => {
    const result = await service.removeUser("42");

    expect(result).toBeDefined();
    expect(result).toBe("deleted");
  });
});
