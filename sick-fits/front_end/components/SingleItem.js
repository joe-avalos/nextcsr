import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import Error from './ErrorMessage'
import styled from 'styled-components'
import Head from 'next/head'
import formatMoney from '../lib/formatMoney'
import Link from 'next/link'

const SINGLE_ITEM_QUERY =  gql`
  query SINGLE_ITEM_QUERY($id: ID!){
    item(where: {id: $id}){
      id
      title
      description
      price
      largeImage
    }
  }
`

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.maxWidth};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`

export default function ({id}) {
  const {loading, error, data} = useQuery(SINGLE_ITEM_QUERY,{
    variables: {id: id}
  })
  
  if (loading) return <p>Loading...</p>
  if (error) return <Error error={error} />
  if (!data.item) return <p>No item found for id: {id}</p>
  
  const item = data.item
  return(
    <SingleItemStyles>
      <Head>
        <title>Sick Fits! | {item.title}</title>
      </Head>
      <img src={item.largeImage} alt={item.title} />
      <div className="detials">
        <h2>Viewing {item.title}</h2>
        <p>{item.description}</p>
        <p>Price: {formatMoney(item.price)}</p>
        <Link href={{
        pathname: '/update',
        query: {id: item.id}
      }}>
        <a>Edit ✏️</a>
      </Link>
      </div>
    </SingleItemStyles>
  )
}

export {SINGLE_ITEM_QUERY}
