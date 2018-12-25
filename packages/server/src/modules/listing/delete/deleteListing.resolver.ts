import { Singleton } from "typescript-ioc";
import { ResolverMap, Context } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";

@Singleton
export default class FindListing {
  public resolvers: ResolverMap = {
    Mutation: {
      deleteListing: (_, args, context) =>
        this._deleteListing(_, args, context),
    },
  };
  // constructor(){};
  private async _deleteListing(_: any, { id }: any, { session }: Context) {
    if (!session.userId) {
      throw new Error("not authenticated");
    }
    const listing = await Listing.findOne({ where: { id } });

    if (!listing) {
      throw new Error("does not exist");
    }

    if (session.userId !== listing.userId) {
      throw new Error("not authorized");
    }

    await Listing.remove(listing);
    return true;
  }
}
