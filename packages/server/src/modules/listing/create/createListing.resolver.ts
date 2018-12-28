import { Singleton } from "typescript-ioc";
import { ResolverMap, Context } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import { createListingSchema } from "@airbnb-clone/common";
import { formatYupError } from "../../../utils/formatYupError";
import { v4 } from "uuid";
import { createWriteStream } from "fs";

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
    { input: { picture, ...data } }: GQL.ICreateListingOnMutationArguments,
    { session }: Context,
  ) {
    try {
      await createListingSchema.validate(data, { abortEarly: false });
    } catch (err) {
      return formatYupError(err);
    }
    console.log(picture);

    const pictureUrl = await this._processUpload(picture);

    await Listing.create({
      ...data,
      pictureUrl,
      userId: session.userId,
    }).save();

    return true;
  }

  private async _processUpload(upload: any) {
    console.log("upload", typeof upload);
    const awaitLoad = await upload;
    console.log("await upload: ", awaitLoad);

    const { createReadStream } = await upload;
    const stream = createReadStream();
    console.log("stream: ", stream);

    const { id } = await this._storeUpload({ stream });

    return id;
  }

  private async _storeUpload({ stream }: any): Promise<any> {
    const id = v4();
    const path = `images/${id}`;

    console.log(path);

    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on("finish", () => resolve({ id, path }))
        .on("error", reject),
    );
  }
}
