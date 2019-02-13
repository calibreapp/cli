const express = require('express')
const path = require('path')
const spawn = require('spawn-command')

const CLI_PATH = require.resolve('../src/cli.js')

const runCLI = ({ args = '', testForError = false }, cwd = process.cwd()) => {
  const isRelative = cwd[0] !== '/'
  if (isRelative) {
    cwd = path.resolve(__dirname, cwd)
  }

  return new Promise((resolve, reject) => {
    let stdout = ''
    let stderr = ''
    const command = `CALIBRE_API_TOKEN=${
      process.env.CALIBRE_API_TOKEN
    } CALIBRE_HOST=${
      process.env.CALIBRE_HOST
    } TZ=Sydney/Australia ${CLI_PATH} ${args}`
    const child = spawn(command, { cwd })

    child.on('error', error => {
      reject(error)
    })

    child.stdout.on('data', data => {
      stdout += data.toString()
    })

    child.stderr.on('data', data => {
      stderr += data.toString()
    })

    child.on('close', () => {
      if (testForError) {
        resolve(stderr)
      } else if (stderr) {
        reject(stderr)
      } else {
        resolve(stdout)
      }
    })
  })
}

let server
const setupIntegrationServer = (
  mockResponse = { error: 'No mock response', data: null }
) => {
  const app = express()
  app.use(express.json())
  app.post('/graphql', (req, res) => {
    const { query } = req.body
    res.status(200).send(mockResponse)
  })
  server = app.listen(5678, () => true)
}
const teardownIntegrationServer = () => server.close(() => true)

exports.setupIntegrationServer = setupIntegrationServer
exports.teardownIntegrationServer = teardownIntegrationServer
exports.runCLI = runCLI
