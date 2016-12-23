var webpack = require('webpack'),
    path = require('path');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3000";

var config = {
  entry: './src/client',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/bundle.js'
  },
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
  },
  devServer: {
    contentBase: './src',
    noInfo: true,
    historyApiFallback: true,
    port: PORT,
    host: HOST,
    public: ""
  }
};

module.exports = config;
