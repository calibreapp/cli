import * as TokenSet from './token/set.js'
import * as TokenRemove from './token/remove.js'

const commands = [TokenSet, TokenRemove]

const command = 'token <command>'
const desc =
  'Use the token command to store or revoke a Calibre API token. You can also save your token with the CALIBRE_API_TOKEN environment variable.'
const builder = yargs => {
  return yargs.commands(commands)
}
const handler = () => {}

export { command, desc, builder, handler, commands }
