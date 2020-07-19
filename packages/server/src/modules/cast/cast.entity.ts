import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Movie } from "modules/movie/movie.entity";
import { Person } from "modules/person/person.entity";

@Entity()
export class Cast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  character: string;

  @Column()
  order: number;

  @ManyToOne(() => Person, (person) => person.id, { eager: true })
  person: Person;

  @ManyToOne(() => Movie, (movie) => movie.id)
  movie: Movie;
}
