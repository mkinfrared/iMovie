import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";

import { Cinema } from "./cinema.entity";
import { CinemaService } from "./cinema.service";
import { cinemaDtoMock, cinemaMock } from "./cinema.service.mock";

describe("CinemaService", () => {
  let service: CinemaService;

  const mockCinemaRepository = jest.fn(() => ({ ...repositoryMock }));

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CinemaService,
        { provide: getRepositoryToken(Cinema), useClass: mockCinemaRepository }
      ]
    }).compile();

    service = module.get<CinemaService>(CinemaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a cinema entity", async () => {
    repositoryMock.create.mockReturnValueOnce(cinemaMock);

    const result = await service.create(cinemaDtoMock);

    expect(result).toBeDefined();
    expect(result.name).toBe(cinemaMock.name);
    expect(repositoryMock.create).toHaveBeenCalledWith(cinemaDtoMock);
    expect(repositoryMock.save).toHaveBeenCalled();
  });

  it("should return a cinema entity by id", async () => {
    repositoryMock.findOne.mockReturnValueOnce(cinemaMock);

    const result = await service.get(cinemaMock.id);

    expect(result).toBeDefined();
    expect(result?.name).toBe(cinemaMock.name);
    expect(repositoryMock.findOne).toHaveBeenCalledWith(cinemaMock.id);
  });

  it("should return cinema entities as paginated result", async () => {
    const total = 1;
    const data = [cinemaMock];

    repositoryMock.findAndCount.mockReturnValueOnce([data, total]);

    const result = await service.getAll();

    expect(result).toBeDefined();
    expect(result.result).toHaveLength(1);
    expect(result.result[0].name).toBe(cinemaMock.name);
    expect(repositoryMock.findAndCount).toHaveBeenCalled();
  });

  it("should return an updated result", async () => {
    repositoryMock.update.mockReturnValueOnce({ affected: 1 });
    repositoryMock.findOne.mockReturnValueOnce(cinemaMock);

    const result = await service.update(cinemaMock.id, cinemaMock);

    expect(result).toBeDefined();
    expect(result?.name).toBe(cinemaMock.name);
    expect(repositoryMock.update).toHaveBeenCalledWith(
      cinemaMock.id,
      cinemaMock
    );
  });

  it("should return undefined when cinema doesn't exist", async () => {
    repositoryMock.update.mockReturnValueOnce({ affected: 0 });

    const result = await service.update(cinemaMock.id, cinemaMock);

    expect(result).toBeUndefined();
    expect(repositoryMock.update).toHaveBeenCalledWith(
      cinemaMock.id,
      cinemaMock
    );
  });

  it("should return a delete result", async () => {
    repositoryMock.delete.mockReturnValueOnce({ affected: 1 });

    const result = await service.delete(cinemaMock.id);

    expect(result).toBeDefined();
    expect(repositoryMock.delete).toHaveBeenCalledWith(cinemaMock.id);
  });

  it("should return undefined when cinema was not found", async () => {
    repositoryMock.delete.mockReturnValueOnce({ affected: 0 });

    const result = await service.delete(cinemaMock.id);

    expect(result).toBeUndefined();
    expect(repositoryMock.delete).toHaveBeenCalledWith(cinemaMock.id);
  });
});
