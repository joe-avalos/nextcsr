import {useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from './Signout'
import {TOGGLE_CART_MUTATION} from './Cart'
import CartCount from './CartCount'

export const Nav = () => {
  const [me, setMe] = useState(false);
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION)
  function callback(logged) {
    setMe(logged)
  }
  
  return (
    <User callback={callback}>
      <NavStyles data-test="nav">
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {!!me ?
        <>
          <Link href="/sell">
            <a>Sell</a>
          </Link>
          <Link href="/orders">
            <a>Orders</a>
          </Link>
          <Link href="/me">
            <a>Account</a>
          </Link>
          <Signout />
          <button onClick={toggleCart}>
            My Cart
            <CartCount count={me.cart && me.cart.reduce((tally,cartItem)=>tally+cartItem.quantity, 0)} />
          </button>
        </>
        :
        <Link href="/signup">
          <a>Signup</a>
        </Link>
        }
      </NavStyles>
    </User>
  )
}

export default Nav
