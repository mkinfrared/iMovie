import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Genre } from "modules/genre/genre.entity";

type GenreType = {
  id: number;
  name: string;
};

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>
  ) {}

  createGenres(genres: GenreType[]) {
    const newGenres: Genre[] = [];

    genres.forEach(({ id, name }) => {
      const genre = this.genreRepository.create({ id, name });

      newGenres.push(genre);
    });

    return this.genreRepository.save(newGenres);
  }
}
