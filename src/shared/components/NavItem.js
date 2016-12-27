'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router';

const NavItem = props => (
  <Link {...props} activeClassName='active' />
)

export default NavItem
