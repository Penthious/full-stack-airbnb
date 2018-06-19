import { Redis } from "ioredis";

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any,
) => any;

export interface Context {
  request: Express.Request;
  redis: Redis;
  url: string;
  session: Session;
}

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any,
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}

export interface Session extends Express.Session {
  userId?: string;
}
