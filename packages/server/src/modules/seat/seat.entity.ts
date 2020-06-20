import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Auditorium } from "modules/auditorium/auditorium.entity";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  row: string;

  @Column()
  number: number;

  @Column()
  auditoriumId: number;

  @ManyToOne(() => Auditorium, (auditorium) => auditorium.id)
  @JoinColumn({ name: "auditoriumId" })
  auditorium: Auditorium;

  @DeleteDateColumn()
  deletedAt: Date;
}
