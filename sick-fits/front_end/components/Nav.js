import {useState} from 'react'
import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from './Signout'


export const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  
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
