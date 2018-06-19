import { Container } from "typescript-ioc";

import GraphqlServer from "../App";
import { AddressInfo } from "net";

export const setup = async () => {
  const App: GraphqlServer = Container.get(GraphqlServer);
  const server = await App.start();
  const { port } = server.address() as AddressInfo; // windows workaround to use AddressInfo as .address() is using windows pipe which returns a string https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25865

  process.env.TEST_HOST = `http://127.0.0.1:${port}`;
};
