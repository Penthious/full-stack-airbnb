import { Singleton, Inject } from "typescript-ioc";

import UserService from "../../../services/UserService";

import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";

@Singleton
export default class FindListing {
  public resolvers: ResolverMap = {
    Listing: {
      //   pictureUrl: (parent, _, { url }) =>
      //     parent.pictureUrl && `${url}/${parent.pictureUrl}.jpg`,
      owner: ({ userId }) => this.userService.findOne({ id: userId }),
    },
    Query: {
      findListings: (_, args, context) => this._findListings(_, args, context),
    },
  };
  constructor(@Inject private userService: UserService) {}
  private async _findListings(_: any, __: any, ___: any) {
    return Listing.find();
  }
}
