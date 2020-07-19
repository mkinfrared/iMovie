/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import unique from "lodash/uniq";
import { Repository } from "typeorm";

import { LoggerService } from "config/logger/logger.service";
import { PersonDto } from "modules/person/dto/person.dto";
import tmdbApi from "utils/tmdbApi";

import { Person } from "./person.entity";

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.setContext(PersonService.name);
  }

  async fetchPeople(peopleIds: number[]) {
    let attempts = 5;

    const response = await Promise.allSettled(
      peopleIds.map((personId) => tmdbApi.get<PersonDto>(`/person/${personId}`))
    );

    let failedResponse = response.filter(({ status }) => status === "rejected");

    while (failedResponse.length > 0 && attempts > 0) {
      this.loggerService.warn(
        `Fetching people resulted in ${failedResponse.length} failed responses. Retrying. Attempts left ${attempts}`
      );

      const failedIds = this.getFailedIds(
        failedResponse as PromiseRejectedResult[]
      );

      const retryResponse = await Promise.allSettled(
        failedIds.map((personId) =>
          tmdbApi.get<PersonDto>(`/person/${personId}`)
        )
      );

      response.concat(retryResponse);

      failedResponse = retryResponse.filter(
        ({ status }) => status === "rejected"
      );

      attempts--;

      if (attempts === 0) {
        const idsFailed = this.getFailedIds(
          failedResponse as PromiseRejectedResult[]
        );

        idsFailed.forEach((id) => {
          this.loggerService.warn(`Failed to fetch person with id: ${id}`);
        });
      }
    }

    return response;
  }

  async createMany(peopleIds: number[]) {
    const uniqueIds = unique(peopleIds);
    const existingPeople = await this.getMany(uniqueIds);

    const newPeopleIds = uniqueIds.filter(
      (personId) => !existingPeople.some(({ id }) => id === personId)
    );

    const response = await this.fetchPeople(newPeopleIds);
    const people: Person[] = [];

    response.forEach((promise) => {
      if (promise.status === "fulfilled") {
        const {
          imdb_id,
          place_of_birth,
          profile_path,
          ...info
        } = promise.value.data;

        const person = this.personRepository.create({
          ...info,
          imdbId: imdb_id,
          placeOfBirth: place_of_birth,
          profilePath: profile_path
        });

        people.push(person);
      }
    });

    const nullIds = people.filter(({ id }) => id === null);

    this.loggerService.warn(`NULL IDs: ${nullIds.toString()}`);

    const {
      generatedMaps
    } = await this.personRepository
      .createQueryBuilder()
      .insert()
      .into(Person)
      .values(people)
      .onConflict('(id) DO UPDATE SET "updatedAt" = :now')
      .setParameter("now", new Date())
      .returning("*")
      .execute();

    return [...existingPeople, ...generatedMaps];
  }

  getMany(personIds: number[]) {
    return this.personRepository.findByIds(personIds);
  }

  getFailedIds(failedResponse: PromiseRejectedResult[]) {
    const ids = failedResponse.map(({ reason }) => {
      const url = reason.config.url as string;
      const regex = /\d/g;
      const match = url.match(regex);
      const id = match!.join("");

      return parseInt(id, 0);
    });

    return ids;
  }

  getPeopleByName(value: string) {
    return this.personRepository
      .createQueryBuilder()
      .where("LOWER(name) LIKE :name", { name: `%${value.toLowerCase()}%` })
      .limit(10)
      .getMany();
  }
}
