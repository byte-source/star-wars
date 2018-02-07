const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devtool: 'source-map',

  stats: {
    colors: true,
    reasons: true
  },

  devServer: {
    historyApiFallback: true
  },

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
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      {
        test: /\.css?/,
        loaders: ['css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        include: APP_DIR,
        loaders: ["url-loader", "file-loader"]
      },
    ]
  }
}

module.exports = config
