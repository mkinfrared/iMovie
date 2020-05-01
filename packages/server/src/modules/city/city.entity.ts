import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";

import { Country } from "modules/country/country.entity";
import { State } from "modules/state/state.entity";
import { Zipcode } from "modules/zipcode/zipcode.entity";

@Entity()
@Unique(["name", "stateId", "countryId"])
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Zipcode, (zipcode) => zipcode.id)
  zipcode: Zipcode[];

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
