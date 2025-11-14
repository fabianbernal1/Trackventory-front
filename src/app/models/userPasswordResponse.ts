import { User } from "./user";

export interface UserPasswordResponse {
  user: User;
  password: string | null;
}
