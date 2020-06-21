import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";
import { Cast } from "modules/cast/cast.entity";
import { CastService } from "modules/cast/cast.service";
import { PersonService } from "modules/person/person.service";
import { personServiceMock } from "modules/person/person.service.mock";

describe("CastService", () => {
  let service: CastService;

  const mockCastRepository = jest.fn(() => ({ ...repositoryMock }));
  const mockPersonService = jest.fn(() => ({ ...personServiceMock }));

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CastService,
        { provide: getRepositoryToken(Cast), useClass: mockCastRepository },
        { provide: PersonService, useClass: mockPersonService }
      ]
    }).compile();

    service = module.get<CastService>(CastService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should call save on castRepository", async () => {
    const castDto = {
      character: "Towellie",
      order: 42,
      id: 7
    } as any;

    const movie = {
      title: "Marklar"
    } as any;

    personServiceMock.createMany.mockReturnValueOnce([{ id: 7 }]);

    const data = { character: "Towellie", order: 42, movie, person: { id: 7 } };
    const result = await service.create([castDto], movie);

    expect(result).toHaveLength(1);

    expect(result[0]).toMatchObject(data);
  });
});
