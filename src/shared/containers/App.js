'use strict'

import React, { Component } from 'react'
import NavBar from '../components/NavBar'

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

