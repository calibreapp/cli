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

let server
const setupIntegrationServer = (
  mockResponse = { error: 'No mock response', data: null }
) => {
  const app = express()
  app.use(express.json())
  app.post('/graphql', (req, res) => {
    res.status(200).send(mockResponse)
  })
  server = app.listen(5678, () => Promise.resolve(true))
}
const teardownIntegrationServer = () =>
  server.close(() => Promise.resolve(true))

export { runCLI, setupIntegrationServer, teardownIntegrationServer }
