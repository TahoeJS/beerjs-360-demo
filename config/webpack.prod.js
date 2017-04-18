const getLoaders = require('./loaders')
// const getPreloaders = require('./preloaders')
const getPlugins = require('./plugins')
const paths = require('./paths')
const ENV = process.env.NODE_ENV || 'production'

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    paths.appSrc
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/app.bundle.js',
    publicPath: '/'
  },
  resolve: {
    fallback: paths.nodePaths,
    extensions: ['.js', '.json', '.jsx', '']
  },
  module: {
    noParse: /node_modules\/.bin/,
    loaders: getLoaders(ENV)
  },
  plugins: getPlugins(ENV)
}
