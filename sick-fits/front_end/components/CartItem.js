import formatMoney from '../lib/formatMoney'
import styled from 'styled-components'
import RemoveFromCart from './RemoveFromCart'

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightGrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img{
    margin-right: 10px;
  }
  h3, p{
    margin: 0;
  }
`

export default function ({cartItem}) {
  if (!cartItem.item) return (
    <CartItemStyles>
      <p>This item has been deleted!</p>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  )
  return(
    <CartItemStyles>
      <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
      <div className="cart-item-details">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price * cartItem.quantity)}
          {' - '}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.item.price)}
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id}/>
    </CartItemStyles>
  )
}
