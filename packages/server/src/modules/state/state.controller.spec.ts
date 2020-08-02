import { Test, TestingModule } from "@nestjs/testing";

import { StateController } from "modules/state/state.controller";
import { StateService } from "modules/state/state.service";
import { stateServiceMock } from "modules/state/state.service.mock";

describe("State Controller", () => {
  const mockStateService = jest.fn(() => ({ ...stateServiceMock }));

  let controller: StateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [{ provide: StateService, useClass: mockStateService }]
    }).compile();

    controller = module.get<StateController>(StateController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
