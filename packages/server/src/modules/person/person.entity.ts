import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class Person {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  deathday: Date;

  @Column()
  name: string;

  @Column()
  gender: number;

  @Column()
  biography: string;

  @Column({ type: "float" })
  popularity: number;

  @Column({ nullable: true })
  placeOfBirth: string;

  @Column({ nullable: true })
  profilePath: string;

  @Column()
  adult: boolean;

  @Column()
  imdbId: string;

  @Column({ nullable: true })
  homepage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
