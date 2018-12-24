import { Container } from "typescript-ioc";
import { Response, Request } from "express";

import App from "../App";
import { User } from "../entity/User";
import GraphqlServerConfig from "../Config";

export const confirmEmail = async (req: Request, res: Response) => {
  const app: App = Container.get(App);
  const config: GraphqlServerConfig = Container.get(GraphqlServerConfig);
  const { id }: { id: string } = req.params;
  const userId = await app.redis.get(id);
  if (userId) {
    await User.update({ id: userId }, { confirmed: true });
    await app.redis.del(id);

    res.redirect(`${config.$frontend_host}/login`);
  } else {
    res.send("invalid");
  }
};
