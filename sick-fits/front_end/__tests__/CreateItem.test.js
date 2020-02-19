import {mount} from 'enzyme'
import wait from 'waait'
import CreateItem, {CREATE_ITEM_MUTATION} from '../components/CreateItem'
import {MockedProvider} from '@apollo/react-testing'
import toJson from 'enzyme-to-json'
import {fakeItem} from '../lib/testUtils'
import Router from 'next/router'

const dogImage = 'https://dog.com/dog.jpg'

global.fetch = jest.fn().mockResolvedValue({
  json: ()=>({
    secure_url: dogImage,
    eager:[{secure_url: dogImage}]
  })
})

describe('<CreateItem />', () => {
  it('should render and match snapshot', ()=>{
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )
    const form = wrapper.find('form[data-test="form"]')
    expect(toJson(form)).toMatchSnapshot()
  })
  it('should upload a file on change', async ()=>{
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )
    const input = wrapper.find('input[type="file"]')
    input.simulate('change',{target:{files:['fakegod.jpg']}})
    await wait()
    wrapper.update()
    expect(wrapper.find('[alt="Upload Preview"]').prop('src')).toEqual(dogImage)
    expect(global.fetch).toHaveBeenCalled()
    global.fetch.mockReset()
  })
  it('should handle state updating', ()=>{
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )
    const title = wrapper.find('#title')
    title.simulate('change',{target:{value:'testing', name: 'title'}})
    const price = wrapper.find('#price')
    price.simulate('change',{target:{value:50000, name: 'price', type: 'number'}})
    const description = wrapper.find('#description')
    description.simulate('change',{target:{value:'This is a real item', name: 'description'}})
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('should create an item when the form is submitted', async ()=>{
    const item = fakeItem()
    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            price: item.price,
            image: '',
            largeImage: ''
          }
        },
        result:{
          data:{
            createItem:{
              __typename: 'Item',
              id: 'ABC123',
              ...fakeItem
            }
          }
        }
      }
    ]
    
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <CreateItem/>
      </MockedProvider>
    )
    wrapper.find('#title').simulate('change',{target:{value:item.title, name: 'title'}})
    wrapper.find('#price').simulate('change',{target:{value:item.price, name: 'price', type: 'number'}})
    wrapper.find('#description').simulate('change',{target:{value:item.description, name: 'description'}})
    //mock the router
    Router.router = {push: jest.fn()}
    wrapper.find('form').simulate('submit')
    await wait(50)
    expect(Router.router.push).toHaveBeenCalled()
    expect(Router.router.push).toHaveBeenCalledWith({pathname: "/item", query:{id: "ABC123"}})
  })
})
