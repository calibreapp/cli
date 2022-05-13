import * as TeamList from './team/list.js'

const commands = [TeamList]

const command = 'team <command>'
const desc = 'Use the team command to manage Teams.'
const builder = yargs => {
  return yargs.commands(commands)
}
const handler = () => {}

export { command, desc, builder, handler, commands }
