import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {ALL_ITEMS_QUERY} from './Items'
import Router from 'next/router'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!){
    deleteItem(id: $id){
      id
    }
  }
`

export default function ({id}) {
  
  const [deleteItem, {error}] = useMutation(DELETE_ITEM_MUTATION, {
    update(cache, {data: {deleteItem}}){
      const data = cache.readQuery({query: ALL_ITEMS_QUERY})
      data.items = data.items.filter(item => item.id !== deleteItem.id)
      cache.writeQuery({query: ALL_ITEMS_QUERY, data})
    }
  })
  
  function handleClick() {
    if (confirm('Are you sure?')) {
      deleteItem({
        variables: {id: id}
      }).then(() =>{
        Router.push({
          pathname: '/items'
        })
        }
      )
    }
  }
  
  return (
    <button onClick={handleClick}>Delete 🗑</button>
  )
}
