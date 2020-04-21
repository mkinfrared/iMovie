import { Test, TestingModule } from "@nestjs/testing";

import { AuditoriumController } from "./auditorium.controller";
import { AuditoriumService } from "./auditorium.service";
import {
  auditoriumDtoMock,
  auditoriumMock,
  auditoriumServiceMock
} from "./auditorium.service.mock";

describe("Auditorium Controller", () => {
  const mockAuditoriumService = jest.fn(() => ({ ...auditoriumServiceMock }));

  let controller: AuditoriumController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditoriumController],
      providers: [
        { provide: AuditoriumService, useClass: mockAuditoriumService }
      ]
    }).compile();

    controller = module.get<AuditoriumController>(AuditoriumController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should call 'save' on auditorium service and return a result", async () => {
    auditoriumServiceMock.create.mockReturnValueOnce(auditoriumMock);

    const result = await controller.create(auditoriumDtoMock);

    expect(result).toBeDefined();
    expect(result.name).toBe(auditoriumMock.name);
    expect(auditoriumServiceMock.create).toHaveBeenCalledWith(
      auditoriumDtoMock
    );
  });

  it("should call 'getOne' on auditorium service and return a result", async () => {
    const id = 42;

    auditoriumServiceMock.getOne.mockReturnValueOnce(auditoriumMock);

    const result = await controller.getOne(id);

    expect(result).toBeDefined();
    expect(result?.name).toBe(auditoriumMock.name);
    expect(auditoriumServiceMock.getOne).toHaveBeenCalledWith(id);
  });

  it("should call 'update' on auditorium service and return a result", async () => {
    const id = 42;

    auditoriumServiceMock.update.mockReturnValueOnce(auditoriumMock);

    const result = await controller.update({ id, name: auditoriumMock.name });

    expect(result).toBeDefined();
    expect(result?.name).toBe(auditoriumMock.name);
    expect(auditoriumServiceMock.update).toHaveBeenCalled();
  });

  it("should call throw an error when auditorium was not found", async () => {
    const id = 42;

    let error: any;

    auditoriumServiceMock.update.mockReturnValueOnce(undefined);

    try {
      await controller.update({ id, name: auditoriumMock.name });
    } catch (e) {
      error = e;
    }

    expect(error.message).toBe("Auditorium not found");
    expect(error.status).toBe(404);
    expect(auditoriumServiceMock.update).toHaveBeenCalled();
  });

  it("should call 'delete' on auditorium service and return a result", async () => {
    const id = 42;

    auditoriumServiceMock.delete.mockReturnValueOnce({ affected: 1 });

    const result = await controller.delete(id);

    expect(result).toBeDefined();
    expect(auditoriumServiceMock.delete).toHaveBeenCalledWith(id);
  });

  it("should call throw an error when auditorium was not found", async () => {
    const id = 42;

    let error: any;

    auditoriumServiceMock.delete.mockReturnValueOnce(undefined);

    try {
      await controller.delete(id);
    } catch (e) {
      error = e;
    }

    expect(error.message).toBe("Auditorium not found");
    expect(error.status).toBe(404);
    expect(auditoriumServiceMock.delete).toHaveBeenCalledWith(id);
  });
});
