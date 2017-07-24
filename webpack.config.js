const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  entry: './server',
  output: {
    path: path.resolve(__dirname, 'build/server'),
    filename: 'index.js'
  },
  target: 'node',
  node: {
    __dirname: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      }
    ]
  },
  externals: nodeExternals()
}
