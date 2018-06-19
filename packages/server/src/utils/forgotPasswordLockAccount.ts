import { Container } from "typescript-ioc";
import { Redis } from "ioredis";

import SessionService from "../services/Session";
import { User } from "../entity/User";
const sessionService: SessionService = Container.get(SessionService);

export const forgotPasswordLockAccount = async (
  userId: string,
  redis: Redis,
) => {
  await User.update({ id: userId }, { accountLocked: true });
  sessionService.removeAllUserSessions(userId, redis);
};
