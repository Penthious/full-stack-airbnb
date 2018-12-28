import { Singleton } from "typescript-ioc";
import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";

@Singleton
export default class FindListing {
  public resolvers: ResolverMap = {
    // Listing: {
    //   pictureUrl: (parent, _, { url }) =>
    //     parent.pictureUrl && `${url}/${parent.pictureUrl}.jpg`,
    // },
    Query: {
      findListings: (_, args, context) => this._findListings(_, args, context),
    },
  };
  // constructor(){};
  private async _findListings(_: any, __: any, ___: any) {
    return Listing.find();
  }
}
