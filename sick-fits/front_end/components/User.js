import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import Error from './ErrorMessage'

const CURRENT_USER_QUERY =  gql`
  query CURRENT_USER_QUERY{
    me {
      id
      email
      name
      permissions
      orders{
          id
      }
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
        }
      }
    }
  }
`

export default function ({children, callback}) {
  const {loading, error, data} = useQuery(CURRENT_USER_QUERY)
  
  if (loading) return null
  if (error) return <Error error={error} />
  callback(data.me)
  return(
    <>
      {children}
    </>
  )
}

export {CURRENT_USER_QUERY}
