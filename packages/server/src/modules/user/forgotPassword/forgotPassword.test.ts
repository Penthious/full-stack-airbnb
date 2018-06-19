import { Container } from "typescript-ioc";

import App from "../../../App";
import TestClient from "../../../testSetup/testCLient";
import { accountLocked } from "../login/errorMessages";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { expiredKeyError } from "./errorMessages";
import { forgotPasswordLockAccount } from "../../../utils/forgotPasswordLockAccount";
import { passwordNotLongEnough } from "../register/errorMessages";

const app: App = Container.get(App);
const client: TestClient = Container.get(TestClient);
const newPassword: string = "myNewPasswordi";
const password: string = "password";

beforeAll(async () => {
  await app.createConn();

  this.user = await client.createUser(null, password);
  await forgotPasswordLockAccount(this.user.id, app.redis);
  const url = await createForgotPasswordLink("", this.user.id, app.redis);
  const parts = url.split("/");
  this.key = parts[parts.length - 1];
});

afterAll(async () => {
  await app.stop();
});

describe("forgot password", () => {
  test("Password is to short", async () => {
    expect(await client.forgotPasswordUpdate("a", this.key)).toEqual({
      data: {
        forgotPasswordUpdate: [
          { path: "newPassword", message: passwordNotLongEnough },
        ],
      },
    });
  });

  test("Can change users password", async () => {
    expect(await client.login(this.user.email, password)).toEqual({
      data: {
        login: [{ path: "email", message: accountLocked }],
      },
    });

    const response = await client.forgotPasswordUpdate(newPassword, this.key);
    console.log(response);
    expect(response.data).toEqual({
      forgotPasswordUpdate: null,
    });

    expect(await client.login(this.user.email, newPassword)).toEqual({
      data: {
        login: null,
      },
    });

    expect(await client.me()).toEqual({
      data: {
        me: {
          id: this.user.id,
          email: this.user.email,
        },
      },
    });
  });

  test("Key expires after single use", async () => {
    expect(
      await client.forgotPasswordUpdate(this.user.email, this.key),
    ).toEqual({
      data: {
        forgotPasswordUpdate: [{ path: "key", message: expiredKeyError }],
      },
    });
  });
});
