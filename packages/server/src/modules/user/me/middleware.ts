import { Context, Resolver } from "../../../types/graphql-utils";

export default async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any,
) => {
  if (!context.session || !context.session.userId) {
    throw Error("no cookie");
  }

  return resolver(parent, args, context, info);
};
