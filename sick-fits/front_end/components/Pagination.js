import PaginationStyles from './styles/PaginationStyles'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import Head from 'next/head'
import Link from 'next/link'
import {perPage} from '../config'

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY{
    itemsConnection{
      aggregate{
        count
      }
    }
  }
`

export default function ({page}) {
  const {loading, error, data} = useQuery(PAGINATION_QUERY)
  
  if (loading) return <PaginationStyles><p>Getting Page Count...</p></PaginationStyles>
  const count = data.itemsConnection.aggregate.count
  const pages = Math.ceil(count / perPage)
  return(
    <PaginationStyles>
      <Head>
        <title>Sick fits! Page {page} of {pages}</title>
      </Head>
      <Link
        href={{
        pathname: 'items',
        query: {page: page - 1}
      }}>
        <a className="prev" aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>{page} of {pages}</p>
      <p>{count} items total</p>
      <Link
        href={{
          pathname: 'items',
          query: {page: page + 1}
        }}>
        <a className="next" aria-disabled={page >= pages}>Next →</a>
      </Link>
    </PaginationStyles>
  )
}

export {PAGINATION_QUERY}
