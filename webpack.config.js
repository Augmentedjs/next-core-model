const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  context: __dirname,
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "core-next-model.js",
    publicPath: "/dist/",
    library: "core-next-model",
    globalObject: "this",
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
    "next-core-object": {
      commonjs: "next-core-object",
      commonjs2: "next-core-object",
      amd: "next-core-object",
      root: "next-core-object"
    },
    "next-core-utilities": {
      commonjs: "next-core-utilities",
      commonjs2: "next-core-utilities",
      amd: "next-core-utilities",
      root: "next-core-utilities"
    },
    "next-core-validation": {
      commonjs: "next-core-validation",
      commonjs2: "next-core-validation",
      amd: "next-core-validation",
      root: "next-core-validation"
    },
    "lodash": {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "lodash"
    }
  },
  stats: "errors-only",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    })
  ]
};
