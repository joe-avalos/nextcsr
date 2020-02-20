import {mount} from 'enzyme'
import wait from 'waait'
import AddToCart, {ADD_TO_CART_MUTATION} from '../components/AddToCart'
import {CURRENT_USER_QUERY} from '../components/User'
import {MockedProvider} from '@apollo/react-testing'
import toJson from 'enzyme-to-json'
import {fakeCartItem, fakeUser} from '../lib/testUtils'
import {ApolloConsumer} from '@apollo/react-common'

const mocks = [
  {
    request: {query: CURRENT_USER_QUERY},
    result: {
      data:{
        me:{
          ...fakeUser(),
          cart: []
        }
      }
    }
  },
  {
    request: {query: CURRENT_USER_QUERY},
    result: {
      data:{
        me:{
          ...fakeUser(),
          cart: [fakeCartItem()]
        }
      }
    }
  },
  {
    request: {
      query: ADD_TO_CART_MUTATION,
      variables: {id: 'abc123'}
    },
    result: {
      data: {
        addToCart: {...fakeCartItem(), quantity: 1}
      }
    }
  }
]

describe('<AddToCart />', () => {
  it('should render and match snapshot', async ()=>{
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart id={'abd123'} />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(toJson(wrapper.find('button'))).toMatchSnapshot()
  })
  xit('should add an item to cart when clicked', async ()=>{
    let apolloClient
    
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client
            return <AddToCart id={'abc123'} />
          }}
        </ApolloConsumer>
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    const {data:{me}} = await apolloClient.query({query: CURRENT_USER_QUERY})
    expect(me.cart).toHaveLength(0)
    //simulate adding item to cart
    wrapper.find('button').simulate('click')
    await wait()
    wrapper.update()
    const {data:{me: me2}} = await apolloClient.query({query: CURRENT_USER_QUERY})
    //expect(me2.cart).toHaveLength(1)
    //expect(me2.cart[0].id).toBe('omg123')
    //expect(me2.cart[0].quantity).toBe(3)
    console.log(me2)
  })
  it('should change from add to adding on load', async ()=>{
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart id={'abc123'} />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(wrapper.text()).toContain('Add to cart')
    wrapper.find('button').simulate('click')
    expect(wrapper.text()).toContain('Adding to cart')
  })
})
