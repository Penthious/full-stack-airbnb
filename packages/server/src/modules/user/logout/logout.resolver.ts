import { Context, ResolverMap } from "../../../types/graphql-utils";
import { Inject } from "typescript-ioc";

import SessionService from "../../../services/Session";

export default class Logout {
  public resolvers: ResolverMap = {
    Mutation: {
      logout: (_, args, context) => this._logout(_, args, context),
    },
  };

  constructor(@Inject private sessionService: SessionService) {}

  private async _logout(
    _: any,
    { multi }: GQL.ILogoutOnMutationArguments,
    { request, session, redis }: Context,
  ) {
    const { userId } = session;
    if (userId && multi) {
      await this.sessionService.removeAllUserSessions(userId, redis);
    } else if (userId && !multi) {
      await this.sessionService.removeSingleSession(request.sessionID!, redis);
    }
    return null;
  }
}
