import * as yup from "yup";
import { Inject } from "typescript-ioc";

import UserService from "../../../services/UserService";
import { Context, ResolverMap } from "../../../types/graphql-utils";
import { createConfirmEmailLink } from "../../../utils/createConfirmEmailLink";
import { duplicateEmail } from "./errorMessages";
import { formatYupError } from "../../../utils/formatYupError";
import { sendEmail } from "../../../utils/sendEmail";
import {
  emailValidation,
  passwordValidation,
} from "@airbnb-clone/common/validations";

export default class Register {
  public resolvers: ResolverMap = {
    Mutation: {
      register: (_, args, context) => this.register(_, args, context),
    },
  };

  private schema = yup.object().shape({
    email: emailValidation,
    password: passwordValidation,
  });

  constructor(@Inject private userService: UserService) {}

  private async register(
    _: any,
    args: GQL.IRegisterOnMutationArguments,
    { redis, url }: Context,
  ) {
    try {
      await this.schema.validate(args, { abortEarly: false });
    } catch (err) {
      return formatYupError(err);
    }
    const { email, password } = args;

    const userExists = await this.userService.findOne(
      { email },
      {
        select: ["id"],
      },
    );

    if (userExists) {
      return [
        {
          path: "email",
          message: duplicateEmail,
        },
      ];
    }

    const user = await this.userService.create({
      email,
      password,
    });

    if (!process.env.TEST_HOST) {
      await sendEmail(email, await createConfirmEmailLink(url, user.id, redis));
    }
    return null;
  }
}
