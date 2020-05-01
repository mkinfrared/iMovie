export type Role = "user" | "admin";

export interface User {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  id?: string;
  role?: Role;
  isActive?: boolean;
}
