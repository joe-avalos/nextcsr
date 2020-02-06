import withApollo from 'next-with-apollo';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import { endpoint } from '../config';

export default withApollo(
  ({ctx, headers, initialState}) =>
    new ApolloClient({
      uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
      request: operation => {
        operation.setContext({
          fetchOptions: {
            credentials: 'include',
          },
          headers,
        });
      },
      cache: new InMemoryCache().restore(initialState||{})
    })
)
