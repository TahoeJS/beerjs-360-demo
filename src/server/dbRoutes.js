import express from 'express'
import path from 'path'
import fs from 'fs'

export const dbRoutes = express.Router()

dbRoutes.post('/save', writeToFile)

// Handlers
function writeToFile (req, res, next) {
  const json = req.body

  fs.writeFile(`${path.join(__dirname, '../data/db.json')}`, JSON.stringify(json), (err) => {
    if (err) throw err
    console.log('The file has been saved!')

    res.status(200).end()
  })
}
