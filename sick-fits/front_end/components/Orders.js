import OrderItemStyles from './styles/OrderItemStyles'
import {formatDistance} from 'date-fns'
import styled from 'styled-components'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import Error from './ErrorMessage'
import Link from 'next/link'
import formatMoney from '../lib/formatMoney'

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY{
    orders(orderBy: createdAt_DESC){
      id
      total
      createdAt
      items{
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`

const OrdersUL = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`

export default function () {
  const {data, loading, error} = useQuery(USER_ORDERS_QUERY)
  
  if(loading) return <p>Loading...</p>
  if(error) return <Error error={error}/>
  const {orders} = data
  
  return(
    <div>
      <h2>You have {orders.length} order{orders.length === 1?'':'s'}</h2>
      <OrdersUL>
        {orders.map((v,k)=>{
          return(
            <OrderItemStyles key={k}>
              <Link href={{
                pathname: '/order',
                query: {id: v.id}
              }}>
                <a>
                  <div className="order-meta">
                    <p>{v.items.reduce((t,i)=> t + i.quantity, 0)} item(s)</p>
                    <p>{v.items.length}</p>
                    <p>Date:</p>
                    <p>{formatMoney(v.total)}</p>
                  </div>
                  <div className="images">
                    {v.items.map((i,k)=>{
                      return(
                        <img key={k} src={i.image} alt={i.title} />
                      )
                    })}
                  </div>
                </a>
              </Link>
            </OrderItemStyles>
          )
        })}
      </OrdersUL>
    </div>
  )
}
