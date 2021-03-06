// @flow

import type { User, Location } from 'types'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Layout as MdlLayout, Content, Grid, Cell, Footer, Snackbar,
  FooterSection, FooterLinkList, Spinner } from 'react-mdl'

import { getUser, isAuthenticated, isInitialized } from 'modules/auth/selectors'
import { isSnackbarVisible, getSnackbarText } from 'modules/snackbar/selectors'
import { getLocation } from 'routing/selectors'
import { logout } from 'modules/auth/reducer'
import { RouteWhenAuthorized } from 'routing/routes'
import CardActionButton from '../pages/cards/card-action-button'
import Header from './header'

import './layout.css'

type LayoutProps = {
  user: User,
  isAuthenticated: boolean,
  isAuthInitialized: boolean,
  children: any,
  logout: () => void,
  location: Location,
  snackbarText: string,
  isSnackbarVisible: boolean,
}

type LayoutState = {
  scroll: number,
}

class Layout extends Component {
  props: LayoutProps
  state: LayoutState

  constructor(props) {
    super(props)

    this.state = {
      scroll: 0,
    }
  }

  handleScroll = (event) => {
    this.setState({ scroll: event.target.scrollTop })
  }

  render () {
    const { children, isAuthenticated, isAuthInitialized, logout,
      location, user, isSnackbarVisible, snackbarText } = this.props
    const { scroll } = this.state

    return (
      <MdlLayout fixedHeader fixedTabs>
        <Content
          className="mdl-color--grey-100 mdl-color-text--grey-700"
          onScroll={this.handleScroll}
        >
          <Header
            isAuthenticated={isAuthenticated}
            isAuthInitialized={isAuthInitialized}
            location={location}
            logout={logout}
            user={user}
            scroll={scroll}
          />
          <Grid className="page-content">
            <Cell col={12}>
              {!isAuthInitialized ? (
                <div className="loading"><Spinner /></div>
              ) : children}
            </Cell>
          </Grid>
        </Content>

        <RouteWhenAuthorized
          path='/cards'
          isAuthenticated={isAuthenticated}
          exactly
          component={CardActionButton}
        />

        <Footer size="mini">
          <FooterSection>
            <div className="mdl-logo mdl-cell--hide-phone mdl-cell--hide-tablet">Colorful Learningcards</div>
            <FooterLinkList>
              <Link to="/" className={`${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
              <Link to="/about" className={`${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
            </FooterLinkList>
          </FooterSection>
        </Footer>
        <Snackbar active={isSnackbarVisible} timeout={5000} onTimeout={() => { }}>
          {snackbarText}
        </Snackbar>
      </MdlLayout>
    )
  }
}

export default connect(state => ({
  user: getUser(state),
  isAuthenticated: isAuthenticated(state),
  isAuthInitialized: isInitialized(state),
  location: getLocation(state),
  isSnackbarVisible: isSnackbarVisible(state),
  snackbarText: getSnackbarText(state),
}), {
  logout,
})(Layout)
