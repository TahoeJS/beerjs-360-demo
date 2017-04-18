const getLoaders = require('./loaders')
const getPlugins = require('./plugins')
const paths = require('./paths')
const ENV = process.env.NODE_ENV || 'development'

module.exports = {
  // devtool: 'cheap-eval-source-map',
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    paths.appSrc
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'app.bundle.js',
    publicPath: 'http://localhost:3030/static/js/'
  },
  resolve: {
    fallback: paths.nodePaths,
    extensions: ['.js', '.json', '.jsx', '']
  },
  module: {
    noParse: /node_modules\/.bin/,
    loaders: getLoaders(ENV)
  },
  plugins: getPlugins(ENV),
  devServer: {
    hot: true,
    contentBase: './'
  }
}
