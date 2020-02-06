import App from 'next/app'
import {ThemeProvider} from 'styled-components'
import {ApolloProvider} from '@apollo/react-hooks'
import withApollo from '../lib/withApollo'

import Page from '../components/Page'
import '../components/styles/global-style.scss'

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  fontFamily: "'radnika_next', sans-serif",
}

class MyApp extends App {
  render() {
    const {Component, router, apollo} = this.props
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apollo}>
        <Page props={this.props}>
          <Component {...router}/>
        </Page>
        </ApolloProvider>
      </ThemeProvider>
    )
  }
}

export default withApollo(MyApp)
