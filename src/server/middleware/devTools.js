import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../../config/webpack.dev.js'

export function applyDevTools (app) {
  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    noInfo: true,
    inline: true,
    lazy: false,
    stats: { color: true }
  }))

  app.use(webpackHotMiddleware(compiler))
}
