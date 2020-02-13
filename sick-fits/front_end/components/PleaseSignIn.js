import {useQuery} from '@apollo/react-hooks'
import Signin from './Signin'
import {CURRENT_USER_QUERY} from './User'

export default function ({children}) {
  const {data, error, loading} = useQuery(CURRENT_USER_QUERY)
  
  if(loading) return <p>Loading...</p>
  if (!data.me){
    return(
      <div>
        <p>Please sign in before continuing.</p>
        <Signin />
      </div>
    )
  }
  return(
    <>
      {children}
    </>
  )
}
