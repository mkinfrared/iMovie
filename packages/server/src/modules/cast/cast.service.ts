import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Cast } from "modules/cast/cast.entity";
import { CastDto } from "modules/cast/dto/cast.dto";
import { Movie } from "modules/movie/movie.entity";
import { PersonService } from "modules/person/person.service";

@Injectable()
export class CastService {
  constructor(
    @InjectRepository(Cast) private readonly castRepository: Repository<Cast>,
    private readonly personService: PersonService
  ) {}

  async create(castDtos: CastDto[], movie: Movie) {
    const peopleIds = castDtos.map(({ id }) => id);
    const people = await this.personService.createMany(peopleIds);
    const cast: Cast[] = [];

    castDtos.forEach(({ character, order, id }) => {
      const person = people.find((pers) => pers.id === id);

      const credit = this.castRepository.create({
        character,
        movie,
        order,
        person
      });

      cast.push(credit);
    });

    return this.castRepository.save(cast);
  }

  getCastByMovie(movie: Movie) {
    return this.castRepository.find({
      where: { movie },
      order: { order: "ASC" }
    });
  }
}
