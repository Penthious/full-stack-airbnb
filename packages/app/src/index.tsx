import * as React from "react";
// tslint:disable-next-line:no-duplicate-imports
import { PureComponent } from "react";
import { ApolloProvider } from "react-apollo"
import { client } from "./apollo"
import { Routes } from "./routes";

export class App extends PureComponent {
    render() {
        return (
            <ApolloProvider client={client}>
                <Routes />
            </ApolloProvider>
        )
    }
}

export default App;