var config = require('config'),
    fs = require('fs'),
    path = require('path'),
    webpack = require('webpack');

function nodeModules() {
  return fs.readdirSync('node_modules')
    .filter(function(x) {
      return ['bin'].indexOf(x) === -1;
    })
    .concat([
      'react-dom/server'
    ])
    .reduce(function(ext, mod) {
      ext[mod] = 'commonjs ' + mod;
      return ext;
    }, {});
}

var config = [
  {
    entry: [
      'babel-polyfill',
      path.join(__dirname, 'src/server/index.js')
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.js',
      libraryTarget: 'commonjs2'
    },
    devtool: '#cheap-module-source-map',
    target: 'node',
    node: {
      __filename: true,
      __dirname: true
    },
    externals: nodeModules(),
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      })
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel']
        }
      ]
    }
  },
  {
    entry: {
      app: path.join(__dirname, 'src/client/index.js'),
      vendor: [
        'react',
        'react-dom',
        'react-router'
      ]
    },
    output: {
      path: path.join(__dirname, 'dist', 'public'),
      filename: '[name].js'
    },
    devtool: '#cheap-module-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        { 
          test: /\.ico$/,
          loader: 'file',
          query: {
            name: '[name].[ext]'
          }
        }
      ]
    }
  }
]

module.exports = config;
