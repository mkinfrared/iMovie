/* eslint-disable @typescript-eslint/camelcase */
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { repositoryMock } from "config/db/database.service.mock";
import { Company } from "modules/company/company.entity";
import { companyResponseMock } from "modules/company/company.service.mock";
import { CountryService } from "modules/country/country.service";
import { countryServiceMock } from "modules/country/country.service.mock";
import tmdbApi from "utils/tmdbApi";

import { CompanyService } from "./company.service";

jest.mock("utils/tmdbApi");

describe("CompanyService", () => {
  let service: CompanyService;

  const mockCompanyRepository = jest.fn(() => ({ ...repositoryMock }));
  const mockCountryService = jest.fn(() => ({ ...countryServiceMock }));
  const tmdbMock = tmdbApi as jest.Mocked<typeof tmdbApi>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useClass: mockCompanyRepository
        },
        { provide: CountryService, useClass: mockCountryService }
      ]
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("add new companies", async () => {
    const id = 42;
    const country = { name: "USA" };
    const { logo_path, origin_country, ...rest } = companyResponseMock;

    const data = {
      logo: logo_path,
      originCountry: country,
      ...rest
    };

    tmdbMock.get.mockReturnValueOnce(
      Promise.resolve({ data: companyResponseMock } as any)
    );

    repositoryMock.findByIds.mockReturnValueOnce([]);

    countryServiceMock.getOne.mockReturnValueOnce(country);

    const result = await service.createMany([id]);

    expect(repositoryMock.save).toHaveBeenCalledWith([data]);

    expect(result).toHaveLength(1);

    expect(result[0]).toMatchObject(data);
  });
});
