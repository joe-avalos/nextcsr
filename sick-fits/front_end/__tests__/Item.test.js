import ItemComponent from '../components/Item'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

const fakeItem = {
  id: 'ABC123',
  title: 'L\'ion chef',
  price: 5000,
  description: 'Cooking meals on wheels',
  image: 'dog.jpg',
  largeImage: 'largeDog.jpg'
}

const wrapper = shallow(<ItemComponent item={fakeItem} /> )
describe('<Item />',()=>{
  it('should render and match snapshot', function () {
    expect(toJson(wrapper)).toMatchSnapshot()
  });
  
  /*it('should render the image properly', function () {
    expect(wrapper.find('img').props().src).toBe(fakeItem.image)
    expect(wrapper.find('img').props().alt).toBe(fakeItem.title)
  })
  
  it('should render the title and priceTag', function () {
    //console.log(wrapper.debug())
    const PriceTag = wrapper.find('PriceTag')
    expect(PriceTag.children().text()).toBe('$50')
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title)
  });
  it('should render the button list properly', function () {
    const buttonList = wrapper.find('.buttonList')
    expect(buttonList.children()).toHaveLength(3)
    expect(buttonList.find('Link')).toBeTruthy()
    expect(buttonList.find('DeleteFromCart')).toBeTruthy()
    expect(buttonList.find('AddToCart')).toBeTruthy()
  });*/
})
