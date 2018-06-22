import { Container } from "typescript-ioc";

import App from "../../../App";
import TestClient from "../../../testSetup/testCLient";
import {
  duplicateEmail,
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough,
} from "./errorMessages";
import { User } from "../../../entity/User";

const client: TestClient = Container.get(TestClient);
const app: App = Container.get(App);

beforeAll(async () => {
  await app.createConn();
});

afterAll(async () => {
  await app.stop();
});

describe("Register", () => {
  const email: string = "tom@bob.com";
  const password: string = "aoeuaoeuaoeu";

  test("Register user", async () => {
    const response = await client.register(email, password);

    expect(response.data).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  test("Register a user with the same email", async () => {
    const response = (await client.register(
      email,
      password,
    )) as REGISTER.registerError;

    const users = await User.find({ where: { email } });

    expect(users).toHaveLength(1);
    expect(response.data.register[0]).toEqual({
      path: "email",
      message: duplicateEmail,
    });
  });

  test("Catch non emails", async () => {
    const response = (await client.register(
      "bad",
      password,
    )) as REGISTER.registerError;

    const users = await User.find({ where: { email } });

    expect(users).toHaveLength(1);
    expect(response.data.register[0]).toEqual({
      path: "email",
      message: invalidEmail,
    });
  });

  test("Catch short emails", async () => {
    const response = (await client.register(
      "b",
      password,
    )) as REGISTER.registerError;

    const users = await User.find({ where: { email } });

    expect(users).toHaveLength(1);
    expect(response.data.register[0]).toEqual({
      path: "email",
      message: emailNotLongEnough,
    });
  });

  test("Catch short passwords", async () => {
    const response = (await client.register(
      email,
      "1",
    )) as REGISTER.registerError;

    const users = await User.find({ where: { email } });

    expect(users).toHaveLength(1);
    expect(response.data.register[0]).toEqual({
      path: "password",
      message: passwordNotLongEnough,
    });
  });
});
