import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import Error from './ErrorMessage'
import Form from './styles/Form'
import useForm from '../lib/useForm'
import Router from 'next/router'
import {useState} from 'react'
import {CURRENT_USER_QUERY} from './User'

const SIGNUP_MUTATION =  gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!){
        signup(email: $email, name: $name, password: $password){
            id
            email
            name
        }
    }
`

export default function () {
  const [signup, {loading, error}] = useMutation(SIGNUP_MUTATION,{
    refetchQueries: [{query: CURRENT_USER_QUERY}]
  })
  
  const [savingStarted, setSavingStarted] = useState(false)
  
  const initValues = {
    email: '',
    name: '',
    password: ''
  }
  
  const {values, errors, handleChange, handleSubmit} = useForm(callback, validate, initValues)
  
  function callback() {
    if (!savingStarted) {
      setSavingStarted(true)
      signup({
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
    <Form method={"POST"} onSubmit={handleSubmit} data-test="form">
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Signup for an Account!</h2>
        <Error error={error} />
        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="email" value={values.email} onChange={handleChange}/>
        </label>
        <label htmlFor="name">
          Name
          <input type="text" name="name" placeholder="name" value={values.name} onChange={handleChange}/>
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" placeholder="password" value={values.password}
                 onChange={handleChange}/>
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  )
}

export {SIGNUP_MUTATION}
