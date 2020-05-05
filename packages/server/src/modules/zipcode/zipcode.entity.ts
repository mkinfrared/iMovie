import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";

import { City } from "modules/city/city.entity";
import { Country } from "modules/country/country.entity";
import { State } from "modules/state/state.entity";

@Entity()
@Unique(["code", "cityId", "countryId"])
export class Zipcode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  longitude: string;

  @Column()
  latitude: string;

  @Column()
  cityId: number;

  @ManyToOne(() => City, (city) => city.id)
  @JoinColumn({ name: "cityId" })
  city: City;

  @Column()
  stateId: number;

  @ManyToOne(() => State, (state) => state.id)
  @JoinColumn({ name: "stateId" })
  state: State;

  @Column()
  countryId: string;

  @ManyToOne(() => Country, (country) => country.alpha2Code)
  @JoinColumn({ name: "countryId" })
  country: Country;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
