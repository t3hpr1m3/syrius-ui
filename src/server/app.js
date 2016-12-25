'use strict'

import config from 'config'
import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../shared/routes'

//
// The all-mighty app
//
export const app = express()

//
// Pug will render our initial view
//
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug')

//
// These are favicons and whatnot.  Eventually, I'll probably move these into
// `src/`, and let webpack deal with them.  For now, they can just hang out in
// their own directory.
//
app.use(express.static(path.resolve(__dirname, '..', '..', 'static')))

//
// These are the webpack generated artifacts.  They get their own handler
//
app.use('/assets', express.static(path.join(config.get('distRoot'), 'client')))


//
// Delegate everything else to react-router
//
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      if (err) { return res.status(500).send(err.message) }

      //
      // I'm not checking for the exitence of renderProps here because
      // (allegedly) with a catch-all route, it should always be populated
      //
      let status = renderProps.routes[renderProps.routes.length - 1].status || 200
      res.status(status)
      let markup = renderToString(<RouterContext {...renderProps} />)

      //
      // Shove the react generated markup into our template and away we go
      //
      return res.render('index', { title: 'Syrius', markup })
  })
})
