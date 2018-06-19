import fetch from "node-fetch";
import { Container } from "typescript-ioc";

import App from "../App";
import TestClient from "../testSetup/testCLient";
import { createConfirmEmailLink } from "./createConfirmEmailLink";
import { User } from "../entity/User";

const client: TestClient = Container.get(TestClient);
const app: App = Container.get(App);

beforeAll(async () => {
  await app.createConn();
  const user = await client.createUser();

  this.userId = user.id;
});

afterAll(async () => {
  await app.stop();
});

describe("Email link", () => {
  test("Make sure it confirms user and clears key in redis", async () => {
    const url = await createConfirmEmailLink(
      client.url,
      this.userId,
      app.redis,
    );
    const response = await fetch(url);
    const text = await response.text();

    expect(text).toEqual("ok");

    const user = (await User.findOne({ where: { id: this.userId } })) as User;
    expect(user.confirmed).toBeTruthy();

    const key = url.split("/").pop() as string;

    const value = await app.redis.get(key);
    expect(value).toBeNull();
  });

  test("Sends invalid back if bad id sent", async () => {
    const response = await fetch(`${client.url}/confirm/fake_id`);
    const text = await response.text();

    expect(text).toEqual("invalid");
  });
});
