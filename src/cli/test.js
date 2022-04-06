import * as TestCreate from './test/create'
import * as TestDownloadArtifacts from './test/download-artifacts'
import * as TestList from './test/list'
import * as TestShow from './test/show'

const commands = [TestCreate, TestDownloadArtifacts, TestList, TestShow]

const command = 'test <command>'
const desc = 'Single page tests'
const builder = yargs => {
  return yargs.commands(commands)
}
const handler = () => {}

export { command, desc, builder, handler, commands }
