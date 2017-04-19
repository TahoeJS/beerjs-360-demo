import express from 'express'
import path from 'path'
import api from './api'
import saveFile from './saveFile'

export const cameraRoutes = express.Router()

cameraRoutes.get('/init', (req, res) => {
  getCameraInfo().then((cameraInfo) => {
    startSession()
      .then((response) => {
        res.json({
          sessionId: response.results.sessionId
        })
      })
  })
  .catch((err) => {
    res.send(err)
  })
})

cameraRoutes.post('/capture', verifyCameraSession, captureImage)

// Handlers
function verifyCameraSession (req, res, next) {
  const {sessionId} = req.body
  if (!sessionId) {
    startSession()
      .then((response) => {
        req.body.sessionId = response.results.sessionId
        next()
      })
  } else {
    next()
  }
}

function captureImage (req, res) {
  const {sessionId} = req.body

  takePicture(sessionId)
    .then((status) => {
      // allows for the image to be processed by the camera
      // approx 6 seconds
      setTimeout(() => {
        checkDoneStatus(status)
          .then((status) => {
            getImages().then((images) => {
              const {results: {entries}} = images

              const source = `http://192.168.1.1/${status.results.fileUri}`
              const destination = `${path.join(__dirname, './data/images')}/${status.results.fileUri.replace('/', '-')}`
              const uri = `images/${status.results.fileUri.replace('/', '-')}`

              saveFile(source, destination, () => {
                console.log('FILE SAVED')
                res.send({
                  sessionId,
                  uri,
                  name: entries[0].name,
                  date: entries[0].dateTimeZone
                })
              })
            })
          })
      }, 5000)
    })
    .catch((err) => {
      res.send(err)
    })
}

function getImages () {
  console.log('GET IMAGES')
  const command = {
    name: 'camera.listImages',
    parameters: {
      entryCount: 10,
      maxSize: 160
    }
  }

  return api.post('osc/commands/execute', command)
}

function getCameraInfo () {
  return api.get('osc/info')
}

function startSession () {
  console.log('START SESSION')
  const command = {
    name: 'camera.startSession',
    parameters: {}
  }

  return api.post('osc/commands/execute', command)
}

function takePicture (sessionId) {
  console.log('TAKE PICTURE')
  const command = {
    name: 'camera.takePicture',
    parameters: {sessionId}
  }

  return api.post('osc/commands/execute', command)
}

function checkDoneStatus (status) {
  console.log('CHECK DONE')
  return getStatus(status.id).then((nextStatus) => {
    if (nextStatus.state !== 'done') {
      return checkDoneStatus(nextStatus)
    } else {
      return nextStatus
    }
  })
}

function getStatus (id) {
  console.log('GET PICTURE')
  const command = {id}
  return api.post('osc/commands/status', command)
}
