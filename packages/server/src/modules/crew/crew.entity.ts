import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Movie } from "modules/movie/movie.entity";
import { Person } from "modules/person/person.entity";

@Entity()
export class Crew {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  department: string;

  @Column()
  job: string;

  @ManyToOne(() => Person, (person) => person.id)
  person: Person;

  @ManyToOne(() => Movie, (movie) => movie.id)
  movie: Movie;
}
