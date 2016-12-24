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

exports = module.exports = [
  {
    entry: [
      'babel-polyfill',
      path.join(__dirname, 'src/server/index')
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.js'
    },
    devtool: false,
    target: 'node',
    node: {
      __filename: true,
      __dirname: true
    },
    externals: nodeModules(),
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
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
    devtool: false,
    entry: {
      app: [path.resolve(__dirname, 'src/client/index')],
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
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true
        },
        comments: false,
        sourceMap: false
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel']
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
];
