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

import { Country } from "modules/country/country.entity";

@Entity()
@Unique(["name", "countryId"])
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  abbreviation: string;

  @Column()
  countryId: string;

  @ManyToOne(
    () => Country,
    (country) => country.alpha2Code
  )
  @JoinColumn({ name: "countryId" })
  country: Country;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
