import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { getConnection } from "typeorm";

import { AppModule } from "app.module";
import { userDtoMock } from "modules/user/user.service.mock";

describe("UserController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    const connection = getConnection();

    await connection.dropDatabase();
    await app.close();
  });

  it("/user (POST)", async () => {
    const result = await request(app.getHttpServer())
      .post("/user")
      .send(userDtoMock)
      .expect(201)
      .expect((res) => {
        expect(res.body.email).toBe(userDtoMock.email);
        expect(res.body.username).toBe(userDtoMock.username);
        expect(res.body.isActive).toBe(false);
        expect(res.body.role).toBe("user");
        expect(res.body.id).toBeDefined();
      });

    return result;
  });
});
