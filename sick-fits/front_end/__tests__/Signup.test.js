import {mount} from 'enzyme'
import wait from 'waait'
import Signup, {SIGNUP_MUTATION} from '../components/Signup'
import {CURRENT_USER_QUERY} from '../components/User'
import {MockedProvider} from '@apollo/react-testing'
import toJson from 'enzyme-to-json'
import {fakeUser} from '../lib/testUtils'
import {ApolloConsumer} from '@apollo/react-common'

function type(wrapper, name, value) {
  wrapper.find(`input[name="${name}"]`).simulate('change',{target:{name,value}})
}
const me = fakeUser()
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: me.email,
        name: me.name,
        password: 'password',
      }
    },
    result:{
      data: {
        signup:{
          id: 'ABC123',
          email: me.email,
          name: me.name,
          __typename: 'User',
        }
      }
    }
  },
  {
    request: {query: CURRENT_USER_QUERY},
    result: {data:{me}}
  }
]

describe('<Signup />', () => {
  it('should render and match snapshot', ()=>{
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Signup/>
      </MockedProvider>
    )
    expect(toJson(wrapper.find('form'))).toMatchSnapshot()
  })
  it('should call the mutation properly', async ()=>{
    let apolloClient
    const wrapper = mount(
      <MockedProvider>
        <ApolloConsumer>
          {client => {
            apolloClient = client
            return <Signup/>
          }}
        </ApolloConsumer>
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    type(wrapper, 'name', me.name)
    type(wrapper, 'email', me.email)
    type(wrapper, 'password','password')
    wrapper.update()
    console.log(wrapper.debug())
    wrapper.find('form[data-test="form"]').simulate('submit')
    await wait()
    //query apolloClient for user
    const user = await apolloClient.query({query:CURRENT_USER_QUERY})
  })
})
