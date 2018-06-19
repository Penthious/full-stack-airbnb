import { Redis } from "ioredis";
import { v4 } from "uuid";

import { FORGOT_PASSWORD_PREFIX } from "./constants";

export const createForgotPasswordLink = async (
  url: string, // Frontend url
  userId: string,
  redis: Redis,
): Promise<string> => {
  const id = v4();

  await storeLinkToRedis(id, userId, redis);
  return `${url}/change-password/${id}`;
};

export const storeLinkToRedis = (id: string, userId: string, redis: Redis) => {
  const twentyMinutes = 60 * 20;

  return redis.set(
    `${FORGOT_PASSWORD_PREFIX}${id}`,
    userId,
    "ex",
    twentyMinutes,
  );
};
