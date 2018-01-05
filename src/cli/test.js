exports.command = 'test <command>'
exports.desc = 'Single page tests'
exports.builder = function(yargs) {
  return yargs.commandDir('test')
}
exports.handler = function(argv) {}
