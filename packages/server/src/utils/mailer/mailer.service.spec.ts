import { Test, TestingModule } from "@nestjs/testing";

import { TokenService } from "modules/token/token.service";
import { tokenServiceMock } from "modules/token/token.service.mock";
import { MailerService } from "utils/mailer/mailer.service";

describe("MailerService", () => {
  let service: MailerService;

  const mockTokenService = jest.fn(() => ({ ...tokenServiceMock }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerService,
        {
          provide: TokenService,
          useClass: mockTokenService
        }
      ]
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
