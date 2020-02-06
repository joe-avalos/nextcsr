import {useState} from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

import useForm from '../lib/useForm'
import Router from 'next/router'
import Form from './styles/Form'
import Error from './ErrorMessage'
import formatMoney from '../lib/formatMoney'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!){
    item(where: {id: $id}){
      id
      title
      description
      price
    }
  }
`

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`

export default function ({id}) {
  const {loading, error, data} = useQuery(SINGLE_ITEM_QUERY,{
    variables: {id: id}
  })
  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION)
  const [savingStarted, setSavingStarted] = useState(false)
  console.log(savingStarted)
  
  const {values, errors, handleChange, handleSubmit} = useForm(callback, validate)
  
  function callback() {
    if (!savingStarted) {
      setSavingStarted(true)
      updateItem({
        variables: {id: id, ...values}
      }).then(res => {
        Router.push({
          pathname: '/item',
          query: {id: res.data.updateItem.id}
        })
      })
    }
  }
  
  function validate(){
    let errors = {}
    
    return errors
  }
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data.item) return <p>No item found for id: {id}</p>
  
  return(
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="title">
          Title
          <input type="text" id="title" name="title" placeholder="title"
                 required={true}
                 defaultValue={data.item.title}
                 onChange={handleChange}/>
        </label>
        <label htmlFor="description">
          Description
          <textarea type="text" id="description" name="description" placeholder="Enter a description"
                    required={true}
                 defaultValue={data.item.description}
                 onChange={handleChange} />
        </label>
        <label htmlFor="price">
          Price
          <input type="number" id="price" name="price" placeholder="price" required
                 defaultValue={data.item.price}
                 onChange={handleChange}/>
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </Form>
  )
}

export {UPDATE_ITEM_MUTATION}
