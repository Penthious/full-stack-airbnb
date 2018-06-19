import { compare } from "bcryptjs";
import { Singleton, Inject } from "typescript-ioc";

import SessionService from "../../../services/Session";
import UserService from "../../../services/UserService";
import { Context, ResolverMap } from "../../../types/graphql-utils";
import {
  accountLocked,
  confirmEmailError,
  invalidLogin,
} from "./errorMessages";
import { USER_SESSION_ID_PREFIX } from "../../../utils/constants";

@Singleton
export default class Login {
  public resolvers: ResolverMap = {
    Mutation: {
      login: (_, args, context) => this._login(_, args, context),
    },
  };

  constructor(
    @Inject private userService: UserService,
    @Inject private sessionService: SessionService,
  ) {}

  private async _login(
    _: any,
    { email, password }: GQL.ILoginOnMutationArguments,
    { redis, request, session }: Context,
  ) {
    const user = await this.userService.findOne({ email });

    if (!user || !(await compare(password, user.password))) {
      return [
        {
          path: "email/password",
          message: invalidLogin,
        },
      ];
    }
    if (!user.confirmed) {
      return [
        {
          path: "email",
          message: confirmEmailError,
        },
      ];
    }

    if (user.accountLocked) {
      return [
        {
          path: "email",
          message: accountLocked,
        },
      ];
    }

    session.userId = user.id;

    this.sessionService.$setUser = user;

    if (request.sessionID) {
      await redis.lpush(
        `${USER_SESSION_ID_PREFIX}${user.id}`,
        request.sessionID,
      );
    }

    return null;
  }
}
