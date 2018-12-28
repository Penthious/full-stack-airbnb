import * as Cloudinary from "cloudinary";
import { Context, ResolverMap } from "../../../types/graphql-utils";
import Config from "../../../Config";
import { createListingSchema } from "@airbnb-clone/common";
import { formatYupError } from "../../../utils/formatYupError";
import { Listing } from "../../../entity/Listing";
import { Singleton, Inject } from "typescript-ioc";
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

  private cloudinary: Cloudinary.Cloudinary;

  constructor(@Inject private config: Config) {
    this.cloudinary = Cloudinary as Cloudinary.Cloudinary;
    this.cloudinary.config({
      cloud_name: this.config.$cloudinary_name,
      api_key: this.config.$cloudinary_key,
      api_secret: this.config.$cloudinary_secret,
    });
  }

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
    let pictureUrl = "";

    if (picture) {
      pictureUrl = await this._processUpload(picture, session.userId!);
    }

    await Listing.create({
      ...data,
      pictureUrl,
      userId: session.userId,
    }).save();

    return true;
  }

  private async _processUpload(upload: any, userId: string) {
    const { createReadStream, filename } = await upload;

    const stream = createReadStream();

    const { path } = await this._storeUpload({ stream, filename });

    const url = await this.cloudinary.v2.uploader.upload(
      path,
      { public_id: `airbnb-clone-dev/${userId}/${filename}` },
      err => console.log("error: ", err),
    );

    return url.secure_url;
  }

  private async _storeUpload({ stream, filename }: any): Promise<any> {
    const id = v4();
    const path = `images/${id}-${filename}`;

    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on("finish", () => resolve({ id, path }))
        .on("error", reject),
    );
  }
}
