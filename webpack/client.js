'use strict'

var config = require('config');
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./base');

var clientConfig = {
  entry: {
    app: path.join(baseConfig.sourceRoot, 'client', 'index.js'),
    vendor: [
      'react',
      'react-dom',
      'react-router'
    ]
  },
  output: {
    path: path.join(baseConfig.outputRoot, 'client'),
    filename: '[name].js',
    publicPath: '/assets/'
  },
  devtool: baseConfig.devtool,
  plugins: baseConfig.plugins(),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};

if (config.get('env') === 'production') {
  clientConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true
    },
    comments: false,
    sourceMap: false
  }));
}

clientConfig.plugins.push(
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
);

exports = module.exports = clientConfig;
