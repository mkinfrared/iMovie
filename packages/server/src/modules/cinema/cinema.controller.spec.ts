import { Test, TestingModule } from "@nestjs/testing";

import { CinemaController } from "./cinema.controller";
import { CinemaService } from "./cinema.service";
import {
  cinemaDtoMock,
  cinemaMock,
  cinemaServiceMock
} from "./cinema.service.mock";

describe("Cinema Controller", () => {
  const mockCinemaService = jest.fn(() => ({ ...cinemaServiceMock }));

  let controller: CinemaController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CinemaController],
      providers: [{ provide: CinemaService, useClass: mockCinemaService }]
    }).compile();

    controller = module.get<CinemaController>(CinemaController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should call 'create' on cinema service and return cinema", async () => {
    cinemaServiceMock.create.mockReturnValueOnce(cinemaMock);

    const result = await controller.create(cinemaDtoMock);

    expect(result).toBeDefined();
    expect(result.name).toBe(cinemaMock.name);
    expect(cinemaServiceMock.create).toHaveBeenCalledWith(cinemaDtoMock);
  });

  it("should call 'getAll' on cinema service", async () => {
    const page = "4";
    const limit = "27";

    cinemaServiceMock.getAll.mockReturnValueOnce(cinemaMock);

    const result = await controller.getAll(page, limit);

    expect(result).toBeDefined();
    expect(cinemaServiceMock.getAll).toHaveBeenCalledWith(+page, +limit);
  });

  it("should call 'get' on cinema service and return a cinema by id", async () => {
    cinemaServiceMock.get.mockReturnValueOnce(cinemaMock);

    const result = await controller.get(cinemaMock.id);

    expect(result).toBeDefined();
    expect(result?.name).toBe(cinemaMock.name);
    expect(cinemaServiceMock.get).toHaveBeenCalledWith(cinemaMock.id);
  });

  it("should call 'update' on cinema service and return a cinema", async () => {
    cinemaServiceMock.update.mockReturnValueOnce(cinemaMock);

    const result = await controller.update(cinemaMock);

    expect(result).toBeDefined();
    expect(result?.name).toBe(cinemaMock.name);
    expect(cinemaServiceMock.get).toHaveBeenCalledWith(cinemaMock.id);
  });

  it("should call 'update' on cinema service and throw an error", async () => {
    let error: any;

    cinemaServiceMock.update.mockReturnValueOnce(undefined);

    try {
      await controller.update(cinemaMock);
    } catch (e) {
      error = e;
    }

    expect(error.message).toBe("Cinema not found");
    expect(error.status).toBe(404);
  });

  it("should call 'delete' on cinema service and return a delete result", async () => {
    cinemaServiceMock.delete.mockReturnValueOnce({ affected: 1 });

    const result = await controller.delete(cinemaMock.id);

    expect(result).toBeDefined();
    expect(cinemaServiceMock.delete).toHaveBeenCalledWith(cinemaMock.id);
  });

  it("should call 'delete' on cinema service and throw an error", async () => {
    let error: any;

    cinemaServiceMock.delete.mockReturnValueOnce(undefined);

    try {
      await controller.delete(cinemaMock.id);
    } catch (e) {
      error = e;
    }

    expect(error.message).toBe("Cinema not found");
    expect(error.status).toBe(404);
  });
});
