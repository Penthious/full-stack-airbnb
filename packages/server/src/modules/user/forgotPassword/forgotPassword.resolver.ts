import { Singleton, Inject } from "typescript-ioc";

import GraphqlServerConfig from "../../../Config";
import UserService from "../../../services/UserService";
import { Context, ResolverMap } from "../../../types/graphql-utils";
import { FORGOT_PASSWORD_PREFIX } from "../../../utils/constants";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { expiredKeyError } from "./errorMessages";
import { forgotPasswordSchema } from "@airbnb-clone/common";
import { formatYupError } from "../../../utils/formatYupError";
import { sendEmail } from "../../../utils/sendEmail";

@Singleton
export default class ForgotPassword {
  public resolvers: ResolverMap = {
    Mutation: {
      forgotPasswordUpdate: (_, args, context) =>
        this._forgotPasswordUpdate(_, args, context),
      sendForgotPasswordEmail: (_, args, context) =>
        this._sendForgotPasswordEmail(_, args, context),
    },
  };

  constructor(
    @Inject private userService: UserService,
    @Inject private config: GraphqlServerConfig,
  ) {}

  private async _forgotPasswordUpdate(
    _: any,
    { newPassword, key }: GQL.IForgotPasswordUpdateOnMutationArguments,
    { redis }: Context,
  ) {
    try {
      await forgotPasswordSchema.validate(
        { newPassword, key },
        { abortEarly: false },
      );
    } catch (err) {
      return formatYupError(err);
    }
    const userId = await redis.get(`${FORGOT_PASSWORD_PREFIX}${key}`);

    if (!userId) {
      return [
        {
          path: "key",
          message: expiredKeyError,
        },
      ];
    }

    await redis.del(`${FORGOT_PASSWORD_PREFIX}${key}`);

    await this.userService.update(userId, {
      password: newPassword,
      accountLocked: false,
    });

    return null;
  }

  private async _sendForgotPasswordEmail(
    _: any,
    { email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
    { redis }: Context,
  ) {
    const user = await this.userService.findOne({ email });
    if (user) {
      // await forgotPasswordLockAccount(user.id, redis);
      const url = await createForgotPasswordLink(
        this.config.$frontend_host,
        user.id,
        redis,
      );

      await sendEmail(email, url);

      return true;
    }
    return false;
  }
}
