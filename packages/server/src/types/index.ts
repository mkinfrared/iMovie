import { Request } from "express";
import { User } from "modules/user/user.entity";

export type JwtValue = Omit<User, "password" | "firstName" | "lastName">;

export type AuthRequest = Request & {
  userData?: JwtValue;
};
