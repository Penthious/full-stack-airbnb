import { Container } from "typescript-ioc";

import App from "../../../App";
import TestClient from "../../../testSetup/testCLient";

const app: App = Container.get(App);
const client: TestClient = Container.get(TestClient);
const email: string = "tom@bob.com";
const password: string = "aoeuaoeuaoeu";

beforeAll(async () => {
  await app.createConn();
  this.user = await client.createUser();
});

afterAll(async () => {
  await app.stop();
});

describe("me", () => {
  test("Can not get user if not logged in", async () => {
    const response = await client.me();

    expect(response.data.me).toBeNull();
    expect(response.errors![0]).toHaveProperty("message");
  });

  test("Can get current user", async () => {
    await client.login(email, password);

    const response = await client.me();

    expect(response.data).toEqual({
      me: {
        id: this.user.id,
        email: this.user.email,
      },
    });
  });
});
