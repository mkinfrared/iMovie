import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { State } from "./state.entity";

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>
  ) {}

  async upsert(name: string, countryId: string, abbreviation?: string) {
    const state = this.stateRepository.create({
      name,
      abbreviation,
      countryId
    });

    const { generatedMaps } = await this.stateRepository
      .createQueryBuilder()
      .insert()
      .into(State)
      .values(state)
      .onConflict('(name, "countryId") DO UPDATE SET "updatedAt" = :now')
      .setParameter("now", new Date())
      .returning("*")
      .execute();

    const [result] = generatedMaps;

    return result as State;
  }
}
