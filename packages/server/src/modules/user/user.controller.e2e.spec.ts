import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { getConnection } from "typeorm";

import { AppModule } from "app.module";
import { user } from "modules/user/user.service.spec";

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

  it("/user (POST)", () => {
    return request(app.getHttpServer())
      .post("/user")
      .send(user)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject(user);
      });
  });
});
