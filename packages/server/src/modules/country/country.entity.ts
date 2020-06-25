import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";

import { Movie } from "modules/movie/movie.entity";

@Entity()
export class Country {
  @PrimaryColumn()
  alpha2Code: string;

  @Column()
  name: string;

  @Column()
  alpha3Code: string;

  @Column({ nullable: true })
  callingCode?: number;

  @Column()
  region: string;

  @Column()
  subregion: string;

  @Column()
  nativeName: string;

  @Column()
  flag: string;

  @Column({ nullable: true })
  cioc?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Movie, (movie) => movie.countries)
  movie: Movie;
}
