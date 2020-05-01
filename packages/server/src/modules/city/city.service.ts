import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { City } from "./city.entity";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private readonly cityRepository: Repository<City>
  ) {}

  async upsert(name: string, stateId: number, countryId: string) {
    const city = this.cityRepository.create({
      name,
      stateId,
      countryId
    });

    const { generatedMaps } = await this.cityRepository
      .createQueryBuilder()
      .insert()
      .into(City)
      .values(city)
      .onConflict(
        '(name, "stateId", "countryId") DO UPDATE SET "updatedAt" = :now'
      )
      .setParameter("now", new Date())
      .returning("*")
      .execute();

    const [result] = generatedMaps;

    return result as City;
  }
}
