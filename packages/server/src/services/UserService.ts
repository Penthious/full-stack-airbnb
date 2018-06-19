import { FindOneOptions } from "typeorm";

import UserRepository from "../repositories/UserRepository";
import { CreateUserParams, Params } from "../types/UserTypes";
import { Inject, Singleton } from "typescript-ioc";
import { User } from "../entity/User";
// const LOG_MODULE_NAME = "graphql_server.UserService";

@Singleton
export default class UserService {
  // private _name: string = LOG_MODULE_NAME;

  constructor(@Inject private userRepository: UserRepository) {}

  public update(id: string, params: Params) {
    console.log(id, params);
    return this.userRepository.update(id, params);
  }

  public findWhereIn(params: Params) {
    return this.userRepository.findWhereIn(params);
  }

  public create(params: CreateUserParams) {
    return this.userRepository.create(params);
  }

  public save(user: User) {
    return this.userRepository.save(user);
  }

  public findOne(item: object | undefined, options?: FindOneOptions) {
    if (!item) {
      return null;
    }

    return this.userRepository.findOne(item, options);
  }
}
