import Configstore from 'configstore'
import { styleText } from 'node:util'

const config = new Configstore('calibre')

const main = async ({ token }) => {
  config.set('token', token)
  console.log(`${styleText(['bold', 'green'], '\u2714 API Token saved!')}\n`)
}

const command = 'set <token>'
const describe = 'Store your API Token to use the CLI (saved in ~/.config/configstore/calibre.json).'
const handler = main
const builder = {}

export { command, describe, handler, builder }
