'use strict'

import React, { Component } from 'react'
import NavItem from './NavItem'

export default class NavBar extends Component {
  render() {
    return (
      <ul>
        <li><NavItem to='/' onlyActiveOnIndex>Home</NavItem></li>
        <li><NavItem to='/about'>About</NavItem></li>
      </ul>
    )
  }
}
