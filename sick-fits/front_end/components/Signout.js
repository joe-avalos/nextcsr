import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {CURRENT_USER_QUERY} from './User'

const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION{
      signout{
        message
      }
    }
`

export default function(){
  const [signout, {loading, error}] = useMutation(SIGN_OUT_MUTATION,{
    refetchQueries: [{query: CURRENT_USER_QUERY}]
  })
  
  if (loading) return null
  
  return (
    <button onClick={signout}>Sign Out</button>
  )
}
