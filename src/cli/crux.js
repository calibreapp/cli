import * as Summary from './crux/summary.js'
import * as History from './crux/history.js'
import * as Urls from './crux/urls.js'
import * as Url from './crux/url.js'

const commands = [Summary, History, Urls, Url]

const command = 'crux <command>'
const desc =
  'Chrome UX Report (CrUX) — real-world performance data from Chrome users.'
const builder = yargs => {
  return yargs.commands(commands)
}
const handler = () => {}

export { command, desc, builder, handler, commands }
