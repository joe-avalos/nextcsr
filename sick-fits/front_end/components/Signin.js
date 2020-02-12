import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import Error from './ErrorMessage'
import Form from './styles/Form'
import useForm from '../lib/useForm'
import Router from 'next/router'
import {useState} from 'react'
import {CURRENT_USER_QUERY} from './User'

const SIGNIN_MUTATION =  gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!){
        signin(email: $email, password: $password){
            id
            email
            name
        }
    }
`

export default function () {
  const [signin, {loading, error}] = useMutation(SIGNIN_MUTATION,{
    refetchQueries: [{query: CURRENT_USER_QUERY}]
  })
  
  const [savingStarted, setSavingStarted] = useState(false)
  
  const initValues = {
    email: '',
    password: ''
  }
  
  const {values, errors, handleChange, handleSubmit} = useForm(callback, validate, initValues)
  
  function callback() {
    if (!savingStarted) {
      setSavingStarted(true)
      signin({
        variables: {...values}
      }).then(() => {
        Router.push({
          pathname: '/items'
        })
      })
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
        <h2>Signin to your Account!</h2>
        <Error error={error} />
        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="email" value={values.email} onChange={handleChange}/>
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" placeholder="password" value={values.password}
                 onChange={handleChange}/>
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  )
}
