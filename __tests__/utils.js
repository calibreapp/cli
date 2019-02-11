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
    const command = `${CLI_PATH} ${args}`
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

exports.runCLI = runCLI
