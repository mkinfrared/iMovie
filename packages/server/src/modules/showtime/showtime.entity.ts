import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Auditorium } from "modules/auditorium/auditorium.entity";
import { Movie } from "modules/movie/movie.entity";

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamptz" })
  startDate: Date;

  @Column({ type: "timestamptz" })
  endDate: Date;

  @Column()
  auditoriumId: number;

  @Column()
  movieId: number;

  @ManyToOne(() => Movie, (movie) => movie.id)
  @JoinColumn({ name: "movieId" })
  movie: Movie;

  @ManyToOne(() => Auditorium, (auditorium) => auditorium.id)
  @JoinColumn({ name: "auditoriumId" })
  auditorium: Auditorium;
}
