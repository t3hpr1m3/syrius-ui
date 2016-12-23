'use strict'

import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import './static/favicon.ico'

window.onload = () => {
  render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('react-view')
  )
}
