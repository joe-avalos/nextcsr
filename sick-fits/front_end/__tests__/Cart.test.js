import {mount} from 'enzyme'
import wait from 'waait'
import Cart, {LOCAL_STATE_QUERY} from '../components/Cart'
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
          cart: fakeCartItem()
        }
      }
    }
  },
  {
    request: {
      query: LOCAL_STATE_QUERY
    },
    result: {
      data: {
        cartOpen: true
      }
    }
  }
]

describe('<Cart />', () => {
  xit('should render and match snapshot', async ()=>{
    let apolloClient
    
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client
            return <Cart />
          }}
        </ApolloConsumer>
      </MockedProvider>
    )
    console.log(wrapper.debug())
    await wait()
    wrapper.update()
    expect(toJson(wrapper.find('header'))).toMatchSnapshot()
  })
})
