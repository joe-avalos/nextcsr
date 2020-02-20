import {mount} from 'enzyme'
import wait from 'waait'
import TakeMyMoney, {CREATE_ORDER_MUTATION} from '../components/TakeMyMoney'
import NProgress from 'nprogress'
import Router from 'next/router'
import {CURRENT_USER_QUERY} from '../components/User'
import {MockedProvider} from '@apollo/react-testing'
import toJson from 'enzyme-to-json'
import {fakeCartItem, fakeUser} from '../lib/testUtils'
import {ApolloConsumer} from '@apollo/react-common'

Router.router = {push(){}}

const mocks = [
  {
    request: {query: CURRENT_USER_QUERY},
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()]
        }
      }
    }
  }
]

describe('<TakeMyMoney />', () => {
  it('should render and match snapshot', async ()=>{
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    const checkoutButton = wrapper.find('ReactStripeCheckout')
    expect(toJson(checkoutButton)).toMatchSnapshot()
  })
  xit('should create an order onToken', async ()=>{
    const createOrderMock = jest.fn().mockResolvedValue({
      data:{ createOrder: { id: 'xyz789'}}
    })
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    )
    const component = wrapper.find('TakeMyMoney')
    component.onToken({id: 'abc123', createOrderMock})
    expect(createOrderMock).toHaveBeenCalled()
  })
})
