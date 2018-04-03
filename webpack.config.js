const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackMountpointPlugin = require('html-webpack-mountpoint-plugin');

const parts = require('./webpack.parts');
const { join } = require('path');

const COMMON = merge([
  {
    entry: {
      src: join(__dirname, 'src', 'index.js')
    },
    output: {
      path: join(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [
            join(__dirname, 'src')
          ],
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      ]
    },
    resolve: {
      modules:[
        'node_modules',
        join(__dirname, 'src')
      ],
      extensions: ['.js', '.json', '.jsx', '.scss', '.css'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'web-react'
      }),
      new HtmlWebpackMountpointPlugin({
        tagName: 'section',
        mountPoints: ['app-hook', 'dialogs-hook']
      })
    ]
  }
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
