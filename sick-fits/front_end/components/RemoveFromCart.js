import styled from 'styled-components'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import Error from './ErrorMessage'
import {CURRENT_USER_QUERY} from './User'

const BigButton = styled.button`
  font-size: 3rem;
  background:none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`

const REMOVE_FROM_CART_MUTATION = gql`
    mutation REMOVE_FROM_CART_MUTATION($id: ID!){
        removeFromCart(id: $id){
            id
        }
    }
`

export default function ({id}) {
  
  const update = (cache, {data}) => {
    const queryData = cache.readQuery({query: CURRENT_USER_QUERY})
    const cartItemId = data.removeFromCart.id
    queryData.me.cart = queryData.me.cart.filter(v => v.id !== cartItemId)
    cache.writeQuery({query: CURRENT_USER_QUERY, data: {...queryData}})
  }
  const [removeFromCart, {loading, error}] = useMutation(REMOVE_FROM_CART_MUTATION,{
    variables: {id},
    //refetchQueries: [{query: CURRENT_USER_QUERY}],
    update: update,
    optimisticResponse: {
      __typename: 'Mutation',
      removeFromCart: {
        __typename: 'CartItem',
        id}
    }
  })
  if (error) return alert(error.message)
  return (
    <BigButton title="Delete Item" disabled={loading} aria-busy={loading} onClick={removeFromCart}>&times;</BigButton>
  )
}
