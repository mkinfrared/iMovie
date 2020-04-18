import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request, { SuperTest } from "supertest";
import { Connection, getConnection } from "typeorm";

import { AppModule } from "app.module";
import { authDtoMock } from "modules/auth/auth.service.mock";
import { userDtoMock } from "modules/user/user.service.mock";

describe("UserController (e2e)", () => {
  let app: INestApplication;
  let connection: Connection;
  let agent: SuperTest<request.Test>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = getConnection();

    await connection.dropDatabase();
    await connection.synchronize();
    await app.init();

    agent = request.agent(app.getHttpServer());
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await app.close();
  });

  it("/user (POST)", async () => {
    const result = await agent
      .post("/user")
      .send(userDtoMock)
      .expect(201)
      .expect((res) => {
        expect(res.body.email).toBe(userDtoMock.email);
        expect(res.body.username).toBe(userDtoMock.username);
        expect(res.body.isActive).toBe(false);
        expect(res.body.role).toBe("user");
        expect(res.body.id).toBeDefined();
        expect(res.body.password).toBeUndefined();
      });

    return result;
  });

  it("/auth (POST)", async () => {
    const result = await agent
      .post("/auth")
      .send(authDtoMock)
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe(userDtoMock.email);
        expect(res.body.username).toBe(userDtoMock.username);
        expect(res.body.isActive).toBe(false);
        expect(res.body.role).toBe("user");
        expect(res.body.id).toBeDefined();
        expect(res.body.password).toBeUndefined();
      });

    return result;
  });

  it("/user (GET)", async () => {
    const result = await agent
      .get("/user")
      .send()
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe(userDtoMock.email);
        expect(res.body.username).toBe(userDtoMock.username);
        expect(res.body.isActive).toBe(false);
        expect(res.body.role).toBe("user");
        expect(res.body.id).toBeDefined();
        expect(res.body.password).toBeUndefined();
      });

    return result;
  });

  it("/user/all (GET)", async () => {
    const result = await agent
      .get("/user/all")
      .send()
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
        expect(res.body[0].id).toBeDefined();
        expect(res.body[0].username).toBe(userDtoMock.username);
        expect(res.body[0].password).toBeUndefined();
      });

    return result;
  });
});
