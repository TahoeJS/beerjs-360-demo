const paths = require('./paths.js')

module.exports = function getPreloaders () {
  return [{
    test: /\.(js|jsx)$/,
    loader: 'eslint',
    exclude: /(node_modules|bower_components)/,
    include: paths.appSrc
  }]
}
