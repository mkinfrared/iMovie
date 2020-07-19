import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Connection, Repository } from "typeorm";

import { LoggerService } from "config/logger/logger.service";
import { City } from "modules/city/city.entity";
import { CityService } from "modules/city/city.service";
import { State } from "modules/state/state.entity";
import { StateService } from "modules/state/state.service";

import { Zipcode } from "./zipcode.entity";

@Injectable()
export class ZipcodeService {
  constructor(
    @InjectRepository(Zipcode)
    private readonly zipcodeRepository: Repository<Zipcode>,
    private readonly connection: Connection,
    private readonly stateService: StateService,
    private readonly cityService: CityService,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.setContext(Zipcode.name);
  }

  create(
    code: string,
    cityId: number,
    stateId: number,
    countryId: string,
    longitude: string,
    latitude: string
  ) {
    const zipcode = this.zipcodeRepository.create({
      code,
      cityId,
      stateId,
      countryId,
      latitude,
      longitude
    });

    return this.zipcodeRepository.save(zipcode);
  }

  async getByCodeAndCountry(code: string, countryId: string) {
    countryId = countryId.toUpperCase();

    const zipcode = await this.zipcodeRepository.findOne({
      where: { code, countryId },
      relations: ["city", "state", "country"]
    });

    if (zipcode) {
      return zipcode;
    }

    try {
      const response = await axios.get(
        `http://api.zippopotam.us/${countryId}/${code}`
      );

      const { places } = response.data;
      const [place] = places;
      // Create state
      const stateName = place.state;
      const stateAbbr = place["state abbreviation"];

      const state = await this.stateService.upsert(
        stateName,
        countryId,
        stateAbbr
      );

      // Create city
      const cityName = place["place name"];
      const city = await this.cityService.upsert(cityName, state.id, countryId);
      // Create zipcode
      const zipLong = place.longitude;
      const zipLat = place.latitude;

      await this.create(code, city.id, state.id, countryId, zipLong, zipLat);

      this.createZipcodesByCity(state.countryId, state, city);

      return this.zipcodeRepository.findOne({
        where: { code, countryId },
        relations: ["city", "state", "country"]
      });
    } catch (e) {
      this.loggerService.error(e);

      return undefined;
    }
  }

  getAll() {
    return this.zipcodeRepository.find();
  }

  getOne(id: number) {
    return this.zipcodeRepository.findOne(id, {
      relations: ["city", "state", "country"]
    });
  }

  async createZipcodesByCity(countryId: string, state: State, city: City) {
    try {
      const response = await axios.get(
        `http://api.zippopotam.us/${countryId}/${state.abbreviation}/${city.name}`
      );

      const { places } = response.data;

      if (!places) {
        return;
      }

      const zipcodes = places.map((place: Record<string, any>) => {
        return this.zipcodeRepository.create({
          code: place["post code"],
          latitude: place.latitude,
          longitude: place.longitude,
          cityId: city.id,
          stateId: state.id,
          countryId
        });
      });

      const queryRunner = this.connection.createQueryRunner();

      await queryRunner.manager.transaction(async (entityManager) => {
        await entityManager
          .createQueryBuilder()
          .insert()
          .into(Zipcode)
          .values(zipcodes)
          .onConflict(
            '(code, "cityId", "countryId") DO UPDATE SET "updatedAt" = :now'
          )
          .setParameter("now", new Date())
          .execute();
      });
    } catch (e) {
      this.loggerService.log(e);
    }
  }
}
