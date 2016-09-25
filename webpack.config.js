const path = require('path');

const autoprefixer = require('autoprefixer');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');


//=========================================================
//  VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';

const HOST = '0.0.0.0';
const PORT = 3000;


//=========================================================
//  LOADERS
//---------------------------------------------------------
const rules = {
  js: {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
  json: {test: /\.json$/, loader: 'json'},
  scss: {test: /\.scss$/, loader: 'style!css!postcss!sass'}
};


//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = module.exports = {};

config.resolve = {
  extensions: ['.js', '.json'],
  modules: [
    path.resolve('./src'),
    'node_modules'
  ]
};

config.module = {
  rules: [
    rules.js
  ]
};

config.plugins = [
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  new LoaderOptionsPlugin({
    debug: false,
    minimize: ENV_PRODUCTION,
    options: {
      postcss: [
        autoprefixer({browsers: ['last 3 versions']})
      ],
      sassLoader: {
        outputStyle: 'compressed',
        precision: 10,
        sourceComments: false
      }
    }
  })
];


//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = {
    main: ['./src/main.js']
  };

  config.output = {
    filename: '[name].js',
    path: path.resolve('./target'),
    publicPath: '/'
  };

  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html'
    })
  );
}


//=====================================
//  DEVELOPMENT
//-------------------------------------
if (ENV_DEVELOPMENT) {
  config.devtool = 'cheap-module-source-map';

  config.entry.main.unshift(
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server'
  );

  config.module.rules.push(rules.scss);

  config.plugins.push(
    new HotModuleReplacementPlugin(),
    new ProgressPlugin()
  );

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    host: HOST,
    hot: true,
    port: PORT,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  };
}


//=====================================
//  PRODUCTION
//-------------------------------------
if (ENV_PRODUCTION) {
  config.devtool = 'hidden-source-map';

  config.entry.main.unshift('babel-polyfill');

  config.output.filename = '[name].[chunkhash].js';

  config.module.rules.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('css?-autoprefixer!postcss!sass')
  });

  config.plugins.push(
    new WebpackMd5Hash(),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new UglifyJsPlugin({
      comments: false,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true  // eslint-disable-line camelcase
      }
    })
  );
}


//=====================================
//  TEST
//-------------------------------------
if (ENV_TEST) {
  config.devtool = 'inline-source-map';

  config.module.rules.push(
    rules.json,
    rules.scss
  );

  config.externals = {
    'jsdom': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  };
}
