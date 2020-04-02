import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Role {
  USER = "user",
  ADMIN = "admin"
}

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: Role;

  @Column({ default: false })
  isActive: boolean;
}

export { User, Role };
