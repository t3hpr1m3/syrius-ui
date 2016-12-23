'use strict'

import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Home from './containers/pages/Home'
import About from './containers/pages/About'

class NotFound extends Component {
  render() {
    return <h2>Not found</h2>
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="*" component={NotFound} />
  </Route>
)
