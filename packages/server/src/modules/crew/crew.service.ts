import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Crew } from "modules/crew/crew.entity";
import { CrewDto } from "modules/crew/dto/crew.dto";
import { Movie } from "modules/movie/movie.entity";
import { PersonService } from "modules/person/person.service";

@Injectable()
export class CrewService {
  constructor(
    @InjectRepository(Crew) private readonly crewRepository: Repository<Crew>,
    private readonly personService: PersonService
  ) {}

  async create(crewDtos: CrewDto[], movie: Movie) {
    const peopleIds = crewDtos.map(({ id }) => id);
    const people = await this.personService.createMany(peopleIds);
    const crew: Crew[] = [];

    crewDtos.forEach(({ department, job, id }) => {
      const person = people.find((pers) => pers.id === id);

      const credit = this.crewRepository.create({
        department,
        job,
        movie,
        person
      });

      crew.push(credit);
    });

    return this.crewRepository.save(crew);
  }
}
