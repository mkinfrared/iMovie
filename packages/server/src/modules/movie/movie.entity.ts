import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { Cast } from "modules/cast/cast.entity";
import { Company } from "modules/company/company.entity";
import { Country } from "modules/country/country.entity";
import { Crew } from "modules/crew/crew.entity";
import { Genre } from "modules/genre/genre.entity";

@Entity()
export class Movie {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  backdropPath: string;

  @Column()
  budget: number;

  @Column({ nullable: true })
  domesticGross: number;

  @Column({ nullable: true })
  internationalGross: number;

  @Column({ nullable: true })
  worldwideGross: number;

  @OneToMany(() => Genre, (genre) => genre.movie)
  genres: Genre[];

  @Column()
  homepage: string;

  @Column()
  imdbId: string;

  @Column()
  originalTitle: string;

  @Column()
  overview: string;

  @OneToMany(() => Country, (country) => country.movie)
  countries: Country[];

  @Column()
  releaseDate: Date;

  @OneToMany(() => Company, (company) => company.movie)
  companies: Company[];

  @Column()
  runtime: number;

  @Column()
  tagline: string;

  @Column()
  title: string;

  @Column()
  adult: boolean;

  @Column({ type: "float" })
  popularity: number;

  @Column()
  posterPath: string;

  @OneToMany(() => Cast, (cast) => cast.movie)
  cast: Cast[];

  @OneToMany(() => Crew, (crew) => crew.movie)
  crew: Crew[];
}
