import { Container } from "typescript-ioc";
import { Response, Request } from "express";

import App from "../App";
import { User } from "../entity/User";

export const confirmEmail = async (req: Request, res: Response) => {
  const app: App = Container.get(App);
  const { id }: { id: string } = req.params;
  const userId = await app.redis.get(id);
  if (userId) {
    await User.update({ id: userId }, { confirmed: true });
    await app.redis.del(id);

    res.send("ok");
  } else {
    res.send("invalid");
  }
};
