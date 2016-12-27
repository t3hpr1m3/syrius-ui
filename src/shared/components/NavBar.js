'use strict'

import React, { Component } from 'react'
import NavItem from './NavItem'

const NavBar = () => (
  <ul>
    <li><NavItem to='/' onlyActiveOnIndex>Home</NavItem></li>
    <li><NavItem to='/about'>About</NavItem></li>
  </ul>
)

export default NavBar
