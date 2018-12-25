import { Singleton } from "typescript-ioc";
import { ResolverMap, Context } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";

@Singleton
export default class CreateListing {
  public resolvers: ResolverMap = {
    Mutation: {
      createListing: (_, args, context) =>
        this._createListing(_, args, context),
    },
  };
  // constructor(){};
  private async _createListing(
    _: any,
    { input }: GQL.ICreateListingOnMutationArguments,
    { session }: Context,
  ) {
    await Listing.create({
      ...input,
      pictureUrl: "",
      userId: session.userId,
    }).save();

    return true;
  }
}
