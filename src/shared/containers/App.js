'use strict'

import React, { Component } from 'react'
import NavBar from '../components/NavBar'

const App = ({children}) => (
  <div id='app-view'>
    <header>
      <h1>Syrius</h1>
      <NavBar />
    </header>
    {children}
  </div>
)

export default App
