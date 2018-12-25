import { Context } from "../types/graphql-utils";
export default {
  isAuthenticated: (
    next: any,
    source: any,
    args: any,
    { session }: Context,
  ) => {
    console.log("source", source);
    console.log("args", args);

    console.log("session", session);

    if (!session.userId) {
      throw new Error("not authenticated");
    }
    return next();
  },
};
