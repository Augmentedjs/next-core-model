const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  context: __dirname,
  target: "web",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'core-next-model.js',
    publicPath: '/dist/',
    library: "core-next-model",
    globalObject: 'this',
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: {
    'core-next-utilities': {
      commonjs: 'next-core-utilities',
      commonjs2: 'next-core-utilities',
      amd: 'next-core-utilities',
      root: 'next-core-utilities'
    },
    'lodash.clone': {
      commonjs: 'lodash.clone',
      commonjs2: 'lodash.clone',
      amd: 'lodash.clone',
      root: 'lodash.clone'
    },
    'lodash.defaults': {
      commonjs: 'lodash.defaults',
      commonjs2: 'lodash.defaults',
      amd: 'lodash.defaults',
      root: 'lodash.defaults'
    },
    'lodash.defer': {
      commonjs: 'lodash.defer',
      commonjs2: 'lodash.defer',
      amd: 'lodash.defer',
      root: 'lodash.defer'
    },
    'lodash.escape': {
      commonjs: 'lodash.escape',
      commonjs2: 'lodash.escape',
      amd: 'lodash.escape',
      root: 'lodash.escape'
    },
    'lodash.has': {
      commonjs: 'lodash.has',
      commonjs2: 'lodash.has',
      amd: 'lodash.has',
      root: 'lodash.has'
    },
    'lodash.isempty': {
      commonjs: 'lodash.isempty',
      commonjs2: 'lodash.isempty',
      amd: 'lodash.isempty',
      root: 'lodash.isempty'
    },
    'lodash.isequal': {
      commonjs: 'lodash.clone',
      commonjs2: 'lodash.clone',
      amd: 'lodash.clone',
      root: 'lodash.clone'
    },
    'lodash.iteratee': {
      commonjs: 'lodash.iteratee',
      commonjs2: 'lodash.iteratee',
      amd: 'lodash.iteratee',
      root: 'lodash.iteratee'
    },
    'lodash.result': {
      commonjs: 'lodash.result',
      commonjs2: 'lodash.result',
      amd: 'lodash.result',
      root: 'lodash.result'
    },
  },
  stats: "errors-only",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    })
  ]
};
