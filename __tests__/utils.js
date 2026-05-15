import express from 'express'
import { execaCommand } from 'execa'

const runCLI = async ({ args = '', testForError = false }) => {
  try {
    const { stdout, stderr } = await execaCommand(`calibre ${args}`, {
      shell: true
    })
    if (testForError) return stderr
    return stdout
  } catch (error) {
    return error.stderr
  }
}

let server = null

const setupIntegrationServer = (mockResponse = { error: 'No mock response', data: null }) => {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close(() => {
        startServer(mockResponse, resolve, reject)
      })
    } else {
      startServer(mockResponse, resolve, reject)
    }
  })
}

const startServer = (mockResponse, resolve, reject) => {
  try {
    const app = express()
    app.use(express.json())

    app.post('/graphql', (req, res) => {
      res.status(200).json(mockResponse)
    })

    // Mock artifact downloads to prevent 404s
    app.get(/^\/artifacts\/.*/, (req, res) => {
      const path = req.path
      if (path.endsWith('.jpg')) {
        res.set('Content-Type', 'image/jpeg')
        res.send(Buffer.from('mock-image-data'))
      } else if (path.endsWith('.mp4')) {
        res.set('Content-Type', 'video/mp4')
        res.send(Buffer.from('mock-video-data'))
      } else if (path.endsWith('.har')) {
        res.json({ log: { version: '1.2', entries: [] } })
      } else if (path.endsWith('.json')) {
        res.json({ mockLighthouseData: true })
      } else {
        res.status(404).send('Not Found')
      }
    })

    server = app.listen(5678, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })

    server.on('error', (err) => {
      reject(err)
    })
  } catch (error) {
    reject(error)
  }
}

const teardownIntegrationServer = () => {
  return new Promise((resolve) => {
    if (server) {
      server.close((err) => {
        if (err && err.code !== 'ERR_SERVER_NOT_RUNNING') {
          console.error('Error closing server:', err)
        }
        server = null
        resolve(true)
      })
    } else {
      resolve(true)
    }
  })
}

export { runCLI, setupIntegrationServer, teardownIntegrationServer }
