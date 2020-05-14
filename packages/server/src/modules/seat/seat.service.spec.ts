import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";
import { Seat } from "modules/seat/seat.entity";
import { SeatService } from "modules/seat/seat.service";

describe("SeatService", () => {
  const mockSeatRepository = jest.fn(() => ({ ...repositoryMock }));

  let service: SeatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeatService,
        { provide: getRepositoryToken(Seat), useClass: mockSeatRepository }
      ]
    }).compile();

    service = module.get<SeatService>(SeatService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create seat records", async () => {
    repositoryMock.create.mockImplementation((args: any) => ({ ...args }));

    await service.createMany({ A: 1 }, 42);

    const result = [{ row: "A", number: 1, auditoriumId: 42 }];

    expect(repositoryMock.save).toHaveBeenCalledWith(result);
  });
});
