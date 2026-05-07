import * as Summary from './rum/summary.js'
import * as History from './rum/history.js'
import * as Pages from './rum/pages.js'
import * as Config from './rum/config.js'

const commands = [Summary, History, Pages, Config]

const command = 'rum <command>'
const desc =
  'Real User Metrics (RUM) — field performance data from your real users.'
const builder = yargs => {
  return yargs.commands(commands)
}
const handler = () => {}

export { command, desc, builder, handler, commands }
