const path = require('path')

const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(p => path.resolve(p))

module.exports = {
  nodePaths,
  appSrc: path.resolve(__dirname, '../src/client/index.js'),
  appBuild: path.resolve(__dirname, '../bin'),
  appNodeModules: path.resolve('node_modules')
}
