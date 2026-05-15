import Configstore from 'configstore'
import { styleText } from 'node:util'

const config = new Configstore('calibre')

const main = async () => {
  if (config.get('token')) {
    config.set('token', null)
    console.log(`${styleText(['bold', 'green'], '\u2714 API Token removed.')}\n`)
  } else {
    console.log(`${styleText(['bold', 'red'], '\u2716 API Token is not set.')}\n`)
  }
}

const command = 'remove'
const describe = 'Remove the saved API Token used for CLI commands (from ~/.config/configstore/calibre.json).'
const handler = main
const builder = {}

export { command, describe, handler, builder }
