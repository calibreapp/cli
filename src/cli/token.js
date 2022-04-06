import * as TokenSet from './token/set'
import * as TokenRemove from './token/remove'

const commands = [TokenSet, TokenRemove]

const command = 'token <command>'
const desc = 'Tasks related to tokens'
const builder = yargs => {
  return yargs.commands(commands)
}
const handler = () => {}

export { command, desc, builder, handler, commands }
