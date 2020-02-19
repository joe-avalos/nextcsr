import {mount} from 'enzyme'
import wait from 'waait'
import Nav from '../components/Nav'
import {CURRENT_USER_QUERY} from '../components/User'
import {MockedProvider} from '@apollo/react-testing'
import {fakeUser, fakeCartItem} from '../lib/testUtils'
import toJson from 'enzyme-to-json'

const notSignedInMocks = [
  {
    request:{query:CURRENT_USER_QUERY},
    result:{data: {me: null}}
  }
]
const signedInMocks = [
  {
    request:{query:CURRENT_USER_QUERY},
    result:{data: {me: fakeUser()}}
  }
]
const signedInMocksWithCart = [
  {
    request:{query:CURRENT_USER_QUERY},
    result:{data: {me: {
      ...fakeUser(),
      cart:[fakeCartItem(),fakeCartItem(),fakeCartItem()]
    }}}
  }
]

describe('<Nav />', ()=>{
  it('should render a minimal navBar for logged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    const nav = wrapper.find('ul[data-test="nav"]')
    //expect(nav.children().length).toBe(2)
    expect(toJson(nav)).toMatchSnapshot()
  })
  it('should render a full navBar for signed in users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Nav />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    const nav = wrapper.find('ul[data-test="nav"]')
    expect(nav.children().length).toBe(6)
    expect(nav.text()).toContain('Sign Out')
    //expect(toJson(nav)).toMatchSnapshot()
  })
  it('should amount of items in a cart', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocksWithCart}>
        <Nav />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    const nav = wrapper.find('ul[data-test="nav"]')
    const count = nav.find('div.count')
    expect(count.text()).toContain('9')
    //expect(toJson(nav)).toMatchSnapshot()
  })
})
