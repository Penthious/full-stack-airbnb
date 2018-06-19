import { Inject } from "typescript-ioc";

import middleware from "./middleware";
import UserService from "../../../services/UserService";
import { Context, ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";

export default class Me {
  public resolvers: ResolverMap = {
    Query: {
      me: createMiddleware(middleware, (_, __, context) =>
        this._me(_, __, context),
      ),
    },
  };

  constructor(@Inject private userService: UserService) {}

  private _me(_: any, __: any, { session }: Context) {
    return this.userService.findOne({ id: session.userId });
  }
}
