import React from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components'
import Header from './Header'
import {Meta} from './Meta'

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
}

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: 'radnika_next';
      src: url("/static/radnikanext-medium-webfont.woff2") format('woff2');
      font-weight: normal;
      font-style: normal;
    }
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
    font-family: 'radnika_next', sans-serif;
    background: white;
    color: ${props => props.theme.black};
  }
  a{
  text-decoration: none;
  color: ${theme.black};
  }
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

export default function (props) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle>
        <Meta/>
        <Header/>
        <Inner>
          {props.children}
        </Inner>
      </GlobalStyle>
    </ThemeProvider>
  )
}
