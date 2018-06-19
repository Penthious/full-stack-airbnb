import { Container } from "typescript-ioc";

import App from "../../../App";
import TestClient from "../../../testSetup/testCLient";
import { confirmEmailError, invalidLogin } from "./errorMessages";
import { User } from "../../../entity/User";

const email: string = "tom@bob.com";
const password: string = "aoeuaoeuaoeu";
const client: TestClient = Container.get(TestClient);
const app: App = Container.get(App);

beforeAll(async () => {
  await app.createConn();
  await client.createUser();
});

afterAll(async done => {
  await app.stop();
  done();
});

describe("login", () => {
  test("fails if no user is found", async () => {
    const response = (await client.login(
      "no_user@false.com",
      "hey I am password",
    )) as LOGIN.loginError;
    expect(response.data.login).toEqual([
      {
        path: "email/password",
        message: invalidLogin,
      },
    ]);
  });

  test("fails if user is found but password is wrong", async () => {
    const response = (await client.login(
      email,
      "FAIL_PASSWORD",
    )) as LOGIN.loginError;

    expect(response.data.login).toEqual([
      {
        path: "email/password",
        message: invalidLogin,
      },
    ]);
  });

  test("fails if user logs in correctly but confirmed is false", async () => {
    await User.update({ email }, { confirmed: false });
    const response = (await client.login(email, password)) as LOGIN.loginError;

    expect(response.data.login).toEqual([
      {
        path: "email",
        message: confirmEmailError,
      },
    ]);
  });

  test("User can login", async () => {
    await User.update({ email }, { confirmed: true });
    const response = (await client.login(email, password)) as LOGIN.login;
    expect(response.data.login).toEqual(null);
  });
});
