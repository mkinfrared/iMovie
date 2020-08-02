import { Test, TestingModule } from "@nestjs/testing";

import { ShowtimeController } from "modules/showtime/showtime.controller";
import { ShowtimeService } from "modules/showtime/showtime.service";
import { showtimeServiceMock } from "modules/showtime/showtime.service.mock";

describe("Showtime Controller", () => {
  const mockShowtimeService = jest.fn(() => ({ ...showtimeServiceMock }));

  let controller: ShowtimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowtimeController],
      providers: [{ provide: ShowtimeService, useClass: mockShowtimeService }]
    }).compile();

    controller = module.get<ShowtimeController>(ShowtimeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
