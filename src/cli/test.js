exports.command = 'test <command>'
exports.desc = 'Single page tests'
exports.builder = yargs => {
  return yargs.commandDir('test')
}
exports.handler = argv => {}
