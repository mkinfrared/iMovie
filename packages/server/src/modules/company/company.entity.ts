import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Country } from "modules/country/country.entity";
import { Movie } from "modules/movie/movie.entity";

@Entity()
export class Company {
  @PrimaryColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  headquarters: string;

  @Column()
  homepage: string;

  @Column({ nullable: true })
  logo: string;

  @Column()
  name: string;

  @ManyToOne(() => Country, (country) => country.alpha2Code)
  originCountry: Country;

  @ManyToOne(() => Movie, (movie) => movie.companies)
  movie: Movie;
}
