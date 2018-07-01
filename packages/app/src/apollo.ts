import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Platform } from 'react-native'

const host = Platform.OS === "ios" ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

export const client = new ApolloClient({
    link: new HttpLink({
        uri: `${host}/graphql`
    }),
    cache: new InMemoryCache(),
});