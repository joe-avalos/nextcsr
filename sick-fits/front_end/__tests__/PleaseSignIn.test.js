import {mount} from 'enzyme'
import wait from 'waait'
import PleaseSignIn from '../components/PleaseSignIn'
import {CURRENT_USER_QUERY} from '../components/User'
import {MockedProvider} from '@apollo/react-testing'
import {fakeUser} from '../lib/testUtils'

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

describe('<PleaseSignIn />', ()=>{
  it('should render the please sign in dialog to signed out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <PleaseSignIn />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(wrapper.text()).toContain('Please sign in before continuing.')
    expect(wrapper.find('Signin')).toBeTruthy()
  })
  
  it('should render the child component when user is logged in', async () => {
    const Hey = () => <p>Hey!</p>
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <PleaseSignIn>
          <Hey />
        </PleaseSignIn>
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(wrapper.find('Hey')).toBeTruthy()
    expect(wrapper.contains(<Hey />)).toBeTruthy()
  })
})
