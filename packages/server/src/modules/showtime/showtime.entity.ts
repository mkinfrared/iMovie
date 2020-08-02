import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Auditorium } from "modules/auditorium/auditorium.entity";
import { Movie } from "modules/movie/movie.entity";

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamptz" })
  startDate: Date;

  @ManyToOne(() => Movie, (movie) => movie.id)
  movie: Movie;

  @ManyToOne(() => Auditorium, (auditorium) => auditorium.id)
  auditorium: Auditorium;
}
