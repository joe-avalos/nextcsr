import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import Error from './ErrorMessage'
import Form from './styles/Form'
import useForm from '../lib/useForm'
import {useState} from 'react'
import {CURRENT_USER_QUERY} from './User'
import Router from 'next/router'

const RESET_MUTATION =  gql`
    mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!){
        resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword){
            id
            email
            name
        }
    }
`

export default function ({resetToken}) {
  const initValues = {
    resetToken: resetToken,
    password: '',
    confirmPassword: ''
  }
  
  const [resetPassword, {loading, error}] = useMutation(RESET_MUTATION,{
    refetchQueries: [{query: CURRENT_USER_QUERY}]
  })
  
  const [savingStarted, setSavingStarted] = useState(false)
  const [stateValues, setStateValues] = useState(initValues)
  
  
  const {values, errors, handleChange, handleSubmit} = useForm(callback, validate, initValues)
  
  function callback() {
    if (!savingStarted) {
      setSavingStarted(true)
      resetPassword({
        variables: {...values}
      }).then(() => {
        Router.push({
          pathname: '/items'
        })
      })
    }
  }
  
  //Only used if you want to run frontend form validations
  //Using it for sick-fits to reset form and be able to resubmit
  function validate(){
    let errors = {}
    if (error && values !== stateValues){
      setSavingStarted(false)
      setStateValues(values)
    }
    
    return errors
  }
  
  if (loading) return <p>Loading...</p>
  if (error) return <Error error={error} />
  return(
    <Form method={"POST"} onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset your password.</h2>
        <Error error={error} />
        <label htmlFor="password">
          Password
          <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange}/>
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={values.confirmPassword}
                 onChange={handleChange}/>
        </label>
        <button type="submit">Reset password</button>
      </fieldset>
    </Form>
  )
}
