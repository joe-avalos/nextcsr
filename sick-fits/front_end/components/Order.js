import {format} from 'date-fns'
import Head from 'next/head'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
import OrderStyles from './styles/OrderStyles'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: ID!){
        order(id: $id){
            id
            charge
            total
            createdAt
            user {
              id
            }
            items {
              id
              title
              description
              price
              image
              quantity
            }
            
        }
    }
`

export default function({id}){
  const {data,loading,error} = useQuery(SINGLE_ORDER_QUERY,{
    variables:{id}
  })
  if (loading) return <p>Loading...</p>
  if (error) return <Error error={error} />
  const order = data.order
  return(
    <OrderStyles>
      <Head>
        <title>Sick Fits - Order {order.id}</title>
      </Head>
      <p>
        <span>Order ID:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
      <span>Date:</span>
        <span>{order.createdAt}{/*format(, 'MMMM d, YYYY h:mm a')}*/}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item count:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((i,k)=>{
          return(
            <div className="order-item" key={k}>
              <img width="100" src={i.image} alt={i.title} />
              <div className="item-details">
                <h2>{i.title}</h2>
                <p>Qty: {i.quantity}</p>
                <p>Each: {formatMoney(i.price)}</p>
                <p>Subtotal: {formatMoney(i.price * i.quantity)}</p>
                <p>{i.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </OrderStyles>
  )
}
