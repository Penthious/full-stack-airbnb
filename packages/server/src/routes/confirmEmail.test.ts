import fetch from "node-fetch";

const host = process.env.TEST_HOST as string;

test("Sends invalid back if bad id sent", async () => {
  const response = await fetch(`${host}/confirm/fake_id`);
  const text = await response.text();

  expect(text).toEqual("invalid");
});
