import {useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import SickButton from './styles/SickButton'
import CloseButton from './styles/CloseButton'
import User from './User'
import CartItem from './CartItem'
import calcTotalPrice from '../lib/calcTotalPrice'
import formatMoney from '../lib/formatMoney'

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
  const [me, setMe] = useState({});
  
  function callback(logged){
    if (!!logged) setMe(logged)
  }
  return (
    <User callback={callback}>
      <CartStyles open={data.cartOpen}>
        <header>
          <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
          <Supreme>{me.name} Cart</Supreme>
          <p>You have {!!me.cart ? me.cart.length : 0} items in your cart.</p>
        </header>
        <ul>
          {!!me.cart && me.cart.map((v,k)=><CartItem key={k} cartItem={v} />)}
        </ul>
        <footer>
          <p>{!!me.cart && formatMoney(calcTotalPrice(me.cart))}</p>
          <SickButton>Checkout</SickButton>
        </footer>
      </CartStyles>
    </User>
  )
}

export {LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION}
