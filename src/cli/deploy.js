import * as DeployList from './deploy/list.js'
import * as DeployCreate from './deploy/create.js'
import * as DeployDelete from './deploy/delete.js'

const commands = [DeployList, DeployCreate, DeployDelete]

const command = 'deploy <command>'
const desc =
  'Manage deployment markers — annotate your performance charts across Synthetic, CrUX, and RUM data.'
const builder = yargs => {
  return yargs.commands(commands)
}
const handler = () => {}

export { command, desc, builder, handler, commands }
