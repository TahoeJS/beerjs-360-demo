import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import path from 'path'
import {applyDevTools} from './middleware/devTools'
import {cameraRoutes} from './cameraRoutes'
import {dbRoutes} from './dbRoutes'

const app = express()

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/images', express.static(path.join(__dirname, './data/images')))
app.use('/camera', cameraRoutes)
app.use('/db', dbRoutes)

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy', true)
  app.use('/static', express.static(path.join(__dirname, '../../bin/static')))
} else if (process.env.NODE_ENV === 'development') {
  applyDevTools(app)
}

app.get('/', (req, res) => {
  const initialState = {}

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>360 BeerJS Demo</title>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
      </head>
      <body>
        <div id="application"></div>
        <script type="application/javascript" src="static/js/app.bundle.js"></script>
      </body>
    </html>
  `
  res.end(html)
})

module.exports = http.createServer(app)
