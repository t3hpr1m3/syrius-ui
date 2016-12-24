'use strict'

import config from 'config'
import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../shared/routes'

export const app = express()

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.resolve(__dirname, '../../static')));
app.use('/assets', express.static(path.resolve(__dirname, '../../dist/client')))

app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      let markup;
      if (renderProps) {
        let status = renderProps.routes[renderProps.routes.length - 1].status;
        if (status === 404) {
          res.status(404);
        }
        markup = renderToString(<RouterContext {...renderProps} />)
      } else {
        markup = renderToString(<NotFoundPage />)
        res.status(404)
      }

      return res.render('index', { title: 'Syrius', markup })
  })
})
