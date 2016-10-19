const siteTitle = 'Jelly todo';
const host = '127.0.0.1'; //ip to bind for webpack-dev-server
const port = 80; //port for webpack-dev-server

import path from "path";
import npmInstallPlugin from "npm-install-webpack-plugin";
import webpack from "webpack";
import CleanPlugin from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import _ from "lodash";
import ExtractTextPlugin from "extract-text-webpack-plugin";

const pkg = require('./package.json');


var TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname,'app'),
  build: path.join(__dirname, 'build')
};


var common = {
  entry: {
    app: ['babel-polyfill', PATHS.app]
  },
  resolve:{
    extensions: ['','.js','.jsx']
  },
  output: {
    filename: '[name].js',
    path: PATHS.build
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
        include: PATHS.app
      }
    ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules\\html-webpack-template\\index.ejs',
      title: siteTitle,
      appMountId: 'app',
      inject: false,
      mobile: true
    })
  ]
};

var dev = {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    stats: 'errors-only',
    inline: true,
    progress: true,
    host: '127.0.0.1',
    port: 80
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders: ['file-loader'],
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new npmInstallPlugin({
      save: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

var build = {
  entry: {
    vendor: Object.keys(pkg.dependencies)
  },
  plugins: [
    new CleanPlugin([PATHS.build]),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor','manifest']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.DedupePlugin()
  ],
  output: {
    chunkFilename: '[chunkhash].js',
    filename: '[name].[chunkhash].js',
    path: PATHS.build
  },
  module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: PATHS.app
        },
        {
          test: /\.png$/,
          loaders: ['file-loader']
        }
      ]
    }
};

function arrayConcat(objValue, srcValue) {
  if(_.isArray(objValue)){
    return objValue.concat(srcValue);
  }
}


if(TARGET === 'build'){
  module.exports = _.mergeWith({},common,build,arrayConcat);
}

if(TARGET === 'start'){
  var test = _.mergeWith({},common,dev,arrayConcat);
  module.exports = _.mergeWith({},common,dev,arrayConcat);
}
