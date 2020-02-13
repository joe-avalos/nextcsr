import withApollo from 'next-with-apollo';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import { endpoint } from '../config';
import {LOCAL_STATE_QUERY} from '../components/Cart'

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
      clientState: {
        resolvers: {
          Mutation: {
            toggleCart(_, variables, {cache}){
              const {cartOpen} = cache.readQuery({
                query: LOCAL_STATE_QUERY
              })
              const data = {
                data: {cartOpen: !cartOpen}
              }
              cache.writeData(data)
              return data
            }
          }
        },
        defaults: {
          cartOpen: true
        }
      },
      cache: new InMemoryCache().restore(initialState||{}),
    })
)
