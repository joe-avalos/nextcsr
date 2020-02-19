import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'
import CartCount from '../components/CartCount'

describe('<CartCount />', () =>{
  xit('should render correctly', function () {
    shallow(<CartCount count={10} /> )
  });
  
  xit('should match the snapshot', function () {
    const wrapper = shallow(<CartCount count={50} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({count: 10})
    
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})
