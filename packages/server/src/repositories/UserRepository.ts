import { Singleton } from "typescript-ioc";

import Base from "./BaseRepository";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import { CreateUserParams, Params, UserInterface } from "../types/UserTypes";
import { User } from "../entity/User";

@Singleton
export default class UserRepository extends Base {
  public async create(params: CreateUserParams) {
    const user = User.create(params);
    return this.save(user);
  }

  public async save(user: User) {
    return user.save();
  }

  /**
   * Finds current user id and updates the user
   *
   * @param id
   * @param params
   */
  public async update(id: string, params: Params) {
    const user = (await User.findOne({ where: { id } })) as UserInterface;

    try {
      if (!user) {
        throw new EntityNotFoundError(
          `No User instance was found with id of ${id}`,
        );
      }

      for (const key in params) {
        if (key) {
          user[key] = params[key];
        }
      }

      return await this.save(user);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  /**
   *
   * @param value
   * @param options?
   * @returns Promise<User>
   */
  public async findOne(value: object | undefined, options?: {}) {
    return this.getUserRepository().findOne({
      where: { value },
      ...options,
    });
  }

  /**
   * Find where User.{value} orWhere User.{value}...
   *
   * @param params
   * @returns Promise<User>
   */
  public async findWhereIn(params: Params) {
    try {
      const keys = Object.keys(params);
      const query = this.getUserRepository().createQueryBuilder("user");

      keys.map((key: any, index: number) => {
        const value = params[key];
        if (value) {
          if (index === 0) {
            query.where(`user.${key} = :value`, { value });
          } else {
            query.orWhere(`user.${key} = :value`, { value });
          }
        }
      });
      const user = await query.getOne();

      if (!user) {
        throw new EntityNotFoundError(`No user found with ${params}`);
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
