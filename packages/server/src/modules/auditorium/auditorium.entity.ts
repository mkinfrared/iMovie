import { Exclude } from "class-transformer";
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

import { Cinema } from "modules/cinema/cinema.entity";
import { Seat } from "modules/seat/seat.entity";

@Entity()
@Unique(["name", "cinemaId"])
export class Auditorium {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cinemaId: number;

  @Exclude()
  @OneToMany(() => Seat, (seat) => seat.auditorium, { eager: true })
  seats: Seat[];

  @ManyToOne(() => Cinema, (cinema) => cinema.id)
  @JoinColumn({ name: "cinemaId" })
  cinema: Cinema;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
