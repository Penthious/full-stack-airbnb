import { Singleton } from "typescript-ioc";

import { User } from "../entity/User";
import {
  USER_SESSION_ID_PREFIX,
  REDIS_SESSION_PREFIX,
} from "../utils/constants";
import { Redis } from "ioredis";

// const LOG_MODULE_NAME = "graphql-server.SessionService";

@Singleton
export default class SessionService {
  private _currentUser: User | undefined;

  private constructor() {}

  public set $setUser(user: User) {
    this._currentUser = user;
  }

  public get $getUser() {
    if (this._currentUser) {
      return this._currentUser;
    }

    return undefined;
  }

  public async removeSingleSession(sessionId: string, redis: Redis) {
    this._currentUser = undefined;

    redis.del(`${REDIS_SESSION_PREFIX}${sessionId}`);
  }

  public removeAllUserSessions = async (userId: string, redis: Redis) => {
    this._currentUser = undefined;

    const sessionIds = await redis.lrange(
      `${USER_SESSION_ID_PREFIX}${userId}`,
      0,
      -1,
    );

    sessionIds.forEach(async (id: string) =>
      redis.del(`${REDIS_SESSION_PREFIX}${id}`),
    );
  };
}
