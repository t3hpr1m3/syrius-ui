'use strict'

import config from 'config'
import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../routes'

export const app = express()

app.set('views', path.resolve(__dirname, '../views'))
app.set('view engine', 'pug')

app.use('/assets', express.static(path.resolve(__dirname, '../../dist/public')))

app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      let markup;
      if (renderProps) {
        markup = renderToString(<RouterContext {...renderProps} />)
      } else {
        markup = renderToString(<NotFoundPage />)
        res.status(404)
      }

      return res.render('index', { title: 'Syrius', markup })
  })
})
