import { Redis } from 'ioredis';
import { v4 } from 'uuid';

export const createConfirmEmailLink = async (
  url: string,
  userId: string,
  redis: Redis,
): Promise<string> => {
  const id = v4();

  await storeLinkToRedis(id, userId, redis);
  return `${url}/confirm/${id}`;
};

export const storeLinkToRedis = (id: string, userId: string, redis: Redis) => {
  const twentyFourHours = 60 * 60 * 24;

  return redis.set(id, userId, "ex", twentyFourHours);
};
