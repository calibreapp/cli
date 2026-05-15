import * as SiteCreate from './site/create.js'
import * as SiteList from './site/list.js'
import * as SiteDelete from './site/delete.js'

const commands = [SiteCreate, SiteList, SiteDelete]

const command = 'site <command>'
const desc = 'Manage your Sites.'
const builder = yargs => yargs.commands(commands)
const handler = () => {}

export { command, desc, builder, handler, commands }
