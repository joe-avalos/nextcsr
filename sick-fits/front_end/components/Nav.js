import {useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from './Signout'
import {TOGGLE_CART_MUTATION} from './Cart'

export const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION)
  function callback(logged) {
    setLoggedIn(logged)
  }
  
  return (
    <User callback={callback}>
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {loggedIn &&
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
          <button onClick={toggleCart}>My Cart</button>
        </>
        }
        {!loggedIn &&
        <Link href="/signup">
          <a>Signup</a>
        </Link>
        }
      </NavStyles>
    </User>
  )
}
