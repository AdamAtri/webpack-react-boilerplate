const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackMountpointPlugin = require('html-webpack-mountpoint-plugin');

const parts = require('./webpack.parts');

const COMMON = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'web-react'
      }),
      new HtmlWebpackMountpointPlugin({
        tagName: 'section',
        mountPoints: ['app-hook', 'dialogs-hook']
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  },
]);

const PROD = merge([
  parts.extractCSS({ use: ['css-loader', 'sass-loader'] }),
]);

const DEV = merge([
  parts.devServer({host: process.env.HOST, port: process.env.PORT}),
  parts.loadCSS(),
  { devtool: 'inline-source-map' }
]);

module.exports = mode => {
  if (mode === 'production') {
    return merge(COMMON, PRODUCTION, {mode});
  }
  return merge(COMMON, DEV, {mode});
}
