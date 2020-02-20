import {useState} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Error from './ErrorMessage'
import User, {CURRENT_USER_QUERY} from './User'
import calcTotalPrice from '../lib/calcTotalPrice'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {STRIPE_PUBLIC} from '../config'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'

const CREATE_ORDER_MUTATION = gql`
    mutation CREATE_ORDER_MUTATION($token: String!){
        createOrder(token: $token){
            id
            charge
            total
            items{
              id
              title
            }
        }
    }
`

export default function ({children}) {
  const [me, setMe] = useState({})
  const [createOrder,{loading,error}] = useMutation(CREATE_ORDER_MUTATION,{
    refetchQueries:[{query:CURRENT_USER_QUERY}]
  })
  function callback(logged) {
    setMe(logged)
  }
  
  function totalItems(cart){
    return cart.reduce((tally, cartItem)=>tally+cartItem.quantity,0)
  }
  
  function onToken(res) {
    NProgress.start()
    createOrder({
      variables: {token: res.id}
    })
      .then(order => {
        Router.push({
          pathname: '/order',
          query: {
            id: order.data.createOrder.id
          }
        })
      })
      .catch(e=>alert(e.message))
  }
  return (
    <>
      <Head>
        <script src="https://js.stripe.com/v3/"></script>
        <script>
          let stripe = Stripe({STRIPE_PUBLIC})
        </script>
      </Head>
    <User callback={callback}>
      {!!me && !!me.cart && (
        <StripeCheckout
          amount={calcTotalPrice(me.cart)}
          name={"Sick fits!"}
          description={`Order of ${totalItems(me.cart)} item${totalItems(me.cart) > 1 ? 's':''}.`}
          image="/favicon.png"
          stripeKey={STRIPE_PUBLIC}
          currency="USD"
          email={me.email}
          token={res => onToken(res)}
        >
          {children}
        </StripeCheckout>
      )}
    </User>
    </>
  )
}

export {CREATE_ORDER_MUTATION}
