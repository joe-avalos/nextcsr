import {mount} from 'enzyme'
import wait from 'waait'
import Order, {SINGLE_ORDER_QUERY} from '../components/Order'
import {CURRENT_USER_QUERY} from '../components/User'
import {MockedProvider} from '@apollo/react-testing'
import toJson from 'enzyme-to-json'
import {fakeOrder} from '../lib/testUtils'

const mocks = [
  {
    request: {query: SINGLE_ORDER_QUERY, variables: {id: 'ord123'}},
    result: {data:{order: fakeOrder()}}
  }
]

describe('<Order />', () => {
  it('should render and match snapshot', async ()=>{
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Order id={'ord123'} />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(toJson(wrapper.find('div[data-test="order"]'))).toMatchSnapshot()
  })
})
