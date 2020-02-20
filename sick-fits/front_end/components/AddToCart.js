import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import Error from './ErrorMessage'
import {CURRENT_USER_QUERY} from './User'

const ADD_TO_CART_MUTATION = gql`
    mutation ADD_TO_CART_MUTATION($id: ID!){
        addToCart(id: $id){
            id
            quantity
        }
    }
`

export default function ({id}) {
  
  const [addToCart, {loading, error}] = useMutation(ADD_TO_CART_MUTATION,{
    variables: {id},
    refetchQueries: [{query: CURRENT_USER_QUERY}]
  })
  if (error) return <Error error={error}/>
  return (
    <button onClick={addToCart} disabled={loading}>Add{loading ? 'ing':''} to cart 🛒</button>
  )
}

export {ADD_TO_CART_MUTATION}
