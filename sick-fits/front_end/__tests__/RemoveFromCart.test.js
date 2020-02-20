import {mount} from 'enzyme'
import wait from 'waait'
import RemoveFromCart, {REMOVE_FROM_CART_MUTATION} from '../components/RemoveFromCart'
import {CURRENT_USER_QUERY} from '../components/User'
import {MockedProvider} from '@apollo/react-testing'
import toJson from 'enzyme-to-json'
import {fakeCartItem, fakeUser} from '../lib/testUtils'
import {ApolloConsumer} from '@apollo/react-common'

global.alert = console.log

const mocks = [
  {
    request: {query: CURRENT_USER_QUERY},
    result: {
      data:{
        me:{
          ...fakeUser(),
          cart: [fakeCartItem({id:'abc123'})]
        }
      }
    }
  },
  {
    request: {
      query: REMOVE_FROM_CART_MUTATION,
      variables: {id: 'abc123'}
    },
    result: {
      data: {
        removeFromCart: {__typename: 'CartItem', id: 'abc123'}
      }
    }
  }
]

describe('<RemoveFromCart />', () => {
  it('should render and match snapshot', async ()=>{
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RemoveFromCart id={'abd123'} />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(toJson(wrapper.find('button'))).toMatchSnapshot()
  })
  it('should remove an item to cart when clicked', async ()=>{
    let apolloClient
    
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client
            return <RemoveFromCart id={'abc123'} />
          }}
        </ApolloConsumer>
      </MockedProvider>
    )
    const res = await apolloClient.query({query: CURRENT_USER_QUERY})
    expect(res.data.me.cart).toHaveLength(1)
    expect(res.data.me.cart[0].item.price).toBe(5000)
    wrapper.find('button').simulate('click')
    await wait()
    const res2 = await apolloClient.query({query: CURRENT_USER_QUERY})
    expect(res2.data.me.cart).toHaveLength(0)
  })
})
