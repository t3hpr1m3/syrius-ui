'use strict'

import config from 'config'
import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './routes'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'

export const app = express()

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

if (config.get('env') === 'development') {

  const compiler = webpack(webpackConfig)
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }
  }))
}

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
