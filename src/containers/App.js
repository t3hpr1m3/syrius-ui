'use strict'

import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router';

class NavItem extends Component {
  render() {
    return (
      <Link {...this.props} activeClassName='active' />
    )
  }
}

class NavBar extends Component {
  render() {
    return (
      <ul>
        <li><NavItem to='/' onlyActiveOnIndex>Home</NavItem></li>
        <li><NavItem to='/about'>About</NavItem></li>
      </ul>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div id='app-view'>
        <header>
          <h1>Syrius</h1>
          <NavBar />
        </header>
        {this.props.children}
      </div>
    )
  }
}

