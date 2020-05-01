import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";

import { Auditorium } from "./auditorium.entity";
import { AuditoriumService } from "./auditorium.service";
import { auditoriumDtoMock, auditoriumMock } from "./auditorium.service.mock";

describe("AuditoriumService", () => {
  const mockAuditoriumRepository = jest.fn(() => ({ ...repositoryMock }));

  let service: AuditoriumService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditoriumService,
        {
          provide: getRepositoryToken(Auditorium),
          useClass: mockAuditoriumRepository
        }
      ]
    }).compile();

    service = module.get<AuditoriumService>(AuditoriumService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new auditorium record", async () => {
    repositoryMock.save.mockReturnValueOnce(auditoriumMock);

    const result = await service.create(auditoriumDtoMock);

    expect(result).toBeDefined();

    expect(result.name).toBe(auditoriumMock.name);

    expect(repositoryMock.create).toHaveBeenCalledWith(auditoriumDtoMock);

    expect(repositoryMock.save).toHaveBeenCalled();
  });

  it("should get an auditorium record", async () => {
    const id = 42;

    repositoryMock.findOne.mockReturnValueOnce(auditoriumMock);

    const result = await service.getOne(id);

    expect(result).toBeDefined();

    expect(result?.name).toBe(auditoriumMock.name);

    expect(repositoryMock.findOne).toHaveBeenCalledWith(id);
  });

  it("should update an auditorium record and return it", async () => {
    const id = 42;

    repositoryMock.update.mockReturnValueOnce({ affected: 1 });

    repositoryMock.findOne.mockReturnValueOnce(auditoriumMock);

    const result = await service.update({ id, name: auditoriumMock.name });

    expect(result).toBeDefined();

    expect(result?.name).toBe(auditoriumMock.name);

    expect(repositoryMock.update).toHaveBeenCalled();
  });

  it("should return undefined when auditorium was not found", async () => {
    const id = 42;

    repositoryMock.update.mockReturnValueOnce({ affected: 0 });

    repositoryMock.findOne.mockReturnValueOnce(auditoriumMock);

    const result = await service.update({ id, name: auditoriumMock.name });

    expect(result).toBeUndefined();

    expect(repositoryMock.update).toHaveBeenCalled();
  });

  it("should return a delete result", async () => {
    const id = 42;

    repositoryMock.delete.mockReturnValueOnce({ affected: 1 });

    const result = await service.delete(id);

    expect(result).toBeDefined();

    expect(repositoryMock.delete).toHaveBeenCalledWith(id);
  });

  it("should return undefined when auditorium was not found", async () => {
    const id = 42;

    repositoryMock.delete.mockReturnValueOnce({ affected: 0 });

    const result = await service.delete(id);

    expect(result).toBeUndefined();

    expect(repositoryMock.delete).toHaveBeenCalledWith(id);
  });
});
