import Downshift from 'downshift'
import Router from 'next/router'
import debounce from 'lodash.debounce'
import {useState} from 'react'
import {DropDown, DropDownItem, SearchStyles} from './styles/DropDown'
import gql from 'graphql-tag'
import {useLazyQuery} from '@apollo/react-hooks'

const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY($searchTerm: String!){
        items(where:{
            OR: [
                {title_contains: $searchTerm},
                {description_contains: $searchTerm}
            ]
        }){
            id
            image
            title
        }
    }
`

export default function () {
  const [getItems, {loading, data}] = useLazyQuery(SEARCH_ITEMS_QUERY)
  const [term, setTerm] = useState('')
  const [items, setItems] = useState([])
  const [stateTerm, setStateTerm] = useState('')
  const [firstLoad, setFirstLoad] = useState(true)
  
  if (data && data.items && firstLoad) {
    setItems(data.items)
    setFirstLoad(false)
  }
  if (stateTerm !== term) {
    setStateTerm(term)
    setFirstLoad(true)
  }
  const onChange = debounce(e => {
    getItems({variables: {searchTerm: e.target.value}})
    setTerm(e.target.value)
  }, 400)
  
  return (
    <SearchStyles>
      <Downshift itemToString={item => item === null ? '' : item.title} onChange={i=>{
        Router.push({
          pathname: '/item',
          query: {id: i.id}
        })
      }}>
        {({getInputProps, getItemProps, isOpen, inputValue, highlightedIndex}) => (
          <div>
            <input
              {...getInputProps({
                type: 'search',
                id: 'search',
                placeholder: 'Search',
                className: loading ? 'loading' : '',
                onChange: e => {
                  e.persist()
                  onChange(e)
                }
              })
              }
            />
            {isOpen && (
              <DropDown>
                {loading && <DropDownItem>Loading...</DropDownItem>}
                {!!items && items.map((i, k) => {
                  return (
                    <DropDownItem {...getItemProps({item: i})} key={k} highlighted={k === highlightedIndex}>
                      <img width="50" src={i.image} alt={i.title}/>
                      {i.title}
                    </DropDownItem>
                  )
                })}
                {!!items && !items.length && !loading && <DropDownItem>No items found for {inputValue}</DropDownItem>}
              </DropDown>
            )
            }
          </div>
        )}
      </Downshift>
    </SearchStyles>
  )
}
