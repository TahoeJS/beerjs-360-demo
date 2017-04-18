'use strict'

require('babel-register')({})

const PORT = process.env.PORT || 3030
const server = require('./src/server/server.js')

server.listen(PORT, (err) => {
  if (err) { throw err }
  console.log(`Server running on port:${PORT}`)
})
