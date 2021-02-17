import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.stratz.com/graphql',
  cache: new InMemoryCache()
});

export default client;
