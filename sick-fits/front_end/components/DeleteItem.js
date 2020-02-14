import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {ALL_ITEMS_QUERY} from './Items'
import Router from 'next/router'
import {CURRENT_USER_QUERY} from './User'
import {PAGINATION_QUERY} from './Pagination'

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`

export default function ({id}) {
  
  const [deleteItem, {loading}] = useMutation(DELETE_ITEM_MUTATION, {
    variables: {id},
    update(cache, {data}) {
      const queryData = cache.readQuery({query: ALL_ITEMS_QUERY})
      queryData.items = queryData.items.filter(item => item.id !== data.deleteItem.id)
      cache.writeQuery({query: ALL_ITEMS_QUERY, data: {...queryData}})
    },
    refetchQueries: [{query: CURRENT_USER_QUERY},{query: PAGINATION_QUERY}],
    optimisticResponse: {
      __typename: 'Mutation',
      deleteItem: {
        __typename: 'Item',
        id
      }
    }
  })
  
  function handleClick() {
    if (confirm('Are you sure?')) {
      deleteItem()
        .catch(e => {
          alert(e.message)
        })
    }
  }
  
  return (
    <button onClick={handleClick} disabled={loading} aria-busy={loading}>Delete 🗑</button>
  )
}
