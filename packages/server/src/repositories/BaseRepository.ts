import { getRepository } from "typeorm";

import { User } from "../entity/User";

export default abstract class Base {
  protected getUserRepository() {
    return getRepository(User);
  }
}
