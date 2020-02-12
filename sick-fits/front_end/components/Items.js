import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import styled from 'styled-components'
import Item from './Item'
import Pagination from './Pagination'
import {perPage} from '../config'

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}){
    items(first: $first, skip: $skip, orderBy: price_DESC){
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const CenteredDiv = styled.div`
  text-align: center;
`

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

export default function ({page}) {
  const {loading, error, data} = useQuery(ALL_ITEMS_QUERY,{
    variables: {
      skip: page * perPage - perPage
    }
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <CenteredDiv>
      <Pagination page={page} />
      <ItemsList>
        {data.items.map((i,k) => <Item item={i} key={k}>{i.title}</Item>)}
      </ItemsList>
      <Pagination page={page} />
    </CenteredDiv>
  )
}

export {ALL_ITEMS_QUERY}
