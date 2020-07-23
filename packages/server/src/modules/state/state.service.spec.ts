import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";

import { State } from "./state.entity";
import { StateService } from "./state.service";
import { stateMock } from "./state.service.mock";

describe("StateService", () => {
  const mockStateRepository = jest.fn(() => ({ ...repositoryMock }));

  let service: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        { provide: getRepositoryToken(State), useClass: mockStateRepository }
      ]
    }).compile();

    service = module.get<StateService>(StateService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return state", async () => {
    const { name, abbreviation, countryId } = stateMock;

    repositoryMock.execute.mockReturnValueOnce({
      generatedMaps: [{ ...stateMock }]
    });

    const result = await service.upsert(name, countryId, abbreviation);

    expect(result.name).toBe(name);

    expect(result.abbreviation).toBe(abbreviation);

    expect(result.countryId).toBe(countryId);
  });
});
