import { User } from "../entity/User";

export interface UserInterface extends User {
  [key: string]: any;
}
export interface Params {
  accountLocked?: boolean;
  confirmed?: boolean;
  email?: string;
  password?: string;
  twitterId?: string;
  [key: string]: string | undefined | boolean;
}

export interface CreateUserParams {
  accountLocked?: boolean;
  confirmed?: boolean;
  email: string;
  password: string;
  twitterId?: string;
  [key: string]: string | undefined | boolean;
}
