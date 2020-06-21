/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Company } from "modules/company/company.entity";
import { CompanyResponse } from "modules/company/dto/company.dto";
import { CountryService } from "modules/country/country.service";
import tmdbApi from "utils/tmdbApi";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly countryService: CountryService
  ) {}

  async createMany(companyIds: number[]) {
    const existingCompanies = await this.companyRepository.findByIds(
      companyIds
    );

    const newCompanyIds = companyIds.filter(
      (companyId) => !existingCompanies.some(({ id }) => id === companyId)
    );

    const response = await Promise.all(
      newCompanyIds.map((companyId) =>
        tmdbApi.get<CompanyResponse>(`/company/${companyId}`)
      )
    );

    const newCompanies = await Promise.all(
      response.map(async ({ data }) => {
        const { logo_path, origin_country, ...rest } = data;
        const country = await this.countryService.getOne(origin_country);

        const company = this.companyRepository.create({
          logo: logo_path,
          originCountry: country,
          ...rest
        });

        return company;
      })
    );

    const insertedCompanies = await this.companyRepository.save(newCompanies);

    return [...existingCompanies, ...insertedCompanies];
  }
}
