import {mount} from 'enzyme'
import wait from 'waait'
import RequestReset, {REQUEST_RESET_MUTATION} from '../components/RequestReset'
import {MockedProvider} from '@apollo/react-testing'
import toJson from 'enzyme-to-json'

const mocks = [
  {
    request:{query: REQUEST_RESET_MUTATION,variables:{email:'boloyde@gmail.com'}},
    result:{data:{requestReset:{__typename:'Message',message:'Success'}}}
  }
]

describe('<RequestReset />', () => {
  it('should render and match snapshot', ()=>{
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    )
    const form = wrapper.find('form[data-test="form"]')
    expect(toJson(form)).toMatchSnapshot()
  })
  it('should call the mutation', async ()=>{
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    )
    const input = wrapper.find('input[type="email"]').simulate('change',{target:{name:'email',value:'boloyde@gmail.com'}})
    wrapper.find('form').simulate('submit')
    await wait()
    wrapper.update()
    expect(wrapper.find('p').text()).toContain('Success! Check your email for link.')
  })
})
