import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Repository } from "typeorm";

import { LoggerService } from "config/logger/logger.service";
import { NODE_ENV } from "config/secrets";
import { Country } from "modules/country/country.entity";
import Pagination from "utils/pagination";

@Injectable()
export class CountryService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.setContext(CountryService.name);
  }

  async getAll(offset = 1, limit = 20) {
    const [countries, total] = await this.countryRepository.findAndCount({
      take: limit,
      skip: limit * (offset - 1)
    });

    return new Pagination(countries, total, offset);
  }

  getOne(alpha2Code: string) {
    return this.countryRepository.findOne(alpha2Code);
  }

  async onApplicationBootstrap() {
    if (NODE_ENV !== "test") {
      try {
        const response = await axios.get(
          "https://restcountries.eu/rest/v2/all"
        );
        const { data } = response;
        const countries: Partial<Country>[] = data.map(
          (element: Record<string, any>) => {
            const { callingCodes } = element;
            const callingCode = callingCodes[0].replace(/\s/g, "") || null;

            return { ...element, callingCode };
          }
        );

        this.countryRepository.save(countries);
      } catch (e) {
        this.loggerService.error(e);
      }
    }
  }
}
