import * as TokenSet from './token/set'
import * as TokenRemove from './token/remove'

const commands = [TokenSet, TokenRemove]

const command = 'token <command>'
const desc =
  'Store or revoke a Calibre API token (Use instead of CALIBRE_API_TOKEN environment variable)'
const builder = yargs => {
  return yargs.commands(commands)
}
const handler = () => {}

export { command, desc, builder, handler, commands }
