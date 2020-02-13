import {useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

import useForm from '../lib/useForm'
import Router from 'next/router'
import Form from './styles/Form'
import Error from './ErrorMessage'
import formatMoney from '../lib/formatMoney'
import styled from 'styled-components'
import {ALL_ITEMS_QUERY} from './Items'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $price: Int!
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
    }
  }
`
const CenteredDiv = styled.div`
  text-align: center;
`

export default function () {
  
  const [createItem, {loading, error}] = useMutation(CREATE_ITEM_MUTATION)
  const [image, setImage] = useState('')
  const [largeImage, setLargeImage] = useState('')
  const [savingStarted, setSavingStarted] = useState(false)
  
  const initValues = {
    title: 'Title',
    description: 'Desc',
    image: 'dog.jpg',
    largeImage: 'dogg.jpg',
    price: 1000
  }
  
  const {values, errors, handleChange, handleSubmit} = useForm(callback, validate, initValues)
  
  function callback() {
    if (!savingStarted) {
      setSavingStarted(true)
      createItem({
        variables: {...values, image, largeImage},
        update(cache, {data:{createItem}}){
          const {items} = cache.readQuery({query: ALL_ITEMS_QUERY})
          cache.writeQuery({query: ALL_ITEMS_QUERY, data: {items: items.concat([createItem])}})
        }
      }).then(res => {
        Router.push({
          pathname: '/item',
          query: {id: res.data.createItem.id}
        })
      })
    }
  }
  
  function validate(){
    let errors = {}
    
    return errors
  }
  
  async function uploadFile (e){
    console.log('Uploading...')
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset','sickfits')
    
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dmptomtdx/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    console.log(file.eager)
    setImage(file.secure_url)
    setLargeImage(file.eager[0].secure_url)
  }
  
  return(
    <Form onSubmit={handleSubmit}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input type="file" id="file" name="file" placeholder="Upload an image..."
                 multiple={false}
                 required={true}
                 onChange={uploadFile}/>
        </label>
        {image && <CenteredDiv><img width={100} src={image} alt={'Upload Preview'} /></CenteredDiv> }
        <label htmlFor="title">
          Title
          <input type="text" id="title" name="title" placeholder="title"
                 required={true}
                 value={values.title}
                 onChange={handleChange}/>
        </label>
        <label htmlFor="description">
          Description
          <textarea type="text" id="description" name="description" placeholder="Enter a description"
                    required={true}
                 value={values.description}
                 onChange={handleChange} />
        </label>
        <label htmlFor="price">
          Price
          <input type="number" id="price" name="price" placeholder="price" required
                 value={values.price}
                 onChange={handleChange}/>
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </Form>
  )
}

export {CREATE_ITEM_MUTATION}
