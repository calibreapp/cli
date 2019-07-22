const express = require('express')
const { command } = require('execa')

const runCLI = async ({ args = '', testForError = false }) => {
  try {
    const { stdout, stderr } = await command(`calibre ${args}`, {
      shell: true
    })
    if (testForError) return stderr
    return stdout
  } catch (error) {
    return error.stderr
  }
}

let server
const setupIntegrationServer = (
  mockResponse = { error: 'No mock response', data: null }
) => {
  const app = express()
  app.use(express.json())
  app.post('/graphql', (req, res) => {
    res.status(200).send(mockResponse)
  })
  server = app.listen(5678, () => true)
}
const teardownIntegrationServer = () => server.close(() => true)

exports.setupIntegrationServer = setupIntegrationServer
exports.teardownIntegrationServer = teardownIntegrationServer
exports.runCLI = runCLI
