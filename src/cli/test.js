import * as TestCreate from './test/create.js'
import * as TestDownloadArtifacts from './test/download-artifacts.js'
import * as TestList from './test/list.js'
import * as TestShow from './test/show.js'

const commands = [TestCreate, TestDownloadArtifacts, TestList, TestShow]

const command = 'test <command>'
const desc = 'Single page tests'
const builder = yargs => {
  return yargs.commands(commands)
}
const handler = () => {}

export { command, desc, builder, handler, commands }
