import {
  Context,
  GraphQLMiddlewareFunc,
  Resolver,
} from "../types/graphql-utils";

export const createMiddleware = (
  middlewareFunc: GraphQLMiddlewareFunc,
  resolverFunc: Resolver,
) => (parent: any, args: any, context: Context, info: any) =>
  middlewareFunc(resolverFunc, parent, args, context, info);
