const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const uglifyPlugin = require("uglifyjs-webpack-plugin");
const config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  devtool: false,
  module: {
    rules: [
      {
        test: /\.js?/,
        include: APP_DIR,
        loaders: ['babel-loader']
      },
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loaders: ['babel-loader']
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.css?/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: 'css-loader', options: { minimize: true } }
          ]
        })
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        include: APP_DIR,
        loaders: ["url-loader"]
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin("./assets/styles.css"),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      { from: './assets', to: BUILD_DIR + '/assets' }
    ]),

    new uglifyPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    })
  ]
};

module.exports = config;

