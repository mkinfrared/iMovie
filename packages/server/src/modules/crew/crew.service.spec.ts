import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";
import { Crew } from "modules/crew/crew.entity";
import { PersonService } from "modules/person/person.service";
import { personServiceMock } from "modules/person/person.service.mock";

import { CrewService } from "./crew.service";

describe("CrewService", () => {
  let service: CrewService;

  const mockCrewRepository = jest.fn(() => ({ ...repositoryMock }));
  const mockPersonService = jest.fn(() => ({ ...personServiceMock }));

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrewService,
        { provide: getRepositoryToken(Crew), useClass: mockCrewRepository },
        { provide: PersonService, useClass: mockPersonService }
      ]
    }).compile();

    service = module.get<CrewService>(CrewService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create crew and save in database", async () => {
    const crew = { department: "Music", job: "Composer" } as any;

    const movie = {
      name: "Professor Chaos"
    } as any;

    const person = { name: "Butters" };

    const data = {
      ...crew,
      movie,
      person
    };

    personServiceMock.createMany.mockReturnValueOnce(Promise.resolve([person]));

    const result = await service.create([crew], movie);

    expect(result).toHaveLength(1);

    expect(result[0]).toMatchObject(data);

    expect(repositoryMock.save).toHaveBeenCalledWith([data]);
  });

  it("should call find on crewRepository", async () => {
    const movie = {
      name: "Professor Chaos"
    } as any;

    const job = "Director";

    await service.getCrewByByMovie(movie, job);

    expect(repositoryMock.find).toHaveBeenCalled();
  });
});
