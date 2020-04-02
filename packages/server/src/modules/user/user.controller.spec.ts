import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getConnection } from "typeorm";
import uuid from "uuid/v4";

import { DatabaseModule } from "config/db/database.module";

import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { user } from "./user.service.spec";

describe("User Controller", () => {
  let controller: UserController;
  let userId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
      controllers: [UserController],
      providers: [UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterAll(async () => {
    const connection = getConnection();

    await connection.dropDatabase();
    await connection.close();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a new user", async () => {
    const result = await controller.create(user);

    expect(result).toMatchObject(user);
    expect(result).toHaveProperty("id");
    expect(result.isActive).toBe(false);
    expect(result.role).toBe("user");

    userId = result.id;
  });

  it("should return an array of saved users", async () => {
    const result = await controller.getAll();

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].email).toBe(user.email);
  });

  it("should return a user by id", async () => {
    const result = await controller.getOne(userId);

    expect(result).toMatchObject(user);
  });

  it("should return an error when user was not found", async () => {
    const id = uuid();

    try {
      await controller.getOne(id);
    } catch (e) {
      expect(e.message).toBe("User not found");
      expect(e.response).toBe("User not found");
      expect(e.status).toBe(404);
    }
  });

  it("should return an error when user was not found", async () => {
    const id = uuid();
    const updatedUser = { ...user, firstName: "Stan" };

    try {
      await controller.update(id, updatedUser);
    } catch (e) {
      expect(e.message).toBe("User not found");
      expect(e.response).toBe("User not found");
      expect(e.status).toBe(404);
    }
  });

  it("should update a user with new data", async () => {
    const updatedUser = { ...user, firstName: "Stan" };
    const result = await controller.update(userId, updatedUser);

    expect(result).toBeDefined();
    expect(result.email).toBe(user.email);
    expect(result.firstName).toBe(updatedUser.firstName);
  });

  it("should return an error when user was not found", async () => {
    const id = uuid();

    try {
      await controller.delete(id);
    } catch (e) {
      expect(e.message).toBe("User not found");
      expect(e.response).toBe("User not found");
      expect(e.status).toBe(404);
    }
  });

  it("should return a delete result", async () => {
    const result = await controller.delete(userId);

    expect(result).toBeDefined();
    expect(result.affected).toBe(1);
  });
});
