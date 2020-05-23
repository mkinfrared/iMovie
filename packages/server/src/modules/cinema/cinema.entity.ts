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

import { Auditorium } from "modules/auditorium/auditorium.entity";
import { Zipcode } from "modules/zipcode/zipcode.entity";

@Entity()
@Unique(["name", "zipcodeId"])
export class Cinema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Auditorium, (auditorium) => auditorium.cinema)
  auditoriums: Auditorium[];

  @Column()
  zipcodeId: number;

  @ManyToOne(() => Zipcode, (zipcode) => zipcode.id)
  @JoinColumn({ name: "zipcodeId" })
  zipcode: Zipcode;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
