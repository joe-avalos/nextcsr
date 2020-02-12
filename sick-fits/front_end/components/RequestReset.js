import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import Error from './ErrorMessage'
import Form from './styles/Form'
import useForm from '../lib/useForm'
import {useState} from 'react'

const REQUEST_RESET_MUTATION =  gql`
    mutation REQUEST_RESET_MUTATION($email: String!){
        requestReset(email: $email){
            message
        }
    }
`

export default function () {
  const [requestReset, {loading, error, called}] = useMutation(REQUEST_RESET_MUTATION)
  
  const [savingStarted, setSavingStarted] = useState(false)
  
  const initValues = {
    email: ''
  }
  
  const {values, errors, handleChange, handleSubmit} = useForm(callback, validate, initValues)
  
  function callback() {
    if (!savingStarted) {
      setSavingStarted(true)
      requestReset({
        variables: {...values}
      }).then(() => {})
    }
  }
  
  function validate(){
    let errors = {}
    
    return errors
  }
  
  if (loading) return <p>Loading...</p>
  if (error) return <Error error={error} />
  
  return(
    <Form method={"POST"} onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Request a password reset.</h2>
        <Error error={error} />
        {!error && !loading && called && <p>Success! Check your email for link.</p>}
        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="email" value={values.email} onChange={handleChange}/>
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  )
}
