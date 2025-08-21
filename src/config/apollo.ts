import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { API_BASE_URL } from './api';

const httpLink = new HttpLink({
  uri: `${API_BASE_URL}/graphql`,
});

export const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
    query: { fetchPolicy: 'network-only' },
  },
});



