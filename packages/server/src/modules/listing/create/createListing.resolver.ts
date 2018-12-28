import { Singleton } from "typescript-ioc";
import { ResolverMap, Context } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import { createListingSchema } from "@airbnb-clone/common";
import { formatYupError } from "../../../utils/formatYupError";

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
    { input: { ...data } }: GQL.ICreateListingOnMutationArguments,
    { session }: Context,
  ) {
    try {
      await createListingSchema.validate(data, { abortEarly: false });
    } catch (err) {
      return formatYupError(err);
    }

    await Listing.create({
      ...data,
      pictureUrl: "",
      userId: session.userId,
    }).save();

    return true;
  }
}
