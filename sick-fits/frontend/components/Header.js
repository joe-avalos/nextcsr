import {useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'

import {Nav} from './Nav'

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
  }
`;


export default function () {
  useEffect(() => {
    const handleRouteChange = url => {
      console.log('App is changing to: ', url)
    }
    const handleChangeComplete = url => {
      console.log('Change completed to: ', url)
    }
    const handleChangeError = url => {
      console.log('Change errored to: ', url)
    }
    Router.events.on('routeChangeStart', handleRouteChange)
    Router.events.on('routeChangeComplete', handleChangeComplete)
    Router.events.on('routeChangeError', handleChangeError)
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange)
      Router.events.off('routeChangeComplete', handleChangeComplete)
      Router.events.off('routeChangeError', handleChangeError)
    };
  }, []);
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>Sick Fits</a>
          </Link>
        </Logo>
        <Nav/>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </StyledHeader>
  )
}
