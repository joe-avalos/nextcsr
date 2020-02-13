import {useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import Error from './ErrorMessage'
import gql from 'graphql-tag'
import Table from './styles/Table'
import SickButton from './styles/SickButton'

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMDELETE',
  'ITEMUPDATE',
  'PERMISSIONUPDATE',
]

const ALL_USERS_QUERY = gql`
    query{
        users{
            id
            name
            email
            permissions
        }
    }
`

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId: ID!){
        updatePermissions(permissions: $permissions, userId: $userId){
          id
          permissions
          name
          email
        }
    }
`


const UserPermissions = ({user}) => {
  const [permissions, setPermissions] = useState(user.permissions);
  
  const [updatePermissions, {loading, error}] = useMutation(UPDATE_PERMISSIONS_MUTATION, {
    variables: {
      permissions: permissions,
      userId: user.id
    }
  })
  
  function handleChange(e){
    const checkBox = e.target
    let updatedPermissions = [...permissions]
    if(checkBox.checked){
      updatedPermissions.push(checkBox.value)
    }else{
      updatedPermissions = updatedPermissions.filter(v => v !== checkBox.value)
    }
    setPermissions(updatedPermissions)
  }
  
  if (error) return <Error error={error} />
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {possiblePermissions.map((p,k) => (
        <td key={k}>
          <label htmlFor={`${user.id}-permission-${p}`}>
            <input
              id={`${user.id}-permission-${p}`}
              type="checkbox"
              checked={permissions.includes(p)}
              onChange={handleChange}
              value={p}
            />
          </label>
        </td>
      ))}
      <td><SickButton onClick={updatePermissions} disabled={loading}>Updat{loading?'ing':'e'}</SickButton></td>
    </tr>
  )
}


export default function () {
  const {data, loading, error} = useQuery(ALL_USERS_QUERY)
  
  if (loading) return <p>Loading...</p>
  if (error) return <Error error={error}/>
  
  return (
    <div>
      <h2>Manage Permissions</h2>
      <Table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          {possiblePermissions.map((p,k) => <th key={k}>{p}</th>)}
          <th>✅</th>
        </tr>
        </thead>
        <tbody>
        {data.users.map((v, k) => {
          return <UserPermissions user={v} key={k}/>
        })}
        </tbody>
      </Table>
    </div>
  )
}
