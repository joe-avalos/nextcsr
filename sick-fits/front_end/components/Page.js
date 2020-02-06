import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'

import Header from './Header'
import {Meta} from './Meta'

const GlobalStyle = createGlobalStyle`
  html{
    -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after{
    -webkit-box-sizing: inherit;-moz-box-sizing: inherit;box-sizing: inherit;
  }
  body{
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-family: ${props => props.theme.fontFamily};
  }
  a{
    text-decoration: none;
    color: ${props => props.theme.black};
  }
`

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

export default function (props) {
  return (
    <StyledPage>
      <GlobalStyle/>
      <Meta/>
      <Header/>
      <Inner>
        {props.children}
      </Inner>
    </StyledPage>
  )
}
