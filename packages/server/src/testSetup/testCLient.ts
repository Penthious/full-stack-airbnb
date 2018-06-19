import * as request from "request";
import * as rp from "request-promise";

import UserService from "../services/UserService";
import {
  forgotPasswordMutation,
  loginMutation,
  logoutMutation,
  registerMutation,
} from "./mutations";
import { Inject, Singleton } from "typescript-ioc";
import { ME } from "../modules/user/me";
import { meQuery } from "./queries";
import { User } from "../entity/User";

@Singleton
export default class TestClient {
  public url: string = process.env.TEST_HOST as string;

  private options: {
    jar: request.CookieJar;
    json: boolean;
    withCredentials: boolean;
  };

  private email: string = "tom@bob.com";
  private graphqlUrl: string = `${this.url}/graphql`;
  private password: string = "aoeuaoeuaoeu";
  private user: User;

  constructor(@Inject private userService: UserService) {
    this.options = {
      jar: rp.jar(),
      json: true,
      withCredentials: true,
    };
  }

  async createUser(
    email: string | null = null,
    password: string | null = null,
  ): Promise<User> {
    this.email = email || this.email;
    this.password = password || this.password;

    this.user = await this.userService.create({
      email: this.email,
      password: this.password,
      confirmed: true,
    });

    return this.user;
  }

  get $user() {
    return this.user;
  }

  async forgotPasswordUpdate(
    newPassword: string,
    key: string,
  ): Promise<
    | FORGOTPASSWORD.forgotPasswordChange
    | FORGOTPASSWORD.forgotPasswordChangeError
  > {
    return rp.post(this.graphqlUrl, {
      ...this.options,
      body: {
        query: forgotPasswordMutation(newPassword, key),
      },
    });
  }
  async login(
    email: string,
    password: string,
  ): Promise<LOGIN.login | LOGIN.loginError> {
    return rp.post(this.graphqlUrl, {
      ...this.options,
      body: {
        query: loginMutation(email, password),
      },
    });
  }

  async logout(multi: boolean): Promise<LOGOUT.logout> {
    return rp.post(this.graphqlUrl, {
      ...this.options,
      body: {
        query: logoutMutation(multi),
      },
    });
  }

  async me(): Promise<ME.meResponse> {
    return rp.post(this.graphqlUrl, {
      ...this.options,
      body: {
        query: meQuery,
      },
    });
  }
  async register(
    email: string,
    password: string,
  ): Promise<REGISTER.register | REGISTER.registerError> {
    return rp.post(this.graphqlUrl, {
      ...this.options,
      body: {
        query: registerMutation(email, password),
      },
    });
  }
}
