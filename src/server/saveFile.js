import fs from 'fs'
import request from 'request'

export default function saveFile (source, destination, cb) {
  request.head(source, (err, res, body) => {
    if (err) throw err

    console.log('content-type:', res.headers['content-type'])
    console.log('content-length:', res.headers['content-length'])

    request(source)
      .pipe(fs.createWriteStream(destination))
      .on('close', cb)
  })
}
