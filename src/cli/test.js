import * as TestCreate from './test/create.js'
import * as TestDownloadArtifacts from './test/download-artifacts.js'
import * as TestList from './test/list.js'
import * as TestShow from './test/show.js'

const commands = [TestCreate, TestDownloadArtifacts, TestList, TestShow]

const command = 'test <command>'
const desc = 'Use the test command to run Single Page Tests: public or private tests for a single Page tested from a single device. This command also supports viewing all Single Page Tests and retrieving their artifacts.'
const builder = yargs => {
  return yargs.commands(commands)
}
const handler = () => {}

export { command, desc, builder, handler, commands }
