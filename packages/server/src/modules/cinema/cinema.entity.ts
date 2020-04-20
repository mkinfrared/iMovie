import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";

import { Zipcode } from "modules/zipcode/zipcode.entity";

@Entity()
@Unique(["name", "zipcodeId"])
export class Cinema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  zipcodeId: number;

  @ManyToOne(
    () => Zipcode,
    (zipcode) => zipcode.id
  )
  @JoinColumn({ name: "zipcodeId" })
  zipcode: Zipcode;
}
