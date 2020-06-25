import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Movie } from "modules/movie/movie.entity";

@Entity()
export class Genre {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Movie, (movie) => movie.genres)
  movie: Movie;
}
