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

import { Cinema } from "modules/cinema/cinema.entity";

@Entity()
@Unique(["name", "cinemaId"])
export class Auditorium {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cinemaId: number;

  @ManyToOne(() => Cinema, (cinema) => cinema.id)
  @JoinColumn({ name: "cinemaId" })
  cinema: Cinema;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
