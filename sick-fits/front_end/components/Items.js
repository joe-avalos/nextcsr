import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import styled from 'styled-components'
import Item from './Item'

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY{
    items{
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

export default function () {
  const {loading, error, data} = useQuery(ALL_ITEMS_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <CenteredDiv>
      <p>Items!</p>
      <p>I found {data.items.length} items!</p>
      <ItemsList>
        {data.items.map((i,k) => <Item item={i} key={k}>{i.title}</Item>)}
      </ItemsList>
    </CenteredDiv>
  )
}

export {ALL_ITEMS_QUERY}
