import { Container } from "typescript-ioc";

import GraphqlServer from "./App";

const app: GraphqlServer = Container.get(GraphqlServer);

app.start();
