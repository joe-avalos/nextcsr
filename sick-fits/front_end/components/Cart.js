import {useQuery, useMutation} from '@apollo/react-hooks'

import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import SickButton from './styles/SickButton'
import CloseButton from './styles/CloseButton'
import gql from 'graphql-tag'

const LOCAL_STATE_QUERY = gql`
    query{
        cartOpen @client
    }
`

const TOGGLE_CART_MUTATION = gql`
  mutation{
    toggleCart @client
  }
`

export default function () {
  const {data} = useQuery(LOCAL_STATE_QUERY)
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION)
  return (
    <CartStyles open={data.cartOpen}>
      <header>
        <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You have __ items in your cart.</p>
      </header>
      
      <footer>
        <p>$10.10</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </CartStyles>
  )
}

export {LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION}
