import { Request } from "express";
import { User } from "modules/user/user.entity";

export type JwtValue = Omit<
  User,
  "password" | "firstName" | "lastName" | "createdAt" | "updatedAt"
>;

export type EmailData = {
  email: string;
};

export type AuthRequest = Request & {
  userData?: JwtValue;
};
